import React from 'react'
import Card from './Card'
import { isAutheticated } from './login/authenticate'
import '../../scss/card.scss'
import {Link , Redirect } from "react-router-dom";
import { signout } from './logout';

const  Dashboard= ()=> {

    const { user, token } = isAutheticated();
    const classes = user.classes

    // Returning Part
    return (
        <div  >
            
            <div className="blog-card">
               
                <div className="col-9">
                <h3 style={{marginTop:"20px", marginBottom:"20px", marginLeft:"20px" ,}} className="text-success"> Hi, {user.name}</h3>
                </div>
                <div className="col-3"> 
                <Link to="/">
                  <button  type="button" class="btn btn-danger" onClick={signout} style={{marginTop:"20px", marginBottom:"20px", marginLeft:"20px",marginRight:"25px" ,height:"36px"}}> Logout</button>
                </Link>
                </div> 
            </div>
            <br/>
            <br/>
            {
            classes.map(x=>
                <Card name={x}/>
                )
            }
        </div>
    )
}

export default Dashboard
