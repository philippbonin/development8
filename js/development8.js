$( document ).ready(function() {

  // Client ID and API key from the Developer Console
      var CLIENT_ID = '545719211521-fn3vbeh14don8lqbvj5osaj78b24851r.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCeP3J-NySJre0p4VOjibCL_4xNvpvjibE';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          execute()
        });
      }

  var d = new Date();
  var currentDay =  d.getFullYear() +'-'+ (d.getMonth() + 1) +'-'+ d.getDate();
  var currentDev8Day;
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute(timeMax, timeMin) {
    return gapi.client.calendar.events.list({
      "calendarId": "e6tmn99nd2d7ts9vuvv7virf04@group.calendar.google.com",
      "alwaysIncludeEmail": "false",
      "timeMax": currentDay+"T23:59:00Z",
      "timeMin": currentDay+"T00:00:01Z",
    }).then(function(response) {
                currentDev8Day = response.result.items[0].summary;
                setOnOff(dev8.indexOf(currentDev8Day));
              },
              function(err) { console.error("Execute error", err); 
    });
  }


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

  function setNav(item){
    item.siblings().removeClass('selected');
    item.addClass('selected');
  }

  function resetDev8(){
    dev8Parts.removeClass('off on');
  }

  function setOnOff(item){
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

  function loadFile(file, style){
      $('#dev8Description').empty();
      setLodingIndication();
      $.get( file )
        .done(function( data ) {
            $('#dev8Description').removeClass('default beta decission dev').addClass(style).html(data);
            removeLoadingIndication();
      });
  }

  function setLodingIndication () {
    $('#loader').show();
  }

  function removeLoadingIndication () {
    $('#loader').hide(); 
  }

  var i = 0;
  function blingbling(){
    setTimeout(function () { 
        var element = 'g#'+dev8[i]
        var jSelector = (element  == 'g#day-23' || element  == 'g#day-08' ) ? 'g#day-08-23' : element ;
        var selector = $('#dev8').find(jSelector); 
        selector.children().removeClass('off').addClass('on');
      i++;                     
      if (i < dev8.length) {            
         blingbling();             
      }else{
        handleClientLoad();
      }                   
    }, 300)
  }

  function initailize (){
    $('#dev8DescriptionNav').hide();
    loadFile('description/default.html','default');

    if (i < dev8.length){
      dev8Parts.addClass('off');
      blingbling();
    }
  }

  initailize();

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
  
});
