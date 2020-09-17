function fetchUser() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/50')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('err', err))
}

 export default fetchUser
