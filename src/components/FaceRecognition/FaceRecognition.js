import React from "react";
import './FaceRecognition.css';
const FaceRecognition=({imgurl,box})=>{
    return(
        <div className="center ma">
            <div className="absolute mt2 ">
                <div className="bounding-box" style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
                <img id="inputImg" src={imgurl} alt="abc" width='500px' heigh='auto'/>
            </div>
        </div>
    );
}
export default FaceRecognition;