document.addEventListener('DOMContentLoaded', function() {
    const consultForm = document.getElementById('consult-form');
    const previousConsultations = document.getElementById('previous-consultations');

    // Load previous consultations from local storage
    function loadPreviousConsultations() {
        const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        previousConsultations.innerHTML = consultations.map((consultation, index) => `
            <div class="consultation-item" key="${index}">
                <h3>استشارة رقم ${index + 1}</h3>
                <p><strong>الاسم:</strong> ${consultation.name}</p>
                <p><strong>نوع الاستشارة:</strong> ${consultation.consultationType}</p>
                <p><strong>التفاصيل:</strong> ${consultation.details}</p>
                <small>${new Date(consultation.date).toLocaleString()}</small>
            </div>
        `).join('');
    }

    // Save consultation to local storage
    function saveConsultation(consultationData) {
        const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        consultations.push(consultationData);
        localStorage.setItem('consultations', JSON.stringify(consultations));
        loadPreviousConsultations();
    }

    // Form submission handler
    consultForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const consultationData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            consultationType: document.getElementById('consultation-type').value,
            details: document.getElementById('details').value,
            date: new Date().toISOString()
        };

        saveConsultation(consultationData);
        consultForm.reset();
        alert('تم إرسال الاستشارة بنجاح!');
    });

    // Initial load of previous consultations
    loadPreviousConsultations();

    // Modal Interaction
    const newConsultationBtn = document.querySelector('.new-consultation-btn');
    const consultationModal = document.getElementById('new-consultation-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const consultationForm = document.getElementById('consultation-form');

    // Open Modal
    newConsultationBtn.addEventListener('click', function() {
        consultationModal.classList.remove('hidden');
    });

    // Close Modal
    closeModalBtn.addEventListener('click', function() {
        consultationModal.classList.add('hidden');
    });

    // Close Modal when clicking outside
    consultationModal.addEventListener('click', function(event) {
        if (event.target === consultationModal) {
            consultationModal.classList.add('hidden');
        }
    });

    // Consultation Form Submission
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const consultationData = {
            category: document.getElementById('consultation-category').value,
            details: document.getElementById('consultation-details').value,
            urgency: document.getElementById('consultation-urgency').value,
            timestamp: new Date().toISOString()
        };

        // Validate form
        if (!consultationData.category || !consultationData.details) {
            alert('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        // Save consultation
        const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        consultations.push(consultationData);
        localStorage.setItem('consultations', JSON.stringify(consultations));

        // Update dashboard
        updateDashboardStats();

        // Close modal and reset form
        consultationModal.classList.add('hidden');
        consultationForm.reset();

        // Show success message
        alert('تم إرسال استشارتك بنجاح! سيتم الرد عليها قريبًا.');
    });

    // Update Dashboard Statistics
    function updateDashboardStats() {
        const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        const activeConsultations = consultations.filter(c => c.status !== 'completed').length;
        const completedConsultations = consultations.filter(c => c.status === 'completed').length;

        const activeConsultationElement = document.querySelector('.consultations-summary .stats .stat-item:first-child h3');
        const completedConsultationElement = document.querySelector('.consultations-summary .stats .stat-item:last-child h3');

        if (activeConsultationElement) activeConsultationElement.textContent = activeConsultations;
        if (completedConsultationElement) completedConsultationElement.textContent = completedConsultations;
    }

    // Initialize Dashboard
    function initializeDashboard() {
        updateDashboardStats();
    }

    // Notification Simulation
    function simulateNotifications() {
        const notificationBtn = document.querySelector('.notification-btn');
        const badgeElement = notificationBtn.querySelector('.badge');

        // Simulate new notifications every few minutes
        setInterval(() => {
            const currentNotifications = parseInt(badgeElement.textContent);
            badgeElement.textContent = Math.min(currentNotifications + 1, 9);
        }, 180000); // Every 3 minutes
    }

    // Search Functionality
    const searchBar = document.querySelector('.search-bar input');
    searchBar.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        // Future implementation: Add search logic for consultations and experts
    });

    // Initialize App
    initializeDashboard();
    simulateNotifications();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Simulate search functionality
            alert(`البحث عن: ${query}`);
            // In a real app, this would trigger an actual search
        }
    }

    // Book Consultation Modal
    const bookConsultationButtons = document.querySelectorAll('.book-consultation-btn, .primary-btn');
    const consultationModal = createModal('حجز استشارة طبية', `
        <form id="consultation-form">
            <div class="form-group">
                <label for="name">الاسم الكامل</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="phone">رقم الهاتف</label>
                <input type="tel" id="phone" required>
            </div>
            <div class="form-group">
                <label for="service">نوع الخدمة</label>
                <select id="service">
                    <option value="">اختر الخدمة</option>
                    <option value="cardiology">طب القلب</option>
                    <option value="neurology">طب الأعصاب</option>
                    <option value="general">استشارة عامة</option>
                </select>
            </div>
            <div class="form-group">
                <label for="date">التاريخ المفضل</label>
                <input type="date" id="date" required>
            </div>
            <button type="submit" class="submit-btn">تأكيد الحجز</button>
        </form>
    `);

    bookConsultationButtons.forEach(button => {
        button.addEventListener('click', () => {
            consultationModal.show();
        });
    });

    // Login Modal
    const loginButtons = document.querySelectorAll('.login-btn');
    const loginModal = createModal('تسجيل الدخول', `
        <form id="login-form">
            <div class="form-group">
                <label for="email">البريد الإلكتروني</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">كلمة المرور</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit" class="submit-btn">تسجيل الدخول</button>
            <p class="forgot-password">نسيت كلمة المرور؟</p>
        </form>
    `);

    loginButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.show();
        });
    });

    // Signup Modal
    const signupButtons = document.querySelectorAll('.signup-btn');
    const signupModal = createModal('إنشاء حساب جديد', `
        <form id="signup-form">
            <div class="form-group">
                <label for="full-name">الاسم الكامل</label>
                <input type="text" id="full-name" required>
            </div>
            <div class="form-group">
                <label for="signup-email">البريد الإلكتروني</label>
                <input type="email" id="signup-email" required>
            </div>
            <div class="form-group">
                <label for="signup-password">كلمة المرور</label>
                <input type="password" id="signup-password" required>
            </div>
            <div class="form-group">
                <label for="confirm-password">تأكيد كلمة المرور</label>
                <input type="password" id="confirm-password" required>
            </div>
            <button type="submit" class="submit-btn">إنشاء حساب</button>
        </form>
    `);

    signupButtons.forEach(button => {
        button.addEventListener('click', () => {
            signupModal.show();
        });
    });

    // Notification handling
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationBadge = document.querySelector('.badge');

    notificationBtn.addEventListener('click', () => {
        alert('لديك 3 إشعارات جديدة');
        notificationBadge.textContent = '0';
    });

    // Modal creation utility function
    function createModal(title, content) {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modalContainer);

        const closeButton = modalContainer.querySelector('.close-modal');
        closeButton.addEventListener('click', hide);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                hide();
            }
        });

        function show() {
            modalContainer.classList.add('show');
        }

        function hide() {
            modalContainer.classList.remove('show');
        }

        return { show, hide };
    }

    // Form submission handlers
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;

        if (form.id === 'consultation-form') {
            alert('تم حجز الاستشارة بنجاح!');
            consultationModal.hide();
        } else if (form.id === 'login-form') {
            alert('تم تسجيل الدخول بنجاح!');
            loginModal.hide();
        } else if (form.id === 'signup-form') {
            const password = form.querySelector('#signup-password').value;
            const confirmPassword = form.querySelector('#confirm-password').value;

            if (password !== confirmPassword) {
                alert('كلمات المرور غير متطابقة');
                return;
            }

            alert('تم إنشاء الحساب بنجاح!');
            signupModal.hide();
        }
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal Handling
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeButtons = document.querySelectorAll('.close');

    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });

    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(signupModal);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form Validation and Submission
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        if (!validateEmail(email)) {
            showNotification('البريد الإلكتروني غير صالح', 'error');
            return;
        }

        if (!validatePassword(password)) {
            showNotification('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 'error');
            return;
        }

        // Simulate login (replace with actual authentication logic)
        showNotification('تم تسجيل الدخول بنجاح', 'success');
        closeModal(loginModal);
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

        if (fullName.trim() === '') {
            showNotification('الرجاء إدخال الاسم الكامل', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('البريد الإلكتروني غير صالح', 'error');
            return;
        }

        if (!validatePassword(password)) {
            showNotification('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('كلمتا المرور غير متطابقتين', 'error');
            return;
        }

        // Simulate signup (replace with actual signup logic)
        showNotification('تم إنشاء الحساب بنجاح', 'success');
        closeModal(signupModal);
    });

    // Notification Styles
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px;
            border-radius: 5px;
            color: white;
            z-index: 1100;
            text-align: center;
        }
        .notification.success {
            background-color: #2ecc71;
        }
        .notification.error {
            background-color: #e74c3c;
        }
        .notification.info {
            background-color: #3498db;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
});
