import React,{useState,useEffect} from 'react'
import {Link , Redirect } from "react-router-dom";
import Loader from 'react-loader-spinner'
import { signout } from './logout';
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from './styles';
import { __DATA__ } from './data';
import { isAutheticated } from './login/authenticate';
import { API } from './Backend';

// Calling Function
const AddStudent = ({match}) => {

      // calling Function
      const {user,token} = isAutheticated()
      // State for Products
      const [product, setProduct] = useState([]);
      const [load , setLoad] = useState(false)
  
      // API for hitting
      const getProduct = () =>{
          return fetch(`${API}/get/admin/rank/${user._id}`,{
              method:"GET",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
          }).then (res =>{
                  console.log(res)
                  return res.json()
          }).catch(err => console.log(err))
      } 
      // For loading the data
      const preload = () => {
          getProduct().then(data => {
              setProduct(data.msg)
              setLoad(true)
              }
          )
      }
      // assign values to data
      useEffect(() => {
          preload();
      }, []);

  // For changing the Value
  const change =()=>{
    num+=1
  }

  // State For class
  const classes =['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th']
  const color =[ ["#ffd847", "#e0a106"],["#ff47ab", "#e0064e"], ["#add9c0", "#1da890"], ["#cbd9ad", "#7ca81d"], ["#d9c1ad", "#714511"],
  ["#ffd847", "#e0a106"],["#ff47ab", "#e0064e"], ["#add9c0", "#1da890"], ["#cbd9ad", "#7ca81d"], ["#d9c1ad", "#714511"]]
  var num = 0

  // Returning Part
  return (
    <div>

     { (!load)?
      <div style={{textAlign:"center",marginTop:"300px"}} >
      <Loader color="green"/>
      </div>
     : 
    <div>
      
   <div className="container">
    <br/>
    <br/>
    <br/>
   <div className="row">
                    <div className="col-6 text-center">
                    <h2 className="text-success">Admin Dashboard</h2>
                    <p className="text-muted text-center">Activity Per Student For Each Class</p>
                  </div>
                  <div className="col-6 text-center">
                    <Link to="/">
                  <button  type="button" class="btn btn-danger" onClick={signout} style={{height:"36px"}}> Logout</button>
                  </Link>
                  </div>
                  </div>
                  <br/>
                  </div>
    
      <Container>            
        <MainContainer>
          {__DATA__.map(({ }, i) => {
            return (
              <BarChartContainer key={i}>
                <Number color={color[num][1]}>{product[num]} IN {classes[num]}</Number>

                <MakeBar height={product[num] * 2} colors={color[num]} />
                {change()}
              </BarChartContainer>
            );
          })}
        </MainContainer>
        <BlackLine />
      </Container>
      <br/>
      <br/>
      <br/>
      <Container>
        <MainContainer>
          {__DATA__.map(({ distance }, i) => {
            return (
              <BarChartContainer key={i}>
                <Number color={color[num][1]}>{product[num]} IN {classes[num]}</Number>
        
                <MakeBar height={product[num] * 2} colors={color[num]} />
                {change()}
              </BarChartContainer>
            );
          })}
        </MainContainer>
        <BlackLine />
      </Container>
      <br/>
      <br/>
      <br/>
      </div>
}
  </div>
)
}

export default AddStudent

