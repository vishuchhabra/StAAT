#!/usr/bin/env python3
import cv2
import numpy as np
import face_recognition
import os
import requests
from datetime import datetime
import keyboard

names_st = []
path = 'Images'
images = []

lissst = os.listdir(path)


print(lissst)

for cl in lissst:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    names_st.append(os.path.splitext(cl)[0])
print(names_st)

def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

def markAttendance(name):
    x=name.split("_")
    roll_no = x[1]
    class_name = x[0]
    password = "1016594680"
    url = "https://staatapp.herokuapp.com/api/update/student/attend"
    record = requests.put(url, json ={'class_name':class_name, 'roll_no':roll_no, 'password':password })
    print(record.text)



knownencode = findEncodings(images)
print('encoding done')

cap = cv2.VideoCapture(0)

while True:
    success, img = cap.read()
    #img = captureScreen()
    imgS = cv2.resize(img,(0,0),None,0.25,0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS,facesCurFrame)

    for encodeFace,faceLoc in zip(encodesCurFrame,facesCurFrame):
        match = face_recognition.compare_faces(knownencode,encodeFace)
        distfaces = face_recognition.face_distance(knownencode,encodeFace)
    #print(distfaces)

        try:
            matchIndex = np.argmin(distfaces)
            if match[matchIndex]:
                name = names_st[matchIndex]
                print(name)
                y1,x2,y2,x1 = faceLoc
                y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
                cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
                cv2.rectangle(img,(x1,y2-35),(x2,y2),(255,0,0),cv2.FILLED)
                cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(0,0,0),2)
                print(name)
                markAttendance(name)
        except:
            cv2.imshow('Webcam',img)
            cv2.waitKey(30)
            if keyboard.is_pressed('q'):
                exit()
        else:
            cv2.imshow('Webcam',img)
            cv2.waitKey(30)
            if keyboard.is_pressed('q'):
                exit()
