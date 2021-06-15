import './App.css';
import './AddFeature.css';
import {useState, useEffect} from 'react';
import blackThumb from './assets/thumbsUpBlack.png';
import blueThumb from './assets/thumbsUp.png';
import {modifyVotesReq, featureAdd} from './ServerRequests';

function AddFeature() {
    // All features with their votes
    const [votes, setVotes] = useState<any[]>([]);

    // The current input text
    const [featureText, setFeatureText] = useState("");

    /* Increase or decrease the votes for the specified feature*/ 
    const modifyVotes = (index) => {
        // Create the new votes array for updated state
        let newVotes = [...votes]

        // Switch between blue and black thumbs up image
        newVotes[index].image = (newVotes[index].image + 1) % 2;

        // Prepare the data for fetch request to modify votes in the db
        const data = {feature: newVotes[index].feature}

        if (newVotes[index].image === 0){
            // If the thumbs up is now black, then decrease the votes by one
            newVotes[index].votes -= 1

            data["direction"] = "decrease"

            // Send request to server to decrease votes in db
            // decreaseVotesReq(JSON.stringify(data))

        }
        else {
            // Thumbs up must be blue now, so we increase votes by one
            newVotes[index].votes += 1

            data["direction"] = "increase"


            // Send request to server to increase votes in db
            // increaseVotesReq(JSON.stringify(data))
        }

        modifyVotesReq(JSON.stringify(data))

        // Update the state with the new votes array
        setVotes(newVotes)

      
    }

    // Update the state with the current text input as user types
    const handleTextChange = (event) => {
        setFeatureText(event.target.value)
       
    }

    // Add a new feature to be polled
    const submitNewFeature = () => {

        // Create new votes array
        let newVotes = [...votes]

        // Create new feature to be added
        let newFeature = {
            "feature": featureText,
            "votes": 0,
            "image": 0,
        }
        newVotes.push(newFeature)

        // Set state with new votes array
        setVotes(newVotes)

        // Reset feature text
        setFeatureText("")

        // Send new feature to server to be added to database
        const data = {feature: featureText}
        featureAdd(JSON.stringify(data))
    }

    /* Fetch features and votes from the db on startup */
    const fetchVotes = () => {
        fetch("/getVotes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
                return res.json()
        })
            .then(arr => {
                // Populate newVotes array with response object and set state
                let newVotes = [] as any;	
                arr.forEach(element => {
                    element["image"] = 0
                    newVotes.push(element)
                });		
                setVotes(newVotes);

            })
            .catch(error => {
                console.log(error)
            })

    }

    // Fetch the currently polled features from db after DOM renders
    useEffect(fetchVotes, [])



  return ( 
    <div className="Container"> 
        <p>What new feature would you<br/>like us to add to Buddytree?</p>
        <div className="FeatureSuggestion">
            <textarea rows={2} id="inputFeature" value={featureText} 
            onChange={(event) => handleTextChange(event)}></textarea>
            <button id="addFeature"onClick={submitNewFeature}>Add</button>
        </div>
        
        <div className="FeatureVotes">
            {votes.map((feature, i) => (
                <div key={feature.feature} className="FeatureItemContainer">
                    <div className="FeatureItem">
                        {feature.feature}
                    </div>                     
                    {feature.image ? 
                    <img id="thumb" alt="blueThumb" src={blueThumb} onClick={()=>{modifyVotes(i)}}/> :
                    <img id="thumb" alt="blackThumb" src={blackThumb} onClick={()=>{modifyVotes(i)}}/>}
                    <h2 id="numVotes">{feature.votes}</h2>
                </div>))}
        </div>
    </div>
    
    
  );
}

export default AddFeature;
