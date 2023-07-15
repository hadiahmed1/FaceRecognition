import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const ClarifaiJSON=(imgurl)=>{
    const PAT = '6dee23747ac647a0943d35f53b33cd64';
    const USER_ID = 'hadiahmed';       
    const APP_ID = 'FaceDetection';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
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
    }
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit=(event)=>{
    this.setState({imgurl:this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection'+"/outputs", ClarifaiJSON(this.state.input))
        .then(response => response.json())
        .then(result => console.log(result))
  }
  render(){ 
    return (
      <div className="App">
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imgurl={this.state.imgurl}/> 
        <>
          <div>...</div>
          <ParticlesBg type="cobweb" bg={true} />
        </>        
      </div>
    );
  }
}

export default App;
