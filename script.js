
// Header date (current date)
window.onload = () => {
    let t = new Date().toLocaleDateString('en-in', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/[^0-9]/g, "");
    document.querySelector("#today").innerHTML = t;  
}

// Reset function
const GetData = () => {

    // Reset output
    document.querySelector("#error").innerHTML = null;
    document.querySelector("#days").innerHTML = null; 
    document.querySelector("#months").innerHTML = null;
    document.querySelector("#years").innerHTML = null;

    // Get input from the element
    let date = document.querySelector("#date").value;
    let data = [];

    // Validate the input
    let isValid  =  validdate(date);

    if (!isValid) {

    // ṣplit the input values to repective parts
    let year = Number(date.substr(4, 4));
    let month = Number(date.substr(2, 2));
    let day = Number(date.substr(0, 2));
    let past = new Date(`${year}-${month}-${day} 00:00:00 UTC`);

    data =  calcDiff(past);

    //Display calculated values 
    document.querySelector("#days").innerHTML = data.currDay;
    document.querySelector("#months").innerHTML = data.currMonth;
    document.querySelector("#years").innerHTML = data.currYear;
    } else {
        //Add the error message if any
        document.querySelector("#error").innerHTML = isValid;
    }
}

// Calculation function
const calcDiff = date => {
    
    //Setting Dates
    let today = new Date();
    let past = new Date(date);
    
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
        let m = new Date(past.getFullYear(), past.getMonth(), 0).getDate()
        currDay = today.getDate() + m - past.getDate();
        currMonth = currMonth - 1;
    }

    //return the calculated values
    return {currYear, currMonth, currDay};
  };


// Reset function
const cleared = () => {
    document.querySelector("#date").value = null;
    document.querySelector("#error").innerHTML = null;
    document.querySelector("#days").innerHTML = null; 
    document.querySelector("#months").innerHTML = null;
    document.querySelector("#years").innerHTML = null;
}

// Validation Function
const validdate = date => {
    
    let year = Number(date.substr(4, 4));
    let month = Number(date.substr(2, 2));
    let day = Number(date.substr(0, 2));
    let msg = '';

    //get currrent year and month
    t_year = new Date().getFullYear();
    t_month = new Date().getMonth();
    
    //validate the length of the input
    if (date.toString().length < 8) {
        msg = 'Invalid input: Please enter a valid date in ddmmyyyy format!';
    }

    // Validate year
    if (year < 0 || year > t_year) {
       msg = 'Invalid input: Please enter a valid year!';
    } else {
        if (year == t_year && month > t_month) {
            msg = 'Invalid input: Please enter a valid month!';
        }
    }

    //validate month 
    if (month < 1 || month > 12) {
        msg = 'Invalid input: Please enter a valid month!';
    }

    // Number of days
    let NoD = new Date(year, month, 0).getDate();

    // Validate days
    if ( day < 0 ||  day > NoD) {
        msg = `Invalid Input: Please input a valid date! (This month has only ${NoD} days)`;
    }

    //return value incase of error
    return msg;
}