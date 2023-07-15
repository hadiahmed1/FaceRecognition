import React from "react";
const FaceRecognition=({imgurl})=>{
    return(
        <div className="center ma">
            <div className="absolute mt2 ">
                <img src={imgurl} alt="abc" width='500px' height='auto'/>
            </div>
        </div>
    );
}
export default FaceRecognition;