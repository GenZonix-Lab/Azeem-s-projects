#define motor1A  19
#define motor1B  21
#define motor2A  18
#define motor2B  5


void stop(){
  digitalWrite(motor1A,HIGH);
  digitalWrite(motor1B,HIGH);
  digitalWrite(motor2A,HIGH);
  digitalWrite(motor2B,HIGH);
}

void forward(){
  digitalWrite(motor1A,LOW);
  digitalWrite(motor1B,HIGH);
  digitalWrite(motor2A,LOW);
  digitalWrite(motor2B,HIGH);
}

void backward(){
  digitalWrite(motor1A,HIGH);
  digitalWrite(motor1B,LOW);
  digitalWrite(motor2A,HIGH);
  digitalWrite(motor2B,LOW);
}

void left(){
  digitalWrite(motor1A,HIGH);
  digitalWrite(motor1B,LOW);
  digitalWrite(motor2A,LOW);
  digitalWrite(motor2B,HIGH);
}

void right(){
  digitalWrite(motor1A,LOW);
  digitalWrite(motor1B,HIGH);
  digitalWrite(motor2A,HIGH);
  digitalWrite(motor2B,LOW);
}

void square(int fd,int ld){
  for(int i=0; i<4;i++){
     forward();
      delay(fd);
      left();
      delay(ld);
  }
  stop();
}

void circle(){
  for (int i = 0; i < 10; i++) {
    forward();
    delay(200);
    left();
    delay(50);
  }
  stop();
}

void infinite(){
  // Left circle
  for (int i = 0; i < 8; i++) {
    forward();
    delay(400);
    left();
    delay(800);
  }
  // Right circle
  for (int i = 0; i < 8; i++) {
    forward();
    delay(300);
    right();
    delay(500);
  }
  stop();
}