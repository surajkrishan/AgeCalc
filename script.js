
// Header date (current date)
window.onload = function() {
    let t = new Date().toLocaleDateString('en-in', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/[^0-9]/g, "");
    document.querySelector("#today").innerHTML = t;
}

// calculation
function calcage() {
    
    // Reset output
    document.querySelector("#error").innerHTML = null;
    document.querySelector("#days").innerHTML = null;
    document.querySelector("#months").innerHTML = null;
    document.querySelector("#years").innerHTML = null;

    // Get input from the element
    let age = document.querySelector("#age").value;

    // Validate the input
    validdate(age);

    // Get todays date
    let today = new Date();

    // ṣplit the input values to repective parts
    let year = Number(age.substr(4, 4));
    let month = Number(age.substr(2, 2))  - 1;
    let day = Number(age.substr(0, 2));
    let past = new Date(year,month,day);

    // Calculate years
    let currYear = today.getFullYear() - past.getFullYear();

    // Calculate Months
    let currMonth = today.getMonth() - past.getMonth();
    if(currMonth < 0) {
        currMonth = today.getMonth() + 12 - past.getMonth();
        currYear = currYear - 1; 
    }

    // Calculate days
    let currDay = today.getDate()-past.getDate();
    if (currDay < 0) {
        let m = past.getMonth();
        currDay = today.getDate() + m - past.getDate();
        currMonth = currMonth - 1;
    }

    // Set output values
    document.querySelector("#days").innerHTML = currDay;
    document.querySelector("#months").innerHTML = currMonth;
    document.querySelector("#years").innerHTML = currYear;

}

// Reset function
function cleared() {
    document.querySelector("#age").value = null;
    document.querySelector("#error").innerHTML = null;
    document.querySelector("#days").innerHTML = null;
    document.querySelector("#months").innerHTML = null;
    document.querySelector("#years").innerHTML = null;
    console.log("cleared");
}

// Validation Function
function validdate(age) {
    
    let year = Number(age.substr(4, 4));
    let month = Number(age.substr(2, 2))  - 1;
    let day = Number(age.substr(0, 2));
    let msg = '';

    if (isNaN(age)) {
       msg = 'Invalid input: Please enter a valid date in ddmmyyyy format!';
    } 

    if (age.toString().length < 8) {
        msg = 'Invalid input: Please enter a valid date in ddmmyyyy format!';
    }

    if (year < 0) {
       msg = 'Invalid input: Please enter a valid year!';
    }

    if (month < 1 || month > 12) {
        msg = 'Invalid input: Please enter a valid month!';
    }

    let leapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);

    if (month == 01 || month == 03 || month == 05 || month == 08 || month == 10 || month == 12) {
        if (day < 0 || day > 31) {
            msg = 'Invalid Input: Please input a valid date!';
        }
    } 
    
    if (month == 04 || month == 05 || month == 06 || month == 07 || month == 09 || month == 11) {
        if (day < 0 || day > 30) {
            msg = 'Invalid Input: Please input a valid date!';
        }
    } 

    if (leapYear == 365) {
        if (month == 02) {
            if (day < 0 || day > 28) {
                msg = 'Invalid Input: Please input a valid date (this was not a leap year)!';
            }
        }
    } else {
        if (day < 0 || day > 29) {
            msg = 'Invalid Input: Please input a valid date!';
        }
    }

    document.querySelector("#error").innerHTML = msg;
    if (msg != '') {
        throw new Error("error");
    }

}