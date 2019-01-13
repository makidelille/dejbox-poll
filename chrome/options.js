let inputUrl = document.querySelector("input[name='url']");
let inputName = document.querySelector("input[name='name']");

inputName.addEventListener('change', function(){
  var val = this.value;
  chrome.storage.sync.set({name: val}, function(){
    console.log("this.value: " +  val);
  })
});

inputUrl.addEventListener('change', function(){
  var val = this.value;
  chrome.storage.sync.set({url: val}, function(){
    console.log("this.value: " +  val);
  })
});


chrome.storage.sync.get(function(val){
  inputUrl.value = val.url || "";
  inputName.value = val.name || "";
})