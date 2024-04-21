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


function renderHistoryByInstructor(instructorFullName, selectedSemester = '') {
    document.getElementById('search_bar').value = '';
    const semesterSelector = document.getElementById('semester_selector');
    if (semesterSelector) {
        semesterSelector.value = '';
    }
    const buttons = document.querySelectorAll('#semester_options .grid-item a');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    let filteredData = window.all_course_data_history.filter(course => {
        const fullName = `${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`.trim().toLowerCase();
        const isCorrectInstructor = fullName === instructorFullName.toLowerCase();
        const isCorrectSemester = !selectedSemester || `${course.SEMESTER} ${course.YEAR}` === selectedSemester;

        const isITSemester = course.PREFIX === 'IT';

        return isCorrectInstructor && isCorrectSemester && isITSemester;
    });

    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    listBody.innerHTML = '';

    if (!filteredData.length) {
        listBody.innerHTML = '<p>No courses found for this instructor with the selected filters.</p>';
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

    semesters.forEach(semester => {
        if (!selectedSemester || semester === selectedSemester) {
            const courses = semesterGroups[semester];

            const semesterHeader = document.createElement('h3');
            semesterHeader.textContent = (semester);
            listBody.appendChild(semesterHeader);

            const table = document.createElement('table');
            table.className = 'instructor_course_table';
            listBody.appendChild(table);

            const headerRow = document.createElement('tr');
            headerRow.className = 'instructor_course_header';
            headerRow.innerHTML = `
                <th>Course Number</th>
                <th>Course Title</th>
                <th>Section</th>
                <th>Enrollment</th>
            `;
            table.appendChild(headerRow);

            courses.forEach(course => {
                const row = document.createElement('tr');
                row.className = 'instructor_course_row';
                row.innerHTML = `
                    <td>${course.PREFIX} ${course.NUMBER}</td>
                    <td>${findCourseNameByNumber(course.NUMBER)}</td>
                    <td>${course.SECTION}</td>
                    <td>${course.Enrollment}</td>
                `;
                table.appendChild(row);
            });

            if (courses.length === 0) {
                const noDataDiv = document.createElement('tr');
                noDataDiv.className = 'instructor_course_row';
                noDataDiv.innerHTML = '<td colspan="4">No courses found for this semester.</td>';
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

    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Fall 2022')">Fall <br>2022</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2023')">Spring <br>2023</a></div>`; 
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2023')">Summer <br>2023</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Fall 2021')">Fall <br>2021</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2022')">Spring <br>2022</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2022')">Summer <br>2022</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Fall 2020')">Fall <br>2020</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2021')">Spring <br>2021</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2021')">Summer <br>2021</a></div>`;
    buttonsHTML += `<div class="grid-item"></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Spring 2020')">Spring <br>2020</a></div>`;
    buttonsHTML += `<div class="grid-item"><a href="#" onclick="setSemesterValue('Summer 2020')">Summer <br>2020</a></div>`;


    semesterDiv.innerHTML = buttonsHTML;
}

function populateSubjectSelector() {
    const subjectSelector = document.getElementById('subject_selector');
    subjectSelector.innerHTML = '<option value="IT">IT</option>'; 
}


function populateInstructorFilter() {
    const instructorSelector = document.getElementById('faculty_selector');
    instructorSelector.innerHTML = '<option value="">All Instructors</option>';
    const uniqueInstructors = new Set();

    window.all_course_data_history.forEach(course => {
        console.log(course.Prefix); 
        if (course.PREFIX === 'IT') {
            const fullName = `${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}`;
            uniqueInstructors.add(fullName.trim());
        }
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
        document.getElementById('faculty_selector').value = '';
        document.getElementById('search_bar').value = '';
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
            const selectedSemester = this.textContent.trim();
            renderHistoryBySemester(selectedSemester);
        });
    });
}


function resetFilters() {
    document.getElementById('semester_selector').value = '';
    document.getElementById('subject_selector').value = 'IT';
    document.getElementById('faculty_selector').value = '';
    document.getElementById('search_bar').value = '';
    filter_results();
}

function filter_results() {
    const selectedSubject = document.getElementById('subject_selector').value.toLowerCase();
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
        renderHistoryByCourse(searchQuery, selectedSemester);
    } else if (selectedInstructor !== '') {
        renderHistoryByInstructor(selectedInstructor);
    } else if (selectedSemester && selectedSemester !== "All Semesters") {
        renderHistoryBySemester(selectedSemester);
    } else {
        renderHistoryForAllSemesters();
    }

    updateTitle(selectedSemester, selectedInstructor, searchQuery);
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

