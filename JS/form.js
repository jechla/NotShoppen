const serverUrl = "http://localhost:8080/";

window.addEventListener("load", function () {

  document.getElementById('form1').addEventListener("submit", function (event) {
    event.preventDefault();
    let form = document.getElementById('form1');
    var formDataJson = {email: form.email.value,
                        password: form.password.value};
    formSub(formDataJson,'login');
  });

  document.getElementById('form2').addEventListener("submit", function (event){
    event.preventDefault();
    let form = document.getElementById('form2');
    formDataJson = {navn: form.navn.value,
                    adresse: form.adresse.value,
                    postnummer: form.postnr.value,
                    telefon: form.telefon.value,
                    email: form.email.value,
                    password: form.password.value
                  };
    formSub(formDataJson,'addUser');
  });
});

function reqSession (respText){
  resjson = JSON.parse(respText);
  if (resjson.UserId == false){
    document.getElementById('notuser').innerHTML = "Forkert e-mail eller brugernavn";
  } else {
    sessionStorage.setItem("UserId", resjson.UserId);
    sessionStorage.setItem("OrderId", resjson.OrderId);
    window.location.href = "index.html";
  }
}

function formSub(form,type){
  var formStr = JSON.stringify(form);
  var x = new XMLHttpRequest();
  x.open("POST", serverUrl+type+"/");
  x.setRequestHeader("Content-Type", "text/plain");
  x.addEventListener("error", function(event){
    alert("Oops" + x.statusText);
  });
  x.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      reqSession(this.responseText);
    };
  };
  x.send(formStr);
}
