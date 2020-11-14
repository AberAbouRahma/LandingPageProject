# LandingPageProject
 Web Development Professional Nanodegree Program - First Project
 
 The project demonstrates the understanding of the lessons introduced in the programs by complying with the project
 requirements and applying most, if not all the lessons learned and the knowledge gaied through corresponding lessons:
 
 The main requirements was to build dynamically using the JS the following:
   - Navigational Links to land on page sections
   - Highlight the clicked link to the user 
   - When the user scrolls the window to different section, the user should be able to view the active section in 
   the view port highlighted (used windows scroll eventActionListener)
   - When the user reaches below to the fold or the end of the page, he should be able to scroll back to the top 
   using a Scroll to top button to scroll to the top of the landing page
   - A time out should occure in case of the delay (used 3 seconds) in scrolling and the associated call back function
   should hide the navigational menue until user resumes scrolling, then when idle for 3 seconds it disappears and so on..
   - The user should be able to collapse the sections on the window when click on the section (I used the header then set the 
   sebling elements to display none so that the header remains visible for the user to re-click and expand if he/she wishes)
   
  Challenge: Thanks for the template and the hints, I tried as much as I can in my development strategy not to miss/modify the styles in the
  css style sheet (except for adding probably one style directive, nor I modified the HTML more than added 2 more sections for testing.
  The serious challenge for me was: encountered a conflict problem for the active section determination and related
Anchor highlight. It was produced when attempted to click the nav links after 
"collapsing" sections, there was quite 4-8 pixels shift; So what I though had happened
That: After the link click, the correct highlight for the active section occured 
briefly followed by the autoscroll event which highlighted the prvious section link
this only occured after section(s) collapse; tried different solutions such as setting
timeout after removing the eventlistener for the window scroll and such also tried
to set the event to passive=true, but tracking the autoscroll to determine whether it
by the user or by clicking the link yielded the best result; hopping this is acceptable
  
  Opinion: I think that using the template resembles real life maintenance for a project that is why if not adding I almpst kept the 
  modification for the exsisting code to the minimum. All work is in the JS script file and I think this is the whole point of the 
  project: to be able to manipulate the DOM programatically.
