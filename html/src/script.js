// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });


// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('index').then(function Get_index(index){

    var x = String(index);
	   //remove non acsii characters
	   var x2 = x.replace(/[^\x20-\x7E]/g, '');
    var k = 0;
    // Print article index
    document.getElementById("index_no").innerHTML = "artikla: " + x;
	switch(x2) {
    		case 'yksi': case 'ensimminen':
        		k = 0;
        		break;
   		case 'kaksi': case 'toinen':
        		k = 1;
        		break;
		case 'kolme': case 'kolmas':
        		k = 2;
        		break;
		case 'nelj': case 'neljs':
        		k = 3;
        		break;
		case 'viisi': case 'viides':
        		k = 4;
        		break;
    		default:
	}
    //extract the chosen article chosen from the given list
    var list = document.getElementsByTagName("UL")[0];
    var y = list.getElementsByTagName("LI");
    var y2= y[k];
    //extract only the text part of article for Pepper to read
    var y3= y2.getElementsByTagName("p")[0];

    //The article to show on tablet
    var data_show = y2.innerHTML;
    //The reading part that will be sent to Pepper
    var data = y3.innerHTML;

    //sent reading part to Pepper
    ALMemory.raiseEvent("getData",data);
    document.getElementById("demo").innerHTML = data_show;

  });


});
