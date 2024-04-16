// Essential variables such as the URL query and elements on the page that will be referred to in the code
var sidebar_list = document.getElementById("search_links");
let front_link = "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=";
let middle_link = "&subj_in=IT&crse_in=4983&schd_in=A";


for (var i = 0; i < all_course_data.length; i++) {
    var div = document.getElementById('search_links');


    var a = document.createElement('a');

    a.href = "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=202401&subj_in=IT&crse_in=" + encodeURIComponent(all_course_data[i].Course_Number) + "&schd_in=A";

    a.target = "iframe_results";

    a.textContent = all_course_data[i].Course_Number + " " + all_course_data[i].Course_Name;


    div.appendChild(a);


}





// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    sort_array_by_id(all_course_data);

}