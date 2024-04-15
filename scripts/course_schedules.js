function parseSemester(semesterString) {
    const parts = semesterString.split(' ');
    const semester = parts[0];
    const year = parseInt(parts[1], 10);
    let semesterValue;

    switch (semester) {
        case 'Spring':
            semesterValue = 2;
            break;
        case 'Summer':
            semesterValue = 1;
            break;
        case 'Fall':
            semesterValue = 3;
            break;
        default:
            semesterValue = 0; 
    }

    return { year, semesterValue };
}

function semesterSorter(a, b) {
    const semesterA = parseSemester(a);
    const semesterB = parseSemester(b);

    if (semesterA.year === semesterB.year) {
        return semesterB.semesterValue - semesterA.semesterValue;
    }

    return semesterB.year - semesterA.year;
}

function findCourseNameByNumber(courseNumber) {
    for (let i = 0; i < all_course_data.length; i++) {
        if (all_course_data[i].Course_Number === courseNumber.toString()) {
            return all_course_data[i].Course_Name;
        }
    }
    return "N/A"; 
}

function renderHistoryByInstructor(instructorFullName) {
    console.log("Instructor Full Name:", instructorFullName);  

    let filteredData = window.all_course_data_history.filter(course => {
        const fullName = `${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`.trim().toLowerCase();
        return fullName === instructorFullName.toLowerCase();
    });

    console.log("Filtered Data:", filteredData);  

    const semesterGroups = filteredData.reduce((acc, course) => {
        const semesterKey = `${course.SEMESTER} ${course.YEAR}`;
        if (!acc[semesterKey]) {
            acc[semesterKey] = [];
        }
        acc[semesterKey].push(course);
        return acc;
    }, {});

    console.log("Semester Groups:", semesterGroups);  

    const semesters = Object.keys(semesterGroups).sort(semesterSorter);
    console.log("Sorted Semesters:", semesters);  

    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }

    listBody.innerHTML = '';

    semesters.forEach(semester => {
        const courses = semesterGroups[semester];
        const semesterHeader = document.createElement('div');
        semesterHeader.className = 'table_header_three header_row';
        semesterHeader.innerHTML = `<p class="table_data bold full-width">Semester: ${semester}</p>`;
        listBody.appendChild(semesterHeader);

        const headerRow = document.createElement('div');
        headerRow.className = 'table_row_three table_header_three';
        headerRow.innerHTML = `
            <p class="table_data">Course</p>
            <p class="table_data">Section</p>
            <p class="table_data">Enrollment</p>
        `;
        listBody.appendChild(headerRow);

        if (courses.length === 0) {
            console.log("No courses found for this semester:", semester);
            const noDataDiv = document.createElement('div');
            noDataDiv.className = 'table_row_three';
            noDataDiv.innerHTML = '<p class="table_data full-width">No courses found for this semester.</p>';
            listBody.appendChild(noDataDiv);
        }

        courses.forEach(course => {
            const courseName = findCourseNameByNumber(course.NUMBER);
            const row = document.createElement('div');
            row.className = 'table_row_three';
            row.innerHTML = `
                <p class="table_data">${course.PREFIX} ${course.NUMBER} - ${courseName}</p>
                <p class="table_data">${course.SECTION}</p>
                <p class="table_data">${course.Enrollment}</p>
            `;
            listBody.appendChild(row);
        });
    });
}

function populateSemesterSelector() {
    const semesterSelector = document.getElementById('semester_selector');
    semesterSelector.innerHTML = '<option value="">All Semesters</option>';
    const uniqueSemesters = new Set();

    window.all_course_data_history.forEach(course => {
        uniqueSemesters.add(`${course.SEMESTER} ${course.YEAR}`);
    });

    const sortedSemesters = Array.from(uniqueSemesters).sort(semesterSorter);

    sortedSemesters.forEach(semester => {
        const option = document.createElement('option');
        option.value = semester;
        option.textContent = semester;
        semesterSelector.appendChild(option);
    }); 

    var semesterDiv = document.getElementById("semester_options");
    let buttonsHTML = "";
    sortedSemesters.forEach(semesterValue => {
        buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('${semesterValue}')">${semesterValue}</a></div>`;
    });
    semesterDiv.innerHTML = buttonsHTML;
}

