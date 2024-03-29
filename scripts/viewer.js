// Essential variables such as the URL query and elements on the page that will be reffered to in the code
var query = new URLSearchParams(window.location.search);
var query_prefix = ""
var query_course = ""
var course = ""
var course_page = document.getElementById("course_page");
var tabs = document.getElementById("tabs_row").children;
var course_selector = document.getElementById("course_selector");

// These arrays are used to determine which elements should show under which tabs
var essential_info_enum = 
[
    "description", "credit_hours", "prerequisite", "learning_outcomes", "syllabus_link", "catalog_link", "memo"
];

var offering_info_enum = 
[
    "schedule", "offering_history", "owlexpress_link"
];

var development_info_enum = 
[
    "coordinator_table", "curriculog_link", "alg_info"
];


// This function loads all course numbers and names into the quick selector dropdown menu
function load_course_quick_select()
{
    var course_select_html = "<option value=\"none\" disabled selected>Select an Item</option>"

    // For all courses add the prefix, number, and name to the course selector
    for (i = 0; i < all_course_data.length; i++)
    {
        course_select_html += "<option value=\"" + i + "\">" + all_course_data[i].Prefix + " " + all_course_data[i].Course_Number + ": " + all_course_data[i].Course_Name + "</option>"
    }

    course_selector.innerHTML = course_select_html
}


// This function loads a new course if one is selected though the quick select dopdown
function select_course()
{
    // Clear the page
    course_page.innerHTML = "";

    // get the new course
    course = all_course_data[course_selector.value];

    // Set the page title
    set_site_title_course("Course Profile " + course.Prefix + " " +  course.Course_Number + " " + course.Course_Name);

    // Change the page URL
    window.history.replaceState(null, null, "?course=" + course.Prefix + course.Course_Number);
    
    load_page_element();
}


