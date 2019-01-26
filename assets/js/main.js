//javascript 
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCmWrfwnP4x3s5xQ-q4H1ciTczvmQEUANA",
        authDomain: "wilsey-train-scheduler.firebaseapp.com",
        databaseURL: "https://wilsey-train-scheduler.firebaseio.com",
        projectId: "wilsey-train-scheduler",
        storageBucket: "wilsey-train-scheduler.appspot.com",
        messagingSenderId: "971221561929"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        //grabbing the data from the user input
        name = $("#train-name").val().trim();
        destination = $("#destination-name").val().trim();
        firstTrain = $("#first-train-time").val().trim();
        frequency = $("#frequency").val().trim();

        //code to push to the database
        database.ref().push({
            name_d: name,
            destination_d: destination,
            firstTrain_d: firstTrain,
            frequency_d: frequency,
        })

        // alert("New Train Successfully Added!");

        //Clear out the text boxes
        $("#train-name").val("");
        $("#destination-name").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");

    });

    database.ref().on("child_added", function (snapshot) {
       
        var sv = snapshot.val();

        name = sv.name_d;
        destination = sv.destination_d;
        firstTrain = sv.firstTrain_d;
        frequency = sv.frequency_d;

        console.log(sv);

        //Current Time
        var currentTime = moment();
        console.log(currentTime);

        //Set current first train arrival back one year so we can use it as a future time
        var firstTrainConverted = moment(firstTrain , "HH:mm A").subtract(1, "years");
        console.log(firstTrainConverted);

        //Difference between now and the original first train time
        var diff = moment().diff(moment(firstTrainConverted) , "minutes");
        var timeLeft = diff % frequency;

        //How long until the next train
        var timeToNextTrain = frequency - timeLeft;
        var nextArrival = moment().add(timeToNextTrain , "m").format("HH:mm");

        //Update HTML 
        $("#table-main").append("<tr><td>" + sv.name_d + "</td><td>" + sv.destination_d + "</td><td>" + sv.frequency_d + "</td><td>" + nextArrival + "</td><td>" + timeToNextTrain  + "</td></tr>");

        //Error handling 
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});