// Pin connections
const int ldrPin = 34;     // LDR sensor connected to GPIO34 (ADC pin)
const int buzzerPin = 25;  // Buzzer connected to GPIO25 (use PWM capable pin)

// Light threshold (adjust based on your setup)
int lightThreshold = 2000;  // ESP32 ADC range is 0–4095

void setup() {
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  int ldrValue = analogRead(ldrPin);  // Read LDR value (0–4095 on ESP32)
  Serial.print("LDR Value: ");
  Serial.println(ldrValue);

  if (ldrValue < lightThreshold) {
    // Light detected -> make buzzer beep
    digitalWrite(buzzerPin, HIGH);
    delay(200);  
    digitalWrite(buzzerPin, LOW);
    delay(200);  
  } else {
    // No light -> buzzer stays OFF
    digitalWrite(buzzerPin, LOW);
  }
}
