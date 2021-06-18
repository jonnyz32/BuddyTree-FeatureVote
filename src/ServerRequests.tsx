
/* Send request to server to increase or decrease votes in
   the database for a given feature */
export const modifyVotesReq = (data, path) => {

    fetch("/featureModifyVotes" + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    }).then(res => {
        return res.json()
    }).catch(error => {
        console.log(error)
    })

}

/* Send request to server to add a new feature in
   the database */
export const featureAdd = (data, path) => {
    
    fetch("/featureAdd", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    }).then(res => {
            return res.json()
    }).catch(error => {
        console.log(error)
    })

}