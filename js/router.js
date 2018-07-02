var Development8Router = (function() {
  "use strict"

//ROUTER SCRIPT

  // getElementById wrapper
  var  $id = function(id) {
    return document.getElementById(id);
  }

  // asyncrhonously fetch the html template partial from the file directory,
  // then set its contents to the html of the parent element
  var  loadHTML = function(url, id) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
      $id(id).innerHTML = req.responseText;
    };
  }

  var init = function(){
    // use #! to hash
    var root = null;
    var useHash = true; // Defaults to: false
    var hash = '#!'; // Defaults to: '#'
    var router = new Navigo(root, useHash, hash);

    router.on('CIOT',
       function () {
          loadHTML('./templates/CIOT.html', 'view');
          loadHTML('./templates/dev8.html', 'dev8');
        },
        {
          after: function (params) {
            var config = {
               clickHandler: false,
               blingbling: true
            }
            window.APP.Development8SVG.init(config).done(function(){
                window.APP.Development8googleCal.getCurrentDev8Day().done(function(currentDev8Day){
                   window.APP.Development8SVG.set(currentDev8Day);
                });
            });
          }
        }
      );

      router.on('*',
       function () {
          loadHTML('./templates/default.html', 'view');
          loadHTML('./templates/dev8.html', 'dev8');
        },
        {
          after: function (params) {
            window.APP.Development8SVG.init();
          }
        }
      );

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


