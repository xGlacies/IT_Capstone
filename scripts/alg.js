// This function creates the main list
function load_list_element()
{
    // Create a table header for the contents
    list_body.innerHTML = `
    <div id=\"coordinator_header\" class=\"list_header\">
        <div>
            <div class=\"table_base alg_row\">
                <p class=\"header_row table_data\">
                    Course
                    <button id=\"sort_course_arrow\" class=\"sort_arrow_button\" onclick=\"order_by('Arrow Course Number');\">
                        <img class=\"sort_arrow_button\" src=\"resources/triangle.webp\" alt=\"Sort\">
                    </button>
                </p>
                <p class=\"header_row table_data\">
                    Latest Grant
                    <button id=\"sort_round_arrow\" class=\"sort_arrow_button\" onclick=\"order_by('Arrow Round');\">
                        <img class=\"sort_arrow_button\" src=\"resources/triangle.webp\" alt=\"Sort\">
                    </button>
                </p>
                <p class=\"header_row table_data\">Latest Developer</p>
                <p class=\"header_row table_data\">OER Materials</p>
                <p class=\"header_row table_data\">Course Coordinator</p>
            </div>
        </div>
    </div>`;

    // For all courses, create a data row showing their alg infomration and append it to the main list
    for (i = 0; i < all_course_data.length; i++)
    {
        // Create a list of OER links for the course
        var oer_links = `<p class=\"zero_margin\">None</p>`

        // If we have a website link, add it to the links
        if (all_course_data[i].OER_Links.Website != "None")
        {
            oer_links = `<a href=\"` + all_course_data[i].OER_Links.Website + `\" target=\"_blank\">Website</a>`
        }

        // If we have a OpenALG link, add it to the links
        if (all_course_data[i].OER_Links.OpenALG != "None")
        {
            if (oer_links == `<p class=\"zero_margin\">None</p>`)
            {
                oer_links = `<a href=\"` + all_course_data[i].OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
            }
            else
            {
                oer_links += `<a class=\"list_stack_margin\" href=\"` + all_course_data[i].OER_Links.OpenALG + `\" target=\"_blank\">OpenALG</a>`;
            }
        }

        // If there is more than one latest developer, split them into an array
        var latest_developers = all_course_data[i].Latest_Developer.split(", ");
        var latest_developers_list = "";

        // For each latest developer, create a special element that has a link to perform a quick search for the name
        for (l = 0; l < latest_developers.length; l++)
        {
            latest_developers_list += `<a onclick=\"filter_by_faculty('` + latest_developers[l] + `');\" class=\"special_link\">` + latest_developers[l] + `</a>`;

            // Put commas between names
            if (l < latest_developers.length - 1)
            {
                latest_developers_list += `<p class="inline_block zero_margin_with_space">,</p>`
            }
        }

        // Create an empty element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Populate the element with the ALG and coordinater infomration
        html_obj.innerHTML = `
        <div>
            <div id=\"coordinator_table` + i + `\">
                <div class=\"table_base alg_row\">
                    <a class=\"data_row table_data\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                    <p class=\"data_row table_data\">` + generate_latest_round(i) + `</p>
                    <div class=\"data_row table_data side\">` + latest_developers_list + `</div>
                    <div class=\"data_row table_data\">
                        <div class=\"verticle_stack\">
                            ` + oer_links + `
                        </div>
                    </div>
                    <div class=\"data_row table_data side\">` + all_course_data[i].Coordinator_Name + `, ` + all_course_data[i].Co_Coordinator_Name + `</div>
                </div>
            </div>
        </div>`;

        // Append the element to the main list body
        list_body.appendChild(html_obj);
    }
}


// This function generate the round text for the data row
function generate_latest_round(i)
{
    // If we have a latest round, format the round infomration, else return None
    if (all_course_data[i].Latest_ALG_Round != "None")
    {
        // Split the round information into round and grant
        var round = all_course_data[i].Latest_ALG_Round.split("-")[0].replace("R", "");
        var grant = all_course_data[i].Latest_ALG_Round.split("-")[1];
        var iterator = 0

        // Look through all rounds and figure out which year the round happened in
        for (iterator = 0; iterator < all_grant_data.length; iterator++)
        {
            if (all_grant_data[iterator].Round == "R" + round)
            {
                break;
            }
        }

        // Return the formatted round and year
        return `Round ` + round + ` (` + all_grant_data[iterator].Year + `)<br># ` + grant;
    }
    else
    {
        return "None";
    }
}


// This function loads the list element when we are viewing by ALG instead of by course
function load_group_list_element()
{
    // For all courses, create the list element and append it to the proper grant headers
    for (i = 0; i < all_course_data.length; i++)
    {
        // Split the latest developers if there are more than one
        var latest_developers = all_course_data[i].Latest_Developer.split(", ");
        var latest_developers_list = "";

        // For each developer, create a clickable link that will quick search by the developer
        for (l = 0; l < latest_developers.length; l++)
        {
            latest_developers_list += `<a onclick=\"filter_by_faculty('` + latest_developers[l] + `');\" class=\"special_link tall_list_margin unbold\">` + latest_developers[l] + `</a>`;

            // If there is more than one, add commas between
            if (l < latest_developers.length - 1)
            {
                latest_developers_list += `<p class="tall_list_margin space_after">,</p>`
            }
        }

        // Create an empty element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.classList.add("course" + i);

        // Populate the element with the course prefix, number, name, and develoepr information
        html_obj.innerHTML = `
        <div>
            <div class=\"side_by_side list_indent\">
                <a class=\"unbold tall_list_margin\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
                <p class=\"space_before unbold tall_list_margin\">(</p>
                ` + latest_developers_list + `
                <p class=\"unbold tall_list_margin\">)</p>
            </div>
        </div>`;

        // Push the element onto all headers that align with the latest round or any of the rounds in the history of the course
        var course_rounds = all_course_data[i].Latest_ALG_Round;
        var course_history = all_course_data[i].History;

        push_grant_information(course_rounds, html_obj);
        push_array_grant_information(course_history, html_obj);
    }
}


