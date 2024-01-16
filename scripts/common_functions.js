// Store a lot of elements as variable so we can easily access them
var prefix_selector = document.getElementById("prefix_selector");
var offered_selector = document.getElementById("offered_selector");
var search_bar = document.getElementById("search_bar");
var degree_selector = document.getElementById("degree_selector");
var order_by_course = document.getElementById("order_by_course");
var order_by_coordinator = document.getElementById("order_by_coordinator");
var order_by_alg = document.getElementById("order_by_alg");
var group_selector = document.getElementById("group_selector");
var list_body = document.getElementById("list_body");
var left_sidebar = document.getElementById("left_sidebar");
var right_sidebar = document.getElementById("right_sidebar");
var no_group = document.getElementById("no_group");
var track_group = document.getElementById("track_group");
var no_group_img = document.getElementById("no_group_img");
var track_group_img = document.getElementById("track_group_img");
var alg_group_img = document.getElementById("alg_group_img");
var coord_group_img = document.getElementById("coord_group_img");
var program_catalogs_table = document.getElementById("program_catalogs_table");
var sort_course_arrow = document.getElementById("sort_course_arrow");
var sort_round_arrow = document.getElementById("sort_round_arrow");

// Store the site title
var site_title = "KSU IT Curriculum Portal";
var alg_sort = false;

// Store the link extensions to the pages and syllabus repo
var link_list =
{
    Syllabus_Repository: "https://cedricbd009.github.io/Capstone/Syllabus/",
    Course_List: "./index.html",
    Course_Description: "./Description.html",
    Permanent_Schedule: "./Schedule.html",
    Course_Coordinator: "./Coordinator.html",
    ALG_Information: "./ALG.html",
    Curriculum_Resources: "./Curriculum.html",
    MSIT_Flowchart: "./Flowchart.html",
    MSIT_Flowchart_Printable: "./Print_Flowchart.html",
    Course_Information: "./Viewer.html?course=",
    About_Page: "./About.html"
};

// Store the tracks
var tracks = 
    ["IT Foundation Courses", "Required Core Courses",
    "Data Analytics and Intelligent Technology", "Enterprise IT Management", "Health Information Technology", "Information Technology Security",
    "Common Electives"];

// Store which tracks are certificates
var tracks_certificates = 
    ["Data Analytics and Intelligent Technology", "Enterprise IT Management", "Health Information Technology", "Information Technology Security"];


// This function sets the site title to the default title + the given text
function set_site_title(title_extension)
{
    document.title = site_title + title_extension;
}


// This function sets the site title to the given text
function set_site_title_course(title_extension)
{
    document.title = title_extension;
}


// This function stores the given course in session storage for use in the viewer page
function store_course(id)
{
    sessionStorage.setItem("stored_course", JSON.stringify(all_course_data[id]))
}


// This function checks to see if enter is clicked in the searchbar as onchange is unreliable
function check_key(event)
{
    if (event.key == "Enter")
    {
        filter_results();
    }
}


// This function is used to sort the given aray by the course prefix and course number
function sort_array_by_id(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Prefix.toLowerCase() + " " + in_1.Course_Number.toLowerCase();
            var check_2 = in_2.Prefix.toLowerCase() + " " + in_2.Course_Number.toLowerCase();
            if (check_1 < check_2)
            {
                return -1;
            }
            if (check_1 > check_2)
            {
                return 1;
            }
        }
    );
}


// This function is used to sort the given array by the alg round, then the course prefix and number
function sort_array_by_full_round(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Latest_ALG_Round.toLowerCase() + " " + in_1.Prefix.toLowerCase() + " " + in_1.Course_Number.toLowerCase();
            var check_2 = in_2.Latest_ALG_Round.toLowerCase() + " " + in_2.Prefix.toLowerCase() + " " + in_2.Course_Number.toLowerCase();
            if (check_1 < check_2)
            {
                return -1;
            }
            if (check_1 > check_2)
            {
                return 1;
            }
        }
    );
}


// This function is used to sort the given array by the alg round
function sort_array_by_round(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Round.toLowerCase();
            var check_2 = in_2.Round.toLowerCase();
            if (check_1 < check_2)
            {
                return -1;
            }
            if (check_1 > check_2)
            {
                return 1;
            }
        }
    );
}


// This function is used to sort the given array by the alg grant
function sort_array_by_grant(array)
{
    array.sort(
        function(in_1, in_2)
        {
            var check_1 = in_1.Grant.toLowerCase();
            var check_2 = in_2.Grant.toLowerCase();
            if (check_1 < check_2)
            {
                return -1;
            }
            if (check_1 > check_2)
            {
                return 1;
            }
        }
    );

    return array;
}


