// Initialize Firebase
var config = {
  apiKey: "AIzaSyBr8nEhlW6CRojcbvOmH8Suz--VE77buPQ",
  authDomain: "fir-test-cecec.firebaseapp.com",
  databaseURL: "https://fir-test-cecec.firebaseio.com",
  projectId: "fir-test-cecec",
  storageBucket: "fir-test-cecec.appspot.com",
  messagingSenderId: "40483326646"
};
firebase.initializeApp(config);
var database = firebase.database();

// Variables
var isPlayer1 = false;
var isPlayer2 = false;
var player;
// Chat function
$("#chat-btn").on("click", function(e) {
  e.preventDefault();
  console.log("working");
  // Grabbed values from text boxes
  var message =
    player +
    $("#chat")
      .val()
      .trim();
  $("#chat").val("");
  if (message !== "") {
    database.ref().push({
      message: message
    });
    $("#chat").val("");
  }
});

$(".player1").on("click", function(e) {
  database.ref().push({
    player1: true
  });
  player = "Player One: ";
  $(".player1").css("display", "none");
  $(".player2").css("display", "none");
  $(".option-pick").css("display", "none");
  $(".hide").css("display", "block");
  $(".pname").text(player + "pick one...");
});

$(".player2").on("click", function(e) {
  database.ref().push({
    player2: true
  });
  player = "Player Two: ";
  $(".player1").css("display", "none");
  $(".player2").css("display", "none");
  $(".option-pick").css("display", "none");
  $(".hide").css("display", "block");
  $(".pname").text(player + "pick one...");
});

// Code for handling the push
database.ref().on(
  "child_added",
  function(snapshot) {
    //Add logic here
    if (snapshot.val().player1) {
      isPlayer1 = true;
      $(".player1").css("display", "none");
    } else if (snapshot.val().player2) {
      isPlayer2 = true;
      $(".player2").css("display", "none");
    } else {
      var $newChat = $("<p>").text(snapshot.val().message);
      $(".chat-scroll").prepend($newChat);
    }
    if (isPlayer1 && isPlayer2) {
      $(".option-pick").text("Game is Full, try again later");
    }
    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
