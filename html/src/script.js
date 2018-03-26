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

  var index_max = k + 1;
  var index_min = k;
  
  //Get the chosen article: if index is 1 just fetch 1 article else offset the range to fetch to match the chosen article
  if (k != 0) {
  jQuery(function($) {
     $("#rss-feeds").rss("https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-147345", {
 entryTemplate:'<li><a href="{url}">[{date}] {title}</a><br/><img src="https:{teaserImageUrl}"><p id="text">{bodyPlain}</p></li>',
       offsetStart: index_min,
       offsetEnd: index_max,
       effect: 'slideFastSynced'
     })
   });
 } else {
   jQuery(function($) {
      $("#rss-feeds").rss("https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-147345", {
  entryTemplate:'<li><a href="{url}">[{date}] {title}</a><br/><img src="https:{teaserImageUrl}"><p id = "text">{bodyPlain}</p></li>',
        limit: 1,
        effect: 'slideFastSynced'
      })
    });
 }
  });

});

//Subscribe to read event
session.service("ALMemory").then(function (ALMemory) {
  ALMemory.subscriber("read").then(function (subscriber) {
    // subscriber.signal is a signal associated to "FrontTactilTouched"
    subscriber.signal.connect(function (state) {
      if(state == 1) {
        var search = document.getElementById("rss-feeds");
        var data = search.getElementsByTagName("P")[0];
        var read_data = data.innerHTML;
        ALMemory.raiseEvent("getData",read_data);
      }
    });
  });
  });
