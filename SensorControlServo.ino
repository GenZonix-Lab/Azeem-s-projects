#include <ESP32Servo.h>

Servo myservo;

int servoPin = 18;     // Servo signal pin
int irSensorPin = 27;  // IR sensor pin
int irState = 0;       // Current sensor reading
int lastState = 1;     // Store last reading(assuming HIGH = no object)
bool positionFlag = false; // false = at 0°, true = at 180°

void setup() {
  myservo.attach(servoPin);
  pinMode(irSensorPin, INPUT);
  myservo.write(0);  // Start at 0°
  Serial.begin(115200);
}

void loop() {
  irState = digitalRead(irSensorPin);

  // Detect a LOW-to-HIGH transition (object detection pulse)
  if (irState == LOW && lastState == HIGH) {
    Serial.println("IR detected!");
    if (!positionFlag) {
      myservo.write(180);
      positionFlag = true; // Now at 180
    } else {
      myservo.write(0);
      positionFlag = false; // Now at 0
    }
    delay(1000); // debounce delay
  }

  lastState = irState;  // Update last state
}

