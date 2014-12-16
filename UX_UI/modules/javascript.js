
var one = document.getElementById('one')
var gonow = function(e){
  alert("works");
}
var showtext = function(e){
  var p = document.getElementsByTagName('p');
  p.className = 'hide';
  console.log('did the thing');
}
one.addEventListener('click',showtext,false);