function renderHistoryByCourse(searchQuery, selectedSemester = '') {
    document.getElementById('faculty_selector').value = '';

    let filteredData = window.all_course_data_history.filter(course => {
        const coursePrefixNumber = `${course.PREFIX} ${course.NUMBER}`.toLowerCase();
        return coursePrefixNumber.includes(searchQuery.toLowerCase());
    });

    if (selectedSemester && selectedSemester !== "All Semesters") {
        filteredData = filteredData.filter(course => `${course.SEMESTER} ${course.YEAR}` === selectedSemester);
    }

    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    listBody.innerHTML = ''; 

    if (filteredData.length === 0) {
        listBody.innerHTML = '<p>No courses found with the selected filters.</p>';
        return;
    }

    const courseGroups = filteredData.reduce((acc, course) => {
        const courseKey = `${course.PREFIX} ${course.NUMBER}`;
        if (!acc[courseKey]) {
            acc[courseKey] = { title: findCourseNameByNumber(course.NUMBER), courses: [] };
        }
        acc[courseKey].courses.push(course);
        return acc;
    }, {});

    const courseKeys = Object.keys(courseGroups).sort(); 

    if (courseKeys.length > 0) {
        const upcomingHeader = document.createElement('h3');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentSemester = getCurrentSemester(currentMonth);
        const currentSemesterYear = currentSemester === "Spring" ? currentYear : currentSemester === "Summer" ? currentYear : currentYear - 1;
        const nextSemesterYear = currentSemester === "Fall" ? currentYear + 1 : currentYear;

        let owlExpressLink = '';
        if (currentSemester === "Spring") {
            const firstCourse = courseGroups[courseKeys[0]].courses[0]; 
            owlExpressLink = `<a href='https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=${encodeURIComponent(currentSemesterYear)}&subj_in=${encodeURIComponent(firstCourse.PREFIX)}&crse_in=${encodeURIComponent(firstCourse.NUMBER)}'>Owl Express</a>`;
        }

        upcomingHeader.innerHTML = `Current/Upcoming: ${currentSemester} ${currentSemesterYear} ${owlExpressLink ? `(${owlExpressLink})` : ""}, Summer ${currentYear}, Fall ${nextSemesterYear}`;

        listBody.appendChild(upcomingHeader);
    }

    courseKeys.forEach(courseKey => {
        const group = courseGroups[courseKey];

        const courseHeader = document.createElement('h3');
        courseHeader.textContent = `${courseKey} - ${group.title}`;
        listBody.appendChild(courseHeader);

        const semesterGroups = group.courses.reduce((acc, course) => {
            const semesterKey = `${course.SEMESTER} ${course.YEAR}`;
            if (!acc[semesterKey]) {
                acc[semesterKey] = [];
            }
            acc[semesterKey].push(course);
            return acc;
        }, {});

        const semesters = Object.keys(semesterGroups).sort(semesterSorter);

        semesters.forEach(semester => {
            if (!selectedSemester || semester === selectedSemester) {
                const courses = semesterGroups[semester];

                const semesterHeader = document.createElement('h3');
                semesterHeader.textContent = semester;
                listBody.appendChild(semesterHeader);

                const table = document.createElement('table');
                table.className = 'course_history_table';
                listBody.appendChild(table);

                const headerRow = document.createElement('tr');
                headerRow.className = 'course_history_header';
                headerRow.innerHTML = `
                    <th>Section</th>
                    <th>Instructor Name</th>
                    <th>Enrollment</th>
                `;
                table.appendChild(headerRow);

                courses.forEach(course => {
                    const row = document.createElement('tr');
                    row.className = 'course_history_row';
                    row.innerHTML = `
                        <td>${course.SECTION}</td>
                        <td>${course.INSTRUCTOR_FIRST_NAME} ${course.INSTRUCTOR_LAST_NAME}</td>
                        <td>${course.Enrollment}</td>
                    `;
                    table.appendChild(row);
                });
            }
        });
    });
}

function getCurrentSemester(month) {
    if (month >= 1 && month <= 4) {
        return "Spring";
    } else if (month >= 5 && month <= 8) {
        return "Summer";
    } else {
        return "Fall";
    }
}


