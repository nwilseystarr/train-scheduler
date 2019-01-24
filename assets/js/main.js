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

        alert("New Train Successfully Added!");

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
        console.log(sv.name_d);
        console.log(sv.destination_d);
        console.log(sv.firstTrain_d);
        console.log(sv.frequency_d);

        //update HTML 
        // $("#train-name-disp").append(sv.name_d);
        // $("#destination-disp").append(sv.destination_d);
        // $("#frequency-disp").append(sv.frequency_d);
        // <td id="next-arrival-disp"></td>
        // <td id="minutes-away-disp"></td>
        $("#table-main").append("<tr><td>" + sv.name_d + "</td><td>" + sv.destination_d + "</td><td>" + sv.frequency_d + "</td></tr>");

        // + nextArrival + "</td><td>" + minsAway + "</td></tr>");

        //error handling 
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    })

});