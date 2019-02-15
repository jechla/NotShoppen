window.addEventListener("load", function () {

function logout(){
  sessionStorage.removeItem("UserId");
  sessionStorage.removeItem("OrderId");
  sessionStorage.removeItem("Basket");
  document.getElementById("log").href = "Login.html";
  document.getElementById("log").innerHTML = "Log ind";
}

document.getElementById("log").addEventListener("click",logout);

if (sessionStorage.UserId){
  document.getElementById("log").href = "index.html";
  document.getElementById("log").innerHTML = "Log ud";
}
});
