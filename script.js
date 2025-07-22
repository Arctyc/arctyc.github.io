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

//Scrolling images
let currentImageIndex = 0;
const images = document.querySelectorAll('.highlights img');

function showNextImage() {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
}

if (images.length > 0) {
    images[0].classList.add('active');
    setInterval(showNextImage, 3000);
}


// Set booking min depart to today
document.getElementById('depart').min = new Date().toISOString().split('T')[0];

// Set booking min return to today
document.getElementById('return').min = new Date().toISOString().split('T')[0];

// Set booking min return to depart
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
    
    // Unhide results
    const rows = document.querySelectorAll('.booking-results tbody tr');
    document.querySelector('.results-found').style.display = 'block';

    // Show/hide rows based on travel method
    if (travelMethod === 'cruise') {
        // Show cruise row
        rows[0].style.display = 'table-row';
        rows[1].style.display = 'none';
        rows[2].style.display = 'none';
    
        // Update results
        document.querySelector('.results-found p').textContent = '1 option found';

    } else {
        // Show air rows
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


// Booking table filtering
let currentSort = { column: -1, direction: 'asc' };

function sortTable(columnIndex) {
    const table = document.querySelector('.booking-table tbody');
    const rows = Array.from(table.querySelectorAll('tr')).filter(row => row.style.display !== 'none');
    
    // Toggle sort direction
    if (currentSort.column === columnIndex) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.direction = 'asc';
    }
    currentSort.column = columnIndex;
    
    rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent.trim();
        let bValue = b.cells[columnIndex].textContent.trim();
        
        // Price sorting
        if (columnIndex === 5) {
            aValue = parseInt(aValue.replace(/[^0-9]/g, ''));
            bValue = parseInt(bValue.replace(/[^0-9]/g, ''));
        }
        
        // Time sorting
        if (columnIndex === 1 || columnIndex === 2) {
            aValue = timeToMinutes(aValue.split('\n')[0]);
            bValue = timeToMinutes(bValue.split('\n')[0]);
        }
        
        if (aValue < bValue) return currentSort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Append rows
    rows.forEach(row => table.appendChild(row));

    updateSortIndicators(columnIndex);
}

function timeToMinutes(timeStr) {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
    if (period === 'AM' && hours === 12) totalMinutes -= 12 * 60;
    return totalMinutes;
}

function updateSortIndicators(activeColumn) {
    const headers = document.querySelectorAll('.booking-table th');
    headers.forEach((header, index) => {
        if (index === activeColumn) {
            header.textContent = header.textContent.replace(/[↕↑↓]/g, '') + 
                (currentSort.direction === 'asc' ? ' ↑' : ' ↓');
        } else if (index < headers.length - 1) {
            header.textContent = header.textContent.replace(/[↕↑↓]/g, '') + ' ↕';
        }
    });
}

// Transfer index booking values to booking page
const indexButton = document.getElementById('indexBookingButton');
    if (indexButton) {
        indexButton.addEventListener('click', function(event) {
            event.preventDefault();

        // Get values
        const departDate = encodeURIComponent(document.getElementById('depart').value);
        const returnDate = encodeURIComponent(document.getElementById('return').value);
        const guests = encodeURIComponent(document.getElementById('guests').value);

        // Build URL
        const url = `booking.html?departDate=${departDate}&returnDate=${returnDate}&guests=${guests}`;

        // Redirect to booking page with parameters
        window.location.href = url;
    });
}
// Load results with values from index
function getQueryParams() {

    const params = {};
    location.search.substring(1).split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
    return params;
}

window.addEventListener('DOMContentLoaded', () => {
    const params = getQueryParams();

    if (params.departDate) document.getElementById('depart').value = params.departDate;
    if (params.returnDate) document.getElementById('return').value = params.returnDate;
    if (params.guests) document.getElementById('guests').value = params.guests;

    showResults();
});