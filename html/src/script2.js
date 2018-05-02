// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });


// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('article_info').then(function Get_info(article_info){

    var source = String(article_info[0]);
	   //remove non acsii characters
    var k = article_info[1];
    // Print article index

  var index_max = k + 1;
  var index_min = k;
  
  //Get the chosen article: if index is 1 just fetch 1 article else offset the range to fetch to match the chosen article
  if (k != 0) {
  jQuery(function($) {
     $("#rss-feeds").rss(source, {
 entryTemplate:'<li><a href="{url}">[{date}] {title}</a><br/><img src="https:{teaserImageUrl}"><p id="text">{bodyPlain}</p></li>',
       offsetStart: index_min,
       offsetEnd: index_max,
       effect: 'slideFastSynced',
       success: function(){
	var search = document.getElementById("rss-feeds");
        var data = search.getElementsByTagName("P")[0];
        var read_data = data.innerHTML;
        ALMemory.raiseEvent("getData",read_data);
}
     })
   });
 } else {
   jQuery(function($) {
      $("#rss-feeds").rss(source, {
  entryTemplate:'<li><a href="{url}">[{date}] {title}</a><br/><img src="https:{teaserImageUrl}"><p id = "text">{bodyPlain}</p></li>',
        limit: 1,
        effect: 'slideFastSynced',
	success: function(){
		var search = document.getElementById("rss-feeds");
		var data = search.getElementsByTagName("P")[0];
		var read_data = data.innerHTML;
		ALMemory.raiseEvent("getData",read_data);
	}
      })
    });
 }
  });

});


