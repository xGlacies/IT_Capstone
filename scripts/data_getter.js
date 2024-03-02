async function main() {
    // If the session storage for courses is not filled, retrieve it from the database
    if (sessionStorage.getItem("all_course_data") == null) {
        // Send a fetch request to the database courses endpoint to retrieve the course portion of the database
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/courses')
            .then(res => {
                if (res.ok) {
                    console.log("We got the course data from the data server.");
                } else {
                    console.log("There was a data server error.");
                }
                return res.json();
            })
            .then(data => {
                // Filter for BSIT and MSIT courses for the permanent schedule
                let filteredForPermanentSchedule = data.filter(course => course.Degree === "BSIT" || course.Degree === "MSIT");
                sessionStorage.setItem("all_course_data", JSON.stringify(filteredForPermanentSchedule));

                // Filter for just BSIT courses for the ALG page
                let filteredForALG = filteredForPermanentSchedule.filter(course => course.Degree === "BSIT");
                sessionStorage.setItem("bsit_course_data", JSON.stringify(filteredForALG));
            })
            .catch(error => console.log(error));
    }

    // Load data into global variables
    window.all_course_data = JSON.parse(sessionStorage.getItem("all_course_data"));
    window.bsit_course_data = JSON.parse(sessionStorage.getItem("bsit_course_data"));

    // If the session storage for grants is not filled, retrieve it from the database
    if (sessionStorage.getItem("all_grant_data") == null) {
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/grants')
            .then(res => {
                if (res.ok) {
                    console.log("We got the grant data from the data server.");
                } else {
                    console.log("There was a data server error.");
                }
                return res.json();
            })
            .then(data => {
                sessionStorage.setItem("all_grant_data", JSON.stringify(data));
            })
            .catch(error => console.log(error));
    }

    window.all_grant_data = JSON.parse(sessionStorage.getItem("all_grant_data"));

    load_page();
}

main();
