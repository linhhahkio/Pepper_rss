// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });

function show_Audio(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"audio");
});
}

function show_Image(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"image");
});
}

function subscribeToEvent(event,myFunction){
  session.service("ALMemory").then(function (ALMemory) {
  ALMemory.subscriber(event).then(function (subscriber) {
    // subscriber.signal is a signal associated to "FrontTactilTouched"
    subscriber.signal.connect(function (state) {
      if(state == 1) {myFunction();}
    });
  });
  });
};

session.subscribeToEvent = subscribeToEvent;

// Subscribe to "rss/others" event
session.subscribeToEvent("rss/others", function() {
	var yle = document.getElementById("yle");
	var category = document.getElementById("category");
	var area = document.getElementById("area");
	var subject = document.getElementById("subject");
	//Hide yle icon
	yle.style.display = "none";
        // Hide category
        category.style.display = "block";
	// Show subject
        subject.style.display = "none";
	// Hide area
        area.style.display = "none";
});

// Subscribe to "rss/area" event
session.subscribeToEvent("rss/area", function() {
	var category = document.getElementById("category");
	var area = document.getElementById("area");

	// Hide category
        category.style.display = "none";
	// Show area
        area.style.display = "block";
});

// Subscribe to "rss/subject" event
session.subscribeToEvent("rss/subject", function() {
	var category = document.getElementById("category");
	var subject = document.getElementById("subject");

        // Hide category
        category.style.display = "none";
	// Show subject
        subject.style.display = "block";

});

// Subscribe to "rss/reset" event
session.subscribeToEvent("rss/reset", function() {
	var yle = document.getElementById("yle");
	var area = document.getElementById("area");
	var subject = document.getElementById("subject");
	// show yle
	yle.style.display = "block";
	// Show subject
        subject.style.display = "none";
	// Hide area
        area.style.display = "none";
});

session.subscribeToEvent("back", function() {
      window.history.back();
});
