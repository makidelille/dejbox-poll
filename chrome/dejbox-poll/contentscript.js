console.log("hello you are on dejbox.fr/order_confirmation.jsp");

// "https://www.dejbox.fr/order_confirmation.jsp?order=1986357";
// "https://www.dejbox.fr/order_confirmation.jsp?order=2004833";

  // we are on the final page.
var idSpan = document.querySelector('.order_number').innerHTML;

chrome.storage.sync.get(function(val){
  var host = val.url || "http://localhost/";
  var name =  val.name || "";

  if(host.indexOf('http') != 0){
    host = 'http://' + host;
  }


  console.log('Enregistrement de la commande n°' + idSpan);
  const req = new XMLHttpRequest();
  req.onloadend = function(){
    alert("Dejbox envoyé au serveur ! Bon courage pour la suite");
  }
  req.open('POST', host, false); 
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify({dejbox: idSpan, name: name}));

});
