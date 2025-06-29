#include <Arduino.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <WiFi.h>
#include <HTTPClient.h>  
#include <cJSON.h>

#define RAIN_PIN A6 //D34
#define RAIN_THRESHOLD 3500 // Ambang batas untuk mendeteksi hujan
#define DHTPIN 32 // Pin untuk sensor DHT
#define DHTTYPE DHT11 // Tipe sensor DHT yang digunakan
#define I2C_ADDRESS 0x27 // Alamat I2C dari LCD

const int HALF = 2000; // Ambang batas untuk mendeteksi hujan

LiquidCrystal_I2C lcd(I2C_ADDRESS, 16, 2); // In
DHT dht(DHTPIN, DHTTYPE); // Inisialisasi sensor DHT

const char* SSID = "RXHSPT";
const char* PASSWORD = "yayayasayasetuju";
const char* SERVER = "http://192.168.191.90:3000/api/sensor_reading/";

char rainIntensityPrint[32];
char rainIntensity[16];
String tempHumPrint;
float temperature;
float humidity;
int rainValue;

int httpResponse;

const long requestDelay = 5000;
unsigned long lastRequest = 0;

const long shiftInterval = 750;
unsigned long lastShift = 0;
int shiftIndex = 0;
const int LCDMsgLen = 20;

void setup() {
  Serial.begin(9600);
  lcd.init(); // Inisialisasi LCD dengan 16 kolom dan 2 baris
  lcd.backlight(); // Aktifkan backlight LCD

  dht.begin(); // Inisialisasi sensor DHT
  pinMode(RAIN_PIN, INPUT); // Set pin untuk sensor hujan sebagai input

  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASSWORD);
  while(WiFi.status() != WL_CONNECTED)
  {
    lcd.setCursor(0, 0);
    lcd.print("Connecting...");
    Serial.println("Connecting...");
    delay(1000);
  }
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connected to:");
  lcd.setCursor(0, 1);
  lcd.print(SSID);
  Serial.println("Connected!");

  delay(3000);

  lcd.clear();
  lcd.setCursor(0, 0);
  Serial.println("Setup done, moving to loop!");
}

void loop() {

  dht.read(); // Membaca data dari sensor DHT
  temperature = dht.readTemperature(); // Membaca suhu dalam Celsius
  humidity = dht.readHumidity(); // Membaca kelembapan
  rainValue = analogRead(RAIN_PIN); // Membaca nilai dari sensor hujan

  if (rainValue > RAIN_THRESHOLD) {
    strcpy(rainIntensityPrint, "Status: ");
    strcat(rainIntensityPrint, "Tidak Hujan");
    strcpy(rainIntensity, "Tidak Hujan");
  } else if (rainValue > HALF && rainValue <= RAIN_THRESHOLD) {
    strcpy(rainIntensityPrint, "Status: ");
    strcat(rainIntensityPrint, "Hujan Gerimis");
    strcpy(rainIntensity, "Hujan Gerimis");
  } else {
    strcpy(rainIntensityPrint, "Status: ");
    strcat(rainIntensityPrint, "Hujan Deras");
    strcpy(rainIntensity, "Hujan Deras");
  }

  tempHumPrint = "Temp: " + String(temperature, 1) + " C" + " | " + "Hum: " + String(humidity, 1) + " %";

  if(millis() - lastRequest >= requestDelay)
  {
    if(WiFi.status() == WL_CONNECTED)
    {
      WiFiClient client;
      HTTPClient http;

      cJSON *json = cJSON_CreateObject();
      cJSON_AddStringToObject(json, "rain_intensity", rainIntensity);
      cJSON_AddNumberToObject(json, "temperature", temperature);
      cJSON_AddNumberToObject(json, "humidity", humidity);

      char *jsonStr = cJSON_Print(json);
      Serial.println(jsonStr);

      http.begin(SERVER);
      http.addHeader("Content-Type", "application/json");
      httpResponse = http.POST(jsonStr);
      Serial.println(httpResponse);
      http.end();
    };
    Serial.println("Request triggered");
    lastRequest = millis();
  }
  if (millis() - lastShift >= shiftInterval) {

    if(shiftIndex > LCDMsgLen)
    {
      shiftIndex = 0;
      lcd.clear();
    }
    char firstRow[17];
    for (int i = 0; i < 16; i++) {
      int idx = shiftIndex + i;
      firstRow[i] = (idx < strlen(rainIntensityPrint)) ? rainIntensityPrint[idx] : ' ';
    }
    firstRow[16] = '\0';

    char secondRow[17];
    for (int i = 0; i < 16; i++) {
      int idx = shiftIndex + i;
      secondRow[i] = (idx < tempHumPrint.length()) ? tempHumPrint[idx] : ' ';
    }
    secondRow[16] = '\0';
    
    lcd.setCursor(0, 0);
    lcd.print(firstRow);
    lcd.setCursor(0, 1);
    lcd.print(secondRow);

    shiftIndex++;
    
    lastShift = millis();
  }
}