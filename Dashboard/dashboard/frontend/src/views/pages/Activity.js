import React,{useEffect,useState} from 'react'
import { API } from './Backend'
import { isAutheticated } from './login/authenticate';
import Loader from 'react-loader-spinner'
import {Link , Redirect } from "react-router-dom";
import '../../scss/card.scss'
// default part
export default function Activity({match}) {

    // Getting the class name
    const class_name = match.params.name
    const {user,token} = isAutheticated()
    // State for Products
    const [product, setProduct] = useState(0);
    const [load , setLoad] = useState(false)

    // API for hitting
    const getProduct = () =>{
        return fetch(`${API}/get/class/rank/${class_name}/${user._id}`,{
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
            setProduct(data)
            setLoad(true)
            }
        )
    }
    // assign values to data
    useEffect(() => {
        preload();
    }, []);
    



    // returning statement
    return (
        <div>
            {
               (load)?

            <div>
            <div className="blog-card">
                <div className="col-9">
                <h3 style={{marginTop:"20px", marginBottom:"20px", marginLeft:"20px" ,}} className="text-success"> Activity of Class {class_name}</h3>
                </div>
                <div className="col-3"> 
                <Link to="/dashboard">
                    <button  type="button" class="btn btn-danger"  style={{marginTop:"20px", marginBottom:"20px", marginLeft:"20px",marginRight:"25px" ,height:"36px"}}> Go Back</button>
                </Link>
                </div> 
                </div>
                <br/>
                <br/>


                    {/* printing table  */}
                    <div className="blog-card">

                    <table class="table">
                    <thead class=" table-dark">
                        <tr>
                        <th scope="col">Class</th>
                        <th scope="col">Average Activity Per Student</th>

                        </tr>
                    </thead>
                    
                    <tbody>
                <tr>
                <th scope="row">{match.params.name}</th>
                <td>{product.msg}</td>

                </tr>
                    </tbody>
                    </table>

                    </div>

                    {/* priting table end  */}
                
            </div>
                
                :
                <div style={{textAlign:"center",marginTop:"300px"}} >
                <Loader color="green"/>
                </div>
            }

           
        </div>
    )
}
