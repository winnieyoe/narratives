//Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCqNPv6bSExjJobrc34d9mmzGTPd_JtB-Y",
  authDomain: "interpreted-narratives.firebaseapp.com",
  databaseURL: "https://interpreted-narratives.firebaseio.com",
  projectId: "interpreted-narratives",
  storageBucket: "interpreted-narratives.appspot.com",
  messagingSenderId: "313087194195",
  appId: "1:313087194195:web:efe848a764c521d886c2a6",
  measurementId: "G-99VQ9RLN6F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// console.log(firebase);

var database = firebase.database();
var userData = {
  "highlighted": "",
  "tags": "",
  "image": "",
  "info": ""
};

//* SECTION 1: INTRODUCTION *//
let introDiv = document.getElementById("section1");
let introB = document.getElementById("getSection2");
let articleDiv = document.getElementById("section2");
let articleB = document.getElementById("submitSentences");
let keywordDiv = document.getElementById("section3");
let keywordB = document.getElementById("submitWords");
let imgDiv = document.getElementById("section4");
let imgB = document.getElementById("submitImg");
let qDiv = document.getElementById("section5");
let qB = document.getElementById("submitAnswer");
let endDiv = document.getElementById("section6");

introB.addEventListener("click", function() {
  // introDiv.remove();
  introDiv.style.display = "none";
  articleDiv.style.display = "block";
})

articleB.addEventListener("click", function() {
  // articleDiv.remove();
  articleDiv.style.display = "none";
  keywordDiv.style.display = "block";
})

keywordB.addEventListener("click", function() {
  keywordDiv.style.display = "none";
  imgDiv.style.display = "block";
})

imgB.addEventListener("click", function() {
  imgDiv.style.display = "none";
  qDiv.style.display = "block";
})

qB.addEventListener("click", function() {
  qDiv.style.display = "none";
  endDiv.style.display = "block";
})

//* SECTION 2: HIGHLIGHT *//
//Read Article, split by sentences
//******!!!! There is an extra item in the end > solved by lines.length-1 now
let lines = [];
let newText;

$.get('article.txt', function(data) {
  data.split(/(?<=\.)/).map(item => lines.push(item.trim()));

  //For each of the sentences split, create a new span to wrap it so that we can
  //modifty it later.
  for (i = 0; i < lines.length - 1; i++) {
    newText = "<span id='new" + i + "'>" + lines[i] + " " + "</span>";
    //check that all text have span around interval
    console.log(newText);
    $('#mainText').append(newText);
  }
})

//If hover on the span, change color
//If clicked, make selection, remove selection if clicked twice
let clickCount = 0;
$(document).ready(function() {

  $("span").hover(
      function() {
        // console.log((this.id));
        $(this).addClass("hover");
        // console.log("hoverr")
      },
      function() {
        $(this).removeClass("hover");
      }
    ),
    $("span").click(
      function() {
        console.log("clickcount is ", clickCount)
        if(clickCount == 2){
          articleB.style.display = "block";
          // console.log("a is b ")
        }
        //Isn't selected and haven't selected more than 3 sentences
        if (clickCount < 3 && !$(this).hasClass("clicked")) {
          $(this).addClass("clicked");
          clickCount++;
        } else if ($(this).hasClass("clicked")) {
          $(this).removeClass("clicked");
          clickCount--;
          articleB.style.display = "none";
        }
        console.log(this.id, clickCount)
      },
    );
});

//Store highlighted text into an array, still need to account for text being chosen more than once
let allSelected = [];
// let text;
let thisID;
$("#submitSentences").on("click", function() {
  $(".clicked").each(function(i) {
    // text = $(this).html();
    thisID = $(this).attr("id");
    allSelected.push(thisID);
    // allSelected.push(text);
  })
  console.log(allSelected)
  // submitHighlighted();
  userData.highlighted = allSelected;
})

// function submitHighlighted(){
//   var data = {
//     highlighted: allSelected
//   }
//   console.log(data);
//   var ref = database.ref("result/highlighted");
//   ref.push(data);
// }


//* SECTION 3: KEYWORDS *//
let allWords = [];

