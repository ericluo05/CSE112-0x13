/* eslint-disable no-unused-vars,require-jsdoc */
function validatePhone() {
    let ccEle = document.getElementById('cc1');
    let cc = ccEle.options[ccEle.selectedIndex].value;
    let number = document.getElementById('number').value;
    let result = document.getElementById('ResultText');
    let xhttp = new XMLHttpRequest();
    let numOnly = /^\d/; // regex used to check if the number is numeric only

    if (numOnly.test(number.toString())) {
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let data = this.responseText;
                let jsonRes = JSON.parse(data);
                if(jsonRes['isValid'])
                    result.innerHTML = 'Phone number is valid!';
                else
                    result.innerHTML = 'Phone number is invalid!';
            }
        };
    } else{
        console.log('Phone number contained non-numeric symbols.');
        result.innerHTML = 'Phone number contained non-numeric symbols.';
    }
    let request = '/phone/isValidPhone?cc=' + cc + '&number=' + number;
    xhttp.open('POST', request, true);
    xhttp.send();
}


function formatPhone() {
    let number = document.getElementById('telnum').value;
    let ccEle = document.getElementById('cc2');
    let cc = ccEle.options[ccEle.selectedIndex].value;
    let result = document.getElementById('ResultText');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = this.responseText;
            let jsonRes = JSON.parse(data);
            if(jsonRes['isValid'])
                result.innerHTML = 'Formatted Number: ' + jsonRes['Format'];
            else
                result.innerHTML = 'Your number is invalid!';
        }
    };

    let request = '/phone/format?cc=' + cc + '&number=' + number;
    xhttp.open('POST', request, true);
    xhttp.send();
}
