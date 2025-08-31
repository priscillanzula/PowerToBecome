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

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        contactForm.reset();
        // Option 1: Show inline message
        formMessage.textContent = "✅ Thank you! Your message has been sent.";
        formMessage.style.display = "block";

        // Option 2: Redirect to thank-you page
        // window.location.href = "thankyou.html"; // same tab
        // window.open("thankyou.html", "_blank"); // new tab
      } else {
        formMessage.textContent = "⚠️ Something went wrong. Please try again.";
        formMessage.style.display = "block";
      }
    }).catch(() => {
      formMessage.textContent = "⚠️ Network error. Please try again.";
      formMessage.style.display = "block";
    });
  });
}
