if (sessionStorage.UserId){
  let orderId =sessionStorage.getItem("OrderId");
  getBasket(orderId, decoBasket);
}


function getBasket(orderId,callback){
  let x = new XMLHttpRequest();
  x.open("GET","http://localhost:8080/basket/?id="+orderId);
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
  let pstr ="";
  for (let i=0; i<len; i++){
    pstr += `<p id ="orderlineid${basketjson.content[i].OrderlineId}"></p>`;
  }
  document.getElementById('tomkurv').innerHTML = "";
  document.getElementById('out1').innerHTML = pstr;
  getProd(len,basketjson);
}

function connectProd(index,basketjson,callback){
  let x= new XMLHttpRequest();
  x.open("GET","http://localhost:8080/getProd?id="+(basketjson.content[index].ProductId));
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
      <p><button class="kurvknap" onclick="delete(${prodjson.ProductId},${basketjson.content[i].OrderlineId});">Slet</button></p>
    </div>
  </div>`;
}
