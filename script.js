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