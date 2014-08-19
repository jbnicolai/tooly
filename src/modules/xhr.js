// --- begin xhr module
    /**
     * perform a get xhr request for JSON file
     * 
     * @param  {String}   jsonFile  url
     * @param  {callback} success  function to operate on response data
     *                             if the request is successful. If so, success
     *                             takes a single data parameter (the response).
     */
    getJSON: function(jsonFile, success) {
      var req = new XMLHttpRequest();
      req.open('get', jsonFile, true);
      req.reponseType = 'json';
      req.onreadystatechange = function() {
        if (req.readyState == 4) { // done
          if (req.status == 200) {
            success(req.response);
          }
        }
      };
      req.send();
    },
// --- end xhr module