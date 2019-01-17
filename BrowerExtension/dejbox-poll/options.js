let inputUrl = document.querySelector("input[name='url']");
let inputName = document.querySelector("input[name='name']");
let btn = document.querySelector("button");

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


btn.addEventListener('click', function(){
  chrome.storage.sync.set({url: inputUrl.value, name:inputName.value}, function(){
    window.close();
  })
});


chrome.storage.sync.get(function(val){
  inputUrl.value = val.url || "";
  inputName.value = val.name || "";
})