async function fetchCourseHistoryData() {
    const url = 'https://us-east-1.aws.data.mongodb-api.com/app/database_requester-yyqup/endpoint/coursehistory';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("course_history_data", JSON.stringify(data));
    } else {
        console.error("Failed to fetch course history data: Server responded with status", response.status);
    }
}
