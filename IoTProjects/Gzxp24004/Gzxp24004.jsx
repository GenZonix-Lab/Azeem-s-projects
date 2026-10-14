import { StorageImage } from '@aws-amplify/ui-react-storage';
const Gzxp24004 = () => {
    const images =[
        `public/Projects/iot/gzxp24004/assets/Connection_diagram.webp`,
        `public/Projects/iot/gzxp24004/assets/1.webp`,
        `public/Projects/iot/gzxp24004/assets/2.webp`,
        `public/Projects/iot/gzxp24004/assets/3.webp`,
        `public/Projects/iot/gzxp24004/assets/4.webp`,
        `public/Projects/iot/gzxp24004/assets/5.webp`,
        `public/Projects/iot/gzxp24004/assets/6.webp`,
        `public/Projects/iot/gzxp24004/assets/7.webp`,
        `public/Projects/iot/gzxp24004/assets/8.webp`,
        `public/Projects/iot/gzxp24004/assets/9.webp`,
        `public/Projects/iot/gzxp24004/assets/10.webp`
    ]
    const codeString = `
        #include <WiFi.h>
        #include "SinricPro.h"
        #include "SinricProLight.h"
        #include "SinricProSwitch.h"
        #include "ESP32_WS2812_Lib.h"
        #include "credential.h"

        #define LEDS_COUNT 1
        #define LEDS_PIN   15
        #define CHANNEL    0
        #define sw1 2
        #define sw2 4

        ESP32_WS2812 strip = ESP32_WS2812(LEDS_COUNT, LEDS_PIN, CHANNEL, TYPE_GRB);

        #define WIFI_SSID         SSID   
        #define WIFI_PASS         PASS
        #define APP_KEY           APP_KEY     // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
        #define APP_SECRET        APP_SECRET   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
        #define LIGHT_ID          LIGHT_ID    // Should look like "5dc1564130xxxxxxxxxxxxxx"
        #define Switch_ID_1       Switch_ID_1
        #define Switch_ID_2       Switch_ID_2
        void setupWiFi() {
        Serial.printf("\r\n[+]: Connecting");

        WiFi.begin(WIFI_SSID, WIFI_PASS); 

        while (WiFi.status() != WL_CONNECTED) {
        Serial.printf(".");
        delay(250);
        }
        IPAddress localIP = WiFi.localIP();
        Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", localIP.toString().c_str());
        }

        bool powerState;    
        int globalBrightness = 25;

        bool onPowerState(const String &deviceId, bool &state) {
        powerState = state;
        if(deviceId == LIGHT_ID){
        if (state) {
        strip.setBrightness(map(globalBrightness, 0, 100, 0, 255));
        strip.setLedColor(0,255,255,255);
        } else {
        strip.setBrightness(0);
        }
        strip.show();
        }else if(deviceId == Switch_ID_1){
        digitalWrite(sw1, !state); 
        }else if(deviceId == Switch_ID_2){
        digitalWrite(sw2, !state); 
        }
        return true; // request handled properly
        }

        bool onBrightness(const String &deviceId, int &brightness) {
        Serial.println(brightness);
        globalBrightness = brightness;
        strip.setBrightness(map(brightness, 0, 100, 0, 255));
        strip.show();
        return true;
        }

        bool onColorTemperature(const String &deviceId, int &temp_color) {
        Serial.println(temp_color);

        switch(temp_color){
        case 2200: //warm white
        strip.setLedColor(0, 255, 115, 23);
        Serial.println("warm white");
        break;
        case 2700://incandescent Soft White
        strip.setLedColor(0, 255, 139, 39);
        Serial.println("incandescent Soft White");
        break;
        case 4000://White
        strip.setLedColor(0, 255, 218, 122);
        Serial.println("White");
        break;
        case 5500: //Daylight White
        strip.setLedColor(0, 248, 255, 183);
        Serial.println("Daylight White");
        break;
        case 7000: //Cool White
        strip.setLedColor(0, 228, 255, 255);
        Serial.println("Cool White");
        break;
        }
        strip.show();
        return true;
        }
        bool onColor(const String &deviceId, byte &r, byte &g, byte &b) {
        strip.setLedColor(0, r, g, b);
        Serial.print("red:");
        Serial.print(r);
        Serial.print("  green:");
        Serial.print(g);
        Serial.print("  blue:");
        Serial.println(b);
        strip.show();
        return true;
        }

        void setupSinricPro() {
        // get a new Light device from SinricPro
        SinricProLight &myLight = SinricPro[LIGHT_ID];
        SinricProSwitch &mySwitch1 = SinricPro[Switch_ID_1];   // create new switch device
        SinricProSwitch &mySwitch2 = SinricPro[Switch_ID_2];   // create new switch device
        mySwitch1.onPowerState(onPowerState);  
        mySwitch2.onPowerState(onPowerState);  

        // set callback function to device
        myLight.onPowerState(onPowerState);
        myLight.onBrightness(onBrightness);
        //myLight.onAdjustBrightness(onAdjustBrightness);
        myLight.onColorTemperature(onColorTemperature);
        myLight.onColor(onColor); 
        // setup SinricPro
        SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
        SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
        //SinricPro.restoreDeviceStates(true); // Uncomment to restore the last known state from the server.
        SinricPro.begin(APP_KEY, APP_SECRET);
        }
        void setupLED() {
        strip.setBrightness(map(globalBrightness, 0, 100, 0, 255));
        strip.setLedColor(0, 255, 255, 255);
        strip.show();
        }

        void setup() {
        Serial.begin(115200); 
        pinMode(sw1,OUTPUT);
        pinMode(sw2,OUTPUT);
        digitalWrite(sw1, HIGH);
        digitalWrite(sw2, HIGH);
        setupLED();
        strip.begin();
        setupWiFi();
        setupSinricPro();
        }

        void loop() {
        SinricPro.handle();
        }`;

  return (
  <div className="container">
    <div className="docs text-center my-3 p-2"><h1>SMART HOME AUTOMATION SYSTEM</h1></div><hr />
    <div className="docs pb-2">
        <h2>Objective:</h2>
        <p>The Smart Home Automation System project allows for remote control of home appliances and lighting through an IoT setup using the ESP32 microcontroller, WS2812 RGB LED, a 2-channel relay, and the Sinric Pro platform. This system integrates the control of both electrical appliances and lights using a mobile app interface, providing users with smart home capabilities. The main focus of the project is to enable smart control using Wi-Fi and the Sinric Pro IoT cloud service.</p>
    </div><hr />
    <div className="docs pb-2">
        <h2>Requirements:</h2>
        <ul>
            <li>ESP32 Microcontroller</li>
            <li>WS2812 RGB LED</li>
            <li>2-Channel Relay Module</li>
            <li>Power Supply Board</li>
            <li>Jumper Wires</li>
            <li>Sinric Pro IoT Platform</li>
        </ul>
    </div><hr />
    <div className="docs pb-2">
    <h2>Hardware Setup:</h2>
    <h3>Connection procedure:</h3>
    <h4>Relay Connections:</h4>
        <ul>
            <li>IN1 (Relay 1): Connect to GPIO 2 of the ESP32.</li>
            <li>IN2 (Relay 2): Connect to GPIO 4 of the ESP32.</li>
        </ul>
    <h4>WS2812 LED Connections:</h4>
        <ul>
            <li>DIN (Data Input): Connect to GPIO 15 of the ESP32.</li>
            <li>VCC: Connect to a 5V power supply.</li>
            <li>GND: Connect to the ground (GND) of the power supply.</li>
        </ul>
    <h4>Power:</h4>
        <ul>
            <li>Provide a stable 5V power supply to power the ESP32 and other components.</li>
        </ul>
    <h3>Connection setup:</h3>
        <StorageImage 
            path={images[0]} 
            className="img-fluid rounded" 
            alt="Connection_diagram"  
            title="Connection_diagram" 
            maxHeight={400}
            fallbackSrc="/images/defaultImage.webp"
        />
    </div><hr />
    <div className="docs pb-2">
    <h2>Software Setup:</h2>
    <h3>Set Up Sinric Pro Account:</h3>
        <p>Go to the Sinric Pro website and create an account.</p>
        <div className="text-center text-lg-start">
            <StorageImage 
                path={images[1]} 
                className="img-fluid rounded" 
                alt="Login/create a sinric pro"  
                title="Automation"
                maxHeight={400}
                fallbackSrc="/images/defaultImage.webp"
            />
        </div>
        <p>Navigate to the "Devices" section and create three devices in your Sinric Pro account: one light device for the WS2812 LED, and two switch devices for the relays controlling appliances.</p>
        <div className="text-center text-lg-start">
            <StorageImage 
                path={images[2]} 
                className="img-fluid rounded" 
                alt="Dashboard"  
                title="Automation"
                maxHeight={300}
                fallbackSrc="/images/defaultImage.webp"
            />
        </div>
    <h3>Example for Add a new device:</h3>
        <div>
            <StorageImage path={images[3]} className="img-fluid  col-12 col-sm-12 col-lg-5 col-md-12 col-xl-5 me-2" alt="setup"  title="Automation" maxHeight={300} fallbackSrc="/images/defaultImage.webp"/>
            <StorageImage path={images[4]} className="img-fluid  col-12 col-sm-12 col-lg-5 col-md-12 col-xl-5" alt="setup"  title="Automation" maxHeight={300} fallbackSrc="/images/defaultImage.webp"/>
            <StorageImage path={images[5]} className="img-fluid  col-12 col-sm-12 col-lg-5 col-md-12 col-xl-5 me-2" alt="setup"  title="Automation" maxHeight={300} fallbackSrc="/images/defaultImage.webp"/>
            <StorageImage path={images[6]} className="img-fluid  col-12 col-sm-12 col-lg-5 col-md-12 col-xl-5 " alt="setup"  title="Automation" maxHeight={300} fallbackSrc="/images/defaultImage.webp"/>
        </div>
        <p>Take note of the App Key and App Secret from the "Credentials" section, as well as the Light Device ID and the two Switch Device IDs from the "Devices" section.</p>
        <StorageImage 
            path={images[7]} 
            className="img-fluid rounded" 
            alt="Device created"  
            title="Automation"
            maxHeight={300}
            fallbackSrc="/images/defaultImage.webp"/>
        <p>Go to the "Device Template" section and add a new device template. </p>
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
            <div className="col">
                <p><b>Fill in the basic information.</b></p>
                <StorageImage path={images[8]} className="img-fluid rounded" alt="template"  title="Automation" maxHeight={300} fallbackSrc="/images/defaultImage.webp"/>
            </div>
            <div className="col">
                <p><b>Add the relevant capabilities to each device.</b></p>
                <StorageImage path={images[9]} className="img-fluid rounded" alt="template"  title="Automation" maxHeight={300} fallbackSrc="/images/defaultImage.webp"/>
            </div>
        </div>
        <p>The Sinric Pro setup is now complete</p>
        <StorageImage path={images[10]} className="img-fluid rounded me-2" alt="setup completed"  title="Automation" maxHeight={300} fallbackSrc="/images/defaultImage.webp"/>
    <h3>Arduino IDE:</h3>
        <ul>
            <li>Launch the Arduino IDE and create a new sketch.</li>
        </ul>
    <h3>Configure Board Manager:</h3>
        <ul>
            <li>Navigate to File &gt; Preferences.</li>
            <li>In the Additional Board Manager URLs field, paste the following URL: <a href="https://dl.espressif.com/dl/package_esp32_index.json">https://dl.espressif.com/dl/package_esp32_index.json</a></li>
        </ul>
    <h3>Install ESP32 Board:</h3>
        <ul>
            <li>Open the Board Manager by going to Tools &gt; Board &gt; Board Manager.</li>
            <li>Search for and install ESP32.</li>
        </ul>
    <h3>Select ESP32 Board:</h3>
        <ul>
            <li>Once installed, select DOIT ESP32 DEVKIT V1 from the Tools &gt; Board menu.</li>
        </ul>
    <h3>Select the COM Port:</h3>
        <ul>
            <li>Go to Tools &gt; Port, and choose the correct COM port for your device (e.g., COM5).</li>
        </ul>
    <h3>Install the required libraries:</h3>
        <p>Go to Sketch &gt; Include Library &gt; Manage Libraries, then search for and install:</p>
        <ul>
            <li>SinricPro</li>
            <li>ESP32_WS2812_Lib</li>
            <li>WiFi</li>
        </ul>
    <h3>Code Implementation:</h3>
        <pre><code>{codeString}</code></pre>
    <h3>Uploading the Code:</h3>
        <p>Connect your ESP32 to the computer via USB and upload the code to the board.</p>
    </div><hr />
    <div className='docs pb-2'>
    <h2>Testing and operation:</h2>
        <h3>Wi-Fi connection:</h3>
            <ul>
                <li>Once the ESP32 is powered, it will automatically connect to the specified Wi-Fi network.</li>
            </ul>
        <h3>Sinric Pro App:</h3>
            <ul>
                <li>Using the Sinric Pro app, test turning on/off the appliances connected to the relays and adjusting the brightness or color of the WS2812 LEDs.</li>
            </ul>
    </div><hr />
    <div className='docs pb-2'>
        <h2>Conclusion:</h2>  
        <p>This <em>Smart Home Automation System</em> enables users to control home appliances and lighting through a Wi-Fi-connected ESP32 and Sinric Pro platform. The system provides a user-friendly interface for controlling devices, making it ideal for smart home integration.</p>

    </div>
  </div>

  )
}

export default Gzxp24004