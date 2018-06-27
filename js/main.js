//ROUTER SCRIPT

  // getElementById wrapper
  function $id(id) {
    return document.getElementById(id);
  }

  // asyncrhonously fetch the html template partial from the file directory,
  // then set its contents to the html of the parent element
  function loadHTML(url, id) {
    req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
      $id(id).innerHTML = req.responseText;
    };
  }

  // use #! to hash
  var root = null;
  var useHash = true; // Defaults to: false
  var hash = '#!'; // Defaults to: '#'
  var router = new Navigo(root, useHash, hash);

  router.on('CIOT',
     function () {
        loadHTML('./templates/CIOT.html', 'view');
      },
      {
        after: function (params) {
          //handleClientLoad();
          console.log('load CIOT')
        }
      }
    );

    router.on('*',
     function () {
        loadHTML('./templates/default.html', 'view');
      },
      {
        after: function (params) {
          console.log("default loaded");
          window.Development8SVG.init();
        }
      }
    );

    router.resolve();

//--------------------------------------ROUTER SCRIPT END

