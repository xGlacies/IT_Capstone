// This function creates the main list for the page
function load_list_element()
{
    // If we are not showing the contents by track, create a singular table header
    if (document.getElementById(all_course_data[0].Track) == null)
    {    
        list_body.innerHTML = `
        <div id=\"schedule_header\" class=\"list_header contained\">
            <div>
                <div class=\"table_base seven_row\">
                    <p class=\"header_row table_data\">Course</p>
                    <p class=\"header_row table_data\">Fall Odd</p>
                    <p class=\"header_row table_data\">Summer Odd</p>
                    <p class=\"header_row table_data\">Spring Odd</p>
                    <p class=\"header_row table_data\">Fall Even</p>
                    <p class=\"header_row table_data\">Summer Even</p>
                    <p class=\"header_row table_data\">Spring Even</p>
                </div>
            </div>
        </div>`;
    }

    // For all courses in the course list, create a new table row showing all of the schedule information and append it to the list
    for (i = 0; i < all_course_data.length; i++)
    {
        // Create an empty element
        var html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.classList.add("contained");
        html_obj.id = "course" + i;

        // Populate the element with the schedule information, turing it into a schedule row element
        html_obj.innerHTML = `
        <div>
            <div id=\"schedule` + i + `\">
                <div class=\"table_base seven_row\">
                    <a class=\"data_row table_data\" href=\"` + link_list.Course_Information + all_course_data[i].Prefix + all_course_data[i].Course_Number + `\" onclick=\"store_course(` + i + `);\">` + all_course_data[i].Prefix + ` ` + all_course_data[i].Course_Number +  `: ` + all_course_data[i].Course_Name + `</a>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Odd + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Odd + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Odd + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Fall_Even + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Summer_Even + `</p>
                    <p class=\"data_row table_data\">` + all_course_data[i].Course_Schedule.Spring_Even + `</p>
                </div>
            </div>
        </div>`;

        // If we are showing by track, append the row to the proper track table, else append it to the main list body
        if (document.getElementById(all_course_data[0].Track) != null)
        {    
            document.getElementById(all_course_data[i].Track).appendChild(html_obj);
        }
        else
        {
            list_body.appendChild(html_obj);
        }
    }
}


// This function will create the track headers when we are viewing the content by track
function create_groups()
{
    // For all tracks, create a track element and append it to the main list body
    for (i = 0; i < tracks.length; i++)
    {
        list_element = "list_element ";

        if (tracks_certificates.includes(tracks[i]))
        {
            list_element = "";
        }

        // Create an empty element
        html_obj = document.createElement('div');

        html_obj.classList.add("animate_open_default");
        html_obj.id = tracks[i] + " top";

        // Populate the element with the track header name and the table header
        html_obj.innerHTML = `
        <div>
            <div class=\"`+ list_element + `background_color\">  
                <p class=\"title_size bold\">` + tracks[i] + `:</p>
                <div id=\"schedule_header\" class=\"list_header contained\">
                    <div>
                        <div class=\"table_base seven_row\">
                            <p class=\"header_row table_data\">Course</p>
                            <p class=\"header_row table_data\">Fall Odd</p>
                            <p class=\"header_row table_data\">Summer Odd</p>
                            <p class=\"header_row table_data\">Spring Odd</p>
                            <p class=\"header_row table_data\">Fall Even</p>
                            <p class=\"header_row table_data\">Summer Even</p>
                            <p class=\"header_row table_data\">Spring Even</p>
                        </div>
                    </div>
                </div>
                <div id=\"` + tracks[i] + `\"></div>
            </div>
        </div>`;

        // If the track element is a certificate, create the certificate header and append the track to it, else append the track element to the main list body
        if  (tracks_certificates.includes(tracks[i])) 
        {
            // If the certificate header doesn't exist yet, create it
            if (document.getElementById("track_certificate_group") == null)
            {
                // Create an empty div
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

                // Append the certificate element to the main list body
                list_body.appendChild(html_obj_tracks);
            }

            document.getElementById("track_certificate_group").appendChild(html_obj);
        }
        else
        {
            list_body.appendChild(html_obj);
        }
    }
}


// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    set_site_title(" - Permanent Schedule");

    sort_array_by_id(all_course_data);

    load_list_element();
}