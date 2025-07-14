//Hamburger menu functionality
function expandHambuger() {
    const menuLinks = document.getElementById('menu-links');
    const burger = document.querySelector('.burger');

    menuLinks.classList.toggle('show');
    burger.classList.toggle('spread')
}

document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu');
    const menuLinks = document.getElementById('menu-links');
    
    if (!menu.contains(event.target) && menuLinks.classList.contains('show')) {
        menuLinks.classList.remove('show');
        document.querySelector('.burger').style.transform = 'rotate(0deg)';
        document.querySelector('.burger').style.background = '#333';
    }
});

//Set booking min depart to today
document.getElementById('depart').min = new Date().toISOString().split('T')[0];

//Set booking min return (default) to today
document.getElementById('return').min = new Date().toISOString().split('T')[0];

//Set booking min return to depart
document.getElementById('depart').addEventListener('change', function() {
    const departDate = this.value;
    const returnInput = document.getElementById('return');
    
    returnInput.min = departDate;

    if (returnInput.value && returnInput.value < departDate) {
        returnInput.value = '';
    }
});

// Show booking table results
function showResults() {
    
    // Get travel method
    const travelMethod = document.getElementById('travel-method').value;

    // Change carrier
    let carrierShort, carrierLong;
    if (travelMethod === 'cruise') {
        carrierShort = 'TC';
        carrierLong = 'Taniti Cruise';
    } else {
        carrierShort = 'TA';
        carrierLong = 'Taniti Air';
    }
    
    // Unhide results-found
    const rows = document.querySelectorAll('.booking-results tbody tr');
    document.querySelector('.results-found').style.display = 'block';

    // Show/hide rows based on travel method
    if (travelMethod === 'cruise') {
        // Show only the first row for cruise
        rows[0].style.display = 'table-row';
        rows[1].style.display = 'none';
        rows[2].style.display = 'none';
    
        // Update results
        document.querySelector('.results-found p').textContent = '1 option found';

    } else {
        // Show all rows for air
        rows.forEach(row => row.style.display = 'table-row');
        
        // Update results count
        document.querySelector('.results-found p').textContent = '3 options found';
    }
    
    // Update from input
    const fromCity = document.getElementById('from').value || 'Your Location';
    const departureCities = document.querySelectorAll('.booking-results .city-name');
    departureCities.forEach(city => {
        if (city.textContent === 'Your Location') {
            city.textContent = fromCity;
        }
    });

    // Update carrier information
    const carrierShortElements = document.querySelectorAll('.carrier-name-short');
    const carrierLongElements = document.querySelectorAll('.carrier-name-long');
    
    carrierShortElements.forEach(element => {
        element.textContent = carrierShort;
    });
    
    carrierLongElements.forEach(element => {
        element.textContent = carrierLong;
    });
}