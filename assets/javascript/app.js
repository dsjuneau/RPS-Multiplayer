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
var mePlayer;
var player;
var opponent;
var myHand = "empty";
var theirHand = "empty";

// Game function

function playGame(mine, theirs) {
  console.log(mine, theirs);
  if (mine === theirs) {
    console.log("Tie");
  } else if (
    (mine === "rock" && theirs === "scissors") ||
    (mine === "paper" && theirs === "rock") ||
    (mine === "scissors" && theirs === "paper")
  ) {
    console.log("You Win");
  } else {
    console.log("You Lose");
  }
}

// Chat function
$("#chat-btn").on("click", function(e) {
  e.preventDefault();
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
  database
    .ref()
    .onDisconnect()
    .set(false);
  player = "Player One: ";
  mePlayer = "playerOne";
  opponent = "playerTwo";
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
  database
    .ref()
    .onDisconnect()
    .set(false);
  player = "Player Two: ";
  mePlayer = "playerTwo";
  opponent = "playerOne";
  $(".player1").css("display", "none");
  $(".player2").css("display", "none");
  $(".option-pick").css("display", "none");
  $(".hide").css("display", "block");
  $(".pname").text(player + "pick one...");
});

// Manages choice

$("#rock").on("click", function() {
  $(this).css("background-color", "green");
  $("#paper").css("display", "none");
  $("#scissors").css("display", "none");
  myHand = "rock";
  database.ref().push({
    [mePlayer]: myHand
  });
  if (myHand !== "empty" && theirHand !== "empty") {
    playGame(myHand, theirHand);
  }
});
$("#paper").on("click", function() {
  $(this).css("background-color", "green");
  $("#rock").css("display", "none");
  $("#scissors").css("display", "none");
  myHand = "paper";
  database.ref().push({
    [mePlayer]: myHand
  });
  if (myHand !== "empty" && theirHand !== "empty") {
    playGame(myHand, theirHand);
  }
});

$("#scissors").on("click", function() {
  $(this).css("background-color", "green");
  $("#paper").css("display", "none");
  $("#rock").css("display", "none");
  myHand = "scissors";
  database.ref().push({
    [mePlayer]: myHand
  });
  if (myHand !== "empty" && theirHand !== "empty") {
    playGame(myHand, theirHand);
  }
});

// Code runs through database on load and when a child is added
// On load, it updates the
database.ref().on(
  "child_added",
  function(snapshot) {
    if (snapshot.val()[opponent] !== undefined) {
      theirHand = snapshot.val()[opponent];
      if (myHand !== "empty" && theirHand !== "empty") {
        playGame(myHand, theirHand);
      }
    }

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
