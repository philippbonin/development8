var Development8SVG = (function() {
  "use strict"

//DEVELOPMENT8 SCRIPT
  
  
  var FirstSection = $('#day-01-07');
  var FirstSectionFile = 'description/day-01-07.html';
  var dev8Parts = $('svg .day, svg .day-group').children();
  var dev8 = new Array(
      "day-01-07",
      "day-08",
      "day-09-14",
      "day-15",
      "day-16-17",
      "day-18-22",
      "day-23",
      "day-24-25",
      "day-26-27",
      "day-28"
    ); 

  var currentIndex = 0;

  var setNav = function(item){
    item.siblings().removeClass('selected');
    item.addClass('selected');
  }

  var resetDev8 = function(){
    dev8Parts.removeClass('off on');
  }

  var setOnOff = function(item){
    if (item instanceof jQuery){
      var selector = item;
      var id = selector.attr('id');
      currentIndex = (id == 'day-08-23') ? dev8.indexOf('day-08') : dev8.indexOf(id);
    }else{
      currentIndex = item;
      var element = 'g#'+dev8[item]
      var jSelector = (element  == 'g#day-23' || element  == 'g#day-08' ) ? 'g#day-08-23' : element ;
      var selector = $('#dev8').find(jSelector); 
      var id = selector.attr('id');
    }
      dev8Parts.addClass('off');
      selector.children().removeClass('off').addClass('on');

      $('#dev8DescriptionNav').fadeIn();
      setNav($('.nav-question'));
      
      var type = selector.data("type");

      id = (id == undefined) ? 'default' : id;
      var file = 'description/' + id + '.html';

      loadFile(file, type);
  }

  var loadFile = function(file, style){
      $('#dev8Description').empty();
      setLodingIndication();
      $.get( file )
        .done(function( data ) {
            $('#dev8Description').removeClass('default beta decission dev').addClass(style).html(data);
            removeLoadingIndication();
      });
  }

  var setLodingIndication = function() {
    $('#loader').show();
  }

  var removeLoadingIndication = function() {
    $('#loader').hide(); 
  }

  var i = 0;
  var blingbling = function(){
    setTimeout(function () { 
        var element = 'g#'+dev8[i]
        var jSelector = (element  == 'g#day-23' || element  == 'g#day-08' ) ? 'g#day-08-23' : element ;
        var selector = $('#dev8').find(jSelector); 
        selector.children().removeClass('off').addClass('on');
  console.log(selector);
      i++;                     
      if (i < dev8.length) {     
  console.log(i);       
         blingbling();             
      }                 
    }, 300)
  }

  var init = function initailize (){

console.log('initDev8 SVG');

    $('#dev8DescriptionNav').hide();
    loadFile('description/default.html','default');

    if (i < dev8.length){
      dev8Parts.addClass('off');
      blingbling();
    }

console.log('init click handler');
  
    $('.day-group,.day').on("click", function() { 
console.log('click');
        setOnOff($(this));
    });

    $('#next').on("click", function() { 
        var index = (currentIndex == dev8.length-1) ? 0 : currentIndex+1;
        setOnOff(index);
    });

    $('#prev').on("click", function() { 
       var index = (currentIndex == 0) ? 0 : currentIndex-1;  
        setOnOff(index);
    });

    $('.nav').on("click", function() {    
      setNav($(this));
      resetDev8();
      switch($(this).data('nav')) {
          case 'question':
              currentIndex = 0;
              dev8Parts.addClass('off');
              FirstSection.children().removeClass('off').addClass('on');
              loadFile(FirstSectionFile,'dev');
              $('#dev8DescriptionNav').fadeIn();
              break;
          case 'goal':
              initailize();
              break;
           case 'key':
              $('#dev8DescriptionNav').hide();
              loadFile('description/key.html','default');
              break;
          case 'rules':
              $('#dev8DescriptionNav').hide();
              loadFile('description/rules.html','default');
              break;
          default:
      }
      return false; 
    });
  };

  return {
        init: init,
    };

 })();

$("document").ready(function () {
    window.Development8SVG.init();
});