function showSuggestions(input) {
    let divContainer = document.getElementById('autocomplete_list');
    divContainer.style.display = 'block'; 

    const inputLower = (input || "").toLowerCase();

    divContainer.innerHTML = '';

    if (!inputLower) {

        divContainer.innerHTML = ' ';
        return; 
    }

    const filteredCourses = window.all_course_data.filter(course =>
        course.Prefix === 'IT' &&
        (`${course.Prefix} ${course.Course_Number} ${course.Course_Name || ''}`.toLowerCase().includes(inputLower))
    );

    filteredCourses.sort((a, b) => a.Course_Number - b.Course_Number);

    if (filteredCourses.length === 0) {
        divContainer.innerHTML = ' '; 
    } else {
        filteredCourses.forEach(course => {
            let div = document.createElement('div');
            let courseName = course.Course_Name || '-';
            div.textContent = `${course.Prefix} ${course.Course_Number} - ${courseName}`;
            div.onclick = function() {
                document.getElementById('search_bar').value = `${course.Prefix} ${course.Course_Number}`;
                renderHistoryByCourse(`${course.Prefix} ${course.Course_Number}`);
            };
            divContainer.appendChild(div);
        });
    }
}



document.addEventListener('DOMContentLoaded', function() {
    showSuggestions('');  
});

function renderHistoryBySemester(selectedSemester) {
    document.getElementById('faculty_selector').value = '';
    document.getElementById('search_bar').value = '';

    const selectedSubject = document.getElementById('subject_selector').value.toLowerCase();
    let filteredData = window.all_course_data_history.filter(course => {
        const isCorrectSemester = `${course.SEMESTER} ${course.YEAR}` === selectedSemester;
        const isCorrectSubject = !selectedSubject || course.PREFIX.toLowerCase() === selectedSubject;

        return isCorrectSemester && isCorrectSubject;
    });

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
        noDataDiv.innerHTML = '<td colspan="5">No courses found for this semester with the selected subject.</td>';
        table.appendChild(noDataDiv);
        return;
    }
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

function renderHistoryForAllSemesters() {
    const listBody = document.getElementById('list_body');
    if (!listBody) {
        console.error("The element where the list should be rendered was not found.");
        return;
    }
    listBody.innerHTML = '<p>Please use the search options on the left panel.</p>';
}


function findCourseNameByNumber(courseNumber) {
    const courseInData = window.all_course_data.find(course => course.Course_Number === courseNumber.toString());
    
    if (courseInData) {
        return courseInData.Course_Name;
    }

    const courseNames = {
        "1113": "Programming Principles",
        "1323": "Advanced Programming Principles",
        "1323L": "Advanced Programming Principles Lab",
        "4123": "Management of Information Technology",
        "4203": "Advanced Web Development",
        "4213": "Mobile Web Development",
        "4423": "Unix/Linux Administration",
        "4490": "Special Topics in Information Technology",
        "4513": "Electronic Health Record Systems & Applications",
        "4523": "Clinical Process & Workflow",
        "4533": "Health Information Security & Privacy",
        "6503": "Foundations of Health Information Technology",
        "6513": "Electronic Health Record Systems & Applications",
        "6523": "Clinical Process & Workflow: Analysis & Redesign",
        "6533": "Health Information Security & Privacy",
        "6733": "Database Administration",
        "6833": "Wireless Security",
        "6843": "Ethical Hacking: Network Security and Penetration Testing",
        "6853": "Computer Forensics",
        "6863": "Database Security & Auditing",
        "6883": "Infrastructure Defense",
        "6903": "Health Data Analytics",
        "7833": "IT Strategy and Policy"
    };

    return courseNames[courseNumber] || "-";
}

function attachEventListeners() {
    const semesterSelector = document.getElementById('semester_selector');
    const subjectSelector = document.getElementById('subject_selector');
    const facultySelector = document.getElementById('faculty_selector');
    const searchInput = document.getElementById('search_bar'); 
    const pictureButton = document.querySelector('.picture_button');

    if (semesterSelector) semesterSelector.addEventListener('change', filter_results);
    if (subjectSelector) subjectSelector.addEventListener('change', filter_results);
    if (facultySelector) facultySelector.addEventListener('change', filter_results);

    if (pictureButton) pictureButton.addEventListener('click', function() {
        searchInput.value = ''; 
        showSuggestions(searchInput.value); 
        filter_results(); 
    });
}

async function load_page() {
    populateSemesterSelector();
    populateSubjectSelector();
    populateInstructorFilter();
    attachEventListeners();

    const semesterSelector = document.getElementById('semester_selector');
    const subjectSelector = document.getElementById('subject_selector');

    if (semesterSelector && subjectSelector) {
        semesterSelector.value = ""; 
        subjectSelector.value = "IT";

        filter_results(); 
    } else {
        if (!semesterSelector) {
            console.error("Semester selector not found.");
        }
        if (!subjectSelector) {
            console.error("Subject selector not found or 'IT' not available as an option.");
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showSuggestions('');  
});
