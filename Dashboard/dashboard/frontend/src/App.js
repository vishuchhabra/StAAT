import React, { Component } from 'react';
import { HashRouter, Route, Switch ,BrowserRouter} from 'react-router-dom';
import Login from './views/pages/login/Login';
import Register from './views/pages/register/Register';
import Page404 from './views/pages/page404/Page404'
import dashboard from './views/pages/Dashboard';

// Importing Style 
import './scss/style.scss';
import AddStudent from './views/pages/AddStudent';
import AdminRoute from './views/pages/AdminRoute'
import TeacherRoute from './views/pages/TeacherRoute'
import  PrivateRoute from './views/pages/PrivateRoute'
import Pdashboard from './views/pages/Pdashboard';
import Attendence from './views/pages/Attendence';
import Activity from './views/pages/Activity';

export default function App() {
  return (
    <BrowserRouter>
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path='/grant' exact component={Pdashboard}/>
        <TeacherRoute path='/dashboard' exact component={dashboard}/>
        <AdminRoute path='/addstudent'exact component={AddStudent}/>
        <TeacherRoute path='/dashboard/activity/:name' exact component={Activity}/>
        <TeacherRoute path='/dashboard/attend/:name' exact component={Attendence}/>   
        <Route component={Page404}/>
      </Switch> 
      </HashRouter>
    </BrowserRouter>
  )
}



