#include <ESP32Servo.h>

Servo myServo;  // create servo object

int potPin = 34;   // Potentiometer connected to GPIO34 (ADC1_CH6)
int potValue;      // variable to store potentiometer value
int angle;         // variable to store servo angle

void setup() {
  myServo.attach(18);  // attach servo signal pin to GPIO18 (change if needed)
  Serial.begin(115200);
}

void loop() {
  // Read potentiometer value (0 - 4095 for ESP32 ADC)
  potValue = analogRead(potPin);

  // Map potentiometer value to servo angle (0° to 180°)
  angle = map(potValue, 0, 4095, 0, 180);

  // Write angle to servo
  myServo.write(angle);

  // Debugging output
  Serial.print("Potentiometer: ");
  Serial.print(potValue);
  Serial.print("  Servo Angle: ");
  Serial.println(angle);

  delay(15);  // small delay for smooth motion
}
