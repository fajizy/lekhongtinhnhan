
$q1 = 0;
$q2 = 0;
$q3 = 0;
$q4 = 0;
$sh=0;
$sw=0;
$photo = '';
$desktopslower = 0;
$faceimg = '';
$hasvoucher = false;

$resizelock = true;
$finalgametime = 30000;
$finalmin = 400;
$finalmax = 700;
$playedbefore = 0;
$totalvoucher = 0;
$choice='';
$playcount = 0;
$ingame = false;
var date = new Date();
	var days = 30;
	date.setTime(date.getTime() + (days * 24 *3600 * 1000));



$(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");
		$("html, body").animate({ scrollTop: 0 }, 20);
	setTimeout(function(){$("html, body").animate({ scrollTop: 0 }, 20);},300);
	setTimeout(function(){$("html, body").animate({ scrollTop: 0 }, 20);},500);
	});

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

$isipad = navigator.userAgent.match(/iPad/i);

$ismobile = detectmob();

let root = document.documentElement;

root.addEventListener("mousemove", e => {
	if ($ismobile || !$ingame) return;
  root.style.setProperty('--mouse-x', e.clientX + "px");
  root.style.setProperty('--mouse-y', e.clientY + "px");
});

$('html').on("click","body", function(){
	if ($ismobile || !$ingame) return;
	$('.hammer').addClass('bonkhammer');
	
	setTimeout(function(){ 
		$('.hammer').removeClass('bonkhammer');
	}, 50);
});

function setscreensize()
{
	if (!$resizelock) return;
	$sh = $(window).height();
	$sw = $(window).width();


	$('.container').css('width', $sw);
	$('.container').css('height', $sh);

	
	//$('.gradient-bg').css('height', $sh*1.5);

	if (!$('.game').hasClass('game-collapse'))
	{
		$('.game').css('width', $sw);
		$('.game').css('height', $sh);
	}

	$('.icecream-frame').css('height', $sh-100);
	$('.icecream-frame').css('width', $sw);
	$('.amulet-photo').css('height', $sh-100);
	$('.amulet-photo').css('width', $sw);
	
	$del = 0;
	if ($sw<360) $del=40;
	$('.upload-demo-wrap').css('width', $sw-30);
	$('.upload-demo-wrap').css('height', $sw-80-$del);

	if (!$ismobile||$isipad)
	{
		$('.upload-demo-wrap').css('width', 450);
		$('.upload-demo-wrap').css('height', 450);
		if ($isipad&&$sw>900)
		{
			$('.upload-demo-wrap').css('width', 400);
			$('.upload-demo-wrap').css('height', 320);
		}
		if (!$isipad&&$sh<700)
		{
			$('.upload-demo-wrap').css('width', 400);
			$('.upload-demo-wrap').css('height', 320);
		}
		$desktopslower = 0.2;
	}

	if (!$ismobile && $sh<700)
		{
			$('.photo-frame').css('width', '350px');
			$('.photo-frame').css('height', '350px');
			$('.background .title').css('width','auto');
			$('.background .title').css('height','15%');
		}

	if (!$ismobile) 
		{
			$('.croppie-container .cr-slider-wrap').css('display','block');
			$('.croppie-container').css('margin-bottom','60px');
			$('.emoji').css('display','none');
		}

	if ($isipad)
	{

	}
}	

function barcoderender(text, codeformat, id)
{
	JsBarcode(id, text, {
	  format: codeformat,
	  lineColor: "#941315",
	  width: 2,
	  height: 40,
	  displayValue: true
	});
	
	/*
	var settings = {
            output: 'svg'
            
        };

	$(id).barcode(
	'12345678901234',// Value barcode (dependent on the type of barcode)
	codeformat, // type (string)
	settings
	);
	*/
	$(id).css('width', '100%');
	$(id).css('height', 'auto');
	$(id).css('padding', '5px 5px 0 5px ');
}

function winornot()
{
	var w = Math.floor(Math.random() * 2);
	if (w==0) return false;
	return true;
}

