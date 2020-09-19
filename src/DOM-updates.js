let domUpdates = {

    populateCards() {
        console.log('hello world')
    },

    greetUser(name) {
        const userGreeting = document.querySelector('.welcome-message');
        userGreeting.innerHTML = `${name}`.split(' ')[0] + ' ' + `${name}`.split(' ')[1];
    }



}

export default domUpdates;