$("#submitWords").click(function() {
  $(".keywords").each(function() {
    let value = $(this).val();
    allWords.push(value);
  })
  console.log("allWords", allWords)
  userData.tags = allWords;
  //submitWords();
})

// function submitWords(){
//   var data = {
//     tags: allWords
//   }
//   console.log(data);
//   var ref = database.ref("result/words");
//   ref.push(data);
// }

//* SECTION 4: IMAGES *//
let thisImg;
let imgClickCount = 0;
let selectedImg;

$("img").click(function() {
  thisImg = $(this).attr("id");
  if (imgClickCount < 1 && !$(this).hasClass("border")) {
    $(this).addClass("border");
    imgClickCount++;
    imgB.style.display = "block";
  } else if (imgClickCount == 1 && $(this).hasClass("border")) {
    $(this).removeClass("border");
    imgClickCount--;
    imgB.style.display = "none";
  }
  console.log(imgClickCount)
  selectedImg = $(this).attr("id");
  // console.log($(this).attr("id"));
  // console.log(selectedImg)
})

$("#submitImg").on("click", function() {
  console.log(selectedImg);
  // submitImg();
  userData.image = selectedImg;
})

// function submitImg(){
//   var data = {
//     image: selectedImg
//   }
//   console.log(data);
//   var ref = database.ref("result/image");
//   ref.push(data);
// }

//* SECTION 5: INFO *//
let lived;
let timeStayed;
$("#yes").click(function() {
  if ($(this).is(":checked")) {
    $("#timeStayed").show();
    lived = "yes"
  }
})

$("#no").click(function() {
  lived = "no"
})

$("#submitAnswer").click(function() {
  timeStayed = $(".answer").val();
  console.log(timeStayed);
  // submitInfo();
  userData.info = {
    lived: lived,
    timeStayed: timeStayed
  };
  ref = database.ref("result");
  ref.push(userData);
})

//* END SECTION *//
$(".source").load("source.txt");

// function submitInfo(){
//   var data = {
//     lived: lived,
//     timeStayed: timeStayed
//   }
//   console.log(data);
//   var ref = database.ref("result/info");
//   ref.push(data);
// }

//* RETREIEVE *//
var ref = database.ref("result");
ref.on("value", gotData, errData);
let imgCount = 0;

function gotData(data) {
  let answers = data.val();
  let userID = Object.keys(answers);

  for (let i=0; i<userID.length; i++){
    let u = userID[i];
    let highlighted = answers[u].highlighted;
    let image = answers[u].image;
    let info = answers[u].info.lived + " " + answers[u].info.timeStayed;
    let tags = answers[u].tags;

    console.log(u, highlighted, image, info, tags)
  }
  // console.log(data.val());
  // let results = data.val();
  // let keys = Object.keys(results);
  // console.log(keys)
  //
  // for (let i=0; i<keys.length; i++){
  //   let key = keys[i];
  //   let result = results[key];
  // }
}

function errData(err) {
  console.log("Error");
  console.log(err);
}


///////// HIGHTLIGHT SESSION OLD CODE
//Put the Selected Text into an array
// var allSelected = [];
// $('#submitSentences').on('click', function() {
//   var text = "";
//   //Get selected area
//   if (window.getSelection) {
//     text = window.getSelection().toString();
//   } else if (document.selection && document.selection.type != "Control") {
//     text = document.selection.createRange().text;
//   }
//   console.log(allSelected.length)
//   selectText(text);
// });


//Create list of selected text in a separate section
// let counter = 0;
//
// function selectText(text) {
//   /* let mainText = $('#mainText').clone() */
//   counter = counter + 1;
//   $("#textList").remove()
//   let newText = "<li id='selectCount" + counter + "'>" + text + "</li>";
//   if (allSelected.length >= 2) {
//     allSelected.unshift(newText)
//     allSelected.pop();
//   } else {
//     allSelected.unshift(newText);
//   }
//
//   $("#selectText").append("<ul id='textList'></ul>")
//   for (var i = 0; i < allSelected.length; i++) {
//     // console.log("lj")
//     $("#textList").append(allSelected[i]);
//   }
//
//   //Replace all content
//   let newMain = $('#mainText').html()
//   // newMain = newMain.replace(text, newText)
// }