function endwhackgame()
{	
		$ingame = false;
		$('.hammer').css('display','none');
		$('.hammer').css('top:','-1000px');
		//$hasvoucher = true;
		$resizelock = false;
		$('.upandcrop').css('display','none');

		//$hasvoucher = winornot();
		endscreensetup();

		console.log('whack end');
		$('body').css('overflow-x','hidden');
		$('body').css('overflow','auto');

		$('.background').addClass('middle-footer');

		$scrollallow = true;
		var minus = 0;
		if ($sw<350) minus = 30;
		if ($sw>700) minus = -200;
		if ($sw>=1024) minus = -150;
		if ($sw>=1024&&$isipad) minus = -100;
		if ($sh<700&&!$isipad&&!$ismobile) minus = -100;

		$('.game').css({
			'width': 250-minus,
			'height': 250-minus,
			'border-radius': 250,
			'top': '45%',
			'overflow': 'hidden'
		});
		$('.game').addClass('game-collapse');

		TweenMax.to($('.dead'), 0.5, {top:"55%", ease: Power3.easeOut,  delay: 0.1});
		$('.dead-bubble').css('display', 'block');
		TweenMax.from($('.dead-bubble'), 0.5, {top:"32%", left:"73%", opacity: 0, ease: Power4.easeOut,  delay: 1});
		
		$('.game .wrapper').css('display','none');
		$('.quiz-ending').css('display','none');
		$('.quiz-ending-sub').css('display','none');		
		
		$('.photo-ending-screen .voucher .subtitle').html('MINISTOP táº·ng báº¡n 01 cĂ¢y kem tÆ°Æ¡i<br>ngon hÆ¡n ngÆ°á»i yĂªu cÅ©^^!');
		
		TweenMax.to($('.background .urgo'), 0.2, {bottom:"10%", opacity:"0", ease: Power1.easeIn});
		$('.photo-ending-screen').css('display','block');
		$('.photo-ending-screen').css('padding-top',$sh*0.75+'px');
		$('.photo-ending-screen').addClass('game-end');


		//barcoderender('123456789012','UPC','#barcode2');
		TweenMax.from($('.photo-ending-screen'), .5+$desktopslower, {paddingTop: $sh*1.2,opacity: "0", ease: Power3.easeOut, delay: 0.3});
		//TweenMax.to($('.quiz-04'), 0.5, {left:"0%", ease: Power3.easeOut});

}

function endscreensetup()
{	

    setTimeout(function(){
    	if ($(window).scrollTop()<=50)
    	{
    		$('.scr-btn').css('display','block');
    		TweenMax.from($('.scr-btn'), 0.6, {bottom:"50px", opacity: 0, ease: Power1.easeOut});
    	}
    }, 3000);
	
}


