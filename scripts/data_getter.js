async function main()
{
    // If the session storage for courses is not filled, retrieve it from the database
    if (sessionStorage.getItem("all_course_data") == null) {
        // Send a fetch request to the database courses endpoint to retrieve the course portion of the database
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/courses')
            // If the response occurred, log that the data was retrieved, otherwise log that there is a server error
            .then(res => {
                if (res.ok == true) {
                    console.log("We got the course data from the data server.");
                } else {
                    console.log("There was a data server error.");
                }
                return res.json(); // Parse the JSON response
            })
            // Grab the JSON from the response and store it in the session storage as a string. This storage will be used instead of continuously calling the database
            .then(data => {
                sessionStorage.setItem("all_course_data", JSON.stringify(data));
            })
            // Catch any errors that occur
            .catch(error => console.log(error));
    }

    // Read the session storage for the course information, convert it to a JSON format, and put it into a global variable
    window.all_course_data = JSON.parse(sessionStorage.getItem("all_course_data"));

    // Filter the course data to get MSIT courses
    var msit_course_data = all_course_data.filter(function(course) {
        return course.Degree.includes("MSIT");
    });

    // Store the filtered MSIT course data in sessionStorage
    sessionStorage.setItem('msit_course_data', JSON.stringify(msit_course_data));

    // Retrieve the MSIT course data from sessionStorage
    window.MSIT_course_data = JSON.parse(sessionStorage.getItem('msit_course_data'));

    // Filter the course data to get MSIT courses
    var bsit_course_data = all_course_data.filter(function(course) {
        return course.Degree.includes("BSIT");
    });

    // Store the filtered BSIT course data in sessionStorage
    sessionStorage.setItem('bsit_course_data', JSON.stringify(bsit_course_data));

    // Retrieve the BSIT course data from sessionStorage
    window.BSIT_course_data = JSON.parse(sessionStorage.getItem('bsit_course_data'));


    // If the session storage for grants is not filled, retrieve it from the database
    if (sessionStorage.getItem("all_grant_data") == null)
    {
        // Send a fetch request to the database grants enpoint to retrieve the grant portion of the database
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/grants')
            // If the response occured, log that the data was retrieved, otherwise log that there is a server error
            .then(res => {
                if (res.ok == true)
                {
                    console.log("We got the grant data from the data server.");
                }
                else
                {
                    console.log("There was a data server error.");
                }
                return res
            })
            // Grab the json from the response and store it in the session storage as a string. This storage will be used instead of continuously calling the database
            .then(res => res.json())
            .then(data => 
                {
                    sessionStorage.setItem("all_grant_data", JSON.stringify(data))
                })
            // Catch any errors that occur
            .catch(error => console.log(error));
    }
    
    // Read the session storage for the grant information, convert it to a JSON format, and put it into a global variable
    window.all_grant_data = JSON.parse(sessionStorage.getItem("all_grant_data"))


	// If the session storage for instructors is not filled, retrieve it from the database
	if (sessionStorage.getItem("all_instructor_data") == null)
	{
		// Send a fetch request to the database grants enpoint to retrieve the instructor portion of the database
		await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/instructors')
			// If the response occured, log that the data was retrieved, otherwise log that there is a server error
			.then(res => {
				if (res.ok == true)
				{
					console.log("We got the instructor data from the data server.");
				}
				else
				{
					console.log("There was a data server error.");
				}
				return res
			})
			// Grab the json from the response and store it in the session storage as a string. This storage will be used instead of continuously calling the database
			.then(res => res.json())
			.then(data => 
				{
					sessionStorage.setItem("all_instructor_data", JSON.stringify(data))
				})
			// Catch any errors that occur
			.catch(error => console.log(error));
	}
        
	// Read the session storage for the grant infomration, convert it to a JSON format, and put it into a global variable
	window.all_instructor_data = JSON.parse(sessionStorage.getItem("all_instructor_data"))
	
	if (!sessionStorage.getItem("all_history_data")) {
		const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/history');
		if (response.ok) {
			let historyData = await response.json();

			historyData.sort((a, b) => {
				// After sorting by year and semester, sort by section
				const sectionA = typeof a.SECTION === 'string' ? a.SECTION : '';
				const sectionB = typeof b.SECTION === 'string' ? b.SECTION : '';
				return sectionA.localeCompare(sectionB);
			}).sort((a, b) => {
				// Compare years first
				if (b.YEAR !== a.YEAR) {
					return b.YEAR - a.YEAR; // Sort years in descending order
				} else {
					// If years are the same, compare semesters
					const semesterOrder = { "Fall": 3, "Summer": 2, "Spring": 1 }; // Define order of semesters
			
					// Compare semesters based on their order
					return semesterOrder[b.SEMESTER] - semesterOrder[a.SEMESTER];
				}
			}).sort((a, b) => {
				// After sorting by year and semester, sort by section
				return a.NUMBER.toString().localeCompare(b.NUMBER.toString());
			});
			
			

			sessionStorage.setItem("all_history_data", JSON.stringify(historyData));
			window.all_course_data_history = JSON.parse(sessionStorage.getItem("all_history_data"));
		} else {
			console.error("Failed to fetch history data:", response.status);
			window.all_course_data_history = [];
		}
	} else {
		window.all_course_data_history = JSON.parse(sessionStorage.getItem("all_history_data"));
	}
    
    load_page ();
}

main()

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