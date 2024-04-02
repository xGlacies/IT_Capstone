

// This function creates the main list body for the page
function load_list_element()
{
    // For all courses, create the table row and append it to the main list body
    for (i = 0; i < all_instructor_data.length; i++)
    {
        // Create an empty element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Populte the elemement with course name information, coordinator information, and D2L link information
        html_obj.innerHTML = `
        <div>
            <div id=\"instructor_table` + i + `\">
                <div class=\"table_base coord_row\">
                    <p class=\"data_row table_data\">` + all_instructor_data[i].Last_name + `, ` + all_instructor_data[i].First_name + `</p>
                    <p class=\"data_row table_data\">` + all_instructor_data[i].NetID + `</p>
                    <p class=\"data_row table_data\">` + all_instructor_data[i].Employee_status + `</p>
                </div>
            </div>
        </div>`;

        // Append the element to the main list body
        list_body.appendChild(html_obj);
    }
}


// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - Instructor Directory");

    load_list_element();
}