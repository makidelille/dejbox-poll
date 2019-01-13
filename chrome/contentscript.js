console.log("hello you are on *.dejbox.fr");

var urlFinish = "test";

if(window.location.href.indexOf(urlFinish) != -1){
  // we are on the final page.
  var idSpan = document.querySelector('body').innerHTML;

  chrome.storage.sync.get(function(val){
    var host = val.url || "http://localhost/";
    var name =  val.name || "";

    if(host.indexOf('http') != 0){
      host = 'http://' + host;
    }

    const req = new XMLHttpRequest();
    req.onloadend = function(){
      alert("Dejbox envoyé au serveur ! Bon courage pour la suite");
    }
    req.open('POST', host, false); 
    req.send(JSON.stringify({id: idSpan, name: name}));
    
  });
}