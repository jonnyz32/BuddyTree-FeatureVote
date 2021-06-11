import './App.css';
import './AddFeature.css';
import {useState} from 'react';
import blackThumb from './assets/thumbsUpBlack.png';
import blueThumb from './assets/thumbsUp.png';

import PotentialFeatureItems from './PotentialFeatureItems.js';


function AddFeature() {

    const handleClick = (index) => {
        let newFeatures = [...potentialFeatures]
        console.log("image: ", newFeatures[index].image)
        newFeatures[index].image = (newFeatures[index].image + 1) % 2;
        console.log("image: ", newFeatures[index].image)
        addNewPotentialFeature(newFeatures);
      
    }

    const handleChange = (event) => {
        setFeatureText(event.target.value)
    }

    const [featureText, setFeatureText] = useState("");

    const [potentialFeatures, addNewPotentialFeature] = useState(
        [{text: "Lorem ipsum dolor sit amet,",
        image: 0},
        {text: "Lorem ipsum dolor sit amet,",
        image: 0},
        {text: "Lorem ipsum dolor sit amet,",
        image: 0},
        {text: "Lorem ipsum dolor sit amet,",
        image: 0}]);
  return ( 
    <div className="Container"> 
        <p>What new feature would you<br/>like us to add to Buddytree?</p>
        <div className="FeatureSuggestion">
            <textarea rows="2" id="inputFeature" value={featureText} onChange={(event) => handleChange(event)}></textarea>
            <button id="addFeature"onClick={()=>{addNewPotentialFeature([...potentialFeatures, 
            {text: featureText,
            image: 0}])
            console.log("feature text: ", featureText)
            setFeatureText("");
            console.log("feature text: ", featureText)
            }}>Add</button>
        </div>
        
        <div className="FeatureVotes">
            {potentialFeatures.map((feature, i) => (
                <div className="FeatureItemContainer">
                    <div className="FeatureItem">
                        {feature.text}
                    </div>                     
                    {feature.image ? 
                    <img id="thumb" alt="blueThumb" src={blueThumb} onClick={()=>{handleClick(i)}}/> : <img id="thumb" alt="blackThumb" src={blackThumb} onClick={()=>{handleClick(i)}}/>}
                </div>))}
        </div>
    </div>
    
    
  );
}

export default AddFeature;
