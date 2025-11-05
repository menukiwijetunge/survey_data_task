/*
 * Global variable to store all valid table headings for the survey table
 */
const VALID_HEADINGS = [
  "Employee ID",
  "Submission time",
  "I like the kind of work I do.",
  "In general, I have the resources I need to be effective.",
  "We are working at the right pace to meet our goals.",
  "I feel empowered to get the work done for which I am responsible.",
  "I am appropriately involved in decisions that affect my work.",
];

//############################ CORE FUNCTION ###################################
/*
 * Function to parse and analyze survey data (This is the core function of this task.)
 */
function parseData(rawDataInput) {
  //PARSING & PREPARING DATA FOR ANALYSIS---------------------------------------
  /*
   * Preparing data for analysis
   * (Contains logic that could possibly be repeated for other scenarios
   *  while minimizing code redundancy.)
   */
  const prep = analysisPrep(rawDataInput);

  //Check for errors when preparing thhe data
  if (prep.error) {
    return { error: prep.error };
  }

  /*
   *Get:
   *    - finalArr: the data used for analysis (after filtering and cleaning)
   *    - arrayDataInput: Cleaned structured table built before filtering
   *                      records. Used for console prints.
   */
  const { finalArr, arrayDataInput } = prep;

  //This is what will be returned in this fucntion
  let averages = {};

  //PREPARING ANALYISIS TABLE---------------------------------------------------

  //Preparing new table for average display
  const questionKeys = VALID_HEADINGS.slice(2);
  averages = Object.fromEntries(questionKeys.map((heading) => [heading, 0]));
  //Keeping track of entries that have answers for a certain question
  const answerCounts = Object.fromEntries(
    questionKeys.map((heading) => [heading, 0])
  );

  /*
   * Filling the averages table and summing up the values of the ratings for the
   * corresponding questions
   */
  for (const row of finalArr) {
    for (const key of questionKeys) {
      let val = row[key];
      if (val !== null && val !== "" && val !== undefined) {
        val = Number(val);
        if (!Number.isNaN(val)) {
          averages[key] += val;
          answerCounts[key] += 1;
        }
      }
    }
  }

  //Finalizing the average rating for each question
  for (const key of questionKeys) {
    averages[key] =
      answerCounts[key] > 0
        ? Number((averages[key] / answerCounts[key]).toFixed(2))
        : 0;
  }
  //--------------------------------------------------------------------------

  // Display average results
  printAvgs(averages);
  console.log(
    `\nProcessed ${finalArr.length} out of ${arrayDataInput.length - 1} records`
  );

  return { averages };
}
//##############################################################################

//HELPER FUNCTIONS==============================================================

/*
 * Helper function to convert csv data to a 2D array----------------------------
 */
function parseCSV(data) {
  //Removing extra blank space
  const lines = data.trim().split(/\r?\n/);

  //Used to identify which delimiter was used. (Typically comma)
  const sep = [",", ";", "\t"].find((s) => lines[0].includes(s)) || ",";
  //Preparing 2D array
  return lines.map((line) => {
    const cells = [];
    let cur = "", //accumulating characters for current cell
      inQuotes = false; //Checks if inside quoted text

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === sep && !inQuotes) {
        const next = line.slice(i + 1, i + 3);
        // Comma followed by a space used to distinguish columns within cell
        // data from a delimiter symbol
        if (sep === "," && next.startsWith(" ") && /[A-Za-z]/.test(next[1]))
          cur += ch;
        // Dealing with seperators
        else {
          cells.push(cur.trim());
          cur = "";
        }
      } else cur += ch;
    }
    //Push last cell after finishing entire line.
    cells.push(cur.trim());
    //Handling number values or null scenarios
    return cells.map((c) => {
      if (!c || String(c).toLowerCase() === "null") return null;
      const n = Number(c);
      return Number.isNaN(n) ? c : n;
    });
  });
}

/*
 * Helper function to print survey data table-----------------------------------
 */
