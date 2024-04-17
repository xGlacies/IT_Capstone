// Essential variables such as the URL query and elements on the page that will be referred to in the code
let front_link = "https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_listcrse?term_in=";
let subj_link = "&subj_in=";
let crse_link = "&crse_in=";
let end_link = "&schd_in=A";
const current_sem = (sessionStorage.getItem("current_semester")).toString();
const next_sem = (sessionStorage.getItem("next_semester")).toString();
let link_current = front_link + current_sem + subj_link;
let link_next = front_link + next_sem + subj_link;

var selected_sem = document.getElementById('selected_semester');

if (current_sem.slice(4) == "01") {
	selected_sem.textContent = "Spring " + current_sem.slice(0,4);
} else if (current_sem.slice(4) == "05") {
	selected_sem.textContent = "Summer " + current_sem.slice(0,4);
} else if (current_sem.slice(4) == "08") {
	selected_sem.textContent = "Fall " + current_sem.slice(0,4);
}


for (var i = 0; i < all_course_data.length; i++) {
	
    var div = document.getElementById('search_links');

    var a = document.createElement('a');
	
	a.href = link_current + encodeURIComponent(all_course_data[i].Prefix) + crse_link + encodeURIComponent(all_course_data[i].Course_Number) + end_link;

    a.target = "iframe_results";
	a.id = all_course_data[i].Prefix + all_course_data[i].Course_Number;

	a.textContent = all_course_data[i].Prefix + " " + all_course_data[i].Course_Number + ": " + all_course_data[i].Course_Name;

    div.appendChild(a);

}





// This only works if this file is loaded before the data_getter file.
// MAKE SURE that this file is listed ABOVE the data_getter file in the script block.
// The data_getter file has to have the SAME or lower load priority than this file. If this file is DEFER, data_getter MUST be DEFER.
function load_page()
{
    sort_array_by_id(all_course_data);

}
