#include <Adafruit_NeoPixel.h>

#define LED_PIN 15        // Pin where WS2812 LED strip is connected
#define NUM_LEDS 1       // Number of LEDs in the strip
#define IR_SENSOR_PIN 4  // Pin where IR sensor is connected

Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

int colorIndex = 0;  // To track which color is active

// Define 12 colors in RGB format
uint32_t colors[12] = {
  strip.Color(255, 0, 0),     // Red
  strip.Color(0, 255, 0),     // Green
  strip.Color(0, 0, 255),     // Blue
  strip.Color(255, 255, 0),   // Yellow
  strip.Color(0, 255, 255),   // Cyan
  strip.Color(255, 0, 255),   // Magenta
  strip.Color(255, 128, 0),   // Orange
  strip.Color(128, 0, 255),   // Purple
  strip.Color(0, 128, 255),   // Sky Blue
  strip.Color(255, 0, 128),   // Pink
  strip.Color(128, 255, 0),   // Lime
  strip.Color(255, 255, 255)  // White
};

void setup() {
  pinMode(IR_SENSOR_PIN, INPUT);
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
}

void loop() {
  int irState = digitalRead(IR_SENSOR_PIN);

  if (irState == LOW) { // IR sensor detects object (LOW means object detected in most IR modules)
    changeColor();
    delay(300); // debounce delay to avoid rapid changes
  }
}

void changeColor() {
  // Set the strip to the current color
  for (int i = 0; i < NUM_LEDS; i++) {
    strip.setPixelColor(i, colors[colorIndex]);
  }
  strip.show();

  // Move to next color
  colorIndex++;
  if (colorIndex >= 12) {
    colorIndex = 0; // Reset after last color
  }
}
