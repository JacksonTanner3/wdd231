// Course data array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('menu');
const courseListContainer = document.getElementById('course-list');
const courseCreditsDisplay = document.getElementById('course-total-credits');
const filterButtons = document.querySelectorAll('#course-filters button');

// Functions to handle dynamic content
function toggleMenu() {
    navMenu.classList.toggle('hidden');
}

function setDates() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;
}

function renderCourses(filteredCourses) {
    courseListContainer.innerHTML = '';
    let totalCredits = 0;

    if (filteredCourses.length === 0) {
        courseListContainer.innerHTML = '<p>No courses found for this filter.</p>';
    } else {
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number} - ${course.title}</h3>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Certificate:</strong> ${course.certificate}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
                <p>${course.description}</p>
            `;
            courseListContainer.appendChild(courseCard);
            totalCredits += course.credits;
        });
    }

    courseCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}

function filterAndRender(subject) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter-${subject.toLowerCase()}`).classList.add('active');

    let filteredCourses = courses;
    if (subject !== 'all') {
        filteredCourses = courses.filter(course => course.subject.toLowerCase() === subject.toLowerCase());
    }

    renderCourses(filteredCourses);
}

// Event listeners
menuToggle.addEventListener('click', toggleMenu);
filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const subject = event.target.id.replace('filter-', '');
        filterAndRender(subject);
    });
});

// Initial setup on page load
window.addEventListener('load', () => {
    setDates();
    filterAndRender('all');
});
