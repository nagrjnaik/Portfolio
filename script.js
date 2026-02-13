// ====================================
// Initialize AOS (Animate On Scroll)
// ====================================

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ====================================
// Theme Toggle
// ====================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', currentTheme === 'dark');
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ====================================
// Mobile Navigation
// ====================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// ====================================
// Navbar Scroll Effect
// ====================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ====================================
// Active Navigation Link
// ====================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--primary-color)';
            } else {
                navLink.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ====================================
// Smooth Scrolling
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// PDF Modal Functions
// ====================================

const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfDownloadLink = document.getElementById('pdfDownloadLink');

function openPDFModal(pdfPath, title) {
    pdfModal.classList.add('active');
    pdfViewer.src = pdfPath;
    pdfModalTitle.textContent = title;
    pdfDownloadLink.href = pdfPath;
    pdfDownloadLink.download = title + '.pdf';
    body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        pdfModal.querySelector('.modal-container').style.opacity = '1';
    }, 10);
}

function closePDFModal() {
    pdfModal.classList.remove('active');
    pdfViewer.src = '';
    body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePDFModal();
        closeImageModal();
    }
});

// ====================================
// Image Modal Functions
// ====================================

const imageModal = document.getElementById('imageModal');
const imageViewer = document.getElementById('imageViewer');
const imageModalTitle = document.getElementById('imageModalTitle');

function openImageModal(imagePath, title) {
    imageModal.classList.add('active');
    imageViewer.src = imagePath;
    imageViewer.alt = title;
    imageModalTitle.textContent = title;
    body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        imageModal.querySelector('.modal-container').style.opacity = '1';
    }, 10);
}

function closeImageModal() {
    imageModal.classList.remove('active');
    imageViewer.src = '';
    body.style.overflow = '';
}

// ====================================
// Back to Top Button
// ====================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// Typing Effect for Hero Section (Optional Enhancement)
// ====================================

function typeWriter(element, text, speed = 50) {
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

// Optional: Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const heroSubtitle = document.querySelector('.hero-subtitle');
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 50);
// });

// ====================================
// Animated Counter for Stats
// ====================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(current));
        }
    }, 16);
}

function formatStatNumber(num) {
    if (num >= 10000) {
        return (num / 1000).toFixed(0) + 'K+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    } else if (num >= 100) {
        return num + '%';
    } else {
        return num + '+';
    }
}

// Trigger counter animation when stats come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.dataset.value || statNumber.textContent);
            
            // Set data-value attribute if not present
            if (!statNumber.dataset.value) {
                statNumber.dataset.value = targetValue;
            }
            
            animateCounter(statNumber, targetValue);
        }
    });
}, observerOptions);

// Observe all stat elements
document.querySelectorAll('.stat').forEach(stat => {
    // Store original values
    const statNumber = stat.querySelector('.stat-number');
    const text = statNumber.textContent;
    
    // Extract number from text
    let value;
    if (text.includes('K')) {
        value = parseFloat(text.replace(/[K+]/g, '')) * 1000;
    } else if (text.includes('%')) {
        value = parseInt(text.replace('%', ''));
    } else {
        value = parseInt(text.replace('+', ''));
    }
    
    statNumber.dataset.value = value;
    statNumber.textContent = '0';
    
    statsObserver.observe(stat);
});

// ====================================
// Skill Tag Interaction
// ====================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.transform = 'scale(1.1)';
        setTimeout(() => {
            tag.style.transform = '';
        }, 200);
    });
});

// ====================================
// Loading Animation (Optional)
// ====================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger any load-specific animations
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ====================================
// Print Functionality
// ====================================

function printResume() {
    window.print();
}

// ====================================
// Copy Email to Clipboard
// ====================================

function copyEmail() {
    const email = 'naiknagrj@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show success message
        showNotification('Email copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });
}

// ====================================
// Notification System
// ====================================

function showNotification(message, duration = 3000) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--success-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Hide notification after duration
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
    }, duration);
}

// ====================================
// Lazy Loading Images
// ====================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// Performance Optimization
// ====================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll event handling
}, 100));

// ====================================
// Console Message
// ====================================

console.log('%c👋 Welcome to my portfolio!', 'color: #4299e1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #48bb78; font-size: 14px;');
console.log('%chttps://github.com/nagrjnaik/Portfolio', 'color: #ed8936; font-size: 12px;');

// ====================================
// Service Worker Registration (Optional - for PWA)
// ====================================

// Uncomment to enable PWA features
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('SW registered:', registration);
//             })
//             .catch(error => {
//                 console.log('SW registration failed:', error);
//             });
//     });
// }

// ====================================
// Analytics (Optional - Add your tracking code)
// ====================================

// Example: Google Analytics
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'YOUR-GA-ID');

// ====================================
// Export functions to global scope for onclick handlers
// ====================================

window.openPDFModal = openPDFModal;
window.closePDFModal = closePDFModal;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.printResume = printResume;
window.copyEmail = copyEmail;
