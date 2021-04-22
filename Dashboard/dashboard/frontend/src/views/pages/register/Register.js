import React,{useState} from 'react'
import {Link , Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { API } from '../Backend';
toast.configure() 



// Hitting the API
const Register = () => {
  // API for Registering
  const signup = user => {
    return fetch(`${API}/signup`, {
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


  //Define  the states for classes 
  const [first,setFirst] = useState(true);
  const [second,setSecond] = useState(true);
  const [third,setThird ]= useState(true);
  const [fourth ,setFourth]= useState(true);
  const [fifth,setFifth ]= useState(true);
  const [sixth ,setSixth]= useState(true);
  const [seventh , setSeventh]= useState(true);
  const [eighth ,setEighth ]= useState(true);
  const [ninth ,setNinth]= useState(true);
  const [tenth, setTenth] = useState(true);


  // adding values to register

  const [values, setValues] = useState({
    name: "",
    email:"",
    password: "",
    confirmPassword:"",
    classes:[],
    error:false,
    success:false
  })
  const {name, email, password, classes,error, success,confirmPassword  } =  values 

  
  // login Button
  const [login , setLogin] = useState(false)

  // Submit the API
  const onSubmit = event => {
    event.preventDefault();
    if (confirmPassword !== password){
      setValues({...values,name:"",email:"",classes:"",password:"",confirmPassword:"",classes:[]})
      setFirst(true); setSecond(true);setThird(true); setFourth(true); setFifth(true); setSixth(true); setSeventh(true); setEighth(true); 
      setNinth(true); setTenth(true);
      return  toast("Password and Confirm Password Should Match")
    }
    signup( {name, email, password,classes} )
      .then(data => {
          setValues({...values,name:"",email:"",classes:"",password:"",confirmPassword:"",classes:[]})
          setFirst(true); setSecond(true);setThird(true); setFourth(true); setFifth(true); setSixth(true); setSeventh(true); setEighth(true); 
          setNinth(true); setTenth(true);
          if(data.error){
            console.log("Registration  Error")
            toast("Provide Unique Email and Strong Password")
          }
          else{
            console.log("Registered SuccessFully")
            toast("Registered SuccessFully, Please wait.....")
            setLogin(true)
          }
      })
      .catch(err=>{
        setValues({...values,name:"",email:"",classes:"",password:"",confirmPassword:"",classes:[]})
        setFirst(true); setSecond(true);setThird(true); setFourth(true); setFifth(true); setSixth(true); setSeventh(true); setEighth(true); 
        setNinth(true); setTenth(true);  
        console.log("Registration Error") 
        toast("Server Error")
      })
  };


  // Adding or removing the clasess
  const Adding_Classes = (className,val)=> {
      //Checking condition
      if(val==false){
          const result = classes.filter((val) => (val!=className));
          setValues({...values,result});
      }
      else{
          var result = classes;
          result.push(className);
          setValues({...values,result}); 
      }
      return
  }

  // CHanging the values
  const handleChange = name => event => {
    event.preventDefault();
    setValues({ ...values, [name]: event.target.value });
  };

  const handleEntailmentRequest =(e)=> {
    e.preventDefault();

    console.log("handle request ");
}


  // Returning Part
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <div className="row">
                    <div className="col-6">
                  <h1>Register Here </h1>
             </div>
                  <div className="col-6 text-right">
                    <a href="#/">
                  <button type="button" class="btn btn-danger" style={{height:"36px"}}> Login Here</button>
                  </a>
                  </div>
                  </div>
                  <p className="text-muted">Create your account</p>
                  {/* <p className="text-muted">Admin Role: For Managing Student's Records (Don't select classes) </p>
                  <p className="text-muted">Teacher Role: For monitoring Classes ( Select your classes) </p> */}
                  <br/>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Name" autoComplete="username"   onChange={handleChange("name")} value={name}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email"  onChange={handleChange("email")}  value={email}/>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password (Min 6 Char Length)" autoComplete="new-password"  onChange={handleChange("password")} value={password} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Confirm Password" autoComplete="new-password"  onChange={handleChange("confirmPassword")} value={confirmPassword} />
                  </CInputGroup>


                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                    </CInputGroupPrepend>
                  </CInputGroup>


                  <p className="text-muted">Select Your Classes</p>
                
                  
                <div className="row">
                  <div className="col-4">
                  <input type="button" value="First"  onClick={ ()=>{Adding_Classes("First",first); setFirst(!first) ; 
                  }} style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}}className={first? ("text-muted"):("bg-success text-white")}  ></input>


                  </div>
                  <div  onClick={()=>{Adding_Classes("Second",second); setSecond(!second) 
                  }} className="col-4">
                  <input type="button" value="Second" style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={second? ("text-muted"):("bg-success text-white")}></input>
                  </div>


                  <div className="col-4">
                  <input  type="button" value="Third" onClick={()=>{Adding_Classes("Third",third); setThird(!third) 
                  }}  style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={third? ("text-muted"):("bg-success text-white")} ></input>
                  </div>
                </div>
            
                <div className="row">
                  <div className="col-4">
                  <input type="button" value="Fourth" onClick={()=>{Adding_Classes("Fourth",fourth); setFourth(!fourth) 
                  }}  style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={fourth? ("text-muted"):("bg-success text-white")} ></input>
                  </div>
                  <div className="col-4">
                  <input  type="button" value="Fifth" onClick={()=>{Adding_Classes("Fifth",fifth); setFifth(!fifth) 
                  }}  style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={fifth? ("text-muted"):("bg-success text-white")} ></input>
                  </div>
                  <div className="col-4">
                  <input  type="button" value="Sixth" onClick={()=>{Adding_Classes("Sixth",sixth); setSixth(!sixth) 
                  }}  style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={sixth? ("text-muted"):("bg-success text-white")} ></input>
                </div>
                </div>
            
                <div className="row">
                  <div className="col-4">
                  <input type="button" value="Seventh" onClick={()=>{Adding_Classes("Seventh",seventh); setSeventh(!seventh) 
                  }}  style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={seventh? ("text-muted"):("bg-success text-white")} ></input>
                  </div>
                  <div className="col-4">
                  <input type="button" value="Eighth" onClick={()=>{Adding_Classes("Eighth",eighth); setEighth(!eighth) 
                  }}  style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={eighth? ("text-muted"):("bg-success text-white")} ></input>
                  </div>
                  <div className="col-4">
                  <input type="button" value ="Ninth" onClick={()=>{Adding_Classes("Ninth",ninth); setNinth(!ninth) 
                  }}  style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={ninth? ("text-muted"):("bg-success text-white")}></input>
                  </div>
  
                </div>
                <div className="row">
                  <div className="col-4">
                  <input type="button" value ="Tenth"  onClick={()=>{Adding_Classes("Tenth",tenth); setTenth(!tenth) 
                  }} style={{width:"100px",paddingTop:"12px",paddingBottom:"12px", borderStyle:"solid",borderColor:"white", margin:"10px"}} className={tenth? ("text-muted"):("bg-success text-white")} ></input>
                  </div>
                </div>
                  {
                    login? 
                  <a style={{textDecoration:"none"}} href={'#/'}>
                  <CButton type="button" color="success" className="mt-3" style={{pointerEvents:"none"}}   block >Login Here</CButton>
                  </a>
                :  <CButton type="button" color="success" className="mt-3" onClick={onSubmit}  block >Create Account</CButton>
                }
                  </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer  />
    </div>
  )
}

export default Register
