
$(document).ready(function(){
	svcTerms_view(); //서비스약관 뷰

	// 시간타이머
	setInterval(function(){dpTime();},1000);
	function dpTime(){
		var now = new Date();
		hours = now.getHours();
		minutes = now.getMinutes();
		seconds = now.getSeconds();
		if (hours > 12){hours -= 12;ampm = "오후 ";}else{ampm = "오전 ";}
		if (hours < 10){hours = "0" + hours;}
		if (minutes < 10){minutes = "0" + minutes;}
		if (seconds < 10){seconds = "0" + seconds;}
		document.getElementById("dpTime").innerHTML = ampm + hours + ":" + minutes + ":" + seconds;
	}

});
$(window).bind("load resize",function(){
	setTimeout(function(){},300);
});
$(window).bind("load resize scroll",function(){ });
$(window).load(function(){ });
$(window).resize(function(){ });
$(window).scroll(function(){ });


//모달윈도우 기본
function modalPopup(){
	var $param = $("#smartPop_overlay");
	var $obj = $("#smartPop");
	var btn_colse = $obj.find(".modal_close > a");
	var duration = 600;

	if($param.css("display") == "none" && $obj.css("display") == "none"){
		$param.stop(true,true).fadeIn(duration);
		$obj.stop(true,true).fadeIn(duration);
	}else{
		$param.stop(true,false).fadeOut(duration/2);
		$obj.stop(true,false).fadeOut(duration/2);
	}
	btn_colse.bind("click",function(event){
		var t = $(this);
		$param.stop(true,false).fadeOut(duration/2);
		$obj.stop(true,false).fadeOut(duration/2);
	});
}
//서비스약관 뷰
function svcTerms_view(){
	var param = $(".joinForm");
	var btn = param.find(".checkbox a");
	btn.bind("click",function(event){
		modalPopup();
	});
}