function printFullTable(rawDataInput, headings) {
  const colWidth = 25; //Column width
  console.log(
    "=".repeat(colWidth * rawDataInput[0].length + rawDataInput[0].length * 3)
  ); //Border

  //Word wrap column headings since they are small
  const wrapped = headings.map((h) => {
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
  //max number of lines needed after wrapping
  const maxLines = Math.max(...wrapped.map((w) => w.length));
  for (let lineNum = 0; lineNum < maxLines; lineNum++) {
    let row = "";
    //Iterate over each wrapped column heading
    for (const col of wrapped) {
      const text = col[lineNum] || "";
      row += text.padEnd(colWidth) + " | ";
    }
    console.log(row);
  }

  console.log(
    "=".repeat(colWidth * rawDataInput[0].length + rawDataInput[0].length * 3)
  ); // Line seperator

  // Printing the data
  for (let i = 1; i < rawDataInput.length; i++) {
    let row = "";
    for (const cell of rawDataInput[i]) {
      const val =
        cell === undefined || cell === null || cell === "" ? null : cell;
      row += String(val).padEnd(colWidth) + " | ";
    }
    console.log(row);
  }
  console.log(
    "=".repeat(colWidth * rawDataInput[0].length + rawDataInput[0].length * 3)
  ); // border
}

/*
 * Helper function to handle different forms of input data----------------------
 */
function inputTypeCheck(rawDataInput) {
  let checkedDataInput = rawDataInput;
  //2D array (what this function will actually be using)
  if (
    Array.isArray(checkedDataInput) &&
    checkedDataInput.length > 0 &&
    checkedDataInput.every((row) => Array.isArray(row))
  ) {
    console.log("Detected: 2D array");

    //CSV or string inputs
  } else if (typeof checkedDataInput === "string") {
    checkedDataInput = parseCSV(checkedDataInput);

    //Other input types out of scope
  } else {
    console.log("Error: Unsupported data type");
    return null;
  }

  return checkedDataInput;
}

/*
 * Helper function to handle 2D array validation--------------------------------
 */

function arrayValidation(arrayDataInput) {
  //This is what will be returned

  //Validating table data
  let lengthOk = false;
  let numColsOk = false;
  let headingsOk = false;

  // Overall array structure validation
  // Has at least one record apart from header
  if (arrayDataInput.length >= 2) {
    lengthOk = true;
    //Has exactly 7 columns
    if (arrayDataInput[0].length === VALID_HEADINGS.length) {
      numColsOk = true;
      headingsOk = true;
      //Has the exact column headings in validHeadings
      for (let i = 0; i < arrayDataInput[0].length; i++) {
        if (arrayDataInput[0][i] !== VALID_HEADINGS[i]) {
          headingsOk = false;
          break;
        }
      }
    }
  }

  return { headingsOk, numColsOk, lengthOk };
}

/*
 * Helper function to prepare the data records to be used in analysis-----------
 */
function dataRecordPrep(arrayDataInput) {
  let finalArr = [];

  //Iterate through data records
  for (let i = 1; i < arrayDataInput.length; i++) {
    let allInt = true;
    //Checking for malformed rows
    if (
      !Array.isArray(arrayDataInput[i]) ||
      arrayDataInput[i].length < VALID_HEADINGS.length
    )
      continue;
    //Skip the record if there is no submission timestamp
    const timestamp = arrayDataInput[i][1];
    if (
      timestamp == null ||
      String(timestamp).trim() === "" ||
      Number.isNaN(Date.parse(String(timestamp)))
    ) {
      continue;
    }

    /*
     * Check if the answers to questions are valid integers between 1 to 5
     * (inclusive) or unanswered.
     */
    for (let j = 2; j < arrayDataInput[i].length; j++) {
      const cell = arrayDataInput[i][j];
      if (cell != null && cell !== "") {
        const num = Number(cell);
        if (!(Number.isInteger(num) && num >= 1 && num <= 5)) {
          allInt = false;
          break;
        }
      }
    }
    let record;

    //All checks passed so create an object for the record and add the final results array
    if (allInt) {
      record = {
        "Employee ID": arrayDataInput[i][0],
        "Submission time": arrayDataInput[i][1],
        "I like the kind of work I do.": arrayDataInput[i][2],
        "In general, I have the resources I need to be effective.":
          arrayDataInput[i][3],
        "We are working at the right pace to meet our goals.":
          arrayDataInput[i][4],
        "I feel empowered to get the work done for which I am responsible.":
          arrayDataInput[i][5],
        "I am appropriately involved in decisions that affect my work.":
          arrayDataInput[i][6],
      };
      finalArr.push(record);
    }
  }

  return finalArr;
}

/*
 * Helper function to call all necessary functions to prep data for the specific analysis
 */
function analysisPrep(rawDataInput) {
  //CHECKING THE DATA TYPE OF THE INPUT-----------------------------------------
  const arrayDataInput = inputTypeCheck(rawDataInput);
  if (!arrayDataInput) {
    return { error: "Unsupported or invalid input type" };
  }
  //----------------------------------------------------------------------------

  //2D ARRAY VALIDATION---------------------------------------------------------
  const { headingsOk, numColsOk, lengthOk } = arrayValidation(arrayDataInput);
  //----------------------------------------------------------------------------

  // DATA ROW VALIDATION & FILTERING--------------------------------------------

  // Array to store final records that will be use for analysis
  let finalArr = [];

  //Record validation (Done if table structure meets requirements)
  if (lengthOk && numColsOk && headingsOk) {
    //Printing original table before analysis
    console.log("PRINT ORIGINAL TABLE");
    printFullTable(arrayDataInput, VALID_HEADINGS);
    finalArr = dataRecordPrep(arrayDataInput);
    return { finalArr, arrayDataInput };
  } else {
    console.log("Invalid Table. Cannot extract records.");
    return { error: "Invalid table structure or headers." };
  }
}

/*
 * Helper function to print average ratings table-------------------------------
 */
function printAvgs(averages) {
  console.log("\n\n\n\n");
  console.log("AVERAGE RATINGS");
  console.log("=".repeat(85));
  console.log("QUESTION".padEnd(68), "AVERAGE RATING");
  console.log("-".repeat(85));
  for (const key in averages) {
    console.log(key.padEnd(70), " - ", averages[key]);
  }
  console.log("=".repeat(85));
  console.log("\n\n");
}

//==============================================================================

// CODE THAT CALLS THE CORE FUNCTION
const fs = require("fs");

const surveyData = [
  [
    "Employee ID",
    "Submission time",
    "I like the kind of work I do.",
    "In general, I have the resources I need to be effective.",
    "We are working at the right pace to meet our goals.",
    "I feel empowered to get the work done for which I am responsible.",
    "I am appropriately involved in decisions that affect my work.",
  ],
  [1, "2021-07-28T20:35:41+00:00", 5, null, 5, 4, 4],
  [2, "2021-07-29T07:05:41+00:00", 4, 5, 5, 3, 3],
  [3, "2021-07-29T17:35:41+00:00", 5, 5, null, 5, 4],
  [4, "", null, null, null, null, null],
  [5, "2021-07-30T04:05:41+00:00", 4, 5, 5, null, 4],
  [6, null, 5, 5, 5, 2, 3],
];

const parsed = parseData(surveyData);

//UNCOMMENT TO SEE A CSV USAGE EXAMPLE
// const csvData = fs.readFileSync("survey_data.csv", "utf8");
// parseData(csvData);
