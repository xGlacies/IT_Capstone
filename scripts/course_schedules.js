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
    const semesterOrder = { 'Fall': 1, 'Spring': 2, 'Summer': 3 }; 
    const partsA = a.split(' ');
    const partsB = b.split(' ');
    const semesterA = partsA[0];
    const semesterB = partsB[0];
    const yearA = parseInt(partsA[1], 10);
    const yearB = parseInt(partsB[1], 10);

    if (yearA !== yearB) {
        return yearB - yearA;
    }
    return semesterOrder[semesterA] - semesterOrder[semesterB];
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
    const selectedSemester = document.getElementById('semester_selector').value;
    const selectedSubject = document.getElementById('subject_selector').value;

    let filteredData = window.all_course_data_history.filter(course => {
        const fullName = `${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`.trim().toLowerCase();
        const isCorrectInstructor = fullName === instructorFullName.toLowerCase();
        const isCorrectSemester = !selectedSemester || `${course.SEMESTER} ${course.YEAR}` === selectedSemester;
        const isCorrectSubject = !selectedSubject || course.PREFIX.toLowerCase() === selectedSubject.toLowerCase();

        return isCorrectInstructor && isCorrectSemester && isCorrectSubject;
    });

    if (!filteredData.length) {
        const listBody = document.getElementById('list_body');
        if (listBody) {
            listBody.innerHTML = '<p>No courses found for this instructor with the selected filters.</p>';
        }
        return;
    }

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
    listBody.innerHTML = '';

    semesters.forEach(semester => {
        if (!selectedSemester || semester === selectedSemester) {
            const courses = semesterGroups[semester];

            const semesterHeader = document.createElement('h3');
            semesterHeader.textContent = `Semester: ${semester}`;
            listBody.appendChild(semesterHeader);

            const table = document.createElement('table');
            table.className = 'instructor_course_table';
            listBody.appendChild(table);

            const headerRow = document.createElement('tr');
            headerRow.className = 'instructor_course_header';
            headerRow.innerHTML = `
                <th>Section</th>
                <th>Course Number</th>
                <th>Enrollment</th>
            `;
            table.appendChild(headerRow);

            courses.forEach(course => {
                const row = document.createElement('tr');
                row.className = 'instructor_course_row';
                row.innerHTML = `
                    <td>${course.SECTION}</td>
                    <td>${course.PREFIX} ${course.NUMBER}</td>
                    <td>${course.Enrollment}</td>
                `;
                table.appendChild(row);
            });

            if (courses.length === 0) {
                const noDataDiv = document.createElement('tr');
                noDataDiv.className = 'instructor_course_row';
                noDataDiv.innerHTML = '<td colspan="3">No courses found for this semester.</td>';
                table.appendChild(noDataDiv);
            }
        }
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
    //Not using dynamic filling
/*     sortedSemesters.forEach(semesterValue => {

    const parts = semesterValue.split(' ');
    const semester = parts[0];
    const year = parseInt(parts[1], 10);

        buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('${semesterValue}')">${semester}<br>${year}</a></div>`;
    }); */

    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Fall 2022')">Fall 2022</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2023')">Spring 2023</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2023')">Summer 2023</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Fall 2021')">Fall 2021</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2022')">Spring 2022</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2022')">Summer 2022</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Fall 2020')">Fall 2020</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2021')">Spring 2021</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2021')">Summer 2021</a></div>`;
    buttonsHTML += `<div class="grid-item"></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2020')">Spring 2020</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2020')">Summer 2020</a></div>`;

    
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
    const semesterSelector = document.getElementById('semester_selector');
    if (semesterSelector) {
        semesterSelector.value = selectedSemester; 
        filter_results(); 
    }
    const buttons = document.querySelectorAll('#semester_options .grid-item a');
    buttons.forEach(button => {
        if (button.textContent.replace(/\s+/g, ' ').trim() === selectedSemester) {
            button.classList.add('selected'); 
        } else {
            button.classList.remove('selected'); 
        }
    }); 
}

