// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });


// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('source').then(function Get_source(source){

    var x = String(source);

  //Get the articles based on source
  var title_li = [];

  jQuery(function($) {
     $("#rss-feeds").rss(x, {
 	  limit: 5,
          effect: 'slideFastSynced',
          success: function(){
	var div = document.getElementById("rss-feeds");
	var elem = div.getElementsByTagName('p');
	var i;
	for (i = 0; i < elem.length; i++) { 
	    title_li[i] = elem[i].innerHTML;
	}
	ALMemory.raiseEvent('title',title_li);
}

     })
   });

	 
  });

});
