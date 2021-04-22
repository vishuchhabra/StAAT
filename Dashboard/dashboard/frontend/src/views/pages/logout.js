import {Route ,Redirect, Link} from "react-router-dom"
export const signout =() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
}