const serverUrl = "http://localhost:8080/";

var basketSize=0;

if (sessionStorage.UserId){
  let orderId =sessionStorage.getItem("OrderId");
  getBasket(orderId, decoBasket);
}


function getBasket(orderId,callback){
  let x = new XMLHttpRequest();
  x.open("GET",serverUrl+"basket/?id="+orderId);
  x.addEventListener("error", function(event){
    alert("Oops something went wrong, try again");
  });
  x.onreadystatechange = ()=>{
    if (x.readyState == 4 && x.status == 200){
      let text = "";
      text = x.responseText;
      callback(JSON.parse(text));
    }
  }
  x.send();
}

function decoBasket(basketjson){
  let len = basketjson.content["length"];
  basketSize =len;
  if (len>0){
    let pstr =`<p id="buybutton"><button class="kurvknap" onclick="buyStuf();">Køb</button></p>`;
    for (let i=0; i<len; i++){
      pstr += `<p id ="orderlineid${basketjson.content[i].OrderlineId}"></p>`;
    }
    document.getElementById('tomkurv').innerHTML = "";
    document.getElementById('out1').innerHTML = pstr;
    getProd(len,basketjson);
  }
}

function connectProd(index,basketjson,callback){
  let x= new XMLHttpRequest();
  x.open("GET",serverUrl+"getProd?id="+(basketjson.content[index].ProductId));
  x.addEventListener("error", function(event){
    alert("Oops something went wrong, try again");
  });
  x.onreadystatechange = ()=>{
    if (x.readyState == 4 && x.status == 200) {
      text ="";
      text =x.responseText;
      prodjson = JSON.parse(text);
      callback(prodjson,index,basketjson);
    }
  }
  x.send();
}

function getProd(no,basketjson){
  for (let i=0; i< no;i++){
    connectProd(i,basketjson, (prodjson,i,basketjson) =>{setProd(prodjson,i,basketjson);});
  }
}

function setProd(prodjson,i,basketjson){
  document.getElementById(`orderlineid${basketjson.content[i].OrderlineId}`).innerHTML =
  `<div class='varer'>
    <div class='billede'>
      <img src='${prodjson.Imgpath}' width='200'>
    </div>
    <div class='info'>
      <h2>${prodjson.Title}</h2>
      <p>${prodjson.Description}</p>
      <p><b>Pris: </b>${prodjson.Prize}</p>
      <p><button class="kurvknap" onclick="delItem(${basketjson.content[i].OrderlineId});">Slet</button></p>
    </div>
  </div>`;
}

function delItem(id){
  let x = new XMLHttpRequest();
  x.open("GET", serverUrl+"delItem/?id="+id);
  x.addEventListener("error", function(event){
    alert("Oops something went wrong, try again");
  });
  x.onreadystatechange = ()=>{
    if (x.readyState == 4 && x.status == 200) {
      text ="";
      text =x.responseText;
      if (text == "true"){
        document.getElementById(`orderlineid${id}`).innerHTML = "";
        basketSize--;
        if (basketSize==0){
          document.getElementById('buybutton').innerHTML = "";
          document.getElementById('tomkurv').innerHTML = "Din kurv er tom";
        }
        //window.location.href = "Kurv.html";
      } else {
        alert("fejl");
      }
    }
  }
  x.send();
}

function buyStuf(){
  let userId = sessionStorage.getItem("UserId");
  let x = new XMLHttpRequest();
  x.open("GET", serverUrl+"getOrders/?id="+userId);
  x.addEventListener("error", function(event){
    alert("Oops something went wrong, try again");
  });
  x.onreadystatechange = ()=>{
    if (x.readyState == 4 && x.status == 200) {
      text ="";
      text =x.responseText;
      jsontext = JSON.parse(text);
      if (jsontext.OrderId){
        sessionStorage.setItem("OrderId",jsontext.OrderId);
        alert("Dine ting er på vej (NOT)!");
        window.location.href = "index.html";
      } else {
        alert("fejl");
      }
    }
  }
  x.send();
}
