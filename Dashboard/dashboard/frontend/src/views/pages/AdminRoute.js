import React from 'react'
import {Route ,Redirect} from "react-router-dom"
import { isAutheticated } from './login/authenticate';


const  AdminRoute = ({component:Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={ props =>
          isAutheticated()  && isAutheticated().user.role===2 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  };

  export default AdminRoute