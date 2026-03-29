(function () {
    function getCurrentPage() {
        var path = window.location.pathname;
        var file = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
        return file || 'index.html';
    }

    function setActiveNavLink() {
        var currentPage = getCurrentPage();
        var links = document.querySelectorAll('.nav-links a');

        links.forEach(function (link) {
            var href = (link.getAttribute('href') || '').toLowerCase();
            link.classList.remove('active');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    function setupMobileMenu() {
        var navbar = document.querySelector('.navbar');
        var toggle = document.querySelector('.menu-toggle');
        if (!navbar || !toggle) return;

        function closeMenu() {
            navbar.classList.remove('menu-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open navigation menu');
        }

        toggle.addEventListener('click', function () {
            var isOpen = navbar.classList.toggle('menu-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    function animateOnScroll() {
        var targets = document.querySelectorAll('.hero, .profile-box, .about, .project, .contact, .project-item');
        if (!targets.length) return;

        targets.forEach(function (el, i) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.transitionDelay = (i % 4) * 0.08 + 's';
        });

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        targets.forEach(function (el) {
            observer.observe(el);
        });
    }

    function addCardHoverEffect() {
        var cards = document.querySelectorAll('.project-item, .profile-box');
        cards.forEach(function (card) {
            card.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
            card.addEventListener('mouseenter', function () {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.25)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    function setupContactForm() {
        var form = document.querySelector('.contact form');
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = form.querySelector('#name');
            var phone = form.querySelector('#phone');
            var email = form.querySelector('#email');
            var subject = form.querySelector('#subject');
            var message = form.querySelector('#message');
            var submitBtn = form.querySelector('button[type="submit"]');

            var phoneValue = (phone.value || '').replace(/\s+/g, '');
            var phoneValid = /^[+]?[0-9]{10,15}$/.test(phoneValue);
            var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value || '');

            if (!name.value.trim() || !subject.value.trim() || !message.value.trim()) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!phoneValid) {
                alert('Please enter a valid phone number (10 to 15 digits).');
                phone.focus();
                return;
            }

            if (!emailValid) {
                alert('Please enter a valid email address.');
                email.focus();
                return;
            }

            submitBtn.disabled = true;
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';

            setTimeout(function () {
                alert('Thank you! Your message has been captured locally.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 700);
        });
    }

    function updateFooterYear() {
        var year = new Date().getFullYear();
        var footerTexts = document.querySelectorAll('.footer p');

        footerTexts.forEach(function (textNode) {
            textNode.textContent = textNode.textContent.replace(/\b20\d{2}\b/, String(year));
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        setActiveNavLink();
        setupMobileMenu();
        animateOnScroll();
        addCardHoverEffect();
        setupContactForm();
        updateFooterYear();
    });

    function validateForm() {
        var name = document.getElementById('name').value;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;

        if (!name || !phone || !email || !subject || !message) {
            alert("Please fill in all required fields.");
            return false;
        }

        var phoneValue = (phone || '').replace(/\s+/g, '');

        if (!/^[+]?[0-9]{10,15}$/.test(phoneValue)) {
            alert("Please enter a valid phone number (10 to 15 digits).");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        return true;
    
    }
})();
