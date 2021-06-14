
/* Send request to server to increase or decrease votes in
   the database for a given feature */
export const modifyVotesReq = (data) => {
    fetch("http://localhost:5000/featureModifyVotes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    }).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    }).catch(error => {
        console.log(error)
    })

}

/* Send request to server to add a new feature in
   the database */
export const featureAdd = (data) => {
    fetch("http://localhost:5000/featureAdd", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    }).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    }).catch(error => {
        console.log(error)
    })

}