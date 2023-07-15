import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
const Logo=()=>{
  return(
    <div className="ma4 mt10">
      <Tilt className="Tilt pa3" options={{max:'30'}} style={{maxWidth:'150px', maxHeight:'200px'}}>
        <div className="Tilt-inner">
          <img src={brain} alt="brain"/>
        </div>
      </Tilt> 
    </div>
  );
}
export default Logo;