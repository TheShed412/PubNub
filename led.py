import RPi.GPIO as GPIO
from pubnub import Pubnub
import time


LIGHT = 21
LED = [17, 18, 27, 22, 23, 24, 25, 4]

def setup():
    GPIO.cleanup()
    GPIO.setmode (GPIO.BCM)
    GPIO.setup(LIGHT,GPIO.OUT)
    for i in LED:
        GPIO.setup(i, GPIO.OUT)

def callback(m, channel):
    print(m)
    # if m['led']==1:
    #     for i in range(6):
    #          GPIO.output(LIGHT,True)
    #          time.sleep(0.5)
    #          GPIO.output(LIGHT,False)
    #          time.sleep(0.5)
    if m['state']==1:
        GPIO.output(LED[m['led']], True)
    else:
        GPIO.output(LED[m['led']], False)

def error(m):
    GPIO.cleanup()
    print(m)

def disconnect(m):
    GPIO.cleanup()
    print(m)

if __name__ == '__main__':
    setup()
    try:
        pubnub = Pubnub(publish_key='pub-c-3ef60582-c7a1-498f-8aed-5a34d2265af5', subscribe_key='sub-c-73e6721a-304c-11e6-8bc8-0619f8945a4f')
        pubnub.subscribe(channels='disco', callback= callback, error= error, disconnect=disconnect)
    except KeyboardInterrupt:
        GPIO.cleanup()
