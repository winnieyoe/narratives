//Firebase - Original
// var firebaseConfig = {
//   apiKey: "AIzaSyCqNPv6bSExjJobrc34d9mmzGTPd_JtB-Y",
//   authDomain: "interpreted-narratives.firebaseapp.com",
//   databaseURL: "https://interpreted-narratives.firebaseio.com",
//   projectId: "interpreted-narratives",
//   storageBucket: "interpreted-narratives.appspot.com",
//   messagingSenderId: "313087194195",
//   appId: "1:313087194195:web:efe848a764c521d886c2a6",
//   measurementId: "G-99VQ9RLN6F"
// };

//Firebase - WinterShow
var firebaseConfig = {
    apiKey: "AIzaSyCIv_CggBdxTYRaGcnHo3HZBN1gJaLgLrY",
    authDomain: "narratives-wintershow.firebaseapp.com",
    databaseURL: "https://narratives-wintershow.firebaseio.com",
    projectId: "narratives-wintershow",
    storageBucket: "narratives-wintershow.appspot.com",
    messagingSenderId: "851819648822",
    appId: "1:851819648822:web:1629b44563143d0bf0c597",
    measurementId: "G-HJYWBPCY55"
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
    // console.log(newText);
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
        // console.log("clickcount is ", clickCount)
        if (clickCount == 2) {
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
        // console.log(this.id, clickCount)
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
  console.log("sentences", allSelected, userData)
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
  // console.log("allWords", allWords)
  userData.tags = allWords;
  console.log("allWords", allWords, userData)
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
  // console.log(imgClickCount)
  selectedImg = $(this).attr("id");
  // console.log($(this).attr("id"));
  // console.log(selectedImg)
  console.log("image", selectedImg, userData)
})

$("#submitImg").on("click", function() {
  // console.log(selectedImg);
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
  // console.log(timeStayed);
  // submitInfo();
  userData.info = {
    lived: lived,
    timeStayed: timeStayed
  };
  ref = database.ref("result");
  ref.push(userData);
  ref.on("value", gotData, errData);
  // console.log(ref)
  console.log("info", lived, timeStayed, userData)
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
// var ref = database.ref("result");
// ref.on("value", gotData, errData);
let img1Count = 0;
let img2Count = 0;
let img3Count = 0;
let allSentences = [];
let sCount = {};
let allTags = [];
let wCount = {};

function gotData(data) {
  console.log("gotData")
  let answers = data.val();
  let userID = Object.keys(answers);

  for (let i = 0; i < userID.length; i++) {
    let u = userID[i];
    let highlighted = answers[u].highlighted;
    let image = answers[u].image;
    let info = answers[u].info.lived + " " + answers[u].info.timeStayed;
    let tags = answers[u].tags;

    //Image Count
    switch (image) {
      case "img1":
        img1Count++
        break;
      case "img2":
        img2Count++
        break;
      case "img3":
        img3Count++;
        break;
      default:
        break;

    }
    // console.log("each", u, highlighted, image, info, tags)
    // console.log("IMG-count1", img1Count, img2Count, img3Count)
    //Make all selected sentences into an array
    highlighted.forEach(element => allSentences.push(element))

    //Make all keywords into an array
    tags.forEach(element => allTags.push(element))


    // console.log("count", img1Count, img2Count, img3Count)
  }
  // console.log(allTags);
  //Sentence Count
  for (let j = 0, k = allSentences.length; j < k; j++) {
    sCount[allSentences[j]] = (sCount[allSentences[j]] || 0) + 1;
  }


  // console.log(sCount);
  // console.log(Object.keys(sCount))
  let sSort = [];
  for(let [key, val] of Object.entries(sCount)){
    sSort.push([$("#" + key).text(), val])
    // console.log($("#" + key).text(), val)
  }
  // console.log(sSort)

  sSort.sort(function(a, b){
    return b[1] - a[1]
  })

  // console.log(sSort)

  let sDiv = document.getElementById("linesR");
  for(let i=0; i<sSort.length; i++){
    // console.log("(" + sSort[i][1] + ") " + sSort[i][0])
    let result = ("<span class='yellowText'>" + sSort[i][1] + " x " + "</span>"+ "\"" + sSort[i][0].trim() + "\"");
    $("#linesR").append(result + "<br>");
  }


//Image count
// console.log(img1Count, img2Count, img3Count)
  $("#img1Count").append(img1Count + " x");
  $("#img2Count").append(img2Count + " x");
  $("#img3Count").append(img3Count + " x");

  // console.log("IMG", img1Count, img2Count, img3Count)

//Tag count
  for (let j = 0, k = allTags.length; j < k; j++) {
    wCount[allTags[j]] = (wCount[allTags[j]] || 0) + 1;
  }
  console.log(wCount);
  let wSort = [];
  for(let [key, val] of Object.entries(wCount)){
    wSort.push([key, val])
  }

  wSort.sort(function(a, b){
    return b[1] - a[1]
  })

  let wDiv = document.getElementById("tagsR");
  for(let i=0; i<wSort.length; i++){
    $("#tagsR").append("<span class='noWrap'>" + "<span class='yellowText'>" + wSort[i][1] + " x " + "</span>"+ "<span class='oneWord'>" + wSort[i][0].trim() + "</span>" + "</span>")
  }
}

  // console.log("WORDS", wSort)

function errData(err) {
  // console.log("Error");
  // console.log(err);
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
