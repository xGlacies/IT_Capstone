async function fetchCourseData() {
    if (!sessionStorage.getItem("all_history_data")) {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/history');
        if (response.ok) {
            let historyData = await response.json();

            historyData.sort((a, b) => {
                // Compare years first
                if (b.YEAR !== a.YEAR) {
                    return b.YEAR - a.YEAR; // Sort years in descending order
                } else {
                    // If years are the same, compare semesters
                    const semesterOrder = { "Fall": 3, "Summer": 2, "Spring": 1 }; // Define order of semesters
            
                    // Compare semesters based on their order
                    return semesterOrder[b.SEMESTER] - semesterOrder[a.SEMESTER];
                }
            }).sort((a, b) => {
                // After sorting by year and semester, sort by section
                const sectionA = typeof a.SECTION === 'string' ? a.SECTION : '';
                const sectionB = typeof b.SECTION === 'string' ? b.SECTION : '';
                return sectionA.localeCompare(sectionB);
            }).sort((a, b) => {
                // After sorting by year and semester, sort by section
                return a.NUMBER.toString().localeCompare(b.NUMBER.toString());
            });
            
            

            sessionStorage.setItem("all_history_data", JSON.stringify(historyData));
            window.all_course_data_history = JSON.parse(sessionStorage.getItem("all_history_data"));
        } else {
            console.error("Failed to fetch history data:", response.status);
            window.all_course_data_history = [];
        }
    } else {
        window.all_course_data_history = JSON.parse(sessionStorage.getItem("all_history_data"));
    }
}

function populateSemesterSelector() {
    const semesterSelector = document.getElementById('semester_selector');
    semesterSelector.innerHTML = '<option value="">All Semesters</option>';
    const uniqueSemesters = new Set();

    window.all_course_data_history.forEach(course => {
        uniqueSemesters.add(`${course.SEMESTER} ${course.YEAR}`);
    });

    uniqueSemesters.forEach(semester => {
        const option = document.createElement('option');
        option.value = semester;
        option.textContent = semester;
        semesterSelector.appendChild(option);
    });

    var semesterDiv = document.getElementById("semester_options");
    let buttonsHTML = ""; // Initialize an empty string to store button HTML    
    window.all_course_data_history.forEach(semester => {
        const semesterValue = `${semester.SEMESTER} ${semester.YEAR}`;
        uniqueSemesters.add(semesterValue); // Add each semester to the Set
    });
    
    uniqueSemesters.forEach(semesterValue => {
        buttonsHTML += `<a href="#" onclick="setSemesterValue('${semesterValue}')">${semesterValue}</a> `;
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
    // Set the value of the hidden input field to the selected semester
    document.getElementById('semester_selector').value = selectedSemester;
    // Trigger the filter_results() function
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
    const semester_options = document.getElementById('semester_options').value;
    console.log(semester_options);
    const searchQuery = document.getElementById('search_bar').value.trim().toLowerCase();
    load_list_element(searchQuery, selectedSemester, selectedSubject, selectedInstructor, semester_options);
}

async function load_list_element(searchQuery = '', selectedSemester = '', selectedSubject = '', selectedInstructor = '') {
    await fetchCourseData(); 

    let filteredData = window.all_course_data_history.filter(course => {

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
    <p class="table_data">Instructor Name</p> <!-- Combined First and Last Name -->
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
    // Iterate over each course in the courseData array

    for (let i = 0; i < all_course_data.length; i++) {

        if (all_course_data[i].Course_Number === courseNumber.toString()) {
            // Return the Course_Name if a match is found
            return all_course_data[i].Course_Name;
        }
      }
    // Return null if the courseNumber is not found
    return "N/A";
}


function attachEventListeners() {
    const semesterSelector = document.getElementById('semester_selector');
    const subjectSelector = document.getElementById('subject_selector');
    const facultySelector = document.getElementById('faculty_selector');
    const pictureButton = document.querySelector('.picture_button');
    const resetFiltersBtn = document.getElementById('reset_filters');

    if (semesterSelector) semesterSelector.addEventListener('change', filter_results);
    else console.error('semester_selector not found.');

    if (subjectSelector) subjectSelector.addEventListener('change', filter_results);
    else console.error('subject_selector not found.');

    if (facultySelector) facultySelector.addEventListener('change', filter_results);
    else console.error('faculty_selector not found.');

    if (pictureButton) pictureButton.addEventListener('click', filter_results);
    else console.error('.picture_button not found.');

    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
}

async function load_page() {
    await fetchCourseData(); 
    populateSemesterSelector(); 
    populateSubjectSelector();
    populateInstructorFilter(); 
    attachEventListeners(); 
    renderHistory(window.all_course_data_history);

    // Set the default value of the subject selector to "IT"
    const subjectSelector = document.getElementById('subject_selector');
    subjectSelector.value = "IT";
    filter_results();
}

 
document.addEventListener('DOMContentLoaded', async function() {
    await load_page(); 
});
