function main()
{
    // If the banner elemement is present on the page, costruct the HTML code that should populate it. This code is then added to the element's innerHTML
    if (document.getElementById("banner_container") != null)
    {
        document.getElementById("banner_container").innerHTML = `
        <img class=\"page_image\" src=\"resources/ksu_banner.png\" alt=\"KSU Banner\">
        <p class=\"page_title bold\">IT Curriculum Portal</p>
        <div class=\"banner_tabs\">
            <a href=\"` + link_list.Course_List + `\" class=\"page_button center_text\">
                Course<br>List
            </a>
            <a href=\"` + link_list.MSIT_Flowchart + `\" class=\"page_button center_text\">
                MSIT<br>Flowchart
            </a>
            <a href=\"` + link_list.Course_Description + `\" class=\"page_button center_text\">
                Course<br>Description
            </a>
            <a href=\"` + link_list.Permanent_Schedule + `\" class=\"page_button center_text\">
                Permanent<br>Schedule
            </a>
            <a href=\"` + link_list.Course_Coordinator + `\" class=\"page_button center_text\">
                Course<br>Coordinator
            </a>
            <a href=\"` + link_list.ALG_Information + `\" class=\"page_button center_text\">
                ALG<br>Information
            </a>
            <a href=\"` + link_list.Curriculum_Resources + `\" class=\"page_button center_text\">
                Curriculum<br>Resources
            </a>
        </div>`;
    }

    // If the footer element is present on the page, construct the HTML code that should populate it. This code is added to the element's innerHTML
    if (document.getElementById("footer_container") != null)
    {
        document.getElementById("footer_container").innerHTML = `
        <p class=\"tall_list_margin\">
            Disclaimer: This is a work-in-progress web app. Information presented on this site is not officially endorsed yet. For more information, please visit the 
            <a href=\"` + link_list.About_Page + `\">about page</a>.
        </p>`;
    }
}

main();