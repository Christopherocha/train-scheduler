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
    var trainName = snapshot.val().name;
    var tDestination = snapshot.val().destination;
    var trainStart = snapshot.val().start;
    var tFrequency = snapshot.val().rate;

    var tStartPretty = moment(trainStart, "hh:mm");

    var currentTime = moment();
    var diffTime = moment().diff(moment(tStartPretty), "minutes");
    var tRemainder = diffTime % tFrequency;
    var minTilArrival = parseInt(tFrequency) - parseInt(tRemainder);
    var nextTrain = moment().add(minTilArrival, "m").format("mm");

    var minArrivalPretty = moment(minTilArrival).format("HH:mm");

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + tDestination + "</td><td>" +
    tFrequency + "</td><td>" +  + "</td><td>" + minArrivalPretty + "</td><td>" + nextTrain + "</td></tr>");
  })

  