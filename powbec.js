// PowBec School Modal and Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    const modal = document.getElementById('enrollmentModal');

    // NEW — success message container (instead of using formMessage)
    const messageDiv = document.getElementById('formMessage');
    const successDiv = document.getElementById('successMessage'); // Add this to HTML

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            closeEnrollmentModal();
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeEnrollmentModal();
        }
    });

    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');

        // Validate form
        if (!validateForm(Object.fromEntries(formData))) {
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Submit to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {

                // HIDE form
                enrollmentForm.style.display = "none";

                // SHOW success message + button
                successDiv.style.display = "block";

                enrollmentForm.reset();

            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            showMessage('❌ There was an error submitting your enrollment. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            submitBtn.textContent = 'Submit Enrollment';
            submitBtn.disabled = false;
        });
    });

    function validateForm(data) {
        if (data.age < 10 || data.age > 25) {
            showMessage('Please enter a valid age between 10 and 25 years.', 'error');
            return false;
        }
        
        if (!data.studyMode) {
            showMessage('Please select your preferred mode of study.', 'error');
            return false;
        }
        
        return true;
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';

        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Modal functions
function openEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    const form = document.getElementById('enrollmentForm');
    const success = document.getElementById('successMessage');

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Reset view
    form.style.display = 'block';
    success.style.display = 'none';
}

function closeEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
