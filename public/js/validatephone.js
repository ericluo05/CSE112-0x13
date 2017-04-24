function validatePhone()
{
  var ccEle = document.getElementById("cc1");
  var cc1 = ccEle.options[ccEle.selectedIndex].value;
  var number = document.getElementById("number").value;
  var result =   document.getElementById("ResultText");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result.innerHTML = this.responseText;
    }
  };

  var request = "/phone/isValidPhone?country_code_1="+cc1+"&number="+number;
  xhttp.open("POST", request, true);
  xhttp.send();
}



function formatPhone()
{
  var number = document.getElementById("telnum").value;
  var result = document.getElementById("ResultText");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      result.innerHTML = this.responseText;
    }
  };

  var request = "/phone/format?number="+number;
  xhttp.open("POST", request, true);
  xhttp.send();

}