function attachSemesterButtonListeners() {
    const buttons = document.querySelectorAll('#semester_options .grid-item a');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            setSemesterValue(this.textContent); 
        });
    });
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

    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    listBody.innerHTML = '';
    if (searchQuery) {
        renderHistoryByCourse(searchQuery, selectedSemester, selectedInstructor);
    } else if (selectedInstructor) {

        renderHistoryByInstructor(selectedInstructor, selectedSemester);
    } else if (selectedSemester && selectedSemester !== "All Semesters") {

        renderHistoryBySemester(selectedSemester);
    } else if (selectedSubject) {
 
        renderHistoryBySubject(selectedSubject);
    } else {
                renderHistoryForAllSemesters();
    }
    updateTitle(selectedSemester, selectedInstructor, searchQuery);
}

function renderHistoryByCourse(searchQuery, selectedSemester, selectedInstructor) {
    let filteredData = window.all_course_data_history.filter(course => {
        const coursePrefixNumber = `${course.PREFIX} ${course.NUMBER}`.toLowerCase();
        const matchesSearch = coursePrefixNumber.includes(searchQuery.toLowerCase());
        const matchesSemester = !selectedSemester || `${course.SEMESTER} ${course.YEAR}` === selectedSemester;
        const matchesInstructor = !selectedInstructor || 
            (`${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`.toLowerCase() === selectedInstructor.toLowerCase());
        return matchesSearch && matchesSemester && matchesInstructor;
    });

    renderFilteredCourses(filteredData);
}

function renderFilteredCourses(filteredData) {
    const listBody = document.getElementById('list_body');
    listBody.innerHTML = '';

    if (filteredData.length === 0) {
        listBody.innerHTML = '<p>No courses found with the selected filters.</p>';
        return;
    }

    listBody.appendChild(createTable(filteredData));
}

function updateTitle(selectedSemester) {
    const title_changer = document.getElementById('title_changer');
    if (selectedSemester && selectedSemester !== "All Semesters") {
        title_changer.innerHTML = `Course Schedule - ${selectedSemester}`;
    } else {
        title_changer.innerHTML = "Course Schedule - All Semesters";
    }
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
    const selectedSemester = document.getElementById('semester_selector').value;
    const selectedInstructor = document.getElementById('faculty_selector').value;  // Retrieve the selected instructor if any

    let filteredData = window.all_course_data_history.filter(course => {
        const coursePrefixNumber = `${course.PREFIX} ${course.NUMBER}`.toLowerCase();
        const isCorrectSemester = !selectedSemester || `${course.SEMESTER} ${course.YEAR}` === selectedSemester;
        const isCorrectInstructor = !selectedInstructor || 
                                    (`${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`.toLowerCase() === selectedInstructor.toLowerCase());
        return coursePrefixNumber.includes(searchQuery.toLowerCase()) && isCorrectSemester && isCorrectInstructor;
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

        if (!selectedSemester || semester === selectedSemester) {
            const semesterHeader = document.createElement('h3');
            semesterHeader.textContent = `Semester: ${semester}`;
            listBody.appendChild(semesterHeader);

            const table = document.createElement('table');
            table.className = 'course_history_table'; 
            listBody.appendChild(table);

            const headerRow = document.createElement('tr');
            headerRow.className = 'course_history_header';
            headerRow.innerHTML = `
                <th>Section</th>
                <th>Course Number</th>
                <th>Instructor Name</th>
                <th>Enrollment</th>
            `;
            table.appendChild(headerRow);

            courses.forEach(course => {
                const row = document.createElement('tr');
                row.className = 'course_history_row';
                row.innerHTML = `
                    <td>${course.SECTION}</td>
                    <td>${course.PREFIX} ${course.NUMBER}</td>
                    <td>${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}</td>
                    <td>${course.Enrollment}</td>
                `;
                table.appendChild(row);
            });

            if (courses.length === 0) {
                const noDataDiv = document.createElement('tr');
                noDataDiv.className = 'course_history_row';
                noDataDiv.innerHTML = '<td colspan="4">No courses found for this semester.</td>';
                table.appendChild(noDataDiv);
            }
        }
    });
}




