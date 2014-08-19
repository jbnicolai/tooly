// --- begin xhr module
    /**
     * perform a get xhr request for JSON file
     * 
     * @param  {String}   jsonFile  url
     * @param  {callback} success   function to operate on response data
     *                              if the request is successful. If so, success
     *                              takes a single data parameter (the response).
     * @param {Boolean}   async     defaults to true
     */
    getJSON: function(jsonFile, success, async) {
      var req = new XMLHttpRequest();
      req.open('get', jsonFile, arguments.length === 2 ? true : async);
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