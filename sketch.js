let allHighlighted = [];
let text = "";
let counter;

function setup(){

}

function draw(){

}

document.addEventListener("select", windowSelect);

function windowSelect(){
  $('#showSelected').on('click', function() {
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }

    console.log(allHighlighted.length)
    selectText(text);
  });
    counter = 0;
}

function selectText(text) {
  /* let mainText = $('#mainText').clone() */
  counter = counter + 1;
  $("#textList").remove()
  let newText = "<li id='selectCount" + counter + "'>" + text + "</li>";
  if (allHighlighted.length >= 2) {
    allHighlighted.unshift(newText)
    allHighlighted.pop();
  } else {
    allHighlighted.unshift(newText);
  }

  $("#selectText").append("<ul id='textList'></ul>")
  for (var i = 0; i < allHighlighted.length; i++) {
    console.log("lj")
    $("#textList").append(allHighlighted[i])
  }

  let newMain = $('#mainText').html()
  // newMain = newMain.replace(text, newText)
}
