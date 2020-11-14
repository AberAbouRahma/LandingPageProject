    /**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * AA: (Aber Abou-Rahma): My comments are embedded with prefix AA (My full name initials)
*/

/**
 * Define Global Variables
 * 
*/
var sectionClasses;
var navMenuListItem;
var activeSection;
//AA:When window first loads 
//AA: Store sections visible top and buttom dimentions into 2 aarrays
var sectionsTop  = [];
var sectionsBottom = [];

// AA:encountered a conflict problem for the active section determination and related
// Anchor highlight. It was produced when attempted to click the nav links after 
// "collapsing" sections, there was quite 4-8 pixels shift; So what I though had happened
// That: After the link click, the correct highlight for the active section occured 
// briefly followed by the autoscroll event which highlighted the prvious section link
// this only occured after section(s) collapse; tried different solutions such as setting
// timeout after removing the eventlistener for the window scroll and such also tried
// to set the event to passive=true, but tracking the autoscroll to determine whether it
// by the user or by clicking the link yielded the best result; hopping this is acceptable
var autoScroll = false;

// AA: Usage in hiding the navigation list after 3 seconds delay in scrolling
var isScrolling;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//AA: DRY the scrollTo function used in the actionListeners for both the BackToTop button
// and for the navigational menue to highlight/unhighlight the active/inactive sections
// repectively
var scrollTo =function (event){
    //AA: data-link of the navigation anchor tag holds the id of the section toscroll to
    // use this id to determine the active section and to assign the .active class to it
    // with the anchor click event
    // Releated evetListener registeration is declared on domContentLoad

    
    var navAnchors = document.querySelectorAll("ul li a");
    if (event != null)
    {
     activeSection = document.getElementById(event.target.getAttribute("data-link"));
     
    // AA: Following we get all anchors to do the highlights of the active section
    
    navAnchors.forEach( function (item){

        item.style.color= "";
        item.style.backgroundColor= "";
    });
    for (let sectionClass of sectionClasses)
        {
            if(sectionClass === activeSection)
            {
                activeSection.setAttribute ("class", "active");
                event.target.style.color= "red";
                event.target.style.backgroundColor= "white";
            }
            else
            {
                sectionClass.removeAttribute("class");
            }
        }

       autoScroll = true;
    }
    else if (!autoScroll){
       
        var activeSectionLink ;
        navAnchors.forEach( function (item){
            item.style.color= "";
            item.style.backgroundColor= "";
            if (item.getAttribute("data-link") === activeSection)
            {
                activeSectionLink = item;
                
            }
        });
        activeSection = document.getElementById(activeSection);
      
        for (let sectionClass of sectionClasses)
            {
                if(sectionClass === activeSection)
                {
                    activeSection.setAttribute ("class", "active");
                    activeSectionLink.style.color= "red";
                    activeSectionLink.style.backgroundColor= "white";
                }
                else
                {
                    sectionClass.removeAttribute("class");
                    var [word ,number] = document.getElementById(sectionClass.id).getAttribute("data-nav").split(" ");
                    if (navAnchors[parseInt(number) + 1] != undefined)
                    {
                        navAnchors[parseInt(number) + 1].removeAttribute ("style");
                        // backgroundColor= "";
                        // navAnchors[parseInt(number) + 1].style.color= "";
                    }
                }
            }
           
    }
   
}

// AA: Call back function to handle the section headers click events, in order to 
// collapse/ expands related sections contents,in our case in is the P elements
// within each section.
// Related evetListener registeration is declared on domContentLoaded event
function collapseSection(event)
{


    if (event.target.tagName === "H2" )
    {
        let nextSibling = event.target.nextElementSibling;
        while(nextSibling) {
            if (nextSibling.style.display === "none" ) {
                nextSibling.style.display = "block";
            } else {
                nextSibling.style.display = "none";
            }
            nextSibling = nextSibling.nextElementSibling;
            
        }
    }
    claculateDimentionsForEachSection();
}


