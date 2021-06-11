import './App.css';
import './AddFeature.css';
import {useState} from 'react';


function PotentialFeatureItems(props) {


  return ( 
    
    <div>
      {props.features.map(feature => {return <div>feature</div>})}
    </div>
    
    
  );
}

export default PotentialFeatureItems;
