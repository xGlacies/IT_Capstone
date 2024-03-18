// This function loads the list contents of the page
function load_list_element()
{
    // For all courses in the course list, we create an element that shows the prefix, number, and title
    for (i = 0; i < all_course_data.length; i++)
    {
        // Create a new element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Set the contents of the new element to be the course information that we want to display
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element\">
                <a id=\"course_number` + i + `\" class=\"title_size space_before\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number + `: ` + all_course_data[i].Course_Name + `</a>
            </div>        
        </div>`;

        // If we are viewing by tracksMSIT, append the element to the track heading, else append it to the main list body
        if (document.getElementById(all_course_data[0].Track) != null)
        {    
            document.getElementById(all_course_data[i].Track).appendChild(html_obj);
        }
        else
        {
            html_obj.classList.add("background_color");
            list_body.appendChild(html_obj);
        }
    }
}

// This function loads the list contents of the page
function load_list_element_MSIT()
{
    // For all courses in the course list, we create an element that shows the prefix, number, and title
    for (i = 0; i < MSIT_course_data.length; i++)
    {
        // Create a new element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Set the contents of the new element to be the course information that we want to display
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element\">
                <a id=\"course_number` + i + `\" class=\"title_size space_before\" href=\"` + link_list.Course_Information + MSIT_course_data[i].Prefix + MSIT_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + MSIT_course_data[i].Prefix + ` ` + MSIT_course_data[i].Course_Number + `: ` + MSIT_course_data[i].Course_Name + `</a>
            </div>        
        </div>`;

        // If we are viewing by tracksMSIT, append the element to the track heading, else append it to the main list body
        if (document.getElementById(MSIT_course_data[0].Track) != null)
        {    
            document.getElementById(MSIT_course_data[i].Track).appendChild(html_obj);
        }
        else
        {
            html_obj.classList.add("background_color");
            list_body.appendChild(html_obj);
        }
    }
}

function load_list_element_BSIT()
{
    // For all courses in the course list, we create an element that shows the prefix, number, and title
    for (i = 0; i < BSIT_course_data.length; i++)
    {
        // Create a new element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Set the contents of the new element to be the course information that we want to display
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element\">
                <a id=\"course_number` + i + `\" class=\"title_size space_before\" href=\"` + link_list.Course_Information + BSIT_course_data[i].Prefix + BSIT_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + BSIT_course_data[i].Prefix + ` ` + BSIT_course_data[i].Course_Number + `: ` + BSIT_course_data[i].Course_Name + `</a>
            </div>        
        </div>`;

        // If we are viewing by tracksMSIT, append the element to the track heading, else append it to the main list body
        if (document.getElementById(BSIT_course_data[0].Track) != null)
        {    
            document.getElementById(BSIT_course_data[i].Track).appendChild(html_obj);
        }
        else
        {
            html_obj.classList.add("background_color");
            list_body.appendChild(html_obj);
        }
    }
}
// This function loads the list contents of the page
function load_list_element_BIST()
{
    // For all courses in the course list, we create an element that shows the prefix, number, and title
    for (i = 0; i < BSIT_course_data.length; i++)
    {
        // Create a new element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = "course" + i;

        // Set the contents of the new element to be the course information that we want to display
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element\">
                <a id=\"course_number` + i + `\" class=\"title_size space_before\" href=\"` + link_list.Course_Information + BSIT_course_data[i].Prefix + BSIT_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + BSIT_course_data[i].Prefix + ` ` + BSIT_course_data[i].Course_Number + `: ` + BSIT_course_data[i].Course_Name + `</a>
            </div>        
        </div>`;

        // If we are viewing by tracksMSIT, append the element to the track heading, else append it to the main list body
        if (document.getElementById(BSIT_course_data[0].Track) != null)
        {    
            document.getElementById(BSIT_course_data[i].Track).appendChild(html_obj);
        }
        else
        {
            html_obj.classList.add("background_color");
            list_body.appendChild(html_obj);
        }
    }
}

// This function creates the track headers when we want to view the coruses by tracksMSIT
function create_groups_MIST()
{
    // For all of the tracksMSIT that we have, create a header for courses to appear under
    for (i = 0; i < tracksMSIT.length; i++)
    {
        // Create a new element for the track header
        html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = tracksMSIT[i] + " top";

        // Create the track header
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element background_color\">  
                <p class=\"title_size bold\">` + tracksMSIT[i] + `:</p>
                <div id=\"` + tracksMSIT[i] + `\"></div>
            </div>
        </div>`;

        // If the track is one of the certificates, we create a heading and append it as a subheading. Otherwise, we just append the track to the main list body
        if  (tracks_certificates.includes(tracksMSIT[i])) 
        {
            // If we do not already have the track certificate heading, create it
            if (document.getElementById("track_certificate_group") == null)
            {
                // Make a new empty element
                html_obj_tracks = document.createElement('div');

                html_obj_tracks.classList.add("animate_open_default");
                html_obj_tracks.id = "track_certificate_group_top";

                // Make the element into the certificate header
                html_obj_tracks.innerHTML = `
                <div>
                    <div class=\"list_element background_color\">  
                        <p class=\"title_size bold\">Tracks:</p>
                        <div id=\"track_certificate_group\"></div>
                    </div>
                </div>`;

                // Append the element to the main list body
                list_body.appendChild(html_obj_tracks);
            }

            // Append the track to the certificate header
            document.getElementById("track_certificate_group").appendChild(html_obj);
        }
        else
        {
            // Append the track to the main list body
            list_body.appendChild(html_obj);
        }
    }
}


function create_groups_BSIT()
{
    // For all of the tracksBSIT that we have, create a header for courses to appear under
    for (i = 0; i < tracksBSIT.length; i++)
    {
        // Create a new element for the track header
        html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = tracksBSIT[i] + " top";

        // Create the track header
        html_obj.innerHTML = `
        <div>
            <div class=\"list_element background_color\">  
                <p class=\"title_size bold\">` + tracksBSIT[i] + `:</p>
                <div id=\"` + tracksBSIT[i] + `\"></div>
            </div>
        </div>`;

        // If the track is one of the certificates, we create a heading and append it as a subheading. Otherwise, we just append the track to the main list body
        if  (tracks_certificates.includes(tracksBSIT[i])) 
        {
            // If we do not already have the track certificate heading, create it
            if (document.getElementById("track_certificate_group") == null)
            {
                // Make a new empty element
                html_obj_tracks = document.createElement('div');

                html_obj_tracks.classList.add("animate_open_default");
                html_obj_tracks.id = "track_certificate_group_top";

                // Make the element into the certificate header
                html_obj_tracks.innerHTML = `
                <div>
                    <div class=\"list_element background_color\">  
                        <p class=\"title_size bold\">Tracks:</p>
                        <div id=\"track_certificate_group\"></div>
                    </div>
                </div>`;

                // Append the element to the main list body
                list_body.appendChild(html_obj_tracks);
            }

            // Append the track to the certificate header
            document.getElementById("track_certificate_group").appendChild(html_obj);
        }
        else
        {
            // Append the track to the main list body
            list_body.appendChild(html_obj);
        }
    }
}

// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - Course List");

    sort_array_by_id(all_course_data);

    load_list_element();
}