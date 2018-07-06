var Development8SVG = (function() {
  "use strict"

//DEVELOPMENT8 SCRIPT
  var i = 0;
  var ready = $.Deferred();
  var FirstSection;
  var FirstSectionFile = 'description/day-01-07.html';
  var dev8Parts;
  var dev8Days;
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

  var config = {
        setDefault: true,
        clickHandler: true,
        blingbling: true
  }

  var currentIndex = 0;

  var setNav = function(item){
    item.siblings().removeClass('selected');
    item.addClass('selected');
  }

  var resetDev8 = function(){
    dev8Parts.removeClass('off on');
  }

  var APIOnOffGroup = function(item){
    setOnOff(dev8.indexOf(item));
  }

  var APIOnOffDay = function(item){
    dev8Days.removeClass('active');
    var element = $('#dev8').find('#'+item);
    element.addClass('active');
  }

  var APIsetSprint = function(item){
    $('#sprintNumber').text(item);
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


  var blingbling = function(){
    setTimeout(function () { 
        var element = 'g#'+dev8[i]
        var jSelector = (element  == 'g#day-23' || element  == 'g#day-08' ) ? 'g#day-08-23' : element ;
        var selector = $('#dev8').find(jSelector); 
        selector.children().removeClass('off').addClass('on');
      i++;                     
      if (i < dev8.length) {     
         blingbling();             
      }else{
        ready.resolve();
      }              
    }, 300)
  }

  var init = function(cfg){
    var cfg = $.extend({},config, cfg); 

    $('#dev8DescriptionNav').hide();

    if (cfg.setDefault) {
      ready.done(function(){
        loadFile('description/default.html','default');
      });
    }
    
    FirstSection = $('#day-01-07');
    dev8Parts = $('svg .day, svg .day-group').children();
    dev8Days = $('#day-1, #day-2, #day-3, #day-4, #day-5, #day-6, #day-7, #day-8, #day-9, #day-10, #day-11, '+
      '#day-12, #day-13, #day-14, #day-15, #day-16, #day-17, #day-18, #day-19, #day-20, #day-21, #day-22, #day-23, '+
      '#day-24, #day-25, #day-26, #day-27, #day-28');

    if (cfg.clickHandler) {
      ready.done(function(){
        loadClickHandler();
      });
    }
    
    if (cfg.blingbling) {
      if (i < dev8.length){
        dev8Parts.addClass('off');
        blingbling();
      }
    }else{
      ready.resolve();
    }

    return ready.promise();
  }


  var loadClickHandler = function(){ 
    $('svg g#Dev8').addClass('pointer');
    $('.day-group,.day').on("click", function() { 
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

//refoctor this - add to router
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
              init();
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
        setGroup: APIOnOffGroup,
        setDay: APIOnOffDay,
        setSprint: APIsetSprint
    };

 })();

(function(window) {
  window.APP.Development8SVG = Development8SVG;
})(window);