function populateSubjectSelector() {
    const subjectSelector = document.getElementById('subject_selector');
    subjectSelector.innerHTML = '<option value="">All Subjects</option>';
    const uniqueSubjects = new Set();

    window.all_course_data_history.forEach(course => {
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

    window.all_course_data_history.forEach(course => {
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

function setSemesterValue(selectedSemester) {
    document.getElementById('semester_selector').value = selectedSemester;
    filter_results();
}

function resetFilters() {
    document.getElementById('semester_selector').value = '';
    document.getElementById('subject_selector').value = '';
    document.getElementById('faculty_selector').value = '';
    document.getElementById('search_bar').value = ''; 
    filter_results();
}

function filter_results() {
    const selectedSubject = document.getElementById('subject_selector').value;
    const selectedSemester = document.getElementById('semester_selector').value;
    const selectedInstructor = document.getElementById('faculty_selector').value;
    const searchQuery = document.getElementById('search_bar').value.trim().toLowerCase();

    if (searchQuery.match(/^\w+\s\d+$/)) {
        renderHistoryByCourse(searchQuery);
    } else if (selectedInstructor && !searchQuery) {
        renderHistoryByInstructor(selectedInstructor);
    } else {
        load_list_element(searchQuery, selectedSemester, selectedSubject, selectedInstructor);
    }

    const title_changer = document.getElementById('title_changer');
    title_changer.innerHTML = selectedSemester ? `Course Schedule - ${selectedSemester}` : `Course Schedule - All Semesters`;
}

async function load_list_element(searchQuery = '', selectedSemester = '', selectedSubject = '', selectedInstructor = '') {
    let filteredData = window.all_course_data_history.filter(course => {
        const courseCRN = course.CRN.toString();
        const matchesSearchQuery = !searchQuery || 
                                   course.PREFIX.toLowerCase().includes(searchQuery) ||
                                   course.NUMBER.toString().toLowerCase().includes(searchQuery) ||
                                   courseCRN.includes(searchQuery) ||
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

function renderHistoryByCourse(searchQuery) {
    let filteredData = window.all_course_data_history.filter(course => {
        const coursePrefixNumber = `${course.PREFIX} ${course.NUMBER}`.toLowerCase();
        return coursePrefixNumber.includes(searchQuery.toLowerCase());
    });

    const semesterGroups = filteredData.reduce((acc, course) => {
        const semesterKey = `${course.SEMESTER} ${course.YEAR}`; 
        if (!acc[semesterKey]) {
            acc[semesterKey] = [];
        }
        acc[semesterKey].push(course);
        return acc;
    }, {});

    const semesters = Object.keys(semesterGroups).sort(semesterSorter);

    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    listBody.innerHTML = '';

    semesters.forEach(semester => {
        const courses = semesterGroups[semester];
        const semesterHeader = document.createElement('div');
        semesterHeader.className = 'table_header_three header_row';
        semesterHeader.innerHTML = `<p class="table_data bold full-width">Semester: ${semester}</p>`;
        listBody.appendChild(semesterHeader);
    
        const headerRow = document.createElement('div');
        headerRow.className = 'table_row_three table_header_three';
        headerRow.innerHTML = `
            <p class="table_data">Section</p>
            <p class="table_data">Instructor Name</p>
            <p class="table_data">Enrollment</p>
        `;
        listBody.appendChild(headerRow);
    
        courses.forEach(course => {
            const row = document.createElement('div');
            row.className = 'table_row_three'; 
            row.innerHTML = `
                <p class="table_data">${course.SECTION}</p>
                <p class="table_data">${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}</p>
                <p class="table_data">${course.Enrollment}</p>
            `;
            listBody.appendChild(row);
        });
    });
}

function renderHistory(currentHistoryData) {
    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }

    listBody.innerHTML = ''; 

    const tableHeaderHTML = `
    <p class="table_data">Course Code</p>
    <p class="table_data">Title</p>
    <p class="table_data">Section</p>
    <p class="table_data">Instructor Name</p>
    <p class="table_data">Enrollment</p>
    `;
    const tableHeader = document.createElement('div');
    tableHeader.className = 'table_header header_row';
    tableHeader.innerHTML = tableHeaderHTML;
    listBody.appendChild(tableHeader);

    currentHistoryData.forEach(data => {
        const row = document.createElement('div');
        row.className = 'table_row';
        row.innerHTML = `
            <p class="table_data">${data.PREFIX} ${data.NUMBER}</p>
            <p class="table_data">${findCourseNameByNumber(data.NUMBER)}</p>
            <p class="table_data">${data.SECTION}</p>
            <p class="table_data">${data.INSTRUCTOR_FIRST_NAME} ${data.INSTRUCTOR_LAST_NAME}</p>
            <p class="table_data">${data.Enrollment}</p>
        `;
        listBody.appendChild(row);
    });
}

function findCourseNameByNumber(courseNumber) {
    for (let i = 0; i < all_course_data.length; i++) {
        if (all_course_data[i].Course_Number === courseNumber.toString()) {
            return all_course_data[i].Course_Name; 
        }
    }
    return "N/A";
}

function attachEventListeners() {
    const semesterSelector = document.getElementById('semester_selector');
    const subjectSelector = document.getElementById('subject_selector');
    const facultySelector = document.getElementById('faculty_selector');
    const pictureButton = document.querySelector('.picture_button');
    const resetFiltersBtn = document.getElementById('reset_filters');

    if (semesterSelector) semesterSelector.addEventListener('change', filter_results);
    if (subjectSelector) subjectSelector.addEventListener('change', filter_results);
    if (facultySelector) facultySelector.addEventListener('change', filter_results);
    if (pictureButton) pictureButton.addEventListener('click', filter_results);
    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
}

async function load_page() {
    populateSemesterSelector();
    populateSubjectSelector();
    populateInstructorFilter();
    attachEventListeners();
    renderHistory(window.all_course_data_history);

    const semester_selector = document.getElementById('semester_selector');
    semester_selector.value = "Fall 2022";

    const subjectSelector = document.getElementById('subject_selector');
    subjectSelector.value = "IT";

    filter_results();
}

document.addEventListener('DOMContentLoaded', async function() {
    await load_page();
});