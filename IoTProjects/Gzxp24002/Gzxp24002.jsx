import React from 'react'
import ConnectDiagram from './assets/Connection_diagram.png'
import { StorageImage } from '@aws-amplify/ui-react-storage'

const Gzxp24002 = () => {
    const images =[
        `public/Projects/iot/gzxp24002/assets/Connection_diagram.webp`,
        `public/Projects/iot/gzxp24002/assets/1.webp`,
        `public/Projects/iot/gzxp24002/assets/2.webp`,
        `public/Projects/iot/gzxp24002/assets/3.webp`,
        `public/Projects/iot/gzxp24002/assets/4.webp`,
        `public/Projects/iot/gzxp24002/assets/5.webp`,
        `public/Projects/iot/gzxp24002/assets/6.webp`,
        `public/Projects/iot/gzxp24002/assets/7.webp`,
        `public/Projects/iot/gzxp24002/assets/8.webp`,
        `public/Projects/iot/gzxp24002/assets/9.webp`
    ]


  const codeString=`
        #include <WiFi.h>
        #include <ESP_Mail_Client.h>
        #include "credential.h"
        const int trigPin = 2;
        const int echoPin = 15 ;
        long duration;
        int distance;
        String data = "free";
        #define WiFi_SSID WiFi_Name     //replace your wifi name
        #define WiFi_pwd password    //replace your wifi password
        #define sender_mail sender_mail    //replace your email address
        #define sender_app_password "ekvm szfe ckfr lqew" //follow the Gmail_Auth_steps/refer our project1 document.
        #define receiver_mail receiver_mail    //replace the receiver mail address to get notification.
        
        
        SMTPSession smtp;
        
        
        void setup() {
            Serial.begin(115200);
            pinMode(trigPin, OUTPUT);
            pinMode(echoPin, INPUT);
            WiFi.begin(WiFi_SSID, WiFi_pwd);
            while (WiFi.status() != WL_CONNECTED) {
                delay(500);
                Serial.print(".");
            }
            Serial.println("\nConnected to WiFi!");
            Serial.println("IP Address: " + WiFi.localIP().toString());
        }
        
        
        void loop() {
            int sensor = value();
            if(sensor < 20 && data == "notfree"){
            int initial_val=0;
            while( initial_val < 60){
                sensor = value();
                delay(1000);
                initial_val++;
                Serial.print(initial_val);
                Serial.print(" : ");
                Serial.println(sensor);
                if(sensor >= 20){
                break;
                }
            }
            if(sensor < 20 && data == "notfree" ){
                sendMail("Parking Slot is occupied");
                delay(1000);
                data = "free";
                }
            }
            else if(sensor >= 20 && data == "free"){
                Serial.println("Parking Slot is free...");
                sendMail("Parking Slot is free...");
                data="notfree";
            }else{
            Serial.print("Distance : ");
            Serial.println(sensor);
            delay(1000);
            }
            Serial.flush();
        }
        
        
        void sendMail(String msg){
            Session_Config config;
            config.server.host_name = "smtp.gmail.com";
            config.server.port = 587;
            config.login.email = sender_mail;
            config.login.password = sender_app_password;
        
        
            SMTP_Message message;
            // Set the message content
            message.sender.name = "Parking Alert";
            message.sender.email = sender_mail;
            message.subject = "Parking Alert";
            message.addRecipient("Receiver", receiver_mail);
            message.text.content = msg;
        
        
        // Set SMTP server settings
            smtp.callback([](SMTP_Status status) {
            Serial.println(status.info());
            });
        
        
            if (!smtp.connect(&config))
            {
            MailClient.printf("Connection error, Status Code: %d, Error Code: %d, Reason: %s\n", smtp.statusCode(), smtp.errorCode(), smtp.errorReason().c_str());
            return;
            }
        
        
            if (!MailClient.sendMail(&smtp, &message)) {
            Serial.println("Error sending email, try again later.");
            } else {
            Serial.println("Email sent successfully!");
            }
        
        
        }
        
        
        int value() {
            digitalWrite(trigPin, LOW);
            delayMicroseconds(2);
            digitalWrite(trigPin, HIGH);
            delayMicroseconds(10);
            digitalWrite(trigPin, LOW);
        
        
            duration = pulseIn(echoPin, HIGH);
            distance = duration * 0.034 / 2;
            return distance;
        }`
  return (
    <>

<div className="container">
    <div className="docs text-center my-3 p-2"><h1>SMART PARKING EMAIL-NOTIFICATION SYSTEM</h1></div><hr />
    <div className="docs pb-2">
        <h2>Overview:</h2>
        <p>The SMART PARKING EMAIL-NOTIFICATION SYSTEM is a project designed to monitor parking spaces and notify users via email when a spot becomes available or is occupied. This system utilizes an ESP32 microcontroller, an ultrasonic sensor, and other components to detect vehicle presence and send real-time alerts to a designated email address.</p>
    </div>
    <hr />
    <div className="docs pb-2">
        <h2>Requirements:</h2>
            <ul>
                <li>ESP32 Microcontroller</li>
                <li>Ultrasonic Sensor</li>
                <li>Power Supply Board</li>
                <li>Jumper Wires</li>
                <li>Email Sender & Receiver Accounts</li>
            </ul>
    </div>
    <hr />
    <div className="docs pb-2">
        <h2>Hardware Setup:</h2>
        <h3>Connection procedure:</h3>
        <h4>ESP32 Pin Connections:</h4>
            <ul>
                <li>Pin 15 (GPIO 15): Connect to the Echo pin of the ultrasonic sensor.</li>
                <li>Pin 2 (GPIO 2): Connect to the Trigger pin of the ultrasonic sensor.</li>
            </ul>
        <h4>Power:</h4>
            <ul>
                <li>VCC: Connect the VCC pin of the ultrasonic sensor to a 5V power source.</li>
                <li>GND: Connect the GND pin of the ultrasonic sensor to the ground (GND) of the power supply</li>
            </ul>
        <h3>Connection setup:</h3>
            <StorageImage
                className="img-fluid " 
                alt="Connection_diagram"  
                title="Connection_diagram" 
                maxHeight={400}
                path={images[0]}
                fallbackSrc="/images/defaultImage.webp"
            />
    </div><hr />
    <div className="docs pb-2">
        <h2>Software Setup:</h2>
            <h3>Steps to Generate a Google App Password [sender gmail]:</h3>
                <div className="text-center text-lg-start">
                    <StorageImage
                        className="img-fluid rounded" 
                        alt="Go to secutity on google Account"  
                        title="Security" 
                        maxHeight={300}
                        path={images[1]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                </div>
            <h3>Access Google Account Settings:</h3>
                <p>Sign in to your Google account and navigate to the Security section.</p>
            <h3>Enable 2-Step Verification:</h3>
                <div className="text-center text-lg-start">
                    <StorageImage
                        className="img-fluid rounded" 
                        alt="2_step_verification"  
                        title="Security"
                        maxHeight={300}
                        path={images[2]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                </div>
                <p>Locate the 2-Step Verification option and click on it.</p>
                <div className="text-center text-lg-start">
                    <div className="d-md-flex justify-content-center justify-content-lg-start">
                    <StorageImage
                        className="img-fluid rounded mx-1 my-2" 
                        alt="Turn_ON"  
                        title="Security" 
                        maxHeight={300}
                        path={images[3]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                    <StorageImage
                        className="img-fluid rounded mx-1 my-2" 
                        alt="Turn_OFF"  
                        title="Security" 
                        maxHeight={300}
                        path={images[4]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                    </div>
                </div>  
                <p>Follow the on-screen instructions to turn on 2-Step Verification if it’s not already enabled.</p>          
                <div className="text-center text-lg-start">
                    <StorageImage
                        className="img-fluid" 
                        alt="Turn_ON_2_step_verification"  
                        title="Security"
                        maxHeight={300}
                        path={images[5]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                </div>
            <h3>Generate an App Password:</h3>
                <div className="text-center text-lg-start">
                    <StorageImage
                        className="img-fluid" 
                        alt="search_bar"  
                        title="Security"
                        maxHeight={400}
                        path={images[6]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                </div>
                <p>In the Security section, use the search bar at the top left corner and type "App Passwords".</p>
                <div className="text-center text-lg-start">
                    <StorageImage
                        className="img-fluid" 
                        alt="Search_app_password"  
                        title="Security"
                        maxHeight={300}
                        path={images[7]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                </div>
                <p>Select the App Passwords option from the search results.</p>
                <div className="text-center text-lg-start">
                    <StorageImage
                        className="img-fluid" 
                        alt="app_password"  
                        title="Security"
                        maxHeight={300}
                        path={images[8]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                </div>
                <p>Create a custom app name (e.g., ESP_mail) and click Create.</p>
                <div className="text-center text-lg-start">
                    <StorageImage
                        className="img-fluid" 
                        alt="Generate_app_password"  
                        title="Security"
                        maxHeight={300}
                        path={images[9]}
                        fallbackSrc="/images/defaultImage.webp"
                    />
                </div>
            <h3>Receive Your App Password:</h3>
                <p>A 16-character app password will be generated. Copy this password for use in your project.</p>
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
            <h3>Code Implementation:</h3>
            <pre className='pe-3'><code>{codeString}</code></pre>
    </div>
    <hr />
    <div className="docs pb-2">
        <h2>Testing and operation:</h2>
            <h3>Connect to Wi-Fi:</h3>
                <ul>
                    <li>Once the ESP32 is powered, it will automatically connect to the specified Wi-Fi network.</li>
                </ul>
            <h3>Parking Space Detection:</h3>
                <ul>
                    <li>The ultrasonic sensor is mounted at a parking space and connected to the ESP32.</li>
                    <li>When the sensor detects that a vehicle is present (based on a pre-set distance threshold), it sends a signal to the ESP32, which then triggers an email notification to inform the receiver that the parking spot is occupied.</li>
                    <li>Similarly, when the sensor no longer detects a vehicle, the ESP32 sends another notification to inform the receiver that the parking spot is now available.</li>
                </ul>
            <h3>Monitoring Notifications:</h3>
                <ul>
                    <li>Check the designated receiver email for notifications indicating motion detection and its cessation.</li>
                </ul>
    </div>
    <hr />
    <div className="docs">
        <h2>Conclusion:</h2>    
            <p>The <em>SMART PARKING EMAIL-NOTIFICATION SYSTEM</em> offers a simple, cost-effective way to monitor parking spaces in real-time. By using an ESP32 and ultrasonic sensor, it detects vehicle presence and sends email alerts for availability or occupancy. This system improves parking efficiency, reduces search time, and is easy to implement, making it a practical solution for various parking environments.</p>    
    </div>
    </div>
    </>
  )
}

export default Gzxp24002




