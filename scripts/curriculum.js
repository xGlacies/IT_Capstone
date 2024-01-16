// These are the section elements that hold the lists. These are used for the search feature on this page
var program_information = document.getElementById("program_information");
var class_schedule = document.getElementById("class_schedule");
var curriculum_apps = document.getElementById("curriculum_apps");
var course_resources = document.getElementById("course_resources");


// This function uses the inbuilt sort function to sort an array by the catalog year. This is used for the catalog array as ordering is not certain in the database
function sort_array_by_year(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Catalog_Year;
            var check_2 = in_2.Catalog_Year;
            if (check_1 > check_2)
            {
                return -1;
            }
            if (check_1 < check_2)
            {
                return 1;
            }
        }
    );
}


// This function loads the catalog table section of the page from the infomration in the database
function load_list_element()
{
    // This creates 2D array where objects are put into a one of the sub arrays based on the catalog year
    var years = [all_catalog_data.filter(catalog => catalog.Catalog_Year == "2023-2024"), 
    all_catalog_data.filter(catalog => catalog.Catalog_Year == "2022-2023"), 
    all_catalog_data.filter(catalog => catalog.Catalog_Year == "2021-2022")];

    // We create HTMl elements for each of the year ranges
    for (i = 0; i < years.length; i++)
    {
        // This pulls all of the relevant information from the 2D array for one specific year
        var bsit = years[i].find(catalog => catalog.Program_Short_Name == "BSIT");
        var msit = years[i].find(catalog => catalog.Program_Short_Name == "MSIT");
        var foundation = years[i].find(catalog => catalog.Program_Short_Name == "Foundations");
        var enterprise = years[i].find(catalog => catalog.Program_Short_Name == "Enterprise");
        var health = years[i].find(catalog => catalog.Program_Short_Name == "Health");
        var security = years[i].find(catalog => catalog.Program_Short_Name == "Security");
        var analytics = years[i].find(catalog => catalog.Program_Short_Name == "Analytics");

        // Create a div that can be appended to the document
        var html_obj = document.createElement('div');

        html_obj.classList.add("table_base");
        html_obj.classList.add("eight_row");
        html_obj.id = "catalog" + i;

        // Set the innerHTML of the div to be the table row that we want to show, with all information populated
        html_obj.innerHTML = `
        <a class="data_row table_data">` + msit.Catalog_Year + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + bsit.Catalog_Id + `&poid=` + bsit.Program_Id + `" target="_blank">` + bsit.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + msit.Catalog_Id + `&poid=` + msit.Program_Id + `" target="_blank">` + msit.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + foundation.Catalog_Id + `&poid=` + foundation.Program_Id + `" target="_blank">` + foundation.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + enterprise.Catalog_Id + `&poid=` + enterprise.Program_Id + `" target="_blank">` + enterprise.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + health.Catalog_Id + `&poid=` + health.Program_Id + `" target="_blank">` + health.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + security.Catalog_Id + `&poid=` + security.Program_Id + `" target="_blank">` + security.Program_Short_Name + `</a>
        <a class="data_row table_data list_link" href="https://catalog.kennesaw.edu/preview_program.php?catoid=` + analytics.Catalog_Id + `&poid=` + analytics.Program_Id + `" target="_blank">` + analytics.Program_Short_Name + `</a>`;

        // Append the div to the catalogs table
        program_catalogs_table.appendChild(html_obj);
    }
}


// This function is used to run the filter function (hide_show_element) on all sections of the page (currently four sections)
function filter_curr_page()
{
    hide_show_elements(program_information);
    hide_show_elements(class_schedule);
    hide_show_elements(curriculum_apps);
    hide_show_elements(course_resources);
}


// This function is used to hide or show elements based on search parameters
function hide_show_elements(element)
{
    var hide_element = true;
    
    // For all list elements in the section, we check if the list element meets the keyword parameters of the searchbar. If it does, we show it and mark the section as shown. If it does not, we hide the element
    for (i = 0; i < element.children.length; i++)
    {
        if (element.children[i].children[0].children[0].innerHTML.toLowerCase().includes(search_bar.value.toLowerCase()) == true)
        {
            element.children[i].style.gridTemplateRows = "1fr";
            hide_element= false;
        }
        else
        {
            element.children[i].style.gridTemplateRows = "0fr";
        }
    }

    // If the section has no visible elements, we hide the section header as well. If it has visible elements, we show the header
    if (hide_element == true)
    {
        document.getElementById(element.id + "_header").style.gridTemplateRows = "0fr";
    }
    else
    {
        document.getElementById(element.id + "_header").style.gridTemplateRows = "1fr";
    }
}


// This function is used to check if the key being pressed is the enter key. This is used for the search bar as onchange only fires if the enter was clicked and the content changed, which may not be true if the page is refreshed
function check_key_curr(event)
{
    if (event.key == "Enter")
    {
        filter_curr_page();
    }
}


// This function is used to reset the contents of the search bar and remove any search parameters from the page
function reset_curr_filters()
{
    if (search_bar != null)
    {
        search_bar.value = "";
    }

    filter_curr_page();
}


// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - Curriculum Resources");

    sort_array_by_year(all_catalog_data);

    load_list_element();
}