function renderHistoryBySemester(selectedSemester) {
    let filteredData = window.all_course_data_history.filter(course => 
        `${course.SEMESTER} ${course.YEAR}` === selectedSemester
    );

    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    listBody.innerHTML = '';

    const semesterHeader = document.createElement('h3');
    semesterHeader.textContent = `Semester: ${selectedSemester}`;
    listBody.appendChild(semesterHeader);
    const table = document.createElement('table');
    table.className = 'course_table'; 
    listBody.appendChild(table);
    const headerRow = document.createElement('tr');
    headerRow.className = 'course_table_header'; 
    headerRow.innerHTML = `
        <th>Course Code</th>
        <th>Title</th>
        <th>Section</th>
        <th>Instructor Name</th>
        <th>Enrollment</th>
    `;
    table.appendChild(headerRow);
    if (filteredData.length === 0) {
        const noDataDiv = document.createElement('tr');
        noDataDiv.className = 'course_table_row'; 
        noDataDiv.innerHTML = '<td colspan="5">No courses found for this semester.</td>';
        table.appendChild(noDataDiv);
    } else {
        filteredData.forEach(course => {
            const row = document.createElement('tr');
            row.className = 'course_table_row'; 
            row.innerHTML = `
                <td>${course.PREFIX} ${course.NUMBER}</td>
                <td>${findCourseNameByNumber(course.NUMBER)}</td>
                <td>${course.SECTION}</td>
                <td>${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}</td>
                <td>${course.Enrollment}</td>
            `;
            table.appendChild(row);
        });
    }
}

function renderHistoryForAllSemesters() {
    const semesters = [...new Set(window.all_course_data_history.map(course => `${course.SEMESTER} ${course.YEAR}`))];
    semesters.sort(semesterSorter);

    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    listBody.innerHTML = '';

    semesters.forEach(semester => {
        renderSemesterCourses(semester, listBody);
    });
}

function renderSemesterCourses(semester, listBody) {
    let filteredData = window.all_course_data_history.filter(course => `${course.SEMESTER} ${course.YEAR}` === semester);

    const semesterHeader = document.createElement('h3');
    semesterHeader.textContent = `Semester: ${semester}`;
    listBody.appendChild(semesterHeader);

    const table = document.createElement('table');
    table.className = 'course_table';
    listBody.appendChild(table);

    const headerRow = document.createElement('tr');
    headerRow.className = 'course_table_header';
    headerRow.innerHTML = `
        <th>Course Code</th>
        <th>Title</th>
        <th>Section</th>
        <th>Instructor Name</th>
        <th>Enrollment</th>
    `;
    table.appendChild(headerRow);

    if (filteredData.length === 0) {
        const noDataDiv = document.createElement('tr');
        noDataDiv.className = 'course_table_row';
        noDataDiv.innerHTML = '<td colspan="5">No courses found for this semester.</td>';
        table.appendChild(noDataDiv);
    } else {
        filteredData.forEach(course => {
            const row = document.createElement('tr');
            row.className = 'course_table_row';
            row.innerHTML = `
                <td>${course.PREFIX} ${course.NUMBER}</td>
                <td>${findCourseNameByNumber(course.NUMBER)}</td>
                <td>${course.SECTION}</td>
                <td>${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}</td>
                <td>${course.Enrollment}</td>
            `;
            table.appendChild(row);
        });
    }
} 

function findCourseNameByNumber(courseNumber) {
    const course = window.all_course_data.find(course => course.Course_Number === courseNumber.toString());
    return course ? course.Course_Name : "N/A";
}

function renderHistory(filteredData) {
    const listBody = document.getElementById('list_body');
    listBody.innerHTML = ''; 

    if (filteredData.length === 0) {
        listBody.innerHTML = '<p>No courses found with the selected filters.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'course_table'; 
    const headerRow = document.createElement('tr');
    ["Course Code", "Title", "Section", "Instructor Name", "Enrollment"].forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);
    filteredData.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.PREFIX} ${course.NUMBER}</td>
            <td>${findCourseNameByNumber(course.NUMBER)}</td>
            <td>${course.SECTION}</td>
            <td>${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}</td>
            <td>${course.Enrollment}</td>
        `;
        table.appendChild(row);
    });

    listBody.appendChild(table);
}

function updateTitle(selectedSemester) {
    const title_changer = document.getElementById('title_changer');
    if (selectedSemester && selectedSemester !== "All Semesters") {
        title_changer.innerHTML = `Course Schedule - ${selectedSemester}`;
    } else {
        title_changer.innerHTML = "Course Schedule - All Semesters";
    }
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


    const semesterSelector = document.getElementById('semester_selector');
    semesterSelector.value = "";  

    renderHistoryForAllSemesters();  


    const subjectSelector = document.getElementById('subject_selector');
    subjectSelector.value = "IT";  
}

document.addEventListener('DOMContentLoaded', async function() {
    await load_page(); 
});