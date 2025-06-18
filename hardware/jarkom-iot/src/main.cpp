#include <Arduino.h>

#define LED_MERAH 4
#define LED_BIRU 3
#define LED_HIJAU 2 


void setup() {
  // put your setup code here, to run once:
  pinMode(LED_BIRU, OUTPUT);
  pinMode(LED_HIJAU, OUTPUT);
  pinMode(LED_MERAH, OUTPUT);
  digitalWrite(LED_MERAH,  LOW); // Matikan LED Merah
  digitalWrite(LED_BIRU, LOW); // Matikan LED Biru
  digitalWrite(LED_HIJAU, LOW); // Matikan LED Hijau
}

void loop() {
  digitalWrite(LED_MERAH, LOW);
  digitalWrite(LED_BIRU, HIGH);
  digitalWrite(LED_HIJAU, LOW);
  delay(500);
  digitalWrite(LED_BIRU, LOW);
  digitalWrite(LED_HIJAU, LOW);
  digitalWrite(LED_MERAH, HIGH);
  delay(500);
  digitalWrite(LED_MERAH, LOW);
  digitalWrite(LED_BIRU, LOW);
  digitalWrite(LED_HIJAU, HIGH);
  delay(500);
}