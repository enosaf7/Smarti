// Navigation
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    slides.forEach(slide => slide.style.opacity = '0');
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.opacity = '1';
    setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

if (slides.length > 0) {
    showSlides();
}

function changeSlide(n) {
    slideIndex += n - 1;
    showSlides();
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
function submitContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset the form
    event.target.reset();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.feature-card, .project-preview, .value-card').forEach(el => {
    observer.observe(el);
});

// Sticky Navigation
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name.length < 2) {
            alert('Please enter a valid name');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (message.length < 10) {
            alert('Please enter a message with at least 10 characters');
            return;
        }
        
        submitContactForm(event);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 
// Close modal if clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactForm();
    }
} 

// Project filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.textContent.toLowerCase();
        
        projectCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const tags = card.querySelectorAll('.project-tag');
                const hasCategory = Array.from(tags).some(tag => 
                    tag.textContent.toLowerCase().includes(category)
                );
                card.style.display = hasCategory ? 'block' : 'none';
            }
        });
    });
});

// Project Modal
function showProjectDetails(projectId) {
    const modal = document.getElementById('projectModal');
    const detailsContainer = document.getElementById('projectDetails');
    
    // Show loading spinner
    detailsContainer.innerHTML = '<div class="loading-spinner"></div>';
    modal.style.display = 'block';
    
    // Simulate loading project details (replace with actual data fetching)
    setTimeout(() => {
        const projectData = getProjectData(projectId);
        detailsContainer.innerHTML = generateProjectHTML(projectData);
    }, 500);
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function getProjectData(projectId) {
    // Replace with actual project data
    const projects = {
        'facial-recognition': {
            title: 'Facial Recognition Attendance System',
            description: 'Detailed description of the facial recognition system...',
            features: [
                'Real-time face detection',
                'Automated attendance marking',
                'Secure database storage',
                'Report generation'
            ],
            technologies: ['Python', 'OpenCV', 'TensorFlow', 'SQL'],
            images: ['facial-rec-1.jpg', 'facial-rec-2.jpg']
        },
        'library-system': {
            title: 'Smart Library System',
            description: 'Detailed description of the library system...',
            features: [
                'Camera-based tracking',
                'Automated counting',
                'Usage analytics',
                'Report generation'
            ],
            technologies: ['Python', 'OpenCV', 'PostgreSQL', 'Flask'],
            images: ['library-1.jpg', 'library-2.jpg']
        }
    };
    
    return projects[projectId];
}

function generateProjectHTML(project) {
    return `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        
        <h3>Key Features</h3>
        <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>Technologies Used</h3>
        <div class="project-tags">
            ${project.technologies.map(tech => `
                <span class="project-tag">${tech}</span>
            `).join('')}
        </div>
        
        <h3>Gallery</h3>
        <div class="project-gallery">
            ${project.images.map(image => `
                <div class="gallery-item">
                    <img src="${image}" alt="Project Image">
                </div>
            `).join('')}
        </div>
    `;
} 
