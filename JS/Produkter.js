const serverUrl = "http://localhost:8080/";

function noProd(callback){
  let no=0;
  let x = new XMLHttpRequest();
  x.addEventListener("error", function(event){
    alert("Oops something went wrong, try again");
  });
  x.open("GET",serverUrl+"noProd");
  x.addEventListener("error", function(event){
    alert("Oops something went wrong, try again");
  });
  x.onreadystatechange = () =>{
    if (x.readyState == 4 && x.status == 200) {
      no = parseInt(x.responseText,10);
      let pstr="";
      for (let i=0; i<no; i++){
        pstr+= `<p id="prodid${i+1}"></p>`;
      }
      document.getElementById('out0').innerHTML = pstr;
      callback(no);
    }
  }
  x.send();
}

function connectProd(index,callback){
  let x= new XMLHttpRequest();
  x.open("GET",serverUrl+"getProd?id="+(index+1));
  x.addEventListener("error", function(event){
    alert("Oops something went wrong, try again");
  });
  x.onreadystatechange = ()=>{
    if (x.readyState == 4 && x.status == 200) {
      text ="";
      text =x.responseText;
      prodjson = JSON.parse(text);
      callback(prodjson);
    }
  }
  x.send();
}

function getProd(no){
  for (let i=0; i< no;i++){
    connectProd(i, (prodjson) =>{setProd(prodjson);});
  }
}


noProd((no) =>{getProd(no);});

function buy(nr){
  if (!sessionStorage.UserId){
    window.location.href = "Login.html";
  } else {
    productBuyJSON = {UserId: sessionStorage.UserId,
                      OrderId: sessionStorage.OrderId,
                      ProductId: nr.toString()
                    };
    x = new XMLHttpRequest();
    x.open("POST", serverUrl+"addProd/");
    x.addEventListener("error", function(event){
      alert("Oops something went wrong, try again");
    });
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


function setProd(prodjson){
  document.getElementById(`prodid${prodjson.ProductId}`).innerHTML =
  `<div class='varer'>
    <div class='billede'>
      <img src='${prodjson.Imgpath}' width='200'>
    </div>
    <div class='info'>
      <h2>${prodjson.Title}</h2>
      <p>${prodjson.Description}</p>
      <p><b>Pris: </b>${prodjson.Prize}</p>
      <p><button class="kurvknap" onclick="buy(${prodjson.ProductId});">Læg i kurv</button></p>
    </div>
  </div>`;
}
