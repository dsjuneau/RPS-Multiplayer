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
var isMyChat = false;

// Chat function
$("#chat-btn").click(function(e) {
  e.preventDefault();
  console.log("working");

  // Grabbed values from text boxes
  var message = $("#chat")
    .val()
    .trim();
  $("#chat").val("");
  if (message !== "") {
    database.ref().push({
      message: message
    });
    $("#chat").val("");
  }

  // Code for handling the push
});
database.ref().on(
  "child_added",
  function(snapshot) {
    console.log(snapshot.val());
    var $newChat = $("<p>").text(snapshot.val().message);
    $(".chat-scroll").prepend($newChat);
    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
