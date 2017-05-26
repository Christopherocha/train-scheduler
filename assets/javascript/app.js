  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAdJQsKTewcxi-nQ_xT2T_tUOuzDHWA-tc",
    authDomain: "train-scheduler-7a27e.firebaseapp.com",
    databaseURL: "https://train-scheduler-7a27e.firebaseio.com",
    projectId: "train-scheduler-7a27e",
    storageBucket: "train-scheduler-7a27e.appspot.com",
    messagingSenderId: "1045000964846"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function() {
      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var firstTrain = $("#time-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      var newTrain = {
          name: trainName,
          destination: trainDestination,
          start: firstTrain,
          rate: frequency
      }

      database.ref().push(newTrain);

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("");
  })

  database.ref().on("child_added", function(snapshot, prevChildKey) {
    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var tDestination = snapshot.val().destination;
    var trainStart = snapshot.val().start;
    var tFrequency = snapshot.val().rate;

    // Prettify the employee start
    var tStartPretty = moment(trainStart, "hh:mm");

    // Calculate the time until the next train
    var currentTime = moment();
    var diffTime = moment().diff(moment(tStartPretty), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minTilArrival = tFrequency - tRemainder;
    var nextTrain = moment().add(minTilArrival, "minutes").format("mm");

    var minArrivalPretty = moment.unix(minTilArrival).format("mm");

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + tDestination + "</td><td>" +
    tFrequency + "</td><td>" +  + "</td><td>" + minArrivalPretty + "</td><td>" + nextTrain + "</td></tr>");
  })