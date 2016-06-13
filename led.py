import RPi.GPIO as GPIO
from pubnub import Pubnub
import time


LIGHT = 21

def setup():
    GPIO.setmode (GPIO.BCM)
    GPIO.setup(LIGHT,GPIO.OUT)
    GPIO.cleanup()
    GPIO.setmode (GPIO.BCM)
    GPIO.setup(LIGHT,GPIO.OUT)

def callback(m, channel):
    print(m['mess'])
    if m['led']==1:
        for i in range(6):
             GPIO.output(LIGHT,True)
             time.sleep(0.5)
             GPIO.output(LIGHT,False)
             time.sleep(0.5)
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
