# Pepper_rss
Reading news with Pepper using Rss fetch plugin

## This is an application to read news using RSS 

### The app using online source rss plugin: https://github.com/sdepold/jquery-rss. Other plugins/ own rss code are compatible with the program with some modification needed in extracting the reading part to send to Pepper.

## Program's flow:
- "Wait" box waits for any switch time between programs so the program can start normally
- "Set language" set the language of Pepper to finnish

### 1. Chosing topic for the news
* "Topic" dialog box: Leads the user to choose which topic he/she want to choose
	+ Ask user if he/she want to read main headlines or other topics
	+ If user chooses others ask if he/she wants to choose topic based on area or subject
	+ Ask user which area/ subject he/she wants
NOTE: User can say back questions if they want to choose again	*
-> output "onStopped" is trigger and returns the user's answer (the user's chosen topic)
-> SECTION 2
* "Show topic" box shows html page that interacts with the dialog (html/topic/index.html)
	+ The page first show the yle news icon
	+ if the user chooses other topics the page shows AREA and SUBJECT image
	+ If user chooses AREA the page shows the list of all available areas 
	+ IF user chooses SUBJECT the page shows the list of all available subject
 NOTE 
	If user say "mene takaisin" (go back) the page show the previous page in this order 
	If user say "lopetta" (stop) the program will stop and come back to "start up" application if it is running. 

### 2. "Topic" dialog output the topic to "Get source" box
"Get source" box gets the url of rss feed based on the topic's name from the database and stores it in the memory.
-> output "onStopped"
	+ input "onDone" of "Topic" dialog: reset the page for next time when the programs loops back to the dialog
	+ "Show" box
### 3. "Show" box: show news page
Show 5 latest news (html/index.html): the page gets the url from the memory and use rss plugin to fetch 5 latest news from the source. It shows the news in the format: title, date, short description, picture. When it finnishs loading all the news it will trigger an event to inform the program that it has finished and returns the all titles of the news.
-> output "onStopped"
-> "Subscribe to Event": get the signal when all news finished loading so the program can continue and receives the title of all news.
-> "Title" box
### 4. "Title" box loops through all title of news, store the the news' index into memory and ask if user want to read that specific piece of news input 

4.1 Start Loop

-> trigger input "Loop" to start the loop 

-> output "out_Loop"

-> "Animated Say Text" says the title of the news and ask if user want to read it.

-> "Confirm" box
* If user agrees
	-> output "output_1"
	-> "Show" box (SECTION 3) input "onNew": get the piece of news' index from memory and show that specific piece of new on the tablet.
	-> output "output" ->
		+ "Subscribe to event": get the signal when the piece of news finished loading so the program can continue and the main text of the news is sent from the website to the program. 
			-> "Say Text" says the news out loud
		+ "Tactile head": Get the signal when the middle head of robot is touch -> input "Stop" of "Say Text" box to stop the robot from speaking
		+ "Subscribe to TextInterrupt": gets the signal when Pepper is stopped speaking by the external button 
	-> "Wait" box: When the robot finishs speaking or forced to stop, the program wait for 1 sec before loop back to "Show" box to show 5 latest piece of news again
* If user do not want to read that piece of new
	+ output "output_2"
	+ input "Loop" to move to the next piece of news
* If user do not want to read this topic anymore and say "Lopettaa" -> 
	+ input "resetLoop" of "title" box to reset counter
	+ Loop back to the beginning of the program (see SECTION 1)		

4.2 End of Loop

When the program finish going through all 5 piece of news, next turn output "onEndList" will be triggered instead of "out_Loop" and counter is set back to 0
-> "Say Text" box informs user that it reaches the last piece of news and ask them if they want to start again

-> "Confirm" box

* If user agrees -> output "output_1" -> start the loop again (see SECTION 4)
* If user do not want to read this topic anymore -> output "output_2" -> loop back to the beginning of the program (see SECTION 1)
