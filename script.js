// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Simple scroll animation for cards
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  observer.observe(card);
});

// Contact form AJAX submission and thank you message
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        if (data.success === "true") {
          contactForm.reset();
          formMessage.textContent = "Thank you for reaching out. We will get back to you within 3 days.";
          formMessage.style.display = "block";
        } else {
          formMessage.textContent = "Oops! Something went wrong. Please try again.";
          formMessage.style.display = "block";
        }
      }).catch(() => {
        formMessage.textContent = "Oops! Something went wrong. Please try again.";
        formMessage.style.display = "block";
      });
  });
}