function parseData(rawDataInput) {

    const inputDataType = typeOf(rawDataInput);

    if (Array.isArray(rawDataInput)) {
        console.log("Detected: Array of objects");
        
    } else if (inputDataType === "string") {
        console.log("Detected: String (CSV or JSON)");
        
    } else if (inputDataType === "object" && rawDataInput !== null) {
        console.log("Detected: Single object");
        
    } else {
        console.log("Error: Unsupported data type");
        return null;
    }



    //TODO: Seperate out into rows

    /*
     * TODO: Filter rows:
     *      1. Exclude headers
     *      2. Check submission time
     *      3. Check Data types (should be integer (1 to 5) answer for each question)
     */


    /*
     * TODO: Calculate and save results:
     *      1. Form an array with the average to result for each question 
     *       (question number identified by index)
     *      2. Calculate the average for each question and store in the array 
    */


    /*
     * TODO: Display results
     *      1. Print out question and corresponidng result from array
    */
}


