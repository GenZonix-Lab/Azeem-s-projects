#define light1 5
#define light2 18

void setup() {
  // put your setup code here, to run once:
  pinMode(light1,OUTPUT);
  pinMode(light2,OUTPUT);
  digitalWrite(light1,HIGH);
  digitalWrite(light2,HIGH);
  Serial.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){
    String command = Serial.readString();
    command.toLowerCase();
    command.trim();
    if(command == "r1on"){
      digitalWrite(light1,LOW);
    } else if(command == "r2on"){
      digitalWrite(light2,LOW);
    } else if(command == "r1off"){
      digitalWrite(light1,HIGH);
    } else if(command == "r2off"){
      digitalWrite(light2,HIGH);
    } else if(command == "on"){
      digitalWrite(light1,LOW);
      digitalWrite(light2,LOW);
    } else if(command == "off"){
      digitalWrite(light1,HIGH);
      digitalWrite(light2,HIGH);
    }
  }
}
