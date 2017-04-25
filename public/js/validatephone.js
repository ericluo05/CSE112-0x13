function validatePhone() {
    var ccEle = document.getElementById("cc1");
    var cc = ccEle.options[ccEle.selectedIndex].value;
    var number = document.getElementById("number").value;
    var result =   document.getElementById("ResultText");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = this.responseText;
            var jsonRes = JSON.parse(data);
            if(jsonRes["isValid"])
                result.innerHTML = "Your number is valid!";
            else
                result.innerHTML = "Your number is invalid!";
        }
    };

    var request = "/phone/isValidPhone?cc=" + cc + "&number=" + number;
    xhttp.open("POST", request, true);
    xhttp.send();
}


function formatPhone() {
    var number = document.getElementById("telnum").value;
    var ccEle = document.getElementById("cc2");
    var cc = ccEle.options[ccEle.selectedIndex].value;
    var result = document.getElementById("ResultText");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = this.responseText;
            var jsonRes = JSON.parse(data);
            if(jsonRes["isValid"])
                result.innerHTML = "Formatted Number: " + jsonRes["Format"];
            else 
                result.innerHTML = "Your number is invalid!";
        }
    };

    var request = "/phone/format?cc=" + cc + "&number=" + number;
    xhttp.open("POST", request, true);
    xhttp.send();
}
