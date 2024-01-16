// We store the capstone number and thesis number here as they are handled differently
var program_options = ["IT7993", "IT7999"]

// This function makes the normal version of the page contents that contains hyperlinks on the course names
function make_pdf()
{
    // For all courses, create a body containing the prefix, number, name, and prerequisites
    for (i = 0; i < all_course_data.length; i++)
    {
        var prerequisite_element = "";

        // If we have a prerequisite, pull and store it so it can be shown
        if (all_course_data[i].Prerequisite.toLowerCase() != "none")
        {
            prerequisite_element = "<p class=\"zero_margin\">(" + all_course_data[i].Prerequisite + ")</p>"
        }

        // Create an empty element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Populate the element with the prefix, course number, name, and prerequisite
        html_obj.innerHTML = `
        <div class=\"solid_border flex_stack\">
            <a href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
            ` + prerequisite_element + `
        </div>`;

        // If the course is in the special programs options list, append it to the special program options box, else append the element to its proper track box
        if (program_options.includes(all_course_data[i].Prefix + all_course_data[i].Course_Number))
        {    
            document.getElementById(all_course_data[i].Prefix + all_course_data[i].Course_Number).appendChild(html_obj);
        }
        else
        {
            document.getElementById(all_course_data[i].Track).appendChild(html_obj);
        }
    }
}


// This function constructs the printable version of the page contents
function make_printable_pdf()
{
    // For all courses, create a body containing the prefix, number, name, and prerequisites
    for (i = 0; i < all_course_data.length; i++)
    {
        var prerequisite_element = "";

        // If we have a prerequisite, pull and store it so it can be shown
        if (all_course_data[i].Prerequisite.toLowerCase() != "none")
        {
            prerequisite_element = "<p class=\"zero_margin\">(" + all_course_data[i].Prerequisite + ")</p>"
        }

        // Create an empty element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Populate the element with the prefix, course number, name, and prerequisite
        html_obj.innerHTML = `
        <div class=\"solid_border flex_stack\">
            <p class=\"zero_margin\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</p>
            ` + prerequisite_element + `
        </div>`;

        // If the course is in the special programs options list, append it to the special program options box, else append the element to its proper track box
        if (program_options.includes(all_course_data[i].Prefix + all_course_data[i].Course_Number))
        {    
            document.getElementById(all_course_data[i].Prefix + all_course_data[i].Course_Number).appendChild(html_obj);
        }
        else
        {
            document.getElementById(all_course_data[i].Track).appendChild(html_obj);
        }
    }
}


// This checks to see if the enter key was pressed because using onchange is unreliable
function check_key_highlight(event)
{
    if (event.key == "Enter")
    {
        higlight_course();
    }
}


// This function highlists courses if they match the search criteria
function higlight_course()
{
    // For all courses, check if they meet the critera and highlight them if they do
    for (i = 0; i < all_course_data.length; i++)
    {
        // If the course's number or name is in the searchbar, highlight it, else remove the highlight
        if ((all_course_data[i].Course_Number.toLowerCase().includes(search_bar.value.toLowerCase()) == true ||
            all_course_data[i].Course_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true) &&
            search_bar.value.toLowerCase() != "")
        {
            document.getElementById("course" + i).style.backgroundColor = "#def434";
        }
        else
        {
            document.getElementById("course" + i).style.backgroundColor = "transparent ";
        }
    }
}


// This function resets the searchbar and all heighlights
function reset_highlight()
{
    if (search_bar != null)
    {
        search_bar.value = "";
    }

    higlight_course();
}


// This function hides the print button and uses window.print to bring up the print prompt before showing the button again
function print_pdf()
{
    document.getElementById("print_button").style.display = "none";
    window.print();
    document.getElementById("print_button").style.display = "block";
}


// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    sort_array_by_id(all_course_data);
    
    if (document.getElementById("print_page_button") != null)
    {
        set_site_title(" - MSIT Flowchart");

        document.getElementById("print_page_button").href = link_list.MSIT_Flowchart_Printable;
        make_pdf();
    }
    else
    {
        set_site_title(" - MSIT Printable Flowchart");

        make_printable_pdf();
    }
}