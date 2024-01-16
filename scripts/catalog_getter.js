async function main()
{
    // If the session storage for catalogs is not filled, retrieve it from the database
    if (sessionStorage.getItem("all_catalog_data") == null)
    {
        // Send a fetch request to the database catalogs enpoint to retrieve the catalog portion of the database
        await fetch('https://us-east-1.aws.data.mongodb-api.com/app/database_requester-vbliq/endpoint/catalogs')
            // If the response occured, log that the data was retrieved, otherwise log that there is a server error
            .then(res => {
                if (res.ok == true)
                {
                    console.log("We got the catalog data from the data server.");
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
                    sessionStorage.setItem("all_catalog_data", JSON.stringify(data))
                })
            // Catch any errors that occur
            .catch(error => console.log(error));
    }
    

    // Read the session storage for the catalog infomration, convert it to a JSON format, and put it into a global variable
    window.all_catalog_data = JSON.parse(sessionStorage.getItem("all_catalog_data"))

    load_page ();
}

main()