var  getLastScrollKnownPosition= function() {
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function() {

		// AA: Hide the navigation list after 3 seconds delay in scrolling
        document.querySelector(".navbar__menu").style.display = "none";

	}, 3000);
    document.querySelector(".navbar__menu").style.display = "block";
    lastKnownScrollPosition = window.scrollY;
    if (activeSection === "" ||activeSection === undefined )
    {
        autoScroll = false; //manual scroll
        for (let i =0 ; i <sectionsTop.length ; i++)
        {
            if (lastKnownScrollPosition >= sectionsTop[i] && 
                lastKnownScrollPosition <= sectionsBottom[i])
                {
                    activeSection = "section"+(i+1);
                    break;
                }
        }
        scrollTo();
    
        return lastKnownScrollPosition;
    }
    else
    {
        activeSection = "";
        autoScroll = false; //manual scroll has no active target section associated with it yet
    }
    
        
  }
  function attachActionListenerForSectionCollapse(attach){
    if (attach)// AA: Add actionListeners
    {
        document.querySelectorAll("section div h2").forEach(function (item){
            item.addEventListener("click", collapseSection,true);});
    }
    else // Detach/remove actionListeners
    {
        document.querySelectorAll("section div h2").forEach(function (item){
            item.removeEventListener("click", collapseSection,true);});
    }
  }
  function claculateDimentionsForEachSection (){
      // AA: Need to recalculate sections tops and bottoms in case of the section collapse 
      // to highlight the visible sections related links accuratly
    sectionsTop.length = 0;
    sectionsBottom.length = 0;
    document.querySelectorAll("section").forEach(function (item){
        var itemVisibility = localToGlobal(item);
        sectionsTop.push(itemVisibility.top);
        sectionsBottom.push(itemVisibility.bottom);
        
    });
  }
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigationList()
{
    for (let sectionClass of sectionClasses)
    {
        // AA: Tried using createDocumentFragment to add the <li> to it
        // but it had performance overhead more than adding the <li> to <ul>
        // Using the data-nav attribute to display the textContent of the navigational anchor
        // Using the sectionClass.id for the anchor href navigation
        navMenuListItem = document.createElement("li");
        navMenuListItem.innerHTML = `
         <a href = "#${sectionClass.id}" class="menu__link" data-link="${sectionClass.id}"> ${sectionClass.getAttribute("data-nav")} </a>`;
         navUlList.innerHTML+=navMenuListItem.outerHTML;
       
    }
    // AA: Adding action listener to links to highlight the active link
    document.querySelectorAll(".menu__link").forEach( function (item){

        item.addEventListener("click", scrollTo);
    });
}

var localToGlobal= function( _el ) {
        var target = _el,
        target_width = target.offsetWidth,
        target_height = target.offsetHeight,
        target_left = target.offsetLeft,
        target_top = target.offsetTop,
        gleft = 0,
        gtop = 0,
        rect = {};
        var visibleArea = function( _parent ) {
            if (!!_parent) {
                gleft += _parent.offsetLeft;
                gtop += _parent.offsetTop;
                visibleArea( _parent.offsetParent );
            } else {
                return rect = {
                top: target.offsetTop + gtop,
                left: target.offsetLeft + gleft,
                bottom: (target.offsetTop + gtop) + target_height,
                right: (target.offsetLeft + gleft) + target_width
                };
            }
        };
     visibleArea( target.offsetParent );
     
     return rect;
}

function defineScrollToTopButton ()
{
    let scrollToTopButton = document.createElement ("Button");
    scrollToTopButton.setAttribute("style", "background-color:white;color:black;");
    scrollToTopButton.innerHTML =  `<a href = "#" style="font-weight:bold; color: black foregroung-color:blue;"> Back To Top </a>`;
    document.body.appendChild(scrollToTopButton);
    scrollToTopButton.addEventListener('click',scrollTo);
}
//AA: Following event listener executes when the DOM is fully parsed and loaded.
document.addEventListener("DOMContentLoaded", function (event) {
    // AA: First add scroll to top button when the user scrolls below the fold 
    // of the page
    defineScrollToTopButton();
    

    // AA: Assigning all the defined sections in the HTML document 
    // to build the navigation menu dynamically
    sectionClasses = document.querySelectorAll("Section");
    navUlList = document.getElementById("navbar__list");

    buildNavigationList();
    
    
 
    attachActionListenerForSectionCollapse(true);
   
    claculateDimentionsForEachSection();

    window.addEventListener('scroll', getLastScrollKnownPosition,  {passive: false});

      
});





// Add class "active" to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
