import React,{useState} from 'react'
import {Route ,Redirect, Link} from "react-router-dom"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import { authenticate } from './login/authenticate';
import { signout} from './logout';
import { API } from './Backend';

toast.configure() 



const Pdashboard = () => {

  // making the state for login credentials
  const [email,setEmail] =useState("")
  const [password,setPassword] = useState("")

  // API for login
  const Login = user => {
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  const [didRedirect, setDidRedirect] = useState(false)
  const [role_no ,setRole_no]  = useState(-1)
  // Redirect Function
  const performRedirect = () => {
 
    if (didRedirect) {

      if(role_no===2){
         return <Redirect to="/addstudent" />
      }

      if(role_no===1){
        return <Redirect to="/dashboard" />        
      }
      if(role_no===0){
        return <Redirect to="/grant" />        
      }
    }
  };
  // Submit the API
  const onSubmit = event => {
    event.preventDefault();
    Login( {email, password} )
      .then(data => {
          setEmail("");
          setPassword("");
          if(data.error){
            toast("Invalid Credentials")
          }
          else{
            console.log("Registered SuccessFully");
            toast("Login Successfully, redirecting....");
            authenticate(data);
            setDidRedirect(true)
            setRole_no(data.user.role)
          }
      })
      .catch(err=>{
        setEmail("");
        setPassword("")
        console.log("Registration Error") 
        toast("Server Error")
      })
  };

  // returning part
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>User Dashboard</h1>
                    <p className="text-muted">Wait for Admin grant</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                      </CInputGroupPrepend>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <Link to="/">
                        <CButton onClick={
                          signout
                        }
                       color="danger" className="px-4">Logout</CButton>
                       </Link>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Hi There!</h2>
                    <p className="text-justify">Thanks for registering. We have received your application. Depending upon your indentity verification, you will soon get access.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer  />
      {performRedirect()}
    </div>
  )
}

export default Pdashboard
