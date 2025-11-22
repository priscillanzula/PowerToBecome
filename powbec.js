// PowBec School Modal and Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    const modal = document.getElementById('enrollmentModal');
    const messageDiv = document.getElementById('formMessage');

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
        
        // Submit form (using Formspree)
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showMessage('🎉 Thank you for your enrollment! We will contact you shortly with more details.', 'success');
                enrollmentForm.reset();
                
                // Close modal after success
                setTimeout(() => {
                    closeEnrollmentModal();
                }, 3000);
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
        // Basic validation
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
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
});

// Modal functions
function openEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    
    // Reset form message
    const messageDiv = document.getElementById('formMessage');
    messageDiv.style.display = 'none';
}