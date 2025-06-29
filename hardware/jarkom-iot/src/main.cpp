#include <Arduino.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <WiFi.h>
#include <HTTPClient.h>  

#define RAIN_PIN A6 //D34
#define RAIN_THRESHOLD 3500 // Ambang batas untuk mendeteksi hujan
#define DHTPIN 32 // Pin untuk sensor DHT
#define DHTTYPE DHT11 // Tipe sensor DHT yang digunakan
#define I2C_ADDRESS 0x27 // Alamat I2C dari LCD

const int HALF = 2000; // Ambang batas untuk mendeteksi hujan

LiquidCrystal_I2C lcd(I2C_ADDRESS, 16, 2); // In
DHT dht(DHTPIN, DHTTYPE); // Inisialisasi sensor DHT


void setup() {
  lcd.init(); // Inisialisasi LCD dengan 16 kolom dan 2 baris
  lcd.backlight(); // Aktifkan backlight LCD

  dht.begin(); // Inisialisasi sensor DHT
  pinMode(RAIN_PIN, INPUT); // Set pin untuk sensor hujan sebagai input
  }

void loop() {
  for (int i = 0; i < 16; i++) {  // 16 = LCD width
    lcd.scrollDisplayLeft();
    delay(750);
  } 

  dht.read(); // Membaca data dari sensor DHT
  float temperature = dht.readTemperature(); // Membaca suhu dalam Celsius
  float humidity = dht.readHumidity(); // Membaca kelembapan
  int rainValue = analogRead(RAIN_PIN); // Membaca nilai dari sensor hujan

  if (rainValue > RAIN_THRESHOLD) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Status: Tidak Hujan");
  } else if (rainValue > HALF && rainValue <= RAIN_THRESHOLD) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Status: Hujan Gerimis");
  } else {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Status: Hujan Deras");
  }

  lcd.setCursor(0, 1);
  lcd.print("Temp: " + String(temperature, 1) + " C");
  lcd.print(" | ");
  lcd.print("Hum: " + String(humidity, 1) + " %");
  
  delay(1000); // Tunggu selama 1 detik
}