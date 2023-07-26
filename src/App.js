import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignInForm from './components/SignInForm/SignInForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import React from 'react';

const ClarifaiJSON=(imgurl)=>{
    const PAT = '6dee23747ac647a0943d35f53b33cd64';
    const USER_ID = 'hadiahmed';       
    const APP_ID = 'FaceDetection';
    const IMAGE_URL = imgurl;
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
return requestOptions;
}
class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imgurl:'',
      box:{},
      route:'signin',
    }
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImg');
    const height=Number(image.height);
    const width=Number(image.width);
    return {
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }
  displayFaceBox=(box)=>{
    this.setState({box:box});
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit=(event)=>{
    this.setState({imgurl:this.state.input});
    fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",ClarifaiJSON(this.state.input))
    .then(response=>response.json())    
    .then(result => this.calculateFaceLocation(result))
    .then(boxObj=>this.displayFaceBox(boxObj))
        .catch(error => console.log('error', error));
  }
  onRouteChange=(next)=>{
    this.setState({route:next});
  }
  render(){ 
    return (
      <div className="App">
        
        {this.state.route==='signin'
        ? <SignInForm onRouteChange={this.onRouteChange}/>
        :(this.state.route==='home'
          ?<div>
            <Navigation onRouteChange={this.onRouteChange}/>
            <Logo/>
            <Rank/>
            <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imgurl={this.state.imgurl}/> 
          </div>
          :<RegistrationForm/>
        )
        }
        <>
          <div>...</div>
          <ParticlesBg type="cobweb" bg={true} />
        </>  
              
      </div>
    );
  }
}
export default App;
