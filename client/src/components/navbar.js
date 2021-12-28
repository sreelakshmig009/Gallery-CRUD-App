import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
//import Button from 'react-bootstrap/Button'
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";




 
// Here, we display our Navbar
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light justify-content-center" style={{ blockSize:70,backgroundColor:"#AA99FF" }}>
        <NavLink className="navbar-brand" to="/" style={{ marginLeft: 20 }}>
          <h3 style={{fontFamily: 'Satisfy',fontSize:40,fontStyle: 'italic',fontWeight: 'bold',marginTop:0,color:"#042069"}} >Destination Gallery</h3>
        </NavLink>
      </nav>
      
    </div>
  );
};
 
export default Navbar;