$(document).ready(function(){
  
  //toggle the sub nav on products

  var navElement = $("nav");
  
  
  /*
  $("#conditions-nav").on("click", function(e){
    
    navElement.toggleClass("show-sub-nav");
    navElement.toggleClass("show-sub-nav-narrow");
    
    e.preventDefault();
    
  });

  //stop the toggle code above if the individual link has been clicked
  $("#conditions-nav li").on("click", function(e){
      
    e.stopPropagation();
    
  });
  */

  $(".nav-with-sub-nav").on("click", function(e){

    e.preventDefault();

    var subNavId = $(this).attr("id");


    //if this sub nav is the current sub nav then toggle
    if ( $(this).hasClass("current") ) {
        navElement.toggleClass("show-sub-nav");
        navElement.toggleClass("show-sub-nav-narrow");
        return false;
    }

    //if there is another sub nav with current then switch it off - do not toggle - but make this current
    if ( navElement.find(".current").length ) {
      navElement.find(".current").removeClass("current");
      $(this).addClass("current");

      //set the class of the nav ul - used to fix a margin in CSS
      //remove all the other classes first
      navElement.find(" > ul").removeClass();
      navElement.find(" > ul").addClass(subNavId);

      navElement.addClass("show-sub-nav");
      navElement.addClass("show-sub-nav-narrow");
      return false;
    }

    //otherwise show the nav
    navElement.addClass("show-sub-nav");
    navElement.addClass("show-sub-nav-narrow");
    $(this).addClass("current");

    navElement.find(" > ul").addClass(subNavId);
    
    
  });

  //stop the toggle code above if the individual link has been clicked
  $(".nav-with-sub-nav li").on("click", function(e){
      
    e.stopPropagation();
    
  });


  //toggle the main navigation
  $(".menu-handle").on("click", function(e){
    $("nav").toggleClass("show-nav");
    
    //hide the conditions sub-nav
    navElement.removeClass("show-sub-nav-narrow");
    navElement.removeClass("show-sub-nav");

  });


  //timeline works courtesy of slick library - thanks slick

  //switch off the anchor links on the nav
  $(".timeslots-nav a").on("click",function(e){
    e.preventDefault();
  });

  $(".timeslots").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    fade: true,
    asNavFor: '.timeslots-nav'
  });

  $(".timeslots-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.timeslots',
    infinite: false,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          centerMode: false
        },
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      }
    ]
  });


});