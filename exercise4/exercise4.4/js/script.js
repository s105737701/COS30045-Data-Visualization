// ===========================
// Set Current Year in Footer
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Initialize FAQ accordion
    initializeFAQ();
});

// ===========================
// FAQ Accordion Functionality
// ===========================

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(button) {
    // Get the answer div that comes after the button
    const answer = button.nextElementSibling;
    
    // If this button's answer is already showing, close it
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        answer.classList.remove('show');
    } else {
        // Close all other open FAQs
        const allQuestions = document.querySelectorAll('.faq-question');
        const allAnswers = document.querySelectorAll('.faq-answer');
        
        allQuestions.forEach(q => q.classList.remove('active'));
        allAnswers.forEach(a => a.classList.remove('show'));
        
        // Open this FAQ
        button.classList.add('active');
        answer.classList.add('show');
    }
}

// ===========================
// Highlight Active Navigation Link
// ===========================

window.addEventListener('load', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
