var Development8Router = (function() {
  "use strict"

  var loadHTML = function(file, id){
      var loading = $.Deferred();
       $.get( file )
        .done(function( data ) {
            $('#'+id).html(data);
            loading.resolve();
      });
      return loading.promise();  
    }

  var init = function(){
    // use #! to hash
    var root = null;
    var useHash = true; // Defaults to: false
    var hash = '#!'; // Defaults to: '#'
    var router = new Navigo(root, useHash, hash);

    var ciot = function(){
      var loadingView = loadHTML('./templates/CIOT.html', 'view');
          loadingView.done(function(){
            var loadingDev8 = loadHTML('./templates/dev8.html', 'dev8');
            loadingDev8.done(function(){
            window.APP.Development8SVG.init({setDefault: false,clickHandler: false,blingbling: true}).done(function(){
                  window.APP.Development8googleCal.getCurrentDev8Day().done(function(currentDev8Day){
                     window.APP.Development8SVG.setGroup(currentDev8Day.summary);
                     window.APP.Development8SVG.setDay(currentDev8Day.description);
                  });
              });
            });
          });
    }

    router.on('ciot',
       function () {
          ciot();
        });
      router.on('CIOT',
       function () {
          ciot();
        });
      router.on('*',
       function () {
          var loadingView = loadHTML('./templates/default.html', 'view');

          loadingView.done(function(){
            var loadingDev8 = loadHTML('./templates/dev8.html', 'dev8');
            loadingDev8.done(function(){
              window.APP.Development8SVG.init();
            });
          }); 
        });

      router.resolve();
    }

//--------------------------------------ROUTER SCRIPT END
  return {
        init: init,
    };

})();

(function(window) {
  window.APP.Development8Router = Development8Router;
})(window);


