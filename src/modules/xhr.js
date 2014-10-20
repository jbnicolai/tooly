//    +-----+
//    | XHR |
//    +-----+

/**
 * perform a `GET` xhr request for a JSON file and operate on a `JSON.parse`'d with
 * a supplied `success` callback.
 * 
 * @param  {String}   jsonFile  url
 * @param  {callback} success   function to operate on response data
 *                              if the request is successful. If so, success
 *                              takes a single data parameter (the response).
 * @param {Boolean}   async     defaults to true
 *
 * @memberOf tooly
 * @category XHR
 * @static
 */
getJSON: function(jsonFile, success, async) {
  tooly.get(jsonFile, 'json', success, async);
},

/**
 * perform a `GET` xhr request
 * 
 * @param  {String}   url       url to resource
 * @param  {String}   respType  the request responseType
 * @param  {callback} success   function to operate on response data
 *                              if the request is successful. If so, success
 *                              takes a single data parameter (the response).
 * @param {Boolean}   async     defaults to true
 *
 * @memberOf tooly
 * @category XHR
 * @static
 */
get: function(url, respType, success, async) {
  var req = new XMLHttpRequest();
  req.open('get', url, (arguments.length === 3) ? true : async);
  req.reponseType = respType;
  req.onload = function() {
    if (req.readyState == 4) { // done
      if (req.status == 200) {
        success(respType === 'json' ? JSON.parse(req.response) : req.response);
      }
    }
  };
  req.send();
},
