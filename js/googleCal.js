var Development8googleCal = (function() {
  "use strict"


//GOOGLE CAL INTEGRATION
  var CLIENT_ID = '545719211521-fn3vbeh14don8lqbvj5osaj78b24851r.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyCeP3J-NySJre0p4VOjibCL_4xNvpvjibE';
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  var d = new Date();
  var currentDay =  d.getFullYear() +'-'+ (d.getMonth() + 1) +'-'+ d.getDate();
  var deferred = $.Deferred();

  var getCurrentDev8Day = function(){
    handleClientLoad();
    return deferred.promise();
  }

  var handleClientLoad = function() {
    gapi.load('client:auth2', {
      callback: function() {
        initClient()
      }
    });
  }

  var initClient = function() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      execute()
    })
  }

  var execute = function(timeMax, timeMin) {
    return gapi.client.calendar.events.list({
      "calendarId": "e6tmn99nd2d7ts9vuvv7virf04@group.calendar.google.com",
      "alwaysIncludeEmail": "false",
      "timeMax": currentDay+"T23:59:00Z",
      "timeMin": currentDay+"T00:00:01Z",
    }).then(function(response) {
       if(typeof response.result.items[0] !== 'undefined') {
        var result = { "summary":response.result.items[0].summary, "details": $.parseJSON(response.result.items[0].description)};
        deferred.resolve(result);
      }
    });
  }


//--------------------------------------GOOGLE CAL INTEGRATION END
return {
  getCurrentDev8Day: getCurrentDev8Day
};

})();

(function(window) {
  window.APP.Development8googleCal = Development8googleCal;
})(window);