// This function hides or show information based on which tab is currently selected
async function swap_tab(switch_tab, animate)
{
    var body = document.getElementById("course_body").children[0].children;

    // Swap the highlight to the most recently clicked tab button
    for (j = 0; j < tabs.length; j ++)
    {
        // Clear active tabs
        tabs[j].className = tabs[j].className.replace(" tab_active", "");

        // If we are the new active tab, add the proper class name
        if (tabs[j].getAttribute("id") == switch_tab)
        {
            tabs[j].className += " tab_active";
        }
    }

    // If we should animate, perform the animation and delay for half a second to allow the animation to play out
    if (animate == true)
    {
        document.getElementById("course_body").style.gridTemplateRows = "0fr";
        await sleep(500);
    }

    // Hide or show information based on which tab was clicked and if the infomration is in the enum related to that tab
    if (switch_tab == "essential_info")
    {
        for (i = 0; i < body.length; i++)
        {
            // Show elements that are in the essential infromation enum, hide the rest
            if (essential_info_enum.includes(body[i].getAttribute("id"))) 
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else if (switch_tab == "offering_info")
    {
        for (i = 0; i < body.length; i++)
        {
            // Show elements that are in the offering information enum, hide the rest
            if (offering_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else if (switch_tab == "development_info")
    {
        for (i = 0; i < body.length; i++)
        {
            // Show elements that are in the development information enum, hide the rest
            if (development_info_enum.includes(body[i].getAttribute("id")))
            {
                body[i].style.height = "auto";
            }
            else
            {
                body[i].style.height = "0";
            }
        }
    }
    else
    {
        // Show all elements as this is the all information tab
        for (i = 0; i < body.length; i++)
        {
            body[i].style.height = "auto";
        }
    }

    // If we should animate, show the opening animation
    if (animate == true)
    {
        document.getElementById("course_body").style.gridTemplateRows = "1fr";
    }
}


// Create the offering history for the specified year
function build_offering_history(year)
{
    var offering_history_fall
    var offering_history_summer
    var offering_history_spring

    // If fall does not have history, show simple text that says not offered, otherwise create a link that says fall + the year and links to the owl express for that semester
    if (course.Offering_History["Fall_" + year].toLowerCase() == "not offered")
    {
        offering_history_fall = `<p class=\"list_paragraph_spacer\">` + course.Offering_History["Fall_" + year] + `</p>`;
    }
    else
    {
        offering_history_fall = `<a class=\"list_paragraph_spacer list_link\" href=\"` + course.Offering_History["Fall_" + year] + `\" target=\"_blank\">Fall ` + year + `</a>`;
    }

    // If summer does not have history, show simple text that says not offered, otherwise create a link that says summer + the year and links to the owl express for that semester
    if (course.Offering_History["Summer_" + year].toLowerCase() == "not offered")
    {
        offering_history_summer = `<p class=\"list_paragraph_spacer\">` + course.Offering_History["Summer_" + year] + `,</p>`;
    }
    else
    {
        offering_history_summer = `<a class=\"list_paragraph_spacer list_link\" href=\"` + course.Offering_History["Summer_" + year] + `\" target=\"_blank\">Summer ` + year + `,</a>`;
    }

    // If spring does not have history, show simple text that says not offered, otherwise create a link that says spring + the year and links to the owl express for that semester
    if (course.Offering_History["Spring_" + year].toLowerCase() == "not offered")
    {
        offering_history_spring = `<p class=\"list_paragraph_spacer\">` + course.Offering_History["Spring_" + year] + `,</p>`;
    }
    else
    {
        offering_history_spring = `<a class=\"list_paragraph_spacer list_link\" href=\"` + course.Offering_History["Spring_" + year] + `\" target=\"_blank\">Spring ` + year + `,</a>`;
    }

    // Return a formatted list of the semesters
    return `
    <div class=\"side_by_side\">
        <p class=\"bold\">` + year + `: </p>
        ` + offering_history_spring + `
        ` + offering_history_summer + `
        ` + offering_history_fall + `
    </div>`;
}


// This function generates the latest round information for the latest ALG round
function generate_latest_round_info()
{
    // Split the round into round and grant so it can be used
    var round_split = course.Latest_ALG_Round.split("-");
    var round = "";
    var grant = "";
    var grant_type = "";
    var round_year = "";

    // Find the round and grant infromation
    for (i = 0; i < all_grant_data.length; i++)
    {
        if (all_grant_data[i].Round == round_split[0])
        {
            round = all_grant_data[i];

            if (round_split.length > 1)
            {
                for (j = 0; j < round.Grants.length; j++)
                {
                    if (round.Grants[j].Grant == round_split[1])
                    {
                        grant = round.Grants[j];
                        grant_type = ` `+ grant.Type + ` Grant`;
                        break;
                    }
                }
            }
            break;
        }
    }

    // If we have a round grab and format the round year
    if (round_split[0] != "None")
    {
        round_year = ` (` + round.Year + `)`;
    }

    // Return the round, year, and grant type
    return `
    <li class="table_base list_element_row">
        <p class=\"bold tall_list_margin\">Latest Round:</p>
        <p class="tall_list_margin">` + course.Latest_ALG_Round + round_year + grant_type + `</p>
    </li>`;
}


// This function creates the ALG history for the course
function generate_history_info()
{
    // Here we grab the history and get ready to store the history list
    var history = course.History;
    var history_list = ""; 

    // If we do not have hsitory, we create a blank round element
    if (history == undefined)
    {
        history = [ { Round : "None" } ];
    }

    // For all elements in the history, create the formatted history element
    for (k = 0; k < history.length; k++)
    {
        // Split the round so we can easily get the round and grant information
        var round_split = history[k].Round.split("-");
        var round = "";
        var grant = "";
        var grant_repo = "";
        var developer = "";

        // For all grants, find the round and grant that we have
        for (i = 0; i < all_grant_data.length; i++)
        {
            if (all_grant_data[i].Round == round_split[0])
            {
                round = all_grant_data[i];

                if (round_split.length > 1)
                {
                    for (j = 0; j < round.Grants.length; j++)
                    {
                        if (round.Grants[j].Grant == round_split[1])
                        {
                            grant = round.Grants[j];
                            grant_repo = grant.OER_Repo;
                            break;
                        }
                    }
                }
                break;
            }
        }

        // if we have history, store the developer's name in the proper format
        if (history[k].Round != "None")
        {
            developer = ` (` + history[k].Developer + `)`;
        }

        // If we do not have a grant repo, create a text element to show the round, else create a link element to show the round and link to the repo when clicked
        if (grant_repo == "" || grant_repo == "Not Provided")
        {
            history_list += `<p class="tall_list_margin">` + history[k].Round + developer + `</p>`
        }
        else
        {
            history_list += `<a class="tall_list_margin black_text" href=\"` + grant_repo + `\" target=\"_blank\">` + history[k].Round + developer + `</a>`
        }
        
        // Add commas when needed
        if (history.length > 1 && k < (history.length - 1))
        {
            history_list += `<p class="tall_list_margin space_after">,</p>`
        }
    }
    
    // Return the formatted history list
    return `
    <li class="table_base list_element_row">
        <p class=\"bold tall_list_margin\">History:</p>
        <div class=\"side_by_side\">
            ` + history_list + `
        </div>
    </li>`;
}


// This is a custom sleep function that will delay operations until the timeout is reached. This is mainly used as a way to let animations resolve before more animations attempt to play
function sleep(miliseconds)
{
    return new Promise(timeout =>
        {
            setTimeout(timeout, miliseconds)
        });
}


// This function loads all information for this course into an HTML element that is then appended to the page's main body
function load_page_element()
{
    // Store the learning outcomes and offering history when we create them
    var learning_outcomes_list = ""
    var offering_history_list = ""

    // If we do not have any learning outcomes, store an element saying they were not provided, else create an element showing them
    if (course.Course_Learning_Outcomes[0] == "None")
    {
        learning_outcomes_list = `
        <div class=\"side_by_side\">
            <p class=\"inner_list_margin\">` + course.Course_Learning_Outcomes[0] + `</p>
        </div>`
    }
    else
    {
        // For all learning outcomes, create an element that stores the outcome and its number. This is added to the learning outcomes list
        for (k = 0; k < course.Course_Learning_Outcomes.length; k ++)
        {
            learning_outcomes_list += `
            <div class=\"side_by_side\">
                <p class=\"inner_list_margin\">` + (k + 1) + `. </p>
                <p class=\"list_paragraph_spacer inner_list_margin\">` + course.Course_Learning_Outcomes[k] + `</p>
            </div>`
        }
    }

    // Store the OER links when we create them
    var oer_links = `<p class=\"tall_list_margin\">None</p>`

    // If we have a website link, populate it
    if (course.OER_Links.Website != "None")
    {
        oer_links = `<a class=\"tall_list_margin\" href=\"` + course.OER_Links.Website + `\" target=\"_blank\">Website</a>`
    }

    // If we have an OpenALG link, populate it
    if (course.OER_Links.OpenALG != "None")
    {
        if (oer_links == `<p class=\"tall_list_margin\">None</p>`)
        {
            oer_links = `<a class=\"tall_list_margin\" href=\"` + course.OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
        }
        else
        {
            oer_links += `<p class=\"tall_list_margin\">, </p>`;
            oer_links += `<a class=\"tall_list_margin space_before\" href=\"` + course.OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
        }
    }
    
    // Create the offering history for the past three years
    offering_history_list += build_offering_history("2023");
    offering_history_list += build_offering_history("2022");
    offering_history_list += build_offering_history("2021");

    // Create an empty object
    var html_obj = document.createElement('div');

    html_obj.classList.add("animate_open_default");

    html_obj.id = "course"

    // Populate the object with all the course information and the created elements
    html_obj.innerHTML = `
    <div class=\"list_element background_color\">
        <p id=\"course_number\" class=\"bold title_size\">` + course.Prefix + ` ` + course.Course_Number + `: ` + course.Course_Name + `</p>
        <div id=\"course_body\" class=\"animate_open_default contained\">
            <div>
                <div id=\"credit_hours\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Credit Hours: </p>
                        <p>` + course.Credit_Hours + `</p>
                    </div>
                </div>
                <div id=\"description\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Description: </p>
                        <p>` + course.Description + `</p>
                    </div>
                </div>
                <div id=\"learning_outcomes\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Learning Outcomes: </p>
                        <div class=\"outter_list_margin\">
                            ` + learning_outcomes_list + `
                        </div>
                    </div>
                </div>
                <div id=\"prerequisite\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Prerequisite: </p>
                        <p>` + course.Prerequisite + `</p>
                    </div>
                </div>
                <div id=\"syllabus_link\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Syllabus Link: </p>
                        <a class=\"list_link\" href=\"` + link_list.Syllabus_Repository + course.Prefix + course.Course_Number + `-Syllabus.pdf\" target=\"_blank\">` + course.Prefix + course.Course_Number + `-Syllabus.pdf</a>
                    </div>
                </div>
                <div id=\"catalog_link\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Course Catalog Link: </p>
                        <a class=\"list_link\" href=\"` + course.Course_Catalog_Link + `\" target=\"_blank\">` + course.Course_Catalog_Link + `</a>
                    </div>
                </div>
                <div id=\"memo\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Memo: </p>
                        <p>` + course.Memo + `</p>
                    </div>
                </div>
                <div id=\"schedule\" class=\"hide_overflow\">
                    <div>
                        <p class=\"bold\">Course Permanent Schedule:</p>
                    </div>
                    <div class=\"table_padder_top\">
                    </div>
                    <div class=\"table_base six_row\">
                        <p class=\"header_row table_data\">Fall Odd</p>
                        <p class=\"header_row table_data\">Summer Odd</p>
                        <p class=\"header_row table_data\">Spring Odd</p>
                        <p class=\"header_row table_data\">Fall Even</p>
                        <p class=\"header_row table_data\">Summer Even</p>
                        <p class=\"header_row table_data\">Spring Even</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Fall_Odd + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Summer_Odd + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Spring_Odd + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Fall_Even + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Summer_Even + `</p>
                        <p class=\"data_row table_data\">` + course.Course_Schedule.Spring_Even + `</p>
                    </div>
                    <div class=\"table_padder_bottom\">
                    </div>
                </div>
                <div id=\"offering_history\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Offering History: </p>
                        <div>
                            ` + offering_history_list + `
                        </div>
                    </div>
                </div>
                <div id=\"owlexpress_link\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">OwlExpress Link: </p>
                        <a class=\"list_link\" href=\"` + course.OwlExpress_Link + `\" target=\"_blank\">` + course.OwlExpress_Link + `</a>
                    </div>
                </div>
                <div id=\"coordinator_table\" class=\"hide_overflow\">
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Course Coordinator:</p>
                        <p>` + course.Coordinator_Name + `, ` + course.Co_Coordinator_Name +`</p>
                        <p class=\"bold\">D2L Master Shell:</p>
                        <a class=\"list_link\" href=\"` + course.D2L_Master_Link + `\" target=\"_blank\">` + course.D2L_Master_Link + `</a>
                </div>
                <div id=\"curriculog_link\" class=\"hide_overflow\">             
                    <div class=\"table_base list_element_row\">
                        <p class=\"bold\">Curriculog Link: </p>
                        <a class=\"list_link\" href=\"` + course.Curriculog_Link + `\" target=\"_blank\">` + course.Curriculog_Link + `</a>
                    </div>
                </div>
                <div id=\"alg_info\" class=\"hide_overflow\">
                    <p class="bold list_header_margin">ALG Grants:</p>
                    <ul>
                        ` + generate_latest_round_info() + `
                        <li class="table_base list_element_row">
                            <p class=\"bold tall_list_margin\">Developer:</p>
                            <p class="tall_list_margin">` + course.Latest_Developer + `</p>
                        </li>
                        <li class="table_base list_element_row">
                            <p class="bold tall_list_margin">OER Links:</p>
                            <div class=\"side_by_side\">
                                `+ oer_links + `
                            </div>
                        </li>
                        ` + generate_history_info() + `
                    </ul>
                </div>
            </div>
        </div>
    </div>`;

    // Append the element to the main body
    course_page.appendChild(html_obj);
}


// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    sort_array_by_id(all_course_data);

    // Figure out which course we are dealing with
    query_prefix = query.get("course").replace(/[0-9]*/g, "");
    query_course = query.get("course").replace(/[A-Z]*/g, "");

    // If we were not sent the course information, retrieve it from the course data array and put it into session storage
    if (sessionStorage.getItem("stored_course") == null || (JSON.parse(sessionStorage.getItem("stored_course")).Prefix + JSON.parse(sessionStorage.getItem("stored_course")).Course_Number) != (query_prefix + query_course))
    {
        for (id = 0; id < all_course_data.length; id++)
        {
            if (all_course_data[id].Prefix == query_prefix && all_course_data[id].Course_Number == query_course)
            {
                sessionStorage.setItem("stored_course", JSON.stringify(all_course_data[id]));
                break;
            }
        }
    }

    course = JSON.parse(sessionStorage.getItem("stored_course"));

    set_site_title_course("Course Profile " + course.Prefix + " " +  course.Course_Number + " " + course.Course_Name);

    load_page_element();

    load_course_quick_select()
}