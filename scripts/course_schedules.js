// Ensures that the page is fully loaded before executing the load_page function
document.addEventListener('DOMContentLoaded', function() {
    load_page();
});

// Fetches course data from the server and populates it into sessionStorage
async function fetchCourseData() {
    if (!sessionStorage.getItem("all_course_data")) {
        await main(); // Assuming 'main' is defined in 'data_getter.js'
    }
    window.all_course_data = JSON.parse(sessionStorage.getItem("all_course_data") || "[]");
}

// Loads the list of courses based on selected filters such as semester, subject, instructor, and search query
async function load_list_element() {
    await fetchCourseData(); // Ensures course data is ready from sessionStorage

    // Extracts selected filters from the webpage
    const selectedSemester = document.getElementById('semester_selector').value;
    const selectedSubject = document.getElementById('subject_selector').value;
    const selectedInstructor = document.getElementById('faculty_selector').value;
    const searchQuery = document.getElementById('search_bar').value.trim().toLowerCase();

    // Filters the courses based on the selected filters
    let filteredCourses = all_course_data.filter(course => {
        const semesterMatch = selectedSemester === 'All Semesters' || Object.keys(course.Course_Schedule).some(key => key.includes(selectedSemester) && course.Course_Schedule[key] !== "-");
        const subjectMatch = selectedSubject === 'All Subjects' || course.Prefix.toLowerCase() === selectedSubject.toLowerCase();
        const instructorMatch = selectedInstructor === 'All Faculty' || course.Coordinator_Name.toLowerCase().includes(selectedInstructor.toLowerCase()) || course.Co_Coordinator_Name.toLowerCase().includes(selectedInstructor.toLowerCase());
        const keywordMatch = !searchQuery || course.Course_Name.toLowerCase().includes(searchQuery) || course.Description.toLowerCase().includes(searchQuery);

        return semesterMatch && subjectMatch && instructorMatch && keywordMatch;
    });

    // Renders the filtered courses onto the webpage
    renderCourses(filteredCourses);
}

// Renders the list of courses onto the webpage based on the provided course data
function renderCourses(courses) {
    const listBody = document.getElementById('list_body');
    listBody.innerHTML = ''; // Clear current list

    courses.forEach(course => {
        const htmlObj = document.createElement('div');
        htmlObj.classList.add("course-item", "animate_open_default");
        htmlObj.innerHTML = `
            <div class="list_element"> 
                <a class="title_size space_before" href="${course.Syllabus_Link}" target="_blank">${course.Prefix} ${course.Course_Number}: ${course.Course_Name}</a>
                <p>Faculty: ${course.Coordinator_Name || 'N/A'} / ${course.Co_Coordinator_Name || 'N/A'}</p>
                <p>Degree: ${course.Degree}</p>
                <p>Track: ${course.Track}</p>
            </div>`;
        listBody.appendChild(htmlObj);
    });
}

// Attaches event listeners to various elements on the webpage
function attachEventListeners() { 
    const search_bar = document.getElementById('search_bar');
    const semester_selector = document.getElementById('semester_selector');
    const subject_selector = document.getElementById('subject_selector');
    const faculty_selector = document.getElementById('faculty_selector');
    const bsitButton = document.getElementById('bsit');
    const msitButton = document.getElementById('msit');

    // Add event listeners for input changes and clicks
    if (search_bar && semester_selector && subject_selector && faculty_selector) {
        search_bar.addEventListener('input', load_list_element);
        semester_selector.addEventListener('change', load_list_element);
        subject_selector.addEventListener('change', load_list_element);
        faculty_selector.addEventListener('change', load_list_element);
    }

    // Add event listeners for BSIT and MSIT buttons
    if (bsitButton && msitButton) {
        bsitButton.addEventListener('click', () => filterByDegree('BSIT'));
        msitButton.addEventListener('click', () => filterByDegree('MSIT'));
    }
}

// Filters the list of courses based on the selected degree (BSIT or MSIT)
function filterByDegree(degree) {
    const filteredCourses = window.all_course_data.filter(course => {
        if (degree === 'BSIT') {
            return course.Degree === 'BSIT';
        } else if (degree === 'MSIT') {
            return course.Degree === 'MSIT';
        }
        return true; // If no degree is specified, do not filter out any courses.
    });

    // Renders the filtered courses onto the webpage
    renderCourses(filteredCourses);
}

// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page() {
    set_site_title(" - Course Schedules"); // set_site_title needs to be defined in your script
    load_list_element();
    attachEventListeners();
}