// This function pushes a the grant information into the grant headers for one round
function push_grant_information(grant, html_obj)
{
    // If there is a grant, we push the element to the proper grant header
    if (grant != "None")
    {
        // If the round is a combination of round and grant, we append the object to the specific grant header, else we append it to a general header under the round
        if (grant.includes("-"))
        {
            document.getElementById(grant).appendChild(html_obj.cloneNode(true));
        }
        else
        {
            // If the general grant header already exits, append the element to it, else we create the general header and append the element to it
            if (document.getElementById(grant + "no_grant_specified") != null)
            {
                document.getElementById(grant + "no_grant_specified").appendChild(html_obj.cloneNode(true));
            }
            else
            {
                empty_grant = document.createElement('div');
                empty_grant.classList.add("animate_open_default");
                
                empty_grant.innerHTML = `
                <div>
                    <p id=\"` + grant + `no_grant_specified\" class=\"bold\">Grant # Not Specified:</p>
                </div>`;

                document.getElementById(grant + "_grant_list").appendChild(empty_grant);
                document.getElementById(grant + "no_grant_specified").appendChild(html_obj.cloneNode(true));
            }
        }
    }
}


// This function pushes a the grant information into the grant headers for an array of rounds
function push_array_grant_information(grants, html_obj)
{
    // If there is a grant, we push the element to the proper grant header
    if (grants != undefined)
    {
        // For each grant, we check to see where it should go
        for (j = 0; j < grants.length; j++)
        {
            // If the round is a combination of round and grant, we append the object to the specific grant header, else we append it to a general header under the round
            if (grants[j].Round.includes("-"))
            {
                document.getElementById(grants[j].Round).appendChild(html_obj.cloneNode(true));
            }
            else
            {
                // If the general grant header already exits, append the element to it, else we create the general header and append the element to it
                if (document.getElementById(grants[j].Round + "no_grant_specified") != null)
                {
                    document.getElementById(grants[j].Round + "no_grant_specified").appendChild(html_obj.cloneNode(true));
                }
                else
                {
                    empty_grant = document.createElement('div');
                    empty_grant.classList.add("animate_open_default");
                    
                    empty_grant.innerHTML = `
                    <div>
                        <p id=\"` + grants[j].Round + `no_grant_specified\" class=\"bold\">Grant # Not Specified:</p>
                    </div>`;

                    document.getElementById(grants[j].Round + "_grant_list").appendChild(empty_grant);
                    document.getElementById(grants[j].Round + "no_grant_specified").appendChild(html_obj.cloneNode(true));
                }
            }
        }
    }
}


// This function creates all of the round headers and grant header under them when we are viewing by ALG
function create_groups()
{
    // For all grants, we gather the information to create the headers and create them
    for (i = 0; i < all_grant_data.length; i++)
    {
        // This stores the grant list element
        var grants_list = ""

        // This stores an array of grant infomration
        var round_grants = [];


        // If we have grants for the current round, create the grants list from them
        if (all_grant_data[i].Grants != undefined)
        {
            // Store the grant information
            round_grants = sort_array_by_grant(all_grant_data[i].Grants);

            // For each grant we add a new line to the grant list based on its information
            for (j = 0; j < round_grants.length; j++)
            {
                var grant_line = ""

                // If the grant doesn't have a OER repo, we create a simple non-link header for the grant, else we create a special header that links to the repo when clicked
                if (round_grants[j].OER_Repo == "Not Provided")
                {
                    grant_line = `<p id=\"` + all_grant_data[i].Round + `-` + round_grants[j].Grant + `\" class=\"bold\">Grant # ` + round_grants[j].Grant + `: ` + round_grants[j].Value + `</p>`
                }
                else
                {
                    grant_line = `
                    <div id=\"` + all_grant_data[i].Round + `-` + round_grants[j].Grant + `\">
                        <a class=\"bold list_link black_text\" href=\"` + round_grants[j].OER_Repo + `\" target=\"_blank\">Grant # ` + round_grants[j].Grant + `: ` + round_grants[j].Value + `</a>
                    </div>`;
                }

                // The header is added to the grants list
                grants_list += `
                <div class=\"animate_open_default\">
                    <div>    
                        ` + grant_line + `
                    </div>
                </div>`;
            }
        }

        // Create an empty element
        html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = all_grant_data[i].Round + " top";

        // Populate the element with the round information and include the grant list in the element
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element background_color table_base list_element_row\">  
                <p class=\"bold\">Round ` + all_grant_data[i].Round.replace("R", "") + `<br>` + all_grant_data[i].Year + `</p>
                <div id=\"` + all_grant_data[i].Round + `_grant_list\">
                    ` + grants_list + `
                </div>
            </div>
        </div>`;

        // append the element to the main list body
        list_body.appendChild(html_obj);
    }
}


// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - ALG Information");

    sort_array_by_id(all_course_data);
    sort_array_by_round(all_grant_data);

    load_list_element();
}