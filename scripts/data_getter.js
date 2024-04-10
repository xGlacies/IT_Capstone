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

    load_page ();
}

main()