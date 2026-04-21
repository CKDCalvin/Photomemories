//using eventListener for all neccessary click events
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('nav ul');
  if (button && menu) {
    button.addEventListener('click', () => {
      menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(menu.classList.contains('open')));
    });
  }

  // submit form validation, store input into submission object and render to cart
  
  const summary = document.getElementById('summaryInfo');
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) { //checking for fillout form
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(bookingForm); //captures input data

      const myObj = Object.fromEntries(formData.entries()); //converting form data input into object 

      localStorage.setItem('userSubmission', JSON.stringify(myObj)); //save to local storage


      const required = [...bookingForm.querySelectorAll('[required]')];
      const invalid = required.find(field => !field.value.trim());
      if (invalid) {
        invalid.focus();
        alert('Please complete all required booking fields before submitting.');
        return;
      }
      alert('Thank you! Your booking request has been prepared locally. In a live site, this would be submitted to the business.');
      bookingForm.reset();

      window.location.href = 'summary.html'; //refer user to summary page

    });
  }

  if (summary) { //checking for summary section
    const savedData = localStorage.getItem('userSubmission'); //retrieving user's saved data

    if (savedData) {

      const submittedData = JSON.parse(savedData); //turning saved string data back into an object

      const date = new Date(submittedData.date); //saving date as an object then transferring it into en-US date format below

      summary.innerHTML = `
      <div id="formInfo">
       <h2>Submitted Information and Price</h2>
       <p><strong>Name:</strong> ${submittedData.name}</p>
       <p><strong>Email:</strong> ${submittedData.email}</p>
       <p><strong>Session Type:</strong> ${submittedData.session}</p>
       <p><strong>Preferred location:</strong> ${submittedData.location}</p>
       <p><strong>Preferred date:</strong> ${date.toLocaleDateString('en-US')}</p>
       <p><strong>Estimated Budget:</strong> ${submittedData.budget}</p>
       <p><strong>Details:</strong> ${submittedData.details}</p>
       </div>
       `
    }

    else {
      summary.innerHTML = `No data found!`;
    }
  }

  //display items based on active button
  const filters = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('.portfolio-item');
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const value = filter.getAttribute('data-filter');
      filters.forEach(btn => btn.classList.remove('active'));
      filter.classList.add('active');
      items.forEach(item => {
        const matches = value === 'all' || item.dataset.category === value;
        item.style.display = matches ? 'block' : 'none';
      });
    });
  });

  //video slides 
  const slides = document.querySelectorAll('video');
  var counter = 0;

  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  //iterating thorugh the slides array
  function slideClip() {
    slides.forEach(slide => {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    })
  }

  const nextBtn = document.getElementById('btn1');
  const prevBtn = document.getElementById('btn2');

  //moving to next slide as long as counter less than the slides array length
  nextBtn.addEventListener('click', () => {
    if (counter < slides.length - 1) {
      counter++;
      slideClip();
    }
  })

  //turning to previous slide as long as counter is not equal to 0
  prevBtn.addEventListener('click', () => {
    if (counter !== 0) {
      counter--;
      slideClip();
    }
  })
});
