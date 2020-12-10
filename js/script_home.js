
$(document).ready(function(){ });
$(window).bind("load resize",function(){
	setTimeout(function(){
	},100);
});
$(window).bind("load resize scroll",function(){ });
$(window).scroll(function(){ });

// 메인비쥬얼
$(window).load(function(){
	var pauseTime = 7500;
	var mainVisual = $('.homeVisual_lst').bxSlider({
		mode: 'fade',
		auto: true,
		autoControls: false,
		controls: false,
		pager: false,
		speed: 750,
		useCSS: true,
		pause: pauseTime
	});
});
$(window).resize(function(){ });