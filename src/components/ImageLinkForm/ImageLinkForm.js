import React from "react";
import './ImageLinkForm.css';
const ImageLinkForm=({onInputChange,onButtonSubmit})=>{
    return(
        <div className="f3">
            <p className="underline">{"FACE DETECTOR"}</p>
            <div className="form pa2 center">
                <input className="f4 pa2 w-70 center" type='tex' onChange={onInputChange }/>
                <button className="f4 pa2 w-30 link ph3 pv2 dib white grow bg-light-purple" 
                onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    ); 
}
export default ImageLinkForm;