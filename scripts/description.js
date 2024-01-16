// This function creates the main list body of the page, populating it with description information
function load_list_element()
{
    // For all courses, we create their learning outcomes and then create the description element and append it
    for (i = 0; i < all_course_data.length; i++)
    {
        // We store the learning outcome list here as we create it before making the description element
        var learning_outcomes_list = ""

        // If we do not have the learning outsome information, list it as not provided, else create a numbered list of all the learning outcomes
        if (all_course_data[i].Course_Learning_Outcomes[0] == "None")
        {
            learning_outcomes_list = `
            <div class=\"side_by_side\">
                <p class=\"inner_list_margin\">Not Provided</p>
            </div>`
        }
        else
        {
            // For each learning outcome, create a numbered list element and add it to the learning outcomes list
            for (k = 0; k < all_course_data[i].Course_Learning_Outcomes.length; k ++)
            {
                learning_outcomes_list += `
                <div class=\"side_by_side\">
                    <p class=\"inner_list_margin list_pargraph_no_break\">` + (k + 1) + `. </p>
                    <p class=\"list_paragraph_spacer inner_list_margin\">` + all_course_data[i].Course_Learning_Outcomes[k] + `</p>
                </div>`
            }
        }

        // Create an empty element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Populte the element to become the description element with the course number, name, description, learning_outcomes, and prerequisite
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element background_color\"> 
                <a id=\"course_number` + i + `\" class=\"list_link title_size\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + ` (` + all_course_data[i].Credit_Hours + ` Credit Hours)</a>
                <div id=\"description` + i +`\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Description: </p>
                        <p>` + all_course_data[i].Description + `</p>
                    </div>
                </div>
                <div id=\"learning_outcomes` + i + `\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Learning Outcomes: </p>
                        <div class=\"outter_list_margin\">
                            ` + learning_outcomes_list + `
                        </div>
                    </div>
                </div>
                <div id=\"prerequisite` + i + `\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Prerequisite: </p>
                        <p>` + all_course_data[i].Prerequisite + `</p>
                    </div>
                </div>
            </div>
        </div>`;

        // Append the description element to the main list body
        list_body.appendChild(html_obj);
    }
}


// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - Course Description");

    sort_array_by_id(all_course_data);

    load_list_element();
}