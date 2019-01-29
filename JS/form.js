window.addEventListener("load", function () {

  function sendData(){
    var XHR = new XMLHttpRequest();

    XHR.addEventListener("load", function(event){
      //alert(event.target.responseText);
      resjson = JSON.parse(event.target.responseText);
      sessionStorage.setItem("UserId", resjson.UserId);
      sessionStorage.setItem("OrderId", resjson.OrderId);
      window.location.href = "Forside.html";
    });

    XHR.addEventListener("error", function(event){
      alert("Oops");
    });
    formStr = JSON.stringify(formDataJson);
    XHR.open("GET", "http://localhost:8080/login/"+":"+formStr);

    XHR.send();
  }

  //var form = document.getElementById('form1');

  document.getElementById('form1').addEventListener("submit", function (event) {
    event.preventDefault();
    formDataJson = {username: document.getElementById('username').value,
                    password: document.getElementById('password').value};
    sendData();
  });
  document.getElementById('form2').addEventListener("submit", function (event){
    event.preventDefault();
    let form = document.getElementById('form2');
    form2Sub(form);
  });
});

function reqSession (respText){
  resjson = JSON.parse(respText);
  sessionStorage.setItem("UserId", resjson.UserId);
  sessionStorage.setItem("OrderId", resjson.OrderId);
  window.location.href = "Forside.html";
}

function form2Sub(form){
  formDataJson = {navn: form.navn.value,
                  adresse: form.adresse.value,
                  postnummer: form.postnr.value,
                  telefon: form.telefon.value,
                  email: form.email.value,
                  password: form.password.value
                };
  var formStr = JSON.stringify(formDataJson);
  var x = new XMLHttpRequest();
  x.open("POST", "http://localhost:8080/addUser/");
  x.setRequestHeader("Content-Type", "text/plain");

  x.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      reqSession(this.responseText);
    };
  };
  x.send(formStr);
}