// This function controlls the logic for sorting the page contents
function order_by(order_style)
{
    // When we are ording by the coordinator, we highlight the proper tab, clear the page, and run the appropriate sort function before recreating the list
    if (order_style == "Coordinator" && order_by_course.className.includes("tab_active"))
    {  
        list_body.innerHTML = "";

        order_by_course.className = order_by_course.className.replace(" tab_active", "");
        coord_group_img.className = coord_group_img.className.replace(" hidden", "");
        order_by_coordinator.className += " tab_active";
        no_group_img.className += " hidden";
        
        sort_array_by_coordinator(all_course_data);

        load_list_element();
        filter_results();
    }
    // When we are ording by the course number, we highlight the proper tab, clear the page, and run the appropriate sort function before recreating the list
    else if (order_style == "Course Number" && order_by_coordinator.className.includes("tab_active"))
    {
        list_body.innerHTML = "";

        order_by_coordinator.className = order_by_coordinator.className.replace(" tab_active", "");
        no_group_img.className = no_group_img.className.replace(" hidden", "");
        order_by_course.className += " tab_active";
        coord_group_img.className += " hidden";

        sort_array_by_id(all_course_data);

        load_list_element();
        filter_results();
    }
    // When we are ording by the round, we clear the page, and run the appropriate sort function before recreating the list
    else if (order_style == "Arrow Round")
    {
        list_body.innerHTML = "";

        sort_array_by_full_round(all_course_data)

        load_list_element();
        filter_results();
    }
    // When we are ording by the course number on the alg page, we clear the page, and run the appropriate sort function before recreating the list
    else if (order_style == "Arrow Course Number")
    {
        list_body.innerHTML = "";

        sort_array_by_id(all_course_data)

        load_list_element();
        filter_results();
    }
}


// This function is used to control the logic for putting the page contents into groups
function group_by(type)
{
    // Reset any sorts that we currently have going on    
    sort_array_by_id(all_course_data);

    // If we are grouping by track, clear the list, highlight the proper buttons, and run the appropriate groups function before recreating the list
    if (type == "track" && document.getElementById(tracks[0]) == null)
    {
        list_body.innerHTML = ""

        no_group.className = no_group.className.replace(" tab_active", "");
        track_group_img.className = track_group_img.className.replace(" hidden", "");
        track_group.className += " tab_active";
        no_group_img.className += " hidden";

        create_groups();
        load_list_element();
        filter_results();
    }
    // If we are grouping by alg, clear the list, highlight the proper buttons, and run the appropriate groups function before recreating the list
    else if (type == "alg" && alg_sort == false)
    {
        list_body.innerHTML = ""
        alg_sort = true;

        order_by_course.className = order_by_course.className.replace(" tab_active", "");
        alg_group_img.className = alg_group_img.className.replace(" hidden", "");
        order_by_alg.className += " tab_active";
        no_group_img.className += " hidden";

        create_groups();
        load_group_list_element();
        filter_results();
    }
    // If we are not grouping the content, clear the list and highlight the proper buttons before recreating the list
    else if (type == "none" && (document.getElementById(tracks[0]) != null || alg_sort == true))
    {
        list_body.innerHTML = "";
        alg_sort = false;

        if (track_group != null)
        {
            track_group.className = track_group.className.replace(" tab_active", "");
            no_group_img.className = no_group_img.className.replace(" hidden", "");
            no_group.className += " tab_active";
            track_group_img.className += " hidden";
        }
        else if (order_by_alg != null)
        {
            order_by_alg.className = order_by_alg.className.replace(" tab_active", "");
            no_group_img.className = no_group_img.className.replace(" hidden", "");
            order_by_course.className += " tab_active";
            alg_group_img.className += " hidden";
        }

        load_list_element();
        filter_results();
    }
}


// This function is used to quickly reset all filters when the user decides to
function reset_filters()
{
    // Set everything to the default value
    if (prefix_selector != null)
    {
        prefix_selector.selectedIndex = 0;
    }

    if (offered_selector != null)
    {
        offered_selector.selectedIndex = 0;
    }

    if (search_bar != null)
    {
        search_bar.value = "";
    }

    if (degree_selector != null)
    {
        degree_selector.selectedIndex = 0;
    }

    // Filter the results to show them all
    filter_results();
}


