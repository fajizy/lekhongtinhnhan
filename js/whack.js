$numrow = 3;
$boxw=200;
$boxh=220;

$stage = [
	[0, 0, 1],
	[2, 0, -1, 0],
	[0, 0, 1]
];



$img='normal.png';
$hitimg='hit1.png';


function setgamescreensize()
{
	$sh = $(window).height();
	$sw = $(window).width();

	$('.wrapper').css('width', $sw);
	$('.wrapper').css('height', $sh);


	

}	

function setgamesize()
{
	$maxcol = 0;
	for ($i=0; $i<$stage.length; $i++)
	{
		if ($stage[$i].length > $maxcol) $maxcol = $stage[$i].length;
	}

	$tmpw = $sw;
	if ($sw > $sh && $sw>1200) $sw=1200;

	$ratioh = 0.8;
	$ratiow = 0.9;

	if ($sh>$sw) {
		$ratioh = 0.85;//0.9 
		$ratiow = 1.2;
	}	

	$esh = $sh*$ratioh/$stage.length;
	$esw = $sw*$ratiow/1.3/$maxcol;

	

	if ($esw > $esh/1.1) $esw = $esh/1.1;
	$esh = $esw*1.1;


	if ($esw < $boxw)
	{
		$boxw = $esw;
		$boxh = $esh;
	}
		$('.run-away').css('width', $boxw*1.05);
		$('.run-away').css('height', $boxw*1.05*1.28);


		$('.box2').css('width', $boxw);
		$('.box2').css('height', $boxh);
		$('.box2').css('margin', '0 '+$boxw/8+'px');
		$('.sparse .box2').css('margin', '0 '+$boxw/4+'px');

	$('.game-container').css('height', $boxh*$stage.length );
	$('.game-container').css('top', $sh*0.53-$boxh*$stage.length*.5 );

	$('.ec').css('top', $boxw*0.13);

	$sw = $tmpw;
}

function setstage()
{
	if ($sh>$sw) $stage = [
	[0, -1, 0],
	[2, 0 ],
	[0, 1, 0]
	
	];
	$count = 1;
	$output="";
	for ($i=0; $i<$stage.length; $i++)
	{
		$p = '';
		if ($stage[$i][0]==2) $p = 'sparse';
		$output+='<div class="row '+$p+'">';

		for ($j=1; $j<$stage[$i].length; $j++)
		{
			$p = '';
			if ($stage[$i][$j]==1) $p='down';
			if ($stage[$i][$j]==-1) $p='up';

			$output+='<div class="box2 '+$p+'">';
			$output+='<img src="img/hole.png"  class="hole">';
			$output+='<img src="'+$faceimg+'" class="face face-'+$count+'">';			
			$output+='<img src="img/normal.png" class="mole mole-'+$count+'" mol="'+$count+'" id="mole-3">';
			$output+='<img src="img/hole-cover.png" class="hole-cover">';
			$output+='<img src="img/sweat.png" class="sweat-l hide">';
			$output+='<img src="img/sweat.png" class="sweat-r hide">';
			$output+='<div class="sfx hide">';
			$output+='<img src="img/star.png" class="star">';
			$output+='<img src="img/ec.png" class="ec">';
			$output+='</div><div class="hitbox"></div></div>';
			$count++;
		}

		$output+='</div>';
	}
	$('.game-container').html($output);
}

//TweenMax.to($('.mole-1'), 0.3, {bottom:"5px", ease: Power4.easeOut});




class WhackAMole {
	
	// Properties used to initialize our
	// Whack-a-Mole Game
	constructor(startButton, moles, scoreOut, gameTimeLength, peepTimeMin, peepTimeMax){		
		// Game HTML Elements
		this.btnStart = startButton;
		this.moles = moles;
		this.scoreOut = scoreOut;
		
		this.img='normal.png';
		this.hitimg='hit1.png';

		// Game Images
		
		
		// Game Parameters
		this.gameTime = gameTimeLength;
		this.minPeepTime = peepTimeMin;
		this.maxPeepTime = peepTimeMax;
		this.numOfMoles = this.moles.length;
		
		// Game State Variables
		this.prevMoleNumber = null;
		this.timeUp = false;
		this.score = 0;
		this.gameTimer = null;
		this.peepTimer = null;		
	}
	
	init(){
		this.score = 0;
		//this.scoreOut.text(this.score);
		this.timeUp = false;
		this.prevMoleNumber = null;
		this.btnStart.text('â™â™  Ă©c');


		this.peep();


		this.gameTimer = setTimeout(() => {
			console.log('Game Over...');
			//this.btnStart.text('â–¶ Ă©c ');
			endwhackgame();
			this.timeUp = true;
		}, this.gameTime);		


	}
	
	stop(){
		console.log('Game Stopped...');
		this.btnStart.text('â–¶ Ă©c');
		this.timeUp = true;
		this.moles.removeClass('up');
		clearInterval(this.peepTimer);
		clearInterval(this.gameTimer);
	}
	
