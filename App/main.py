#!/usr/bin/env python3
import os
import sys
import numpy as np
import cv2
import platform
import requests
from PySide2 import QtCore, QtGui, QtWidgets
from PySide2.QtCore import *
from PySide2.QtGui import *
from PySide2.QtWidgets import *
#temp_img = None
#import Attendance
## ==> SPLASH SCREEN
from ui_splash_screen import Ui_SplashScreen
## ==> LOGIN
from ui_login import Ui_Login
## ==> Menu
from ui_menu import Ui_menu
## ==> ADD
from ui_add import Ui_add
## ==>UPDATE
from ui_update import Ui_update
## ==>DELETE
from ui_delete import Ui_DELETE_2
## ==> GLOBALS
counter = 0




class add(QMainWindow):

    def __init__(self):
        QMainWindow.__init__(self)
        self.ui = Ui_add()
        self.ui.setupUi(self)
        self.timer = QtCore.QTimer()
        # set timer timeout callback function
        if not self.timer.isActive():
            # create video capture
            self.cap = cv2.VideoCapture(0)
            # start timer
            self.timer.start(20)
        self.ui.SUBMIT.setEnabled(False)
        self.timer.timeout.connect(self.viewCam)
        self.ui.BACK.clicked.connect(self.back2menu)
        self.ui.CAPTURE.clicked.connect(self.capture)
        self.ui.SHOW.clicked.connect(self.controlTimer)
        self.ui.SUBMIT.clicked.connect(self.submit)
        self.ui.inp_batend.textChanged.connect(self.on_text_changed)
        self.ui.inp_batstart.textChanged.connect(self.on_text_changed)
        self.ui.inp_class.textChanged.connect(self.on_text_changed)
        self.ui.inp_name.textChanged.connect(self.on_text_changed)
        self.ui.inp_rollno.textChanged.connect(self.on_text_changed)
        # self.ui.SHOW.clicked.connect(self.viewCam)
    def on_text_changed(self):
        self.ui.SUBMIT.setEnabled(bool(self.ui.inp_batend.text()) and bool(self.ui.inp_batstart.text()) and bool(self.ui.inp_class.text()) and bool(self.ui.inp_name.text()) and bool(self.ui.inp_rollno.text()) and bool(cv2.imread("temporaryimage.jpeg") is not None))
    def submit(self):

        msg = QMessageBox()
        name = self.ui.inp_name.text()
        class_name = self.ui.inp_class.text()
        bat_end = self.ui.inp_batend.text()
        bat_start = self.ui.inp_batstart.text()
        roll_no = self.ui.inp_rollno.text()
        batch = bat_start +"-"+bat_end[2:]
        password = "1016594680"
        url = "https://staatapp.herokuapp.com/api/student/custom"
        output  = requests.post(url, json={"name":name,"roll_no":roll_no,"batch":batch,"class_name":class_name,"password":password})
        print(output.text)
        img = cv2.imread("temporaryimage.jpeg")
        os.remove("temporaryimage.jpeg")
        os.chdir("Images")
        if not os.path.exists(class_name + "_" + roll_no + ".jpeg"):
            cv2.imwrite(class_name + "_" + roll_no + ".jpeg",img)
            msg.setText("submitted Thankyou")
        else:
            msg.setText("Already student exists cannot add")
        os.chdir("..")
        # stop timer
        self.timer.stop()
        # release video capture
        self.cap.release()
        self.ui.imgLabel.setText("PRESS SHOW TO START VIDEO")
        self.ui.inp_batend.clear()
        self.ui.inp_batstart.clear()
        self.ui.inp_name.clear()
        self.ui.inp_rollno.clear()
        self.ui.inp_class.clear()
        msg.exec_()


    def capture(self):
        msg = QMessageBox()
        msg.setText("Your Image Has Been Captured")
        # read image in BGR format
        ret, image = self.cap.read()
        cv2.imwrite("temporaryimage.jpeg",image)
        self.on_text_changed()
        msg.exec_()
    def back2menu(self):
        #delete temporaryimage if there
        if os.path.exists("temporaryimage.jpeg"):
            os.remove("temporaryimage.jpeg")
        # stop timer
        self.timer.stop()
        # release video capture
        self.cap.release()
        self.main = menu()
        self.main.show()
        # CLOSE add
        self.close()
    # view camera
    def viewCam(self):
        #self.cap = cv2.VideoCapture(0)
        # read image in BGR format
        ret, image = self.cap.read()
        # convert image to RGB format
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        # get image infos
        height, width, channel = image.shape
        step = channel * width
        # create QImage from image
        qImg = QImage(image.data, width, height, step, QImage.Format_RGB888)
        # show image in img_label
        self.ui.imgLabel.setPixmap(QPixmap.fromImage(qImg))
            # setPixmap(QPixmap.fromImage(qImg))
    # start/stop timer
    def controlTimer(self):
        # if timer is stopped
        if not self.timer.isActive():
            # create video capture
            self.cap = cv2.VideoCapture(0)
            # start timer
            self.timer.start(20)
        # if timer is started
        else:
            # stop timer
            self.timer.stop()
            # release video capture
            self.cap.release()
            image = cv2.imread("temporaryimage.jpeg")
            if image is None:
                msg = QMessageBox()
                msg.setText("First capture a image")
                msg.exec_()
                self.ui.imgLabel.setText("PRESS SHOW TO START VIDEO")
            else:
                # convert image to RGB format
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                # get image infos
                height, width, channel = image.shape
                step = channel * width
                # create QImage from image
                qImg = QImage(image.data, width, height, step, QImage.Format_RGB888)
                # show image in img_label
                self.ui.imgLabel.setPixmap(QPixmap.fromImage(qImg))

