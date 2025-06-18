#include <Arduino.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>

#define LED_MERAH 4
#define LED_BIRU 3
#define LED_HIJAU 2 
#define ADC A0 
#define DHTPIN 5
#define DHTTYPE DHT11 // Ganti dengan tipe sensor DHT yang digunakan (DHT11, DHT22, dll)

DHT dht(DHTPIN, DHTTYPE); // Inisialisasi sensor DHT

void setup() {
  // put your setup code here, to run once:
  pinMode(ADC, INPUT); // Set pin ADC sebagai input
  pinMode(DHTPIN, INPUT); // Set pin DHT sebagai input
  pinMode(LED_BIRU, OUTPUT);
  pinMode(LED_HIJAU, OUTPUT);
  pinMode(LED_MERAH, OUTPUT);
  digitalWrite(LED_MERAH,  LOW); // Matikan LED Merah
  digitalWrite(LED_BIRU, LOW); // Matikan LED Biru
  digitalWrite(LED_HIJAU, LOW); // Matikan LED Hijau
  dht.begin(); // Memulai sensor DHT
  Serial.begin(9600); // Inisialisasi komunikasi serial
}

void loop() {
  float sensorValue = dht.readTemperature(); // Membaca nilai dari sensor suhu
  float rainValue = analogRead(ADC); // Membaca nilai dari sensor analog

  Serial.print("Nilai Sensor SUHU: ");
  Serial.println(sensorValue);
  Serial.print("Nilai Sensor CUMSHOT: ");
  Serial.println(rainValue);

  // Logika untuk mengendalikan LED berdasarkan nilai sensor
  if (sensorValue > 30.0) { // Jika suhu lebih dari 30 derajat Celsius
    digitalWrite(LED_MERAH, HIGH); // Nyalakan LED Merah
    digitalWrite(LED_BIRU, LOW); // Matikan LED Biru
    digitalWrite(LED_HIJAU, LOW); // Matikan LED Hijau
  } else if (rainValue > 500) { // Jika nilai hujan lebih dari threshold tertentu
    digitalWrite(LED_BIRU, HIGH); // Nyalakan LED Biru
    digitalWrite(LED_MERAH, LOW); // Matikan LED Merah
    digitalWrite(LED_HIJAU, LOW); // Matikan LED Hijau
  } else {
    digitalWrite(LED_HIJAU, HIGH); // Nyalakan LED Hijau jika kondisi lain tidak terpenuhi
    digitalWrite(LED_MERAH, LOW); // Matikan LED Merah
    digitalWrite(LED_BIRU, LOW); // Matikan LED Biru
  }

  delay(2000); // Delay untuk pembacaan berikutnya
}