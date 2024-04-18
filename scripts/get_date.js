//This file can be used to reference the current semester along with the last(previous) semester, the next semester, and a future semester(the semester after the next semester) if possible...
//It always generates these semesters' based on the current date when the page loads...

/**
	
	The data is stored in the session as a string. To reference them use something similar to the examples below:
	
~	var last_semester = (sessionStorage.getItem("last_semester")).toString();
~	var current_semester = (sessionStorage.getItem("current_semester")).toString();
~	var next_semester = (sessionStorage.getItem("next_semester")).toString();
~	var future_semester = (sessionStorage.getItem("future_semester")).toString();
	
	
	
*/

const lastyear = (new Date().getFullYear() - 1).toString(); //get next year
const year = new Date().getFullYear().toString(); //get current year
const nextyear = (new Date().getFullYear() + 1).toString(); //get next year

const month = new Date().getMonth()+1; //get current month

let lastSemester = ""; //declared last semester as none to prepare for if statements
let currentSemester = ""; //declared current semester as none to prepare for if statements
let nextSemester = ""; //declared next semester as none to prepare for if statements
let futureSemester = ""; //declared future semester as none to prepare for if statements

if(month <= 4) {
	lastSemester = lastyear + "08";
	currentSemester = year + "01";
	nextSemester = year + "05";
	futureSemester = year + "08";
}
if(month >= 5 && month <= 7) {
	lastSemester = year + "01";
	currentSemester = year + "05";
	nextSemester = year + "08";
	futureSemester = nextyear + "01";
}
if(month >= 8) {
	lastSemester = year + "05";
	currentSemester = year + "08";
	nextSemester = nextyear + "01";
	futureSemester = nextyear + "05";
}

sessionStorage.setItem("last_semester", lastSemester)
sessionStorage.setItem("current_semester", currentSemester)
sessionStorage.setItem("next_semester", nextSemester)
sessionStorage.setItem("future_semester", futureSemester)

/**

	Other spare links that may be used later in other places on the site


	https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_display_courses

	https://owlexpress.kennesaw.edu/prodban/bwckctlg.p_disp_cat_term_date

*/

