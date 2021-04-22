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
import { authenticate } from './authenticate';
import { API } from '../Backend';
toast.configure() 



const Login = () => {

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
                    <h1>Login</h1>
                    <p className="text-muted">Sign in to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" name="username" value={email} onChange={e=>(setEmail(e.target.value))}  />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" name="password" autoComplete="current-password" value={password} onChange={e=>(setPassword(e.target.value))} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={onSubmit} color="success" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0">Forgot password?</CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p className="text-justify">If you are not a registered user, please register yourself and wait for admin grant</p>
                    <Link to="/register">
                      <CButton  color="danger" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
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

export default Login
