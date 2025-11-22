// PowBec School Modal and Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    const modal = document.getElementById('enrollmentModal');
    const messageDiv = document.getElementById('formMessage');
    const successDiv = document.getElementById('successMessage');

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            closeEnrollmentModal();
        }
        if (event.target === document.getElementById('courseModal')) {
            closeCourseModal();
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeEnrollmentModal();
            closeCourseModal();
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
                // Show success message
                showSuccessMessage();
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
        // Clear previous messages
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
        
        // Age validation
        if (data.age < 10 || data.age > 40) {
            showMessage('Please enter a valid age between 10 and 40 years.', 'error');
            return false;
        }
        
        // Study mode validation
        if (!data.studyMode) {
            showMessage('Please select your preferred mode of study.', 'error');
            return false;
        }
        
        // Required fields validation
        const requiredFields = ['fullName', 'email', 'phone', 'location', 'course', 'studyLevel'];
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        return true;
    }

    function showMessage(text, type) {
        if (!messageDiv) return;
        
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Scroll to message
        setTimeout(() => {
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    function showSuccessMessage() {
        // Hide form and show success message
        enrollmentForm.style.display = "none";
        successDiv.style.display = "block";
        
        // Scroll to success message
        setTimeout(() => {
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
});

// Modal functions
function openEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    const form = document.getElementById('enrollmentForm');
    const success = document.getElementById('successMessage');
    const messageDiv = document.getElementById('formMessage');

    if (modal) modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Reset view
    if (form) form.style.display = 'block';
    if (success) success.style.display = 'none';
    if (messageDiv) messageDiv.style.display = 'none';
}

function closeEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function goToMainSite() {
    window.location.href = 'index.html';
}

// Course Details Data
const courseDetails = {
    'computer-literacy': {
        title: 'Computer Literacy',
        description: 'Master essential computer skills for everyday use and professional development. Perfect for absolute beginners.',
        duration: '4 weeks',
        level: 'Beginner',
        modules: [
            'Computer Basics & Hardware Components',
            'Operating Systems (Windows/MacOS)',
            'File Management & Organization',
            'Internet Browsing & Online Safety',
            'Email Communication & Etiquette',
            'Microsoft Office Suite (Word, Excel, PowerPoint)',
            'Basic Troubleshooting & Maintenance',
            'Cloud Storage & Online Collaboration'
        ],
        outcomes: [
            'Confidently use computers for daily tasks and work',
            'Create professional documents, spreadsheets, and presentations',
            'Navigate the internet safely and conduct effective online research',
            'Manage files and folders efficiently across different storage systems',
            'Use email professionally for communication and job applications',
            'Perform basic computer troubleshooting and maintenance'
        ],
        applications: [
            '📝 Create professional CVs and job application documents',
            '💼 Work in offices as data entry clerk or administrative assistant',
            '🎓 Continue with advanced computer courses confidently',
            '🛒 Start online businesses or manage existing ones',
            '📊 Help small businesses with basic record keeping',
            '👨‍💻 Provide basic computer support in your community'
        ],
        careerPaths: ['Data Entry Clerk', 'Administrative Assistant', 'Computer Operator', 'Office Assistant', 'Customer Service Representative'],
        requirements: 'No prior experience needed. Access to a computer and internet required.'
    },

    'web-development': {
        title: 'Web Development',
        description: 'Learn to build modern, responsive websites from scratch using HTML, CSS, and JavaScript. Create stunning web experiences.',
        duration: '10 weeks',
        level: 'Beginner to Intermediate',
        modules: [
            'HTML5 Fundamentals & Semantic Structure',
            'CSS3 Styling & Layout Techniques',
            'Responsive Design with Flexbox & Grid',
            'JavaScript Programming Basics',
            'DOM Manipulation & Event Handling',
            'Bootstrap Framework for Rapid Development',
            'Version Control with Git & GitHub',
            'Web Hosting & Deployment to Live Servers',
            'Web Performance Optimization',
            'Basic SEO Principles'
        ],
        outcomes: [
            'Build fully responsive websites that work on all devices',
            'Create interactive web pages with dynamic content using JavaScript',
            'Implement modern design patterns and user experience principles',
            'Use Git for version control and collaborate on projects',
            'Deploy websites to live servers and manage hosting',
            'Understand web security basics and best practices'
        ],
        applications: [
            '💻 Create websites for local businesses in your community',
            '🛒 Build e-commerce sites for agricultural products',
            '🏢 Develop company websites and portfolios',
            '🎓 Create educational platforms for rural schools',
            '📱 Make mobile-friendly websites for growing businesses',
            '💼 Work as a freelance web developer remotely'
        ],
        careerPaths: ['Frontend Developer', 'Web Designer', 'UI/UX Developer', 'Freelance Web Developer', 'WordPress Developer'],
        requirements: 'Basic computer literacy. No coding experience required.'
    },

    'python-programming': {
        title: 'Python Programming',
        description: 'Learn Python programming from basics to advanced concepts. Python is versatile and used in web development, data science, automation, and more.',
        duration: '6 weeks',
        level: 'Beginner to Intermediate',
        modules: [
            'Python Syntax & Basic Programming Concepts',
            'Data Types, Variables & Basic Operations',
            'Control Structures (Loops & Conditionals)',
            'Functions, Modules & Code Organization',
            'File Handling & I/O Operations',
            'Error Handling & Debugging Techniques',
            'Object-Oriented Programming Principles',
            'Working with Libraries & External Packages',
            'Basic Data Structures (Lists, Dictionaries)',
            'Introduction to APIs and Web Scraping'
        ],
        outcomes: [
            'Write Python programs to automate repetitive tasks',
            'Solve real-world problems using programming logic',
            'Work with files and data processing',
            'Create reusable code with functions and modules',
            'Understand object-oriented programming concepts',
            'Build foundation for data science or web development'
        ],
        applications: [
            '🤖 Automate daily tasks like file organization and data entry',
            '📊 Process and analyze agricultural data for farmers',
            '🌐 Build simple web applications and APIs',
            '📈 Create data visualization for small businesses',
            '🔍 Web scraping for market research',
            '🎮 Develop simple games and interactive applications'
        ],
        careerPaths: ['Python Developer', 'Automation Engineer', 'Data Analyst', 'Backend Developer', 'Software Developer'],
        requirements: 'Basic computer literacy. No programming experience needed.'
    },

    'data-analysis': {
        title: 'Data Analysis',
        description: 'Transform raw data into meaningful insights and actionable business intelligence using Excel, Power BI, and Tableau.',
        duration: '8 weeks',
        level: 'Beginner to Intermediate',
        modules: [
            'Excel Advanced Functions & Formulas Mastery',
            'Data Cleaning, Transformation & Preparation',
            'Pivot Tables & Advanced Data Summarization',
            'Data Visualization Techniques in Excel',
            'Power BI Desktop Fundamentals & DAX',
            'Tableau for Interactive Data Visualization',
            'Python for Data Analysis with Pandas',
            'Creating Interactive Dashboards & Reports',
            'Statistical Analysis for Business Decisions',
            'Data Storytelling & Presentation Skills'
        ],
        outcomes: [
            'Clean, transform, and prepare messy data for analysis',
            'Create compelling data visualizations and dashboards',
            'Perform advanced data analysis using multiple tools',
            'Build interactive reports for business intelligence',
            'Use statistical methods to derive insights from data',
            'Present data findings effectively to stakeholders'
        ],
        applications: [
            '📈 Analyze sales data for small businesses',
            '🏥 Help clinics track patient data and trends',
            '🌾 Analyze agricultural data for better crop yields',
            '🏪 Optimize inventory for retail businesses',
            '📊 Create school performance dashboards',
            '💼 Provide data analysis services to local organizations'
        ],
        careerPaths: ['Data Analyst', 'Business Analyst', 'Reporting Analyst', 'Excel Specialist', 'BI Developer'],
        requirements: 'Basic computer literacy and familiarity with Excel recommended.'
    },

    'data-science-ml': {
        title: 'Data Science & Machine Learning',
        description: 'Dive into machine learning and predictive analytics. Learn to build intelligent systems that can predict outcomes and discover patterns.',
        duration: '12 weeks',
        level: 'Intermediate to Advanced',
        modules: [
            'Advanced Python for Data Science',
            'NumPy & Pandas for Data Manipulation',
            'Data Visualization with Matplotlib & Seaborn',
            'Statistical Analysis & Hypothesis Testing',
            'Machine Learning Fundamentals & Concepts',
            'Supervised Learning Algorithms (Regression, Classification)',
            'Unsupervised Learning & Clustering Techniques',
            'Model Evaluation, Validation & Hyperparameter Tuning',
            'Introduction to Deep Learning & Neural Networks',
            'ML Model Deployment & Real-world Applications'
        ],
        outcomes: [
            'Build and train machine learning models for prediction',
            'Perform advanced statistical analysis on complex datasets',
            'Create predictive models for business and research',
            'Understand and implement various ML algorithms',
            'Work with real-world datasets and solve practical problems',
            'Deploy ML models and integrate them into applications'
        ],
        applications: [
            '🎯 Predict crop yields for agricultural planning',
            '🏥 Develop disease prediction models for healthcare',
            '💳 Build fraud detection systems for financial services',
            '🛒 Create recommendation systems for e-commerce',
            '📊 Analyze customer behavior for businesses',
            '🔮 Predict market trends for investment decisions'
        ],
        careerPaths: ['Data Scientist', 'Machine Learning Engineer', 'AI Specialist', 'Research Analyst', 'ML Developer'],
        requirements: 'Python programming knowledge and basic statistics understanding.'
    },

    'artificial-intelligence': {
        title: 'Artificial Intelligence',
        description: 'Explore the cutting-edge world of AI. Learn about neural networks, natural language processing, and how AI is transforming industries.',
        duration: '10 weeks',
        level: 'Intermediate to Advanced',
        modules: [
            'AI History, Evolution & Fundamental Concepts',
            'Neural Networks & Deep Learning Architectures',
            'Natural Language Processing (NLP) & Text Analysis',
            'Computer Vision & Image Recognition Systems',
            'Reinforcement Learning & Autonomous Systems',
            'AI Ethics, Bias & Responsible AI Development',
            'AI in Business Applications & Automation',
            'Building End-to-End AI Projects',
            'AI Model Deployment & Scalability',
            'Future Trends in Artificial Intelligence'
        ],
        outcomes: [
            'Understand AI concepts and their real-world applications',
            'Build and train basic neural networks for various tasks',
            'Work with NLP for text analysis and language understanding',
            'Implement computer vision for image recognition',
            'Understand AI ethics and develop responsible AI systems',
            'Deploy AI solutions and integrate them into business processes'
        ],
        applications: [
            '🤖 Develop chatbots for customer service in local businesses',
            '👁️ Create image recognition for agricultural quality control',
            '🗣️ Build voice assistants for educational purposes',
            '📝 Develop content generation tools for marketing',
            '🔍 Create intelligent search systems for databases',
            '🏭 Implement AI-powered automation in small industries'
        ],
        careerPaths: ['AI Engineer', 'Machine Learning Specialist', 'NLP Engineer', 'Computer Vision Engineer', 'AI Researcher'],
        requirements: 'Python programming and basic machine learning knowledge.'
    },

    'digital-marketing': {
        title: 'Digital Marketing',
        description: 'Master the art of online marketing. Learn to build brands, reach customers, and grow businesses through digital channels.',
        duration: '6 weeks',
        level: 'Beginner to Intermediate',
        modules: [
            'Digital Marketing Fundamentals & Strategy',
            'Social Media Marketing Across Platforms',
            'Search Engine Optimization (SEO) Techniques',
            'Content Marketing & Creation Strategies',
            'Email Marketing Campaigns & Automation',
            'Google Analytics & Performance Tracking',
            'Paid Advertising (PPC & Social Media Ads)',
            'Marketing Automation & CRM Tools',
            'Influencer Marketing & Community Building',
            'Digital Marketing Analytics & ROI Measurement'
        ],
        outcomes: [
            'Create and execute comprehensive digital marketing campaigns',
            'Optimize websites and content for search engines',
            'Manage social media accounts professionally across platforms',
            'Analyze marketing performance and make data-driven decisions',
            'Create engaging content that converts visitors to customers',
            'Run effective paid advertising campaigns within budget'
        ],
        applications: [
            '📱 Manage social media for local businesses and organizations',
            '🛒 Help farmers market products online',
            '🏢 Boost online presence for community projects',
            '🎓 Promote educational programs and workshops',
            '💼 Work as freelance digital marketing consultant',
            '🌐 Help NGOs with online fundraising campaigns'
        ],
        careerPaths: ['Digital Marketing Specialist', 'Social Media Manager', 'SEO Specialist', 'Content Marketer', 'Digital Strategist'],
        requirements: 'Basic computer literacy and internet knowledge.'
    },

    'mobile-app-development': {
        title: 'Mobile App Development',
        description: 'Create powerful cross-platform mobile applications that run on both iOS and Android using modern development frameworks.',
        duration: '10 weeks',
        level: 'Beginner to Intermediate',
        modules: [
            'Dart Programming Language Fundamentals',
            'Flutter Framework & Widget-Based Development',
            'UI/UX Design Principles for Mobile Applications',
            'State Management in Flutter Applications',
            'REST API Integration & HTTP Requests',
            'MongoDB Database Design & Management',
            'Express.js & Node.js Backend Development',
            'React Native for Cross-Platform Development',
            'Mobile App Testing & Debugging',
            'App Store Deployment & Publishing'
        ],
        outcomes: [
            'Build cross-platform mobile apps for iOS and Android',
            'Create responsive and intuitive mobile user interfaces',
            'Connect mobile apps to backend services and databases',
            'Implement state management for complex applications',
            'Deploy apps to Google Play Store and Apple App Store',
            'Understand full-stack mobile development workflow'
        ],
        applications: [
            '📱 Create agricultural apps for farmers in rural areas',
            '🏥 Develop healthcare apps for remote consultations',
            '🎓 Build educational apps for remote learning',
            '🛒 Make e-commerce apps for local businesses',
            '💼 Develop utility apps for community services',
            '🌾 Create farming management and tracking apps'
        ],
        careerPaths: ['Mobile App Developer', 'Flutter Developer', 'React Native Developer', 'Full-Stack Developer', 'App Developer'],
        requirements: 'Basic programming knowledge recommended.'
    },

    'graphic-design': {
        title: 'Graphic Design',
        description: 'Learn professional design skills to create stunning visual content. Master both quick design tools and professional software.',
        duration: '6 weeks',
        level: 'Beginner to Intermediate',
        modules: [
            'Design Principles, Color Theory & Composition',
            'Canva for Quick & Professional Designs',
            'Adobe Photoshop for Image Editing & Manipulation',
            'Adobe Illustrator for Vector Graphics & Logos',
            'Typography & Layout Design Fundamentals',
            'Brand Identity Creation & Style Guides',
            'Social Media Graphics & Marketing Materials',
            'Print vs Digital Design Considerations',
            'Design Portfolio Development',
            'Client Communication & Project Management'
        ],
        outcomes: [
            'Create professional designs for various media and platforms',
            'Understand and apply design principles effectively',
            'Use industry-standard design tools proficiently',
            'Develop complete brand identities and style guides',
            'Create compelling marketing and social media materials',
            'Build a professional design portfolio for clients'
        ],
        applications: [
            '🎨 Design logos and branding for local businesses',
            '📱 Create social media content for organizations',
            '📄 Design professional documents and presentations',
            '🛍️ Make marketing materials for agricultural products',
            '🏫 Create educational materials for schools',
            '💼 Work as freelance graphic designer'
        ],
        careerPaths: ['Graphic Designer', 'UI/UX Designer', 'Brand Designer', 'Visual Designer', 'Marketing Designer'],
        requirements: 'Basic computer literacy. Creative mindset helpful.'
    },

    'database-management': {
        title: 'Database Management',
        description: 'Master the art of data storage, retrieval, and management. Learn to design efficient databases and write powerful SQL queries for data-driven applications.',
        duration: '8 weeks',
        level: 'Beginner to Intermediate',
        modules: [
            'Database Fundamentals & Relational Concepts',
            'MySQL Installation & Configuration',
            'SQL Basics: SELECT, INSERT, UPDATE, DELETE',
            'Database Design & Normalization Principles',
            'Advanced SQL: JOINs, Subqueries & Aggregations',
            'Stored Procedures, Functions & Triggers',
            'Database Security & User Management',
            'Indexing & Query Optimization',
            'Backup, Recovery & Database Maintenance',
            'Working with Multiple Database Systems',
            'Database Migration & Version Control',
            'Real-world Database Project Development'
        ],
        outcomes: [
            'Design and create efficient, normalized database structures',
            'Write complex SQL queries for data retrieval and manipulation',
            'Implement database security measures and user access controls',
            'Optimize database performance through indexing and query tuning',
            'Create stored procedures and triggers for business logic',
            'Perform database backups, recovery, and maintenance tasks',
            'Work with multiple database management systems',
            'Integrate databases with web applications and APIs'
        ],
        applications: [
            '🏪 Build inventory management systems for small businesses',
            '🏥 Create patient records systems for clinics and hospitals',
            '🏫 Develop student information systems for schools',
            '🌾 Design crop and livestock tracking databases for farmers',
            '💼 Build customer relationship management (CRM) systems',
            '📊 Create data warehouses for business intelligence',
            '🛒 Develop e-commerce product and order management systems',
            '🏢 Build employee management and payroll systems'
        ],
        careerPaths: ['Database Administrator', 'SQL Developer', 'Database Analyst', 'Backend Developer', 'Data Engineer', 'Business Intelligence Analyst'],
        technologies: ['MySQL', 'SQL Server', 'PostgreSQL', 'SQLite', 'phpMyAdmin', 'MySQL Workbench'],
        requirements: 'Basic computer literacy. No prior database experience required.'
    },

    'software-development': {
        title: 'Software Development',
        description: 'Become a full-stack software developer. Learn to build complete web applications from frontend to backend with modern technologies.',
        duration: '14 weeks',
        level: 'Beginner to Advanced',
        modules: [
            'Software Development Lifecycle & Methodologies',
            'Agile Development & Scrum Framework',
            'Database Design & SQL Programming',
            'Backend Development with Node.js & Express',
            'Frontend Development with React.js',
            'RESTful API Development & Integration',
            'Authentication & Authorization Systems',
            'Testing, Debugging & Quality Assurance',
            'Deployment, DevOps & Cloud Basics',
            'Software Architecture & Design Patterns'
        ],
        outcomes: [
            'Develop full-stack web applications from concept to deployment',
            'Understand and apply software engineering best practices',
            'Work effectively in development teams using Agile methodology',
            'Build and consume RESTful APIs for data exchange',
            'Implement secure authentication and authorization systems',
            'Deploy applications to cloud platforms and manage infrastructure'
        ],
        applications: [
            '💻 Build custom software solutions for local businesses',
            '🏢 Develop management systems for schools and organizations',
            '🛒 Create e-commerce platforms for agricultural markets',
            '📊 Build data management systems for healthcare',
            '🎓 Develop learning management systems for education',
            '🌐 Create community platforms for rural development'
        ],
        careerPaths: ['Full-Stack Developer', 'Software Engineer', 'Web Developer', 'Backend Developer', 'Systems Analyst'],
        requirements: 'Basic programming knowledge and computer literacy.'
    }
};

// Course Modal Functions
function openCourseModal(courseId) {
    const course = courseDetails[courseId];
    if (!course) return;

    const modal = document.getElementById('courseModal');
    const title = document.getElementById('courseModalTitle');
    const content = document.getElementById('courseModalContent');

    if (!modal || !title || !content) return;

    title.textContent = course.title;
    
    content.innerHTML = `
        <div class="course-details-content">
            <div class="course-description">
                <p><strong>Course Overview:</strong> ${course.description}</p>
            </div>
            
            <div class="course-highlights">
                <div class="highlight-card">
                    <div class="icon">⏱️</div>
                    <p><strong>Duration:</strong><br>${course.duration}</p>
                </div>
                <div class="highlight-card">
                    <div class="icon">📈</div>
                    <p><strong>Level:</strong><br>${course.level}</p>
                </div>
                <div class="highlight-card">
                    <div class="icon">🎯</div>
                    <p><strong>Career Paths:</strong><br>${course.careerPaths.slice(0, 2).join(', ')}</p>
                </div>
            </div>

            <div class="course-modules">
                <h4>📚 What You Will Learn</h4>
                <ul class="module-list">
                    ${course.modules.map(module => `<li>${module}</li>`).join('')}
                </ul>
            </div>

            <div class="course-outcomes">
                <h4>✅ Skills You Will Master</h4>
                <ul class="outcomes-list">
                    ${course.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                </ul>
            </div>

            <div class="course-applications">
                <h4>💼 Practical Applications</h4>
                <p><strong>After this course, you can:</strong></p>
                <div class="applications-grid">
                    ${course.applications.map(app => `
                        <div class="application-card">
                            <div class="app-icon">${app.split(' ')[0]}</div>
                            <p>${app.split(' ').slice(1).join(' ')}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="career-opportunities">
                <h4>🚀 Career Opportunities</h4>
                <div class="career-tags">
                    ${course.careerPaths.map(path => `<span class="career-tag">${path}</span>`).join('')}
                </div>
            </div>

            <div class="requirements">
                <h4>📋 Requirements</h4>
                <p>${course.requirements}</p>
            </div>

            <div class="course-actions">
                <button class="enroll-from-details" onclick="closeCourseModal(); openEnrollmentModal(); setSelectedCourse('${course.title}')">
                    🎓 Enroll in This Course
                </button>
                <button class="learn-more-btn" onclick="closeCourseModal()">
                    ← Back to All Courses
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function setSelectedCourse(courseName) {
    const courseSelect = document.getElementById('course');
    if (courseSelect) {
        courseSelect.value = courseName;
    }
}