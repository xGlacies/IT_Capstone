async function fetchCourseData() {
    if (!sessionStorage.getItem("all_course_data")) {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/courses');
        if (response.ok) {
            let courseData = await response.json();
            const historyData = await fetchCourseHistoryData();
            courseData.forEach(course => {
                const historyEntry = historyData.find(entry => {
                    return entry.PREFIX === course.Prefix && entry.NUMBER === course.Course_Number && entry.SECTION === course.Section;
                });
                if (historyEntry) {
                    course.SEMESTER = historyEntry.SEMESTER; 
                    course.YEAR = historyEntry.YEAR;
                    course.Enrollment = historyEntry.Enrollment;
                }
            });
            sessionStorage.setItem("all_course_data", JSON.stringify(courseData));
        } else {
            console.error("Failed to fetch course data: Server responded with status", response.status);
        }
    }
    window.all_course_data = JSON.parse(sessionStorage.getItem("all_course_data") || "[]");
}

async function load_list_element() {
    await fetchCourseData();
    const selectedSemester = document.getElementById('semester_selector').value;
    const selectedSubject = document.getElementById('subject_selector').value;
    const selectedInstructor = document.getElementById('faculty_selector').value;
    const searchQuery = document.getElementById('search_bar').value.trim().toLowerCase();
    let filteredCourses = all_course_data.filter(course => {
        const offeredTerms = course.Offering_History ? Object.keys(course.Offering_History) : [];
        const [selectedSem, selectedYear] = selectedSemester.split(' ');
        const semesterMatch = selectedSemester === 'All Semesters' || offeredTerms.some(term => {
            const [offeredSemester, offeredYear] = term.split('_');
            if (selectedYear) {
                return offeredSemester.toLowerCase() === selectedSem.toLowerCase() && offeredYear === selectedYear;
            } else {
                return offeredSemester.toLowerCase() === selectedSem.toLowerCase();
            }
        });
        const subjectMatch = selectedSubject === 'All Subjects' || course.Prefix.toLowerCase() === selectedSubject.toLowerCase();
        const instructorMatch = selectedInstructor === 'All Faculty' || course.Coordinator_Name.toLowerCase().includes(selectedInstructor.toLowerCase()) || course.Co_Coordinator_Name.toLowerCase().includes(selectedInstructor.toLowerCase());
        const keywordMatch = !searchQuery || (
            course.Prefix.toLowerCase().includes(searchQuery) ||
            course.Course_Number.toString().toLowerCase().includes(searchQuery) ||
            course.Degree.toLowerCase().includes(searchQuery) ||
            course.Track.toLowerCase().includes(searchQuery) ||
            course.Coordinator_Name.toLowerCase().includes(searchQuery) ||
            course.Co_Coordinator_Name.toLowerCase().includes(searchQuery) ||
            (course.Description && course.Description.toLowerCase().includes(searchQuery)) ||
            offeredTerms.join(' ').toLowerCase().includes(searchQuery) ||
            (course.Section && course.Section.toString().toLowerCase().includes(searchQuery)) ||
            (course.Enrollment && course.Enrollment.toString().toLowerCase().includes(searchQuery))
        );
        return semesterMatch && subjectMatch && instructorMatch && keywordMatch;
    });
    renderCourses(filteredCourses);
}

function renderCourses(courses) {
    const listBody = document.getElementById('list_body');
    listBody.innerHTML = '';
    const tableHeader = document.createElement('div');
    tableHeader.className = 'table_header header_row';
    tableHeader.innerHTML = `
        <p class="table_data">Prefix</p>
        <p class="table_data">Course</p>
        <p class="table_data">Degree</p>
        <p class="table_data">Track</p>
        <p class="table_data">Coordinator</p>
        <p class="table_data">Co-Coordinator</p>
        <p class="table_data">Semesters Offered</p> 
        <p class="table_data">Years Offered</p>
        <p class="table_data">Section #</p>
        <p class="table_data">Enrollment</p>
    `;
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table_container';
    tableContainer.appendChild(tableHeader);
    courses.forEach(course => {
        let semestersOffered = [];
        let yearsOffered = new Set();
        for (let term in course.Offering_History) {
            let [semester, year] = term.split('_');
            semestersOffered.push(semester);
            yearsOffered.add(year);
        }
        semestersOffered = Array.from(new Set(semestersOffered)).sort().join(', ');
        yearsOffered = Array.from(yearsOffered).sort((a, b) => b - a).join(', ');
        const tableRow = document.createElement('div');
        tableRow.className = 'table_row'; 
        tableRow.innerHTML = `
            <p class="table_data">${course.Prefix}</p>
            <p class="table_data">${course.Course_Number}</p>
            <p class="table_data">${course.Degree}</p>
            <p class="table_data">${course.Track}</p>
            <p class="table_data">${course.Coordinator_Name || '-'}</p>
            <p class="table_data">${course.Co_Coordinator_Name || '-'}</p>
            <p class="table_data">${semestersOffered}</p>
            <p class="table_data">${yearsOffered}</p>
            <p class="table_data">${course.Section || '-'}</p>
            <p class="table_data">${course.Enrollment || '-'}</p>
        `;
        tableContainer.appendChild(tableRow);
    });
    listBody.appendChild(tableContainer); 
}

