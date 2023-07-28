const form = document.querySelector('form'); // Assuming you have only one form on your page

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the form from submitting

  const elements = form.elements; // Get all the elements inside the form

  for(let i = 0; i < elements.length; i++) {
    if(elements[i].value === '') { // Check if the element value is empty
      elements[i].style.border = '2px solid red'; // Apply the red border style
    } else {
      elements[i].style.border = 'none'; // Reset the border style if not empty
    }
  }
});