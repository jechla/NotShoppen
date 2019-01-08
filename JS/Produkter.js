function buy(nr){
  if (!sessionStorage.UserId){
    window.location.href = "login.html";
  } else {
    productBuyJSON = {UserId: sessionStorage.UserId,
                      OrderId: sessionStorage.OrderId,
                      ProductId: nr.toString()
                    };
    x = new XMLHttpRequest();
    x.open("POST", "http://localhost:8080/buy/");
    x.setRequestHeader("Content-Type", "text/plain");
    x.onreadystatechange = function (){
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        sessionStorage.setItem("Basket","true");
      };
    }
    x.send(JSON.stringify(productBuyJSON));

  }
}


function test(buttonNo){
  alert(`Du har trykket på knap ${buttonNo}`);
}
