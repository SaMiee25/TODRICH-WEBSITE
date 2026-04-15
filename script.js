// var slideIndex = 0;
// showSlides();

// function showSlides() {
//   var i;
//   var slides = document.getElementsByClassName("mySlides-fade");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";

//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}
//   slides[slideIndex-1].style.display = "block";
//   setTimeout(showSlides,
//      3000); 
// }


// let thumbnails=document.getElementsByClassName('thumbnail')
// let sils=document.getElementsByClassName('sil')
// let slider=document.getElementById('slider')

// Autoplay the slider 

// const maxScrollLeft=slider.scrollWidth-slider.clientWidth

// function autoplay(){
//     if(slider.scrollLeft>(maxScrollLeft-1)){
//         slider.scrollLeft -=maxScrollLeft
//     }else{
//         slider.scrollLeft +=1
//     }
// }
// let play= setInterval(autoplay, 5)

// pause the slide on Hover

// for(var i=0; i<thumbnails.length; i++){
//     thumbnails[i].addEventListener('mouseover', function(){
//         clearInterval(play)
//     })


//     thumbnails[i].addEventListener('mouseout', function(){
//         return play=setInterval(autoplay, 5)
//     })


// }


//   const mobileBtn = document.getElementById('mobileMenuBtn');
//   const navbar = document.getElementById('navbar');
//   mobileBtn.addEventListener('click', () => {
//     navbar.classList.toggle('active');
//   });
//   // Close menu when clicking a link (optional)
//   document.querySelectorAll('#navbar a').forEach(link => {
//     link.addEventListener('click', () => {
//       navbar.classList.remove('active');
//     });
//   });



// ========================
// 1. STATS COUNTER ANIMATION
// ========================
document.addEventListener('DOMContentLoaded', function() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return; // Exit if no stats section

  const targets = [];
  const symbols = [];

  statNumbers.forEach(el => {
    const raw = el.getAttribute('data-target');
    const match = raw.match(/(\d+(?:\.\d+)?)([%+]?)/);
    if (match) {
      targets.push(parseFloat(match[1]));
      symbols.push(match[2]);
    } else {
      targets.push(0);
      symbols.push('');
    }
    el.innerText = '0';
  });

  let started = false;

  function animateNumbers() {
    if (started) return;
    started = true;

    statNumbers.forEach((el, index) => {
      const target = targets[index];
      const symbol = symbols[index];
      let current = 0;
      const increment = target / 80;

      const updateCounter = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.innerText = target + symbol;
          clearInterval(updateCounter);
        } else {
          el.innerText = Math.floor(current) + symbol;
        }
      }, 20);
    });
  }

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else {
    // Fallback: animate after short delay if stats section missing
    setTimeout(animateNumbers, 500);
  }
});

// ========================
// 2. NEWSLETTER SUBSCRIPTION
// ========================
document.addEventListener('DOMContentLoaded', function() {
  const subscribeBtn = document.querySelector('#newsletter button');
  const emailInput = document.querySelector('#newsletter input');

  // Exit if newsletter section doesn't exist
  if (!subscribeBtn || !emailInput) return;

  subscribeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (email && email.includes('@') && email.includes('.')) {
      alert(`Thanks for subscribing, ${email}! We'll keep you updated.`);
      emailInput.value = '';
    } else {
      alert('Please enter a valid email address (e.g., name@example.com).');
    }
  });
});

// ========================
// 3. BACK TO TOP BUTTON
// ========================
document.addEventListener('DOMContentLoaded', function() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  // Show/hide based on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });

  // Scroll to top on click
  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


// Navbar background on scroll
window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('dark-bg');
  } else {
    header.classList.remove('dark-bg');
  }
});

// Mobile menu toggle
var mobileBtn = document.getElementById('mobileMenuBtn');
var navbar = document.getElementById('navbar');
if (mobileBtn && navbar) {
  mobileBtn.addEventListener('click', function() {
    navbar.classList.toggle('active');
    var icon = mobileBtn.querySelector('i');
    if (navbar.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}


// ========== MODAL FUNCTIONALITY ==========
var modal = document.getElementById('appointmentModal');
var bookBtn = document.querySelector('#contact-cta .btn-primary');
var closeBtn = document.querySelector('.close-modal');

if (bookBtn && modal && closeBtn) {
  // Open modal when clicking "Book an Appointment"
  bookBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
  });

  // Close modal when clicking X
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Handle form submission (prevent actual submit, show success message)
  var form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('✅ Appointment request sent! We will contact you soon.');
      modal.style.display = 'none';
      form.reset(); // clear all fields
    });
  }
}
