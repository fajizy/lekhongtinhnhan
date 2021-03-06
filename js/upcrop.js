var UpCrop = (function() {

	function output(node) {
		var existing = $('#result .croppie-result');
		if (existing.length > 0) {
			existing[0].parentNode.replaceChild(node, existing[0]);
		}
		else {
			$('#result')[0].appendChild(node);
		}
	}

	function popupResult(result) {
		var html;
		if (result.html) {
			html = result.html;
		}
		if (result.src) {
			//html = '<img src="' + result.src + '" />';
			//$('.output').html(html);
			//alert(html)
			$faceimg = result.src;
			//console.log($faceimg);
			$('.game').css('display','block');
			$ingame = true;
			if (!$ismobile) $('.hammer').css('display','block');
			setgamescreensize();
 
			setstage();
			setgamesize();
			wam = new WhackAMole($('#btn-start'), $('.hitbox'), $('#score-out'), $finalgametime, $finalmin, $finalmax);
			wam.init();
			}
		
		
	}

	function demoUpload() {
		var $uploadCrop;

		function readFile(input) {
 			if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            
	            reader.onload = function (e) {
	            	$('.upfile').css('display','none');
	            	$('.upload-demo-wrap').css('display','block');

					//$('.upload-demo').addClass('ready');
	            	$uploadCrop.croppie('bind', {
	            		url: e.target.result
	            	}).then(function(){
	            		console.log('jQuery bind complete');
	            	});
	            	
	            }
	            
	            reader.readAsDataURL(input.files[0]);
	        }
	        else {
		        swal("Sorry - you're browser doesn't support the FileReader API");
		    }
		}

		$uploadCrop = $('#upload-demo').croppie({
			viewport: {
				width: 80,
				height: 100,
				type: 'circle'
			},
			enableExif: true
		});

		$('#upload').on('change', function () { readFile(this); });
		$('.play').on('click', function (ev) {
			$uploadCrop.croppie('result', {
				type: 'canvas',
				size: 'viewport',
				enableExif: true,
				showZoomer: true,
	            
	            enableOrientation: true
			}).then(function (resp) {
				popupResult({
					src: resp
				});
			});
		});
	}


	function bindNavigation () {
		var $html = $('html');
		$('nav a').on('click', function (ev) {
			var lnk = $(ev.currentTarget),
				href = lnk.attr('href'),
				targetTop = $('a[name=' + href.substring(1) + ']').offset().top;

			$html.animate({ scrollTop: targetTop });
			ev.preventDefault();
		});
	}

	function init() {
		bindNavigation();
		//demoMain();
		//demoBasic();	
		//demoVanilla();	
		//demoResizer();
		demoUpload();
		//demoHidden();
	}

	return {
		init: init
	};
})();


// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
(function () {
  var method;
  var noop = function () { };
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
 
  while (length--) {
    method = methods[length];
 
    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
  }
 
 
  if (Function.prototype.bind) {
    window.log = Function.prototype.bind.call(console.log, console);
  }
  else {
    window.log = function() { 
      Function.prototype.apply.call(console.log, console, arguments);
    };
  }
})();