async function fetchCourseData() {
    if (!sessionStorage.getItem("all_history_data")) {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/history');
        if (response.ok) {
            let historyData = await response.json();
            sessionStorage.setItem("all_history_data", JSON.stringify(historyData));
            window.all_course_data = JSON.parse(sessionStorage.getItem("all_history_data"));
        } else {
            console.error("Failed to fetch history data:", response.status);
            window.all_course_data = [];
        }
    } else {
        window.all_course_data = JSON.parse(sessionStorage.getItem("all_history_data"));
    }
}


function populateSemesterSelector() {
    const semesterSelector = document.getElementById('semester_selector');
    semesterSelector.innerHTML = '<option value="">All Semesters</option>';
    const uniqueSemesters = new Set();

    window.all_course_data.forEach(course => {
        uniqueSemesters.add(`${course.SEMESTER} ${course.YEAR}`);
    });

    uniqueSemesters.forEach(semester => {
        const option = document.createElement('option');
        option.value = semester;
        option.textContent = semester;
        semesterSelector.appendChild(option);
    });
}

function populateSubjectSelector() {
    const subjectSelector = document.getElementById('subject_selector');
    subjectSelector.innerHTML = '<option value="">All Subjects</option>';
    const uniqueSubjects = new Set();

    window.all_course_data.forEach(course => {
        uniqueSubjects.add(course.PREFIX);
    });

    uniqueSubjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectSelector.appendChild(option);
    });
}

function populateInstructorFilter() {
    const instructorSelector = document.getElementById('faculty_selector');
    instructorSelector.innerHTML = '<option value="">All Instructors</option>';
    const uniqueInstructors = new Set();

    window.all_course_data.forEach(course => {
        const fullName = `${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`;
        uniqueInstructors.add(fullName.trim());
    });

    uniqueInstructors.forEach(instructor => {
        const option = document.createElement('option');
        option.value = instructor;
        option.textContent = instructor;
        instructorSelector.appendChild(option);
    });
}

function updateButtonVisualState(activeButtonId) {
    const buttonIds = ['simple_list_btn', 'msit_group_btn', 'bsit_group_btn'];
    buttonIds.forEach(buttonId => {
        const imgElement = document.getElementById(buttonId).querySelector('img');
        if (imgElement) { 
            imgElement.style.display = buttonId === activeButtonId ? 'inline' : 'none';
        }
    });
} 

function simpleListView() {
   
    if (window.all_course_data && window.all_course_data.length > 0) {
        renderHistory(window.all_course_data); 
    } else {
        console.error("No data available to render.");
    }
    updateButtonVisualState('simple_list_btn'); 
}

function filterByDegree(degree) {
    let filteredCourses = window.all_course_data.filter(course => {
        if (course.PREFIX === 'IT') {
            return (degree === 'BSIT' && course.NUMBER >= 1000 && course.NUMBER <= 5000) ||
                   (degree === 'MSIT' && course.NUMBER >= 6000 && course.NUMBER <= 7000);
        }
        return false;
    });
    renderHistory(filteredCourses);
    const buttonId = degree === 'BSIT' ? 'bsit_group_btn' : 'msit_group_btn';
    updateButtonVisualState(buttonId);
}

function resetFilters() {
    document.getElementById('semester_selector').value = '';
    document.getElementById('subject_selector').value = '';
    document.getElementById('faculty_selector').value = '';
    document.getElementById('search_bar').value = ''; 
    simpleListView(); 
    updateButtonVisualState('simple_list_btn'); 
}

function filter_results() {
    const selectedSubject = document.getElementById('subject_selector').value;
    const selectedSemester = document.getElementById('semester_selector').value;
    const selectedInstructor = document.getElementById('faculty_selector').value;
    const searchQuery = document.getElementById('search_bar').value.trim().toLowerCase();
    load_list_element(searchQuery, selectedSemester, selectedSubject, selectedInstructor);
}

