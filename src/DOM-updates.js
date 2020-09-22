
let domUpdates = {

    populateCards(filteredTrips) {
        if(filteredTrips) {
            let cardArea = document.querySelector('.card-area');
            cardArea.innerHTML = '';
            filteredTrips.forEach(trip => {
                cardArea.insertAdjacentHTML('afterbegin', 
                `
                <section class="card">
                <section class="card-header">
                   <!-- should this be a header tag?  -->
                  <h5 class="start-date">start ${trip.date}</h5>
                  <h5 class="end-date">Duration ${trip.duration}</h5>
                  <h5 class="party-size">Party Size: ${trip.travelers}</h5>
                  <h5 class="name-of-trip">${trip.destination}</h5>
                </section>
                <img src="${trip.image}" alt="${trip.alt}">
              </section>
                `
                )
            })
            
        }
    },

    greetUser(name) {
        const userGreeting = document.querySelector('.welcome-message');
        userGreeting.innerHTML = `${name}`.split(' ')[0] + ' ' + `${name}`.split(' ')[1];
    },

    tellMeYourMoneys(totalYearlySpent) {
        let totalYearlySpending = document.querySelector('.total-yearly-spending');
        totalYearlySpending.innerHTML = `You've spent $${totalYearlySpent} this year!`
    },

    updateListBox(destinationNames) {
        let destinationList = document.querySelector('.input-destination');

        destinationNames.forEach(destinationName => {
            destinationList.insertAdjacentHTML('afterbegin', 
            `
            <option id="${destinationName.id}">${destinationName.id}. ${destinationName.destination}</option>
            `)
        }) 

    },

    displayTripCost(trip) {
        let roundedTotal = (Math.round(trip * 100) / 100)
        const estimatedCost = document.querySelector('.estimated-cost');
        estimatedCost.innerHTML = `Estimated Cost: $${roundedTotal}`
    },

    displayTripImage(destinationImage, destinationAlt) {
        const selectedLocation = document.querySelector('.selected-location');
        selectedLocation.src = destinationImage;
        selectedLocation.alt = destinationAlt;
    }
}

export default domUpdates;