function renderHistory(courses) {
    const listBody = document.getElementById('list_body');
    listBody.innerHTML = '';
    const tableHeader = document.createElement('div');
    tableHeader.className = 'table_header header_row';
    tableHeader.innerHTML = `
        <p class="table_data">CRN</p>
        <p class="table_data">Subject</p>
        <p class="table_data">Course</p>
        <p class="table_data">Section</p>
        <p class="table_data">Instructor</p>
        <p class="table_data">Enrollment</p>
        <p class="table_data">Semester</p> 
        <p class="table_data">Year</p>
    `;
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table_container';
    tableContainer.appendChild(tableHeader);
    courses.forEach(course => {
        let semestersOffered = [];
        let yearsOffered = new Set();
        for (let term in course.Offering_History) {
            let [semester, year] = term.split('_');
            semestersOffered.push(semester);
            yearsOffered.add(year);
        }
        semestersOffered = Array.from(new Set(semestersOffered)).sort().join(', ');
        yearsOffered = Array.from(yearsOffered).sort((a, b) => b - a).join(', ');
        const tableRow = document.createElement('div');
        tableRow.className = 'table_row'; 
        tableRow.innerHTML = `
            <p class="table_data">${course.CRN}</p>
            <p class="table_data">${course.PREFIX}</p>
            <p class="table_data">${course.NUMBER}</p>
            <p class="table_data">${course.SECTION}</p>
            <p class="table_data">${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}</p>
            <p class="table_data">${course.Enrollment}</p>
			<p class="table_data">${course.SEMESTER}</p>
			<p class="table_data">${course.YEAR}</p>
        `;
        tableContainer.appendChild(tableRow);
    });
    listBody.appendChild(tableContainer); 
}

function filterByDegree(degree) {
    const filteredCourses = window.all_course_data.filter(course => course.Degree === degree);
    renderCourses(filteredCourses);
    updateButtonVisualState(degree === 'BSIT' ? 'bsit' : 'msit');
}

function simpleListView() {
    renderCourses(window.all_course_data);
    updateButtonVisualState('simple_list_btn');
}

function updateButtonVisualState(activeButtonId) {
    const buttonsInfo = {
        'simple_list_btn': 'simple_list_img',
        'msit_group_btn': 'msit_group_img',
        'bsit_group_btn': 'bsit_group_img'
    };
    Object.entries(buttonsInfo).forEach(([buttonId, imgId]) => {
        const imgElement = document.getElementById(imgId);
        if (buttonId === activeButtonId) {
            imgElement.classList.remove('hidden');
        } else {
            imgElement.classList.add('hidden');
        }
    });
}

function group_by_MSIT() {
    filterByDegree('MSIT');
    updateButtonVisualState('msit_group_btn');
}

function group_by_BSIT() {
    filterByDegree('BSIT');
    updateButtonVisualState('bsit_group_btn');
}

function resetFilters() {
    document.getElementById('semester_selector').value = 'All Semesters';
    document.getElementById('subject_selector').value = 'All Subjects';
    document.getElementById('faculty_selector').value = 'All Faculty';
    document.getElementById('search_bar').value = '';
    load_list_element();
    updateButtonVisualState('simple_list_btn'); 
}

function attachEventListeners() {
    const searchIcon = document.querySelector('.picture_button');
    const semester_selector = document.getElementById('semester_selector');
    const subject_selector = document.getElementById('subject_selector');
    const faculty_selector = document.getElementById('faculty_selector');
    const simpleListViewButton = document.getElementById('simple_list_btn');
    const msitButton = document.getElementById('msit_group_btn');
    const bsitButton = document.getElementById('bsit_group_btn');
    const resetButton = document.getElementById('reset_filters');
    searchIcon.addEventListener('click', function() {
        filter_results();
    });
    semester_selector.addEventListener('change', load_list_element);
    subject_selector.addEventListener('change', load_list_element);
    faculty_selector.addEventListener('change', load_list_element);
    simpleListViewButton.addEventListener('click', simpleListView);
    msitButton.addEventListener('click', group_by_MSIT);
    bsitButton.addEventListener('click', group_by_BSIT);
    resetButton.addEventListener('click', resetFilters);
}

function filter_results() {
    const searchQuery = document.getElementById('search_bar').value.trim().toLowerCase();
    load_list_element();
}

function populateSemesterSelector() {
    const semesterSelector = document.getElementById('semester_selector');
    const semesters = ['Spring', 'Summer', 'Fall'];
    const startYear = 2021;
    const endYear = 2024;
    while (semesterSelector.options.length > 1) {
        semesterSelector.remove(1);
    }
    for (let year = endYear; year >= startYear; year--) {
        semesters.forEach(semester => {
            if (year === endYear && semester === 'Fall') return;
            const optionText = `${semester} ${year}`;
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            semesterSelector.appendChild(option);
        });
    } 
}

function populateInstructorFilter() {
    const instructorSelector = document.getElementById('faculty_selector');
    const instructors = new Set();
    all_course_data.forEach(course => {
        if (course.Coordinator_Name) {
            instructors.add(course.Coordinator_Name);
        }
        if (course.Co_Coordinator_Name) { 
            instructors.add(course.Co_Coordinator_Name);
        }
    });
    instructorSelector.innerHTML = ''; 
    const allOption = document.createElement('option');
    allOption.value = 'All Faculty';
    allOption.textContent = 'All Faculty';
    instructorSelector.appendChild(allOption);
    instructors.forEach(instructor => {
        const option = document.createElement('option');
        option.value = instructor;
        option.textContent = instructor;
        instructorSelector.appendChild(option);
    });
}

function load_page() {
    set_site_title(" - Course Schedules"); 
    load_list_element();
    populateInstructorFilter();
    attachEventListeners();
    populateSemesterSelector();
    updateButtonVisualState('simple_list_btn') 
}

document.addEventListener('DOMContentLoaded', function() {
    load_page();
});
