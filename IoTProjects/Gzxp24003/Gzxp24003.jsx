import { StorageImage } from '@aws-amplify/ui-react-storage';


const Gzxp24003 = () => {
  const images =[
    `public/Projects/iot/gzxp24003/assets/Connection_diagram.webp`,
    `public/Projects/iot/gzxp24003/assets/1.webp`,
    `public/Projects/iot/gzxp24003/assets/2.webp`,
    `public/Projects/iot/gzxp24003/assets/3.webp`,
    `public/Projects/iot/gzxp24003/assets/4.webp`,
    `public/Projects/iot/gzxp24003/assets/5.webp`,
    `public/Projects/iot/gzxp24003/assets/6.webp`,
    `public/Projects/iot/gzxp24003/assets/7.webp`,
    `public/Projects/iot/gzxp24003/assets/8.webp`,
    `public/Projects/iot/gzxp24003/assets/9.webp`
  ]
  const codeString = `
   #include <WiFi.h>
    #include <ESP_Mail_Client.h>
    //Ir_sensor_pin
    const int Ir_pin = 15;    //define the IR_sensor Pin connect to the D5 pin
    String data = "close";
    #define WiFi_SSID WiFi_Name     //replace your wifi name
    #define WiFi_pwd password    //replace your wifi password
    #define sender_mail sender_mail    //replace your email address
    #define sender_app_password "ekvm szfe ckfr lqew" //follow the Gmail_Auth_steps/paste the 16 digit code.
    #define receiver_mail receiver_mail    //replace the receiver mail address to get notification.
    SMTPSession smtp;
    void setup() {
        Serial.begin(115200);
        pinMode(Ir_pin, INPUT);
        WiFi.begin(WiFi_SSID, WiFi_pwd);
        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
        }
        Serial.println("\nConnected to WiFi!");
        Serial.println("IP Address: " + WiFi.localIP().toString());
    }
    void loop() {
        int sensor = digitalRead(Ir_pin);
        if(sensor && data == "open"){
        sendMail("⚠️Door is opened... \n⚠️Mysterious Activity placed here...");
        Serial.println("⚠️Door is opened... \n⚠️Mysterious Activity placed here...");
        delay(1000);
        data = "close";
        }
        else if(!sensor && data == "close"){
        sendMail("Door is closed");
        Serial.println("Door is closed");
        data="open";
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
        message.sender.name = "Email Smart Door Alert System";
        message.sender.email = sender_mail;
        message.subject = "Open Door Alert";
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
    }`

  return (
    <>
    <div className="container">
    <div className="docs text-center my-3 p-2"><h1>SMART SECURITY INDICATION AND EMAIL NOTIFICATION SYSTEM</h1></div><hr />
    <div className="docs pb-2">
        <h2>Objective:</h2>
        <p>The Smart Security Indication and Email Notification System is designed to enhance security by detecting motion and sending real-time email alerts when unauthorized activity is detected. This project uses an ESP32 microcontroller, an IR sensor, and basic components to create a simple yet effective security system that monitors an area for movement. When the IR sensor detects motion, the ESP32 triggers an email alert to notify a designated receiver of the potential security breach.</p>
    </div><hr />
    <div className="docs pb-2">
        <h2>Requirements:</h2>
        <ul>
            <li>ESP32 Microcontroller</li>
            <li>IR Sensor</li>
            <li>Power Supply Board</li>
            <li>Jumper Wires</li>
            <li>Email Sender & Receiver Accounts</li>
        </ul>
    </div><hr />
    <div className="docs pb-2">
        <h2>Hardware Setup:</h2>
        <h3>Connection procedure:</h3>
        <h4>ESP32 Pin Connections:</h4>
            <ul>
                <li>GPIO 15: Connect to the OUT pin of the IR sensor.</li>
                <li>VCC: Connect to a 5V power source.</li>
                <li>GND: Connect to the ground (GND) of the power supply.</li>
            </ul>
        <h4>Power:</h4>
            <ul>
                <li>The ESP32 and IR sensor should both be connected to a stable 5V power source using a power supply board.</li>
            </ul>
        <h3>Connection setup:</h3>
            <StorageImage
                className="img-fluid" 
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
                        path={images[1]} 
                        className="img-fluid rounded" 
                        alt="Go to secutity on google Account"  
                        title="Security"
                        maxWidth={300}
                        fallbackSrc="/images/defaultImage.webp"/>
                    </div>
                <h3>Access Google Account Settings:</h3>
                    <p>Sign in to your Google account and navigate to the Security section.</p>
                <h3>Enable 2-Step Verification:</h3>
                    <div className="text-center text-lg-start">
                        <StorageImage 
                        path={images[2]} 
                        className="img-fluid rounded" 
                        alt="2_step_verification"  
                        title="Security"
                        maxHeight={300}
                        fallbackSrc="/images/defaultImage.webp"/>
                    </div>
                    <p>Locate the 2-Step Verification option and click on it.</p>
                    <div className="text-center text-lg-start">
                    <div className="d-md-flex justify-content-center justify-content-lg-start">
                        <StorageImage 
                            path={images[3]} 
                            className="img-fluid rounded mx-1 my-2" 
                            alt="Turn_ON"  
                            title="Security" 
                            maxWidth={300}
                            fallbackSrc="/images/defaultImage.webp"
                            />
                        <StorageImage 
                            path={images[4]} 
                            className="img-fluid rounded mx-1 my-2" 
                            alt="Turn_OFF"  
                            title="Security" 
                            maxWidth={300}
                            fallbackSrc="/images/defaultImage.webp"
                            />
                    </div>    
                    </div>  
                    <p>Follow the on-screen instructions to turn on 2-Step Verification if it’s not already enabled.</p>          
                    <div className="text-center text-lg-start">
                        <StorageImage 
                        path={images[5]} 
                        className="img-fluid" 
                        alt="Turn_ON_2_step_verification"  
                        title="Security"
                        maxHeight={300}
                        fallbackSrc="/images/defaultImage.webp" />
                    </div>
                <h3>Generate an App Password:</h3>
                    <div className="text-center text-lg-start">
                        <StorageImage 
                        path={images[6]}
                        className="img-fluid" 
                        alt="search_bar"  
                        title="Security"
                        maxHeight={300}
                        fallbackSrc="/images/defaultImage.webp"/>
                    </div>
                    <p>In the Security section, use the search bar at the top left corner and type "App Passwords".</p>
                    <div className="text-center text-lg-start">
                        <StorageImage 
                        path={images[7]} 
                        className="img-fluid" 
                        alt="Search_app_password"  
                        title="Security" 
                        maxHeight={300}
                        fallbackSrc="/images/defaultImage.webp"/>
                    </div>
                    <p>Select the App Passwords option from the search results.</p>
                    <div className="text-center text-lg-start">
                        <StorageImage 
                        path={images[8]} 
                        className="img-fluid" 
                        alt="app_password"  
                        title="Security" 
                        maxHeight={300}
                        fallbackSrc="/images/defaultImage.webp"/>
                    </div>
                    <p>Create a custom app name (e.g., ESP_mail) and click Create.</p>
                    <div className="text-center text-lg-start">
                        <StorageImage 
                        path={images[9]} 
                        className="img-fluid" 
                        alt="Generate_app_password"  
                        title="Security" 
                        maxHeight={300}
                        fallbackSrc="/images/defaultImage.webp"/>
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
                <h3>Uploading the Code:</h3>
                    <p>Connect your ESP32 to the computer via USB and upload the code to the board.</p>
    </div><hr />
    <div className="docs pb-2">
    <h2>Testing and operation:</h2>
            <h3>Connect to Wi-Fi:</h3>
                <ul>
                    <li>Once the ESP32 is powered, it will automatically connect to the specified Wi-Fi network.</li>
                </ul>
            <h3>Detecting Motion:</h3>
                <ul>
                    <li>Place the IR sensor in the desired location to monitor for movement. When motion is detected, the ESP32 will trigger an email alert to the receiver email address.</li>
                </ul>
            <h3>Monitoring Notifications:</h3>
                <ul>
                    <li>Check the designated receiver email for notifications indicating motion detection and its cessation.</li>
                </ul>
    </div><hr />
    <div className="docs pb-2">
        <h2>Conclusion:</h2>  
        <p>The <em>Smart Security Indication and Email Notification System</em> is a simple, low-cost, and effective solution for monitoring security in homes, offices, and restricted areas. By using an IR sensor to detect motion and the ESP32 to send real-time email notifications, the system provides a practical and automated way to stay informed of any unauthorized movements. It's easy-to-implement design, combined with customizable email alerts, makes it a versatile choice for enhancing security in various environments.</p>  
    </div>
    </div>
    </>
  )
}

export default Gzxp24003