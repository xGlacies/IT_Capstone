// Ensures that the page is fully loaded before executing the load_page function
document.addEventListener('DOMContentLoaded', function() {
    load_page();
});

// Fetches course data from the server and populates it into sessionStorage
async function fetchCourseData() {
    if (!sessionStorage.getItem("all_course_data")) {
        const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/courses');
        if (response.ok) {
            let courseData = await response.json();
            // Fetch course history data
            const historyData = await fetchCourseHistoryData();
            // Combine course data with course history
            courseData.forEach(course => {
                // Find matching course history entry
                const historyEntry = historyData.find(entry => {
                    return entry.PREFIX === course.Prefix && entry.NUMBER === course.Course_Number && entry.SECTION === course.Section;
                });
                // Merge history data into course object
                if (historyEntry) {
                    course.SEMESTER = historyEntry.SEMESTER;
                    course.YEAR = historyEntry.YEAR;
                    course.Enrollment = historyEntry.Enrollment;
                }
            });
            // Store combined data in sessionStorage
            sessionStorage.setItem("all_course_data", JSON.stringify(courseData));
        } else {
            console.error("Failed to fetch course data: Server responded with status", response.status);
        }
    }
    window.all_course_data = JSON.parse(sessionStorage.getItem("all_course_data") || "[]");
}

// Fetches course history data from the server
async function fetchCourseHistoryData() {
    const url = 'https://us-east-2.aws.data.mongodb-api.com/app/data-qcuav/endpoint/GetCourseHistory';
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        console.error("Failed to fetch course history data: Server responded with status", response.status);
        return [];
    }
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
        const semesterMatch = selectedSemester === 'All Semesters' || course.SEMESTER.toLowerCase().includes(selectedSemester.toLowerCase());
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
                <a class="title_size space_before" href="${course.OwlExpress_Link}" target="_blank">${course.Prefix} ${course.Course_Number}: ${course.Course_Name}</a>
                <p>Faculty: ${course.Coordinator_Name} / ${course.Co_Coordinator_Name}</p>
                <p>Degree: ${course.Degree}</p>
                <p>Track: ${course.Track}</p>
                <p>Semester: ${course.SEMESTER}</p>
                <p>Year: ${course.YEAR}</p>
                <p>Section #: ${course.Section}</p>
                <p>Number of Students: ${course.Enrollment}</p>
            </div>`;
        listBody.appendChild(htmlObj);
    });
}

// Filters the list of courses based on the selected degree (BSIT or MSIT)
function filterByDegree(degree) {
    const filteredCourses = window.all_course_data.filter(course => {
        return course.Degree === degree;
    });

    // Renders the filtered courses onto the webpage
    renderCourses(filteredCourses);
}

// Function for Simple List View
function simpleListView() {
    // Update checkmark images
    document.getElementById('no_group_img').classList.remove('hidden');
    document.getElementById('track_group_img').classList.add('hidden');

    // Renders all courses onto the webpage
    renderCourses(window.all_course_data);
}

// Function to group courses by MSIT
function group_by_MSIT() {
    // Update checkmark images
    document.getElementById('no_group_img').classList.add('hidden');
    document.getElementById('track_group_img').classList.remove('hidden');

    const filteredCourses = window.all_course_data.filter(course => {
        return course.Degree === 'MSIT';
    });

    // Renders the filtered MSIT courses onto the webpage 
    renderCourses(filteredCourses);
}

// Function to group courses by BSIT
function group_by_BSIT() {
    // Update checkmark images
    document.getElementById('no_group_img').classList.add('hidden');
    document.getElementById('track_group_img').classList.remove('hidden');

    const filteredCourses = window.all_course_data.filter(course => {
        return course.Degree === 'BSIT';
    });

    // Renders the filtered BSIT courses onto the webpage
    renderCourses(filteredCourses);
}

// Resets all filters to default values
function resetFilters() {
    // Clearing input values
    document.getElementById('semester_selector').value = 'All Semesters';
    document.getElementById('subject_selector').value = 'All Subjects';
    document.getElementById('faculty_selector').value = 'All Faculty';
    document.getElementById('search_bar').value = '';

    // Load both MSIT and BSIT courses by default
    filterByDegree('MSIT');
    filterByDegree('BSIT');

    // Switch to Simple List View
    switchToSimpleListView();
}

// Attaches event listeners to various elements on the webpage
function attachEventListeners() { 
    const search_bar = document.getElementById('search_bar');
    const semester_selector = document.getElementById('semester_selector');
    const subject_selector = document.getElementById('subject_selector');
    const faculty_selector = document.getElementById('faculty_selector');
    const bsitButton = document.getElementById('bsit');
    const msitButton = document.getElementById('msit');
    const resetButton = document.getElementById('reset_filters');

    // Add event listeners for input changes and clicks
    if (search_bar && semester_selector && subject_selector && faculty_selector) {
        search_bar.addEventListener('input', load_list_element);
        semester_selector.addEventListener('change', load_list_element);
        subject_selector.addEventListener('change', load_list_element);
        faculty_selector.addEventListener('change', load_list_element);
    }

    // Add event listeners for BSIT, MSIT buttons, and reset button
    if (bsitButton && msitButton && resetButton) {
        bsitButton.addEventListener('click', () => {
            filterByDegree('BSIT');
            switchToSimpleListView();
        });
        msitButton.addEventListener('click', () => {
            filterByDegree('MSIT');
            switchToSimpleListView();
        });
        resetButton.addEventListener('click', resetFilters);
    }
}

// Function to switch to Simple List View
function switchToSimpleListView() {
    // Update checkmark images
    document.getElementById('no_group_img').classList.remove('hidden');
    document.getElementById('track_group_img').classList.add('hidden');
}

// Populate the instructor filter dropdown with all available instructors
function populateInstructorFilter() {
    const instructorSelector = document.getElementById('faculty_selector');
    const instructors = new Set();

    // Collect unique instructors from all course data
    all_course_data.forEach(course => {
        if (course.Coordinator_Name) {
            instructors.add(course.Coordinator_Name);
        }
        if (course.Co_Coordinator_Name) { 
            instructors.add(course.Co_Coordinator_Name);
        }
    });

    // Clear existing options
    instructorSelector.innerHTML = ''; 

    // Add "All Faculty" option
    const allOption = document.createElement('option');
    allOption.value = 'All Faculty';
    allOption.textContent = 'All Faculty';
    instructorSelector.appendChild(allOption);

    // Add each instructor as an option
    instructors.forEach(instructor => {
        const option = document.createElement('option');
        option.value = instructor;
        option.textContent = instructor;
        instructorSelector.appendChild(option);
    });
}

// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page() {
    set_site_title(" - Course Schedules"); // set_site_title needs to be defined in your script
    load_list_element();
    populateInstructorFilter();
    attachEventListeners();
}

