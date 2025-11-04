function parseData(rawDataInput) {

    const inputDataType = typeof rawDataInput;

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

    //TODO: Validate
    let lengthOk = false;
    let numColsOk = false;
    let headingsOk = false;
    let validHeadings = ["Employee ID", "Submission time", "I like the kind of work I do.",
                         "In general, I have the resources I need to be effective.",
                         "We are working at the right pace to meet our goals.",
                         "I feel empowered to get the work done for which I am responsible.",
                         "I am appropriately involved in decisions that affect my work." ]

    
    let record;
    //Overall array structure validation
    if (rawDataInput.length >= 2){
        lengthOk = true;
        if (rawDataInput[0].length === 7){
            numColsOk = true;
            headingsOk = true;
            for (let i = 0; i < rawDataInput[0].length; i++) {
                if (rawDataInput[0][i] != validHeadings[i]){
                    headingsOk = false;
                    break
                }
            }
        }
    }
    
    let finalArr = [];
    let allInt = true;
    


    let header = "";
    //Record validation
    if (lengthOk && numColsOk && headingsOk) {
        const colWidth = 25;
        console.log("=".repeat(colWidth * rawDataInput[0].length + rawDataInput[0].length * 3));
        const wrapped = validHeadings.map(h => {
            const words = h.split(" ");
            let line = "";
            const lines = [];
            for (const word of words) {
                if ((line + word).length > colWidth) {
                lines.push(line.trim());
                line = "";
                }
                line += word + " ";
            }
            if (line.trim()) lines.push(line.trim());
            return lines;
            });
        const maxLines = Math.max(...wrapped.map(w => w.length));
        for (let lineNum = 0; lineNum < maxLines; lineNum++) {
        let row = "";
        for (const col of wrapped) {
            const text = col[lineNum] || "";
            row += text.padEnd(colWidth) + " | ";
        }
        console.log(row);
        }
        console.log("=".repeat(colWidth * rawDataInput[0].length + rawDataInput[0].length * 3));
        for (let i = 1; i < rawDataInput.length; i++) {
            let row = "";
            for (const cell of rawDataInput[i]) {
                const val = cell === undefined || cell === null || cell === "" ? "-" : cell;
                row += String(val).padEnd(colWidth) + " | ";
            }
            console.log(row);
        }
        console.log("=".repeat(colWidth * rawDataInput[0].length + rawDataInput[0].length * 3));




        for (let i = 1; i < rawDataInput.length; i ++){
            if (!rawDataInput[i][1]) continue;
            allInt = true;
            for (let j = 2; j < rawDataInput[i].length; j ++){
                const cell = rawDataInput[i][j];
                if (!((Number.isInteger(cell) && (cell >= 1)) && (cell <= 5)) && cell != null && cell !== ""){
                    allInt = false;
                    break;
                }
                
            }
            if (allInt){
                record = {
                    "Employee ID": rawDataInput[i][0],
                    "Submission time": rawDataInput[i][1],
                    "I like the kind of work I do.":rawDataInput[i][2],
                    "In general, I have the resources I need to be effective.": rawDataInput[i][3],
                    "We are working at the right pace to meet our goals.": rawDataInput[i][4],
                    "I feel empowered to get the work done for which I am responsible.": rawDataInput[i][5],
                    "I am appropriately involved in decisions that affect my work.": rawDataInput[i][6]
                };
                finalArr.push(record);
                
            }

        }


        /*
        * TODO: Calculate and save results:
        *      1. Form an array with the average to result for each question 
        *       (question number identified by index)
        *      2. Calculate the average for each question and store in the array 
        */

        //TODO: Check if the results is at least 1
        const questionKeys = validHeadings.slice(2);
        const averages = Object.fromEntries(
            questionKeys.map(heading => [heading, 0])
        );
        const answerCounts = Object.fromEntries(
            questionKeys.map(heading => [heading, 0])
        );
        
        for (const row of finalArr) {
            for (const key of questionKeys) {
                const val = row[key];
                if (val !== null && val !== "" && val !== undefined) {
                    averages[key] += val;
                    answerCounts[key] += 1;
                }
            }
        }

        for (const key of questionKeys) {
            averages[key] = answerCounts[key] > 0 ? averages[key] / answerCounts[key] : 0;
        }
        
        /*
         * TODO: Display results
         *      1. Print out question and corresponding result from array
         */
        console.log("\n\n\n\n");
        console.log("=".repeat(85));
        console.log("QUESTION".padEnd(68), "AVERAGE RATING");
        console.log("-".repeat(85));
        for (const key in averages) {
            console.log(key.padEnd(70), " - ", averages[key])
        }
        console.log("=".repeat(85));
        console.log("\n\n");

    }
    else{
        console.log("Invalid Table. Cannot extract records.")
    }
    //return averages;

    
}