	peep(){
		const time = this._randomTime(this.minPeepTime, this.maxPeepTime);
    	const mole = this._randomMole(this.moles);
    	mole.removeClass('bonked');
    	
    	$img = 'img/normal.png';

		

		mole.siblings('.mole').attr('src', $img);

    	//mole.addClass('up');
    	TweenMax.to(mole, 0.3, {bottom:"1.2%", ease: Power4.easeOut}); //up
    	TweenMax.to(mole.siblings('.mole'), 0.3, {bottom:"1.2%", ease: Power4.easeOut}); //up
    	TweenMax.to(mole.siblings('.face'), 0.3, {top:"17%", ease: Power4.easeOut}); //up


    	this.peepTimer = setTimeout(() => {


      		//mole.removeClass('up');
      		TweenMax.to(mole, 0.3, {bottom:"-100%", ease: Power4.easeIn}); //down

      		TweenMax.to(mole.siblings('.mole'), 0.3, {bottom:"-100%", ease: Power4.easeIn}); //down
      		TweenMax.to(mole.siblings('.face'), 0.3, {top:"116%", ease: Power4.easeIn}); //down

      		//TweenMax.to( mole, 0.3, {bottom:"-100%", ease: Power4.easeIn} );

      		if(this.timeUp === false){
				    this.peep();
			    } 
    	}, time+200);
	}
	



	bonk(mole) {

		this.score++;
		mole.addClass('bonked');
		var n = mole.attr('mol');
		//TweenMax.killTweensOf('.face-'+n);
		mole.siblings('.mole').attr('src', 'img/hit1.png');
		mole.siblings('.face').css('margin-top','20%');
		

		mole.siblings('.sfx').removeClass('hide');
		mole.siblings('.sweat-l').removeClass('hide');
		mole.siblings('.sweat-r').removeClass('hide');

		$('.score-ec').css('display','inline-block');
		TweenMax.to( $('.score-ec'), 0.1, {scale: 1.4, ease: Power2.easeOut, onComplete:function(){
			TweenMax.to( $('.score-ec'), 0, {scale: 1, ease: Power4.easeIn,});
		}});

		TweenMax.from(mole.siblings('.sfx'), .3, {rotation:-30, width:"5%", left:"75%",  ease: Power4.easeOut});
		TweenMax.from(mole.siblings('.sweat-l'), .2, { left:"10%", top:"50%",  ease: Power4.easeOut});
		TweenMax.from(mole.siblings('.sweat-r'), .2, { right:"10%", top:"50%",  ease: Power4.easeOut});

		setTimeout(function(){ 
			TweenMax.to( mole, 0.3, {bottom:"-100%", ease: Power4.easeIn} );
			TweenMax.to( mole.siblings('.mole'), 0.3, {bottom:"-100%", ease: Power4.easeIn} );
			TweenMax.to(mole.siblings('.face'), 0.3, {top:"116%", ease: Power4.easeIn}); //down
		}, 100);

		setTimeout(function(){ 
			mole.siblings('.sfx').addClass('hide');
		}, 500);
		setTimeout(function(){ 
			mole.siblings('.sweat-l').addClass('hide');
			mole.siblings('.sweat-r').addClass('hide');
		}, 150);
		setTimeout(function(){ 

			
			//mole.removeClass('bonked');
			mole.siblings('.face').css('margin-top','0%');

		}, 400);


		

		   
	
    this.scoreOut.text('x'+this.score);
	}
	
	// Utility functions
	
	// generate a random time to determine how long
	// the moles stay up
	_randomTime(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}
	
	// randomly selects one of the moles to display
	_randomMole(moles) {
    	const idx = Math.floor(Math.random() * this.numOfMoles);

    	const mole = moles.eq(idx);
    	if(idx === this.prevMoleNumber ) {
      		console.log('...same mole...try again...');
      		return this._randomMole(moles);
    	}
		  this.prevMoleNumber = idx;
    	return mole;
	}
	
}

// Get a new instance of the Whack A Mole
// class
// Parameters:
// 1. Start Button
// 2. Mole Image
// 3. Score out
// 4. Game Time Length (ms)
// 5. Peep Time Min (ms)
// 6. Peep Time Max (ms)
wam = new WhackAMole($('#btn-start'), $('.hitbox'), $('#score-out'), 30000, 300, 500);

// Game Event Handlers
wam.btnStart.click(function(){
	
	if(wam.btnStart.text() === 'â–¶ Ă©c'){
		wam.init();
	}else{
		wam.stop();
	}
	
});




$( document ).ready(function() {
    
	
});

$('.game-container').on("click",".hitbox", function(){
	
	//$totalclick++;
	//$('.wrapper h1').html($totalclick);

	if($(this).hasClass('bonked')){
		return;
	}
	
	wam.bonk( $(this) );
	
});

wam.moles.click(function(){
	
});