// This function filters the items in the page list based off of criteria
function filter_results()
{
    // For all courses, check if they meet the criteria. If they do not, hide their respective element on the page
    for (i = 0; i < all_course_data.length; i++)
    {
        // Check if the course meets the criteria, this can change from page to page. Else, hide the element on the page.
        if ((prefix_selector == null || prefix_selector.value == "All Prefixes" || all_course_data[i].Prefix.toLowerCase().includes(prefix_selector.value.toLowerCase()) == true) &&
            (offered_selector == null || offered_selector.value == "All Semesters" ||  all_course_data[i].Course_Schedule[offered_selector.value].includes("-") == false) &&
            (search_bar == null || search_bar.value == "" || all_course_data[i].Course_Number.toLowerCase().includes(search_bar.value.toLowerCase()) == true ||
            all_course_data[i].Course_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true || (all_course_data[i].Description.toLowerCase().includes(search_bar.value.toLowerCase()) == true && order_by_alg == null && order_by_coordinator == null) ||
            (all_course_data[i].Latest_Developer.toLowerCase().includes(search_bar.value.toLowerCase()) == true && order_by_alg != null) || 
            ((all_course_data[i].Coordinator_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true  || all_course_data[i].Co_Coordinator_Name.toLowerCase().includes(search_bar.value.toLowerCase()) == true) && order_by_alg == null)) &&
            (degree_selector == null || degree_selector.value == "All Degrees" || all_course_data[i].Degree.toLowerCase().includes(degree_selector.value.toLowerCase()) == true))
        {
            // If it meets the criteria, show it on the page
            if (document.getElementById("course" + i) != null)
            {
                document.getElementById("course" + i).style.gridTemplateRows = "1fr";
            }
            // If the course is marked by the class name (when multiple of the same course appear on one page), and it fails the criteria, hide it
            else if (document.getElementsByClassName("course" + i).length > 0)
            {
                for (j = 0; j < document.getElementsByClassName("course" + i).length; j++)
                {
                    document.getElementsByClassName("course" + i)[j].style.gridTemplateRows = "1fr";
                }
            }
        }
        else
        {
            // If it meets the criteria, show it on the page
            if (document.getElementById("course" + i) != null)
            {
                document.getElementById("course" + i).style.gridTemplateRows = "0fr";
            }
            // If the course is marked by the class name (when multiple of the same course appear on one page), and it fails the criteria, hide it
            else if (document.getElementsByClassName("course" + i).length > 0)
            {
                for (j = 0; j < document.getElementsByClassName("course" + i).length; j++)
                {
                    document.getElementsByClassName("course" + i)[j].style.gridTemplateRows = "0fr";
                }
            }
        }
    }

    // Check the tracks if they exist
    if (document.getElementById(tracks[0]) != null)
    {
        hide_empty_tracks();
    }

    // Check the grants if we are viewing by ALG round
    if (alg_sort == true)
    {
        hide_empty_rounds_and_grants();
    }
}


// This function sets the searchbar contents to the provided name. This is used for quick searching by clicking on faculty names
function filter_by_faculty(name)
{
    search_bar.value = name;

    filter_results()
}


// This function hides tracks that have no visible courses under them
function hide_empty_tracks()
{
    // For all tracks, check if they should be hidden
    for (i = 0; i < tracks.length; i++)
    {
        var hide = true;
        
        // Check if all coruses under the track header are hidden
        for (j = 0; j < document.getElementById(tracks[i]).children.length; j++)
        {
            // If one is shown, show the track header
            if (document.getElementById(tracks[i]).children[j].style.gridTemplateRows == "1fr")
            {
                hide = false;
            }
        }

        // Hide the track header if it should be hidden
        if (hide == true)
        {
            document.getElementById(tracks[i] + " top").style.gridTemplateRows = "0fr";
        }
        else
        {
            document.getElementById(tracks[i] + " top").style.gridTemplateRows = "1fr";
        }
    }

    // Check if all certificate tracks are hidden. If they are, hide the certificate header
    for (i = 0; i < tracks_certificates.length; i++)
    {
        var hide = true;
        
        // Check if a certificate is show.
        for (j = 0; j < document.getElementById("track_certificate_group").children.length; j++)
        {
            // If one certificate is shown, show the certificate header
            if (document.getElementById("track_certificate_group").children[j].style.gridTemplateRows == "1fr")
            {
                hide = false;
            }
        }

        // Hide the certificate hearder if it should be hidded
        if (hide == true)
        {
            document.getElementById("track_certificate_group_top").style.gridTemplateRows = "0fr";
        }
        else
        {
            document.getElementById("track_certificate_group_top").style.gridTemplateRows = "1fr";
        }
    }
}


// This function is used to hide emtpy alg rounds and grants when sorting
function hide_empty_rounds_and_grants()
{
    // For all rounds, check if grants should be hidden. If all grants are hidden, hide the round
    for (i = 0; i < list_body.children.length; i++)
    {
        var hide_round = true;
        var round = list_body.children[i];
        var round_number = round.id.replace(" top", "");
        var grants = document.getElementById(round_number + "_grant_list").children;
        
        // For all grants, check if all courses are hidden. If they are, hide the grant
        for (j = 0; j < grants.length; j++)
        {
            var hide_grant = true;
            var grant = grants[j].children[0].children[0].children;

            // For all courses in the grant, check if they are hidded
            for (k = 0; k < grant.length; k++)
            {
                // If one course comes back as visible, mark the grant and round as visible
                if (grant[k].style.gridTemplateRows === "1fr")
                {
                    hide_round = false;
                    hide_grant = false;
                }
            }

            // Hide the grant if it should be hidden
            if (hide_grant == true)
            {
                grants[j].style.gridTemplateRows = "0fr";
            }
            else
            {
                grants[j].style.gridTemplateRows = "1fr";
            }
        }

        // Hide the round if it should be hidden
        if (hide_round == true)
        {
            round.style.gridTemplateRows = "0fr";
        }
        else
        {
            round.style.gridTemplateRows = "1fr";
        }
    }
}