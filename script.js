// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards for fade-in animation
document.querySelectorAll('.card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// Animated counter for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Add interactive effects for cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showAlert('يرجى ملء جميع الحقول المطلوبة', 'warning');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('يرجى إدخال بريد إلكتروني صحيح', 'warning');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showAlert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Login button functionality
document.querySelectorAll('.login-btn, .cta-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        // Simulate login/registration process
        const originalText = this.textContent;
        this.textContent = 'جاري التحميل...';
        this.disabled = true;
        
        setTimeout(() => {
            showAlert('سيتم توجيهك إلى صفحة تسجيل الدخول قريباً', 'info');
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Plan selection functionality
document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const planName = this.closest('.plan-card').querySelector('.card-title').textContent;
        showAlert(`تم اختيار ${planName}. سيتم التواصل معك قريباً لتأكيد الاشتراك.`, 'success');
    });
});

// Add percentage indicators to stats
function addPercentageIndicators() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const percentage = item.getAttribute('data-percentage');
        if (percentage) {
            const indicator = document.createElement('div');
            indicator.className = 'stat-percentage';
            indicator.textContent = `+${percentage}%`;
            item.appendChild(indicator);
        }
    });
}

// Animate circular progress for stats
function animateCircularProgress() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const percentage = item.getAttribute('data-percentage');
        const circularProgress = item.querySelector('.circular-progress');
        
        if (circularProgress && percentage) {
            // Calculate the degree based on percentage
            const degree = (percentage / 100) * 360;
            
            // Set initial state
            circularProgress.style.background = `conic-gradient(#6c5ce7 0deg, #6c5ce7 0deg, rgba(255,255,255,0.2) 0deg)`;
            
            // Animate to final state
            setTimeout(() => {
                circularProgress.style.background = `conic-gradient(#6c5ce7 0deg, #6c5ce7 ${degree}deg, rgba(255,255,255,0.2) ${degree}deg)`;
            }, 500);
        }
    });
}

// Add floating animation to feature icons
function addFloatingAnimation() {
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Custom alert function using Bootstrap
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        direction: rtl;
    `;
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    addPercentageIndicators();
    animateCircularProgress();
    addFloatingAnimation();
    
    // Initialize typing effect
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
    
    // Add loading animation
    document.body.style.opacity = '1';
});

// Add smooth reveal animation for testimonials
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    testimonialObserver.observe(card);
});








