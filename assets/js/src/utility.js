var button = document.getElementById("load-more");

button.addEventListener("click",function () {
   var newURL = "http://www.hurriyet.com.tr/yazarlar";
   chrome.tabs.create({ url: newURL });
});