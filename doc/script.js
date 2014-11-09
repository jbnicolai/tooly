;(function(window, $, undefined) {

  hljs.initHighlightingOnLoad();
  
  window.onload = run;

  var logger = tooly.Logger(0, 'SITE');
  var $buttons, $codes, $cats, $methods;

  function run() {

    $buttons = $('button');
    $codes = $('.code-wrapper');
    initButtonListeners();
    
    $cats = $('.category a');
    $methods = $('.category-methods');
    initMenuListeners();
  }

  // enable hiding and showing of source code 
  // from "show source" button click
  function initButtonListeners() {
    $buttons.els.forEach(function(b, i) {
      b.addEventListener('click', function() {
        var $code = $codes.eq(i);
        if ($code.hasClass('hidden')) {
          $code.removeClass('hidden');
          $(b).html('hide source');
        } else {
          $code.addClass('hidden');
          $(b).html('show source');
        }
      });
    });
  }

  // drop-down method navigation
  function initMenuListeners() {
    $cats.on('click', function() {
      var href = this.href.substring(this.href.lastIndexOf('#')+1);
      var $parent = $(this).parent().parent().parent();
      $('.category-methods', $parent).els.some(function(el) {
        var $el = $(el);
        if (href === $el.attr('data-cat')) {
          $(el).toggleClass('hidden');
          return true;
        }
      });
    });
  }

})(window, tooly.Frankie.bind(this));