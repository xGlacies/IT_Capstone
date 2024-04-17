let lastSearchKeyword = '';

// Function to update the course links based on the selected semester and course level
function group_by_type(course_level, selectedSemester, filterKeyword = '') {
    const div = document.getElementById('search_links');
    div.innerHTML = '';  // Clear existing links before adding new ones

    // Enhance filter to include course prefix and number
    const filteredCourses = course_level.filter(course =>
        course.Course_Name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        course.Prefix.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        course.Course_Number.toString().includes(filterKeyword) // Assuming Course_Number is numeric
    );

    filteredCourses.forEach(course => {
        let a = document.createElement('a');
        a.href = `https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=${encodeURIComponent(selectedSemester)}&subj_in=${encodeURIComponent(course.Prefix)}&crse_in=${encodeURIComponent(course.Course_Number)}&schd_in=A`;
        a.target = "iframe_results";
        a.id = course.Prefix + course.Course_Number;
        a.textContent = `${course.Prefix} ${course.Course_Number}: ${course.Course_Name}`;
        div.appendChild(a);
    });
}


function filter_results_owl_express() {
    lastSearchKeyword = document.getElementById('search_bar').value.trim();
    const selectedSemester = document.getElementById('semester_selector').value;
    const activeCourseDataSet = getActiveCourseDataSet();
    group_by_type(activeCourseDataSet, selectedSemester, lastSearchKeyword);
}


// Update the semester display based on selection and update course data display
function update_semester() {
    const selectedSemester = document.getElementById('semester_selector').value;
    const activeCourseDataSet = getActiveCourseDataSet();
    // Use the lastSearchKeyword when updating the semester
    group_by_type(activeCourseDataSet, selectedSemester, lastSearchKeyword);
}


// Function to determine which dataset is currently active
function getActiveCourseDataSet() {
    const activeButton = document.querySelector('.order_button.active');
    switch (activeButton.id) {
        case "ALL":
            return all_course_data;
        case "BSIT":
            return BSIT_course_data;
        case "MSIT":
            return MSIT_course_data;
        default:
            return all_course_data; // Default to all courses if none is selected
    }
}

// Function to set active button and group data by type
function setActiveAndGroup(buttonId) {
    const buttons = document.querySelectorAll('.order_button');
    buttons.forEach(button => button.classList.remove('active'));
	buttons.forEach(button => button.setAttribute("style", "font-weight: none;text-decoration: none;"));
    const activeButton = document.getElementById(buttonId);
    activeButton.classList.add('active');
	activeButton.setAttribute("style", "font-weight: bold;text-decoration: underline;");

    const selectedSemester = document.getElementById('semester_selector').value;
    let courseData;
    switch (buttonId) {
        case "ALL":
            courseData = all_course_data;
            break;
        case "BSIT":
            courseData = BSIT_course_data;
            break;
        case "MSIT":
            courseData = MSIT_course_data;
            break;
    }
    // Apply the last used search keyword when switching course groups
    group_by_type(courseData, selectedSemester, lastSearchKeyword);
}


function check_key_keywords(event)
{
    if (event.key == "Enter")
    {
        filter_results_owl_express();
    }
}



// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    sort_array_by_id(all_course_data);
	sort_array_by_id(BSIT_course_data);
	sort_array_by_id(MSIT_course_data);

    lastSearchKeyword = '';  // Check the keyword is reset on page load
    const selectedSemester = document.getElementById('semester_selector').value || "202408"; // Default to Fall 2024 if not set
    group_by_type(all_course_data, selectedSemester);
}
