import React from 'react'
import {Link , Redirect } from "react-router-dom";
import '../../scss/card.scss'

export default function Card({name}) {
    return (
        
          
        <div>
        <div className="blog-card">
          <div className="meta">
            <div className="photo" style={{backgroundImage: 'url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)'}} />
            <ul className="details">
              {/* <li className="author"><a href="#">Class {name}</a></li> */}
              {/*<li className="date">Aug. 24, 2015</li> */}
              <li className="tags">
                {/* <ul>
                  <li><a href="#">Learn</a></li>
                  <li><a href="#">Code</a></li>
                  <li><a href="#">HTML</a></li>
                  <li><a href="#">CSS</a></li>
                </ul> */}
              </li>
            </ul>
          </div>
          <div className="description">
            <h2 className="text-success">Class {name}</h2>
            <h3>Check Attendance Here</h3>
            <p> By clicking on 'Check Here', you can view the attendance of each student studying in Class {name} </p>
            <p className="read-more">

              <Link to={`/dashboard/attend/${name}`}>Check Here</Link>
            </p>
          </div>
        </div>
        <br/>
        <br/>
        <div className="blog-card alt">
          <div className="meta">
            <div className="photo" style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/03/01/07/22/education-3189934_1280.jpg)'}} />
            <ul className="details">
              {/* <li className="author"><a href="#">Jane Doe</a></li>
              <li className="date">July. 15, 2015</li> */}
              <li className="tags">
                {/* <ul>
                  <li><a href="#">Learn</a></li>
                  <li><a href="#">Code</a></li>
                  <li><a href="#">JavaScript</a></li>
                </ul> */}
              </li>
            </ul>
          </div>
          <div className="description">
            <h2 className="text-success">Class {name}</h2>
            <h3>Check Activity Here</h3>
            <p>By clicking on 'Check Here', you can see the average activity of Class {name}</p>
            <p className="read-more">
            <Link to={`/dashboard/activity/${name}`}>Check Here</Link>
            </p>
          </div>
        </div>
        <br/>
        <br/>
      </div>
              
    )
}