class update(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.ui = Ui_update()
        self.ui.setupUi(self)
        self.timer = QtCore.QTimer()
        # set timer timeout callback function
        if not self.timer.isActive():
            # create video capture
            self.cap = cv2.VideoCapture(0)
            # start timer
            self.timer.start(20)
        self.ui.UPDATE_IT.setEnabled(False)
        self.timer.timeout.connect(self.viewCam)
        self.ui.BACK.clicked.connect(self.back2menu)
        self.ui.CAPTURE.clicked.connect(self.capture)
        self.ui.SHOW.clicked.connect(self.controlTimer)
        self.ui.UPDATE_IT.clicked.connect(self.updateit)
        self.ui.inp_batend.textChanged.connect(self.on_text_changed)
        self.ui.inp_batstart.textChanged.connect(self.on_text_changed)
        self.ui.inp_class.textChanged.connect(self.on_text_changed)
        self.ui.inp_name.textChanged.connect(self.on_text_changed)
        self.ui.inp_rollno.textChanged.connect(self.on_text_changed)
        # self.ui.SHOW.clicked.connect(self.viewCam)
    def on_text_changed(self):
        self.ui.SUBMIT.setEnabled(bool(self.ui.inp_batend.text()) and bool(self.ui.inp_batstart.text()) and bool(self.ui.inp_class.text()) and bool(self.ui.inp_name.text()) and bool(self.ui.inp_rollno.text()) and bool(cv2.imread("temporaryimage.jpeg") is not None))
    def updateit(self):

        msg = QMessageBox()
        name = self.ui.inp_name.text()
        class_name = self.ui.inp_class.text()
        bat_end = self.ui.inp_batend.text()
        bat_start = self.ui.inp_batstart.text()
        roll_no = self.ui.inp_rollno.text()
        img = cv2.imread("temporaryimage.jpeg")
        os.remove("temporaryimage.jpeg")
        os.chdir("Images")
        if os.path.exists(class_name + "_" + roll_no + ".jpeg"):
            cv2.imwrite(class_name + "_" + roll_no + ".jpeg",img)
            msg.setText("UPDATED SUCCESSFULLY")
        else:
            msg.setText("there is no student with this name")
        os.chdir("..")
        # stop timer
        self.timer.stop()
        # release video capture
        self.cap.release()
        self.ui.imgLabel.setText("PRESS SHOW TO START VIDEO")
        self.ui.inp_batend.clear()
        self.ui.inp_batstart.clear()
        self.ui.inp_name.clear()
        self.ui.inp_rollno.clear()
        self.ui.inp_class.clear()
        msg.exec_()


    def capture(self):
        msg = QMessageBox()
        msg.setText("Your Image Has Been Captured")
        # read image in BGR format
        ret, image = self.cap.read()
        cv2.imwrite("temporaryimage.jpeg",image)
        self.on_text_changed()
        msg.exec_()
    def back2menu(self):
        #delete temporaryimage if there
        if os.path.exists("temporaryimage.jpeg"):
            os.remove("temporaryimage.jpeg")
        # stop timer
        self.timer.stop()
        # release video capture
        self.cap.release()
        self.main = menu()
        self.main.show()
        # CLOSE add
        self.close()
    # view camera
    def viewCam(self):
        #self.cap = cv2.VideoCapture(0)
        # read image in BGR format
        ret, image = self.cap.read()
        # convert image to RGB format
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        # get image infos
        height, width, channel = image.shape
        step = channel * width
        # create QImage from image
        qImg = QImage(image.data, width, height, step, QImage.Format_RGB888)
        # show image in img_label
        self.ui.imgLabel.setPixmap(QPixmap.fromImage(qImg))
            # setPixmap(QPixmap.fromImage(qImg))
    # start/stop timer
    def controlTimer(self):
        # if timer is stopped
        if not self.timer.isActive():
            # create video capture
            self.cap = cv2.VideoCapture(0)
            # start timer
            self.timer.start(20)
        # if timer is started
        else:
            # stop timer
            self.timer.stop()
            # release video capture
            self.cap.release()
            image = cv2.imread("temporaryimage.jpeg")
            if image is None:
                msg = QMessageBox()
                msg.setText("First capture a image")
                msg.exec_()
                self.ui.imgLabel.setText("PRESS SHOW TO START VIDEO")
            else:
                # convert image to RGB format
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                # get image infos
                height, width, channel = image.shape
                step = channel * width
                # create QImage from image
                qImg = QImage(image.data, width, height, step, QImage.Format_RGB888)
                # show image in img_label
                self.ui.imgLabel.setPixmap(QPixmap.fromImage(qImg))

class DELETE_2(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.ui = Ui_DELETE_2()
        self.ui.setupUi(self)
        self.ui.BACK.clicked.connect(self.menu)
        self.ui.DELETE.clicked.connect(self.delete)
        self.ui.inp_class.textChanged.connect(self.on_text_changed)
        self.ui.inp_name.textChanged.connect(self.on_text_changed)
        self.ui.inp_rollno.textChanged.connect(self.on_text_changed)
    def on_text_changed(self):
        self.ui.DELETE.setEnabled(bool(self.ui.inp_name.text()) and bool(self.ui.inp_class.text()) and bool(self.ui.inp_rollno.text()))
    def menu(self):
         #connect menu window
        self.main = menu()
        self.main.show()
        # CLOSE delete
        self.close()
    def delete(self):
        msg = QMessageBox()
        name = self.ui.inp_name.text()
        classs = self.ui.inp_class.text()
        roll_no = self.ui.inp_rollno.text()
        os.chdir("Images")
        url = "https://staatapp.herokuapp.com/api/student/delete"
        output  = requests.put(url, json={"roll_no":roll_no , "password":"1016594680"})
        print(output.text)
        if os.path.exists(classs + "_" + roll_no + ".jpeg"):
            self.ui.inp_name.clear()
            self.ui.inp_rollno.clear()
            self.ui.inp_class.clear()
            msg.setText("Deleted Successfully")
            os.remove(classs + "_" + roll_no + ".jpeg")
            os.chdir("..")
        else:
            msg.setText("There is no student with these credential please Recheck")
        msg.exec_()


class menu(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.ui = Ui_menu()
        self.ui.setupUi(self)
        self.ui.FACE.clicked.connect(self.facerecog)
        self.ui.ADD.clicked.connect(self.add)
        self.ui.UPDATE.clicked.connect(self.update)
        self.ui.DELETE.clicked.connect(self.delete)

    def add(self):
        #connect add window
        self.main = add()
        self.main.show()
        # CLOSE menu
        self.close()
    def update(self):
        msg = QMessageBox()
        msg.setText("INSTRUCTION: PRESS 'Q' to close the camera")
        msg.exec_()
        os.system("python objectDetection.py ")
        #connect update window
        #self.main = update()
        #self.main.show()
        # CLOSE menu
        #self.close()
    def facerecog(self):
        msg = QMessageBox()
        msg.setText("INSTRUCTION: PRESS 'Q' to close the camera")
        msg.exec_()
        os.system("python Attendance.py ")

        #connect attendance.py     #
    def delete(self):
        #connect delete
        self.main = DELETE_2()
        self.main.show()
        # CLOSE menu
        self.close()


# YOUR APPLICATION
class Login(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.ui = Ui_Login()
        self.ui.setupUi(self)
        self.ui.lineEdit_2.setEchoMode(QtWidgets.QLineEdit.Password)
        self.ui.pushButton.clicked.connect(self.on_click)


    def on_click(self):
        msg = QMessageBox()
        username = self.ui.lineEdit.text()
        password = self.ui.lineEdit_2.text()
        if username == "admin" and password == "admin":
            # SHOW MAIN WINDOW
            msg.setText("Success")
            msg.exec_()
            self.main = menu()
            self.main.show()

            # CLOSE Login
            self.close()
        else:
            msg.setText("Incorrect Password")
            msg.exec_()

# SPLASH SCREEN
class SplashScreen(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.ui = Ui_SplashScreen()
        self.ui.setupUi(self)

        ## UI ==> INTERFACE CODES
        ########################################################################

        ## REMOVE TITLE BAR
        self.setWindowFlag(QtCore.Qt.FramelessWindowHint)
        self.setAttribute(QtCore.Qt.WA_TranslucentBackground)


        ## DROP SHADOW EFFECT
        self.shadow = QGraphicsDropShadowEffect(self)
        self.shadow.setBlurRadius(20)
        self.shadow.setXOffset(0)
        self.shadow.setYOffset(0)
        self.shadow.setColor(QColor(0, 0, 0, 60))
        self.ui.dropShadowFrame.setGraphicsEffect(self.shadow)

        ## QTIMER ==> START
        self.timer = QtCore.QTimer()
        self.timer.timeout.connect(self.progress)
        # TIMER IN MILLISECONDS
        self.timer.start(35)

        # CHANGE DESCRIPTION

        # Initial Text

        # Change Texts
        QtCore.QTimer.singleShot(1500, lambda: self.ui.label_description.setText("<strong>LOADING</strong> DATABASE"))
        QtCore.QTimer.singleShot(3000, lambda: self.ui.label_description.setText("<strong>LOADING</strong> USER INTERFACE"))


        ## SHOW ==> MAIN WINDOW
        ########################################################################
        self.show()
        ## ==> END ##

    ## ==> APP FUNCTIONS
    ########################################################################
    def progress(self):

        global counter

        # SET VALUE TO PROGRESS BAR
        self.ui.progressBar.setValue(counter)

        # CLOSE SPLASH SCREE AND OPEN APP
        if counter > 100:
            # STOP TIMER
            self.timer.stop()

            # SHOW MAIN WINDOW
            self.main = Login()
            self.main.show()

            # CLOSE SPLASH SCREEN
            self.close()

        # INCREASE COUNTER
        counter += 1




if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = SplashScreen()
    sys.exit(app.exec_())