$( document ).ready(function() {


	setscreensize();
	winornot();
	

	if ($.cookie('totalvoucher')==undefined) 
	{
		$.cookie('totalvoucher',0 , { expires: date });
	}
	else
	{
		$totalvoucher = $.cookie('totalvoucher');
		console.log('total voucher: '+$totalvoucher);
	}

	//////
	//alert('total voucher: '+$.cookie('totalvoucher'));
	/////

	$("html, body").animate({ scrollTop: 0 }, 20);
	setTimeout(function(){$("html, body").animate({ scrollTop: 0 }, 20);},300);
	setTimeout(function(){$("html, body").animate({ scrollTop: 0 }, 20);},500);
	$('.quiz-01 .answer').click(function(){
		TweenMax.to($('.quiz-01'), 0.2, {left:"-100%", ease: Power1.easeIn});
		TweenMax.to($('.quiz-02'), 0.5, {left:"0%", ease: Power3.easeOut});
		$photo+=$(this).attr('answerval');
		console.log($q1);
	});


	$('.start').click(function(){
		//$.removeCookie('playedbefore');
		if ($.cookie('playedbefore')==undefined) 
		{
			console.log('first time playing');
			$playedbefore = 0; //0 mean no, a new player
			$.cookie('playedbefore',1 , { expires: date });
		}
		else 
		{
			$playedbefore = 1; //1 means yes, have played b4
			$playcount = parseInt($.cookie('playedbefore'))+1;
			$.cookie('playedbefore',$playcount, { expires: date });
			console.log('total played: '+ $.cookie('playedbefore'));
		}

		$.ajax({
                url: 'luckycode.php',
                type: 'POST',
                dataType: 'text',
                data: {
                    
                    type: 2,
                    playedbefore: $playedbefore

                    
                }
            }).done(function($ketqua) {
            	if ($ketqua==1) console.log('successfully added play count');

            });

		TweenMax.to($('.home-screen'), 0.3, {top:"-150%", opacity: "0", ease: Power4.easeIn});
		$('.quiz').css("display","block");
		TweenMax.from($('.quiz'), 0.6, {top:"200%", opacity: "0", ease: Power2.easeOut});

		$('.background').css("display","block");
		TweenMax.from($('.background'), 0.6, {top:"200%", opacity: "0", ease: Power2.easeOut});
	});

	$('.ex').click(function(){
		TweenMax.to($('.quiz'), 0.3+$desktopslower, {left:"-100%", opacity: "0", ease: Power4.easeIn});
		$('.upandcrop').css("display","block");
		TweenMax.from($('.upandcrop'), 0.6+$desktopslower, {left:"200%", opacity: "0", ease: Power2.easeOut});
		$choice='game';

		$('.upandcrop').append('<style>.upandcrop::before { content: ""; position: absolute; top: -9999px; left: -9999px; background: url("img/hole-cover.png"), url("img/hole.png"), url("img/hit-1.png"), url("img/normal.png"); display: none; }</style>');
	});


	$('.zin').click(function(){
		TweenMax.to($('.quiz-02'), 0.2, {left:"-100%",opacity:"0", ease: Power1.easeIn});
		TweenMax.to($('.zin-answer'), 0.8, {left:"50%", ease: Elastic.easeOut.config(1, 0.6), delay:0.1});
		TweenMax.to($('.omnomnom'), 0.2, {rotation :-1, ease: Power1.easeOut, delay: 0.2});
		TweenMax.to($('.omnomnom'), 0.25, {rotation :2, ease: Power1.easeInOut, delay: 0.4});
		TweenMax.to($('.omnomnom'), 0.2, {rotation :0, ease: Power1.easeOut, delay: 0.65});


		setTimeout(function(){
			TweenMax.to($('.zin-answer'), 0.3, {top:"23%", ease: Power1.easeOut});
			$('.zin-answer').addClass('small-urgo');
			$('.quiz-03').css("display","block");
			TweenMax.from($('.quiz-03'), 0.3, {top:"70%", opacity: 0, ease: Power2.easeOut, delay: 0.05});

		}, 3000);
		//TweenMax.to($('.zin-answer'), 0.2, {left:"53%", ease: Power4.easeInOut, delay:0.5});
		//TweenMax.to($('.zin-answer'), 0.1, {left:"50%", ease: Power4.easeInOut, delay:0.7});

		//$('.upandcrop').css("display","block");
		//TweenMax.from($('.upandcrop'), 0.6, {left:"200%", opacity: "0", ease: Power2.easeOut});
	});

	$('.quiz-03 .answer').click(function(){
		TweenMax.to($('.quiz-03'), 0.2, {left:"-100%", ease: Power1.easeIn});
		TweenMax.to($('.quiz-04'), 0.5, {left:"0%", ease: Power3.easeOut});
		$photo+=$(this).attr('answerval');
	});


	$('.quiz-04 .answer').click(function(){	
		$photo+=$(this).attr('answerval');
		$photourl='img/crushphoto/'+$photo+(Math.floor(Math.random() * 2)+1)+'.jpg';

		$('.quiz').append('<style>.quiz:before{content: "";position: absolute;top: -9999px;left: -9999px;background: url('+$photourl+')}</style>');

		TweenMax.to($('.quiz-04'), 0.3, {top:"100%", opacity: 0, ease: Power1.easeOut});
		$('.end-quiz').css('display','block');
		TweenMax.from($('.end-quiz'), 0.4, {top:"20%", opacity: 0, ease: Power3.easeOut});
		TweenMax.to($('.zin-answer'), 0.4, {top:"45%", ease: Power1.easeOut});
	});

	$('.end-quiz').click(function(){

		//$hasvoucher = winornot();
		$choice = 'quiz';
		endscreensetup();


		$resizelock = false;
		$('body').css('overflow-x','hidden');
		$('body').css('overflow','auto');

		$('.background').addClass('middle-footer');

		$scrollallow = true;


		TweenMax.to($('.quiz'), 0.2, {top:"-100%", opacity:"0", ease: Power1.easeIn});
		$('.photo-screen').css('display','block');
		$('.game-ending').css('display','none');
		$('.crush').attr('src',$photourl);
		if ($('.crush').width() > $('.crush').height()) 
		{
			$('.crush').css('width', 'auto');
			$('.crush').css('height', '100%');
		}


		TweenMax.from($('.photo-frame'), 0.4+$desktopslower, {top:"120%", rotation: 20, ease: Power2.easeOut, delay: 0.05});
		
		
		
		TweenMax.to($('.background .urgo'), 0.2, {bottom:"10%", opacity:"0", ease: Power1.easeIn});
		$('.photo-ending-screen').css('display','block');
		$('.photo-ending-screen').css('padding-top',$sh*0.85+'px');


		//barcoderender('123456789012','UPC','#barcode2');
		TweenMax.from($('.photo-ending-screen'), .4+$desktopslower, {paddingTop: $sh*1.5,opacity: "0", ease: Power2.easeOut, delay: 0.2});
		//TweenMax.to($('.quiz-04'), 0.5, {left:"0%", ease: Power3.easeOut});

	});

	$(".replay").click(function(){
            location.reload(true);
        });

	$('.scr-btn').click(function(){
		

		$('html, body').animate({ scrollTop: $('.photo-ending-screen .separator').offset().top+30}, 1000);
	});
	
	$( window ).scroll(function() {
		var offset = $('.amulet-photo').offset();
		if ($hasvoucher) offset = $('.icecream-frame').offset();
  		if ($photo != '' && $(window).scrollTop() >=(offset.top-$sh/1.5) &&!$('.icecream-frame').hasClass('appeared'))
  		{
  			TweenMax.to($('.scr-btn'), 0.4, {bottom:"50px", opacity: 0, ease: Power1.easeIn, onComplete:function(){$('.scr-btn').css('display','none');} });
  			
    		
  			console.log('appeared');
  			$('.icecream-frame').addClass('appeared');

  			$('.icecream-frame img').css('display','block');
  			$('.amulet-photo img').css('display','block');
  			TweenMax.from($('.kem'), .6, {bottom: '-60%', ease: Power2.easeOut});
  			TweenMax.from($('.buayeu'), .6, {top: '90%', ease: Power2.easeOut});
  			TweenMax.from($('.kem-title'), .5, {top: '120%', ease: Power2.easeOut});
  			TweenMax.from($('.bua-2'), .8, {top: '100%', ease: Power2.easeOut, delay: 0.2});
  			TweenMax.from($('.bua-1'), .5, {top: '100%', ease: Power2.easeOut});

  		} 
	});

	$( window ).resize(function() {
		setscreensize();
	});

	$('.share').click(function(){
        FB.ui({
			  method: 'share',
			  href: 'https://fajizy.github.io/lekhongtinhnhanh',
			  
			  quote: 'Lễ không tình nhân!',
			  
			  hashtag: '#lekhongtinhnhan'
			  
			}, function(response) {
            if (response && !response.error_code) {
            } else {
              console.log('Error while posting.');
            }
          });
    });

});