async function load_list_element(searchQuery = '', selectedSemester = '', selectedSubject = '', selectedInstructor = '') {
    await fetchCourseData(); 

    let filteredData = window.all_course_data.filter(course => {

        const courseCRN = course.CRN.toString();

       
        const matchesSearchQuery = !searchQuery || 
                                   course.PREFIX.toLowerCase().includes(searchQuery) ||
                                   course.NUMBER.toString().toLowerCase().includes(searchQuery) ||
                                   courseCRN.includes(searchQuery) || // Checking against CRN
                                   `${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`.toLowerCase().includes(searchQuery) ||
                                   course.SEMESTER.toLowerCase().includes(searchQuery) ||
                                   course.YEAR.toString().includes(searchQuery);

        const matchesSubject = selectedSubject === '' || course.PREFIX.toLowerCase() === selectedSubject.toLowerCase();
        const matchesSemester = selectedSemester === '' || `${course.SEMESTER} ${course.YEAR}` === selectedSemester;
        const instructorFullName = `${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`.trim().toLowerCase();
        const matchesInstructor = selectedInstructor === '' || instructorFullName === selectedInstructor.toLowerCase();

        return matchesSearchQuery && matchesSubject && matchesSemester && matchesInstructor;
    });

    renderHistory(filteredData); 
}


function renderHistory(historyData) {
    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    
    listBody.innerHTML = ''; 


    const tableHeaderHTML = `
    <p class="table_data">CRN</p>
    <p class="table_data">Semester</p> 
    <p class="table_data">Year</p>
    <p class="table_data">Prefix</p>
    <p class="table_data">Number</p>
    <p class="table_data">Section</p>
    <p class="table_data">Instructor NetID</p>
    <p class="table_data">Instructor Name</p> <!-- Combined First Name and Last Name -->
    <p class="table_data">Enrollment</p>
    `;

    const tableHeader = document.createElement('div');
    tableHeader.className = 'table_header header_row';
    tableHeader.innerHTML = tableHeaderHTML;
    listBody.appendChild(tableHeader);

    historyData.forEach(data => {
        const row = document.createElement('div');
        row.className = 'table_row';
        row.innerHTML = ` 
            <p class="table_data">${data.CRN}</p>
            <p class="table_data">${data.SEMESTER}</p>
            <p class="table_data">${data.YEAR}</p>
            <p class="table_data">${data.PREFIX}</p>
            <p class="table_data">${data.NUMBER}</p>
            <p class="table_data">${data.SECTION}</p>
            <p class="table_data">${data.INSTRUCTOR_NETID}</p>
            <p class="table_data">${data.INSTRUCTOR_FIRST_NAME} ${data.INSTRUCTOR_LAST_NAME}</p>
            <p class="table_data">${data.Enrollment}</p>
        `;
        listBody.appendChild(row);
    });
}

function attachEventListeners() {
    const semesterSelector = document.getElementById('semester_selector');
    const subjectSelector = document.getElementById('subject_selector');
    const facultySelector = document.getElementById('faculty_selector');
    const pictureButton = document.querySelector('.picture_button');
    const simpleListBtn = document.getElementById('simple_list_btn');
    const msitGroupBtn = document.getElementById('msit_group_btn');
    const bsitGroupBtn = document.getElementById('bsit_group_btn');
    const resetFiltersBtn = document.getElementById('reset_filters');

    if (semesterSelector) semesterSelector.addEventListener('change', filter_results);
    else console.error('semester_selector not found.');

    if (subjectSelector) subjectSelector.addEventListener('change', filter_results);
    else console.error('subject_selector not found.');

    if (facultySelector) facultySelector.addEventListener('change', filter_results);
    else console.error('faculty_selector not found.');

    if (pictureButton) pictureButton.addEventListener('click', filter_results);
    else console.error('.picture_button not found.');

    if (simpleListBtn) simpleListBtn.addEventListener('click', simpleListView);
    else console.error('simple_list_btn not found.');

    if (msitGroupBtn) msitGroupBtn.addEventListener('click', () => filterByDegree('MSIT'));
    else console.error('msit_group_btn not found.');

    if (bsitGroupBtn) bsitGroupBtn.addEventListener('click', () => filterByDegree('BSIT'));
    else console.error('bsit_group_btn not found.');

    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
    else console.error('reset_filters not found.');
}

async function load_page() {
    await fetchCourseData(); 
    populateSemesterSelector(); 
    populateSubjectSelector(); 
    populateInstructorFilter(); 
    attachEventListeners(); 
    renderHistory(window.all_course_data);
    updateButtonVisualState('simple_list_btn');
}

 
document.addEventListener('DOMContentLoaded', async function() {
    await load_page(); 
});
