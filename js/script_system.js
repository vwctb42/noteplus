//OS 체크 불린값 전달 window 폰, window 기반 태블릿pc 에서 테스트가 필요함
function chaked_OS(){
	var device = navigator.userAgent;
	var str = device.split(";");
		str = str[0].split("(");
		str = str[1].split(" ");
	var chkOS = false;
	if(str[0] != "Windows" && str[0] != "Macintosh" && str[0] != "compatible"){
		chkOS = true; // 데스크탑이 아닐 때 true
	}
	return chkOS;
}
//MSIE 9이하 버전체크
function ms_ver(){
	if(navigator.userAgent.match('MSIE')){
		var msie = navigator.userAgent;
		var ms_ver = msie.substr(msie.lastIndexOf('MSIE')).split('MSIE')[1];
			ms_ver = Number(ms_ver.split('.')[0]);
		return ms_ver;
	}else{
		return null;
	}
}

$(document).ready(function(){
	selectDesign(); //셀렉트박스 디자인
	flowlabel(); //인풋 레이블
	cardFlip(); //main card filpped
});
$(window).bind("load resize",function(){
	setTimeout(function(){
	},100);
});
$(window).bind("load resize scroll",function(){ });
$(window).load(function(){ });
$(window).resize(function(){ });
$(window).scroll(function(){ });

//셀렉트박스 디자인
function selectDesign(){
	var select = $("select.info_select");
	select.on('change', function() {
		var select_name = $(this).children('option:selected').text();
		$(this).siblings('label').text(select_name);
	}).trigger('change');
}
//인풋 레이블
function flowlabel(){
	if(!$("label").is(".flow")) return false;
	var o1 = $("label.flow");
	var o2 = $("label.flow").next();
	o1.css({"position":"absolute"});
	o1.bind("click focusin",function(){ $(this).css({"visibility":"hidden"}); });
	o2.bind("click focusin",function(){ $(this).prev().css({"visibility":"hidden"}); });
	o2.bind("focusout",function(){
		if($(this).val() == ""){ $(this).prev().css({"visibility":"visible"}); }
	});
	$.each(o2,function(e){ if($(this).val() != "") $(this).prev().css({"visibility":"hidden"}); });
}

//main card filpped
function cardFlip(){
	var param = $(".first_mainCnts_wrap");
	var btn = param.find("a.button");
	var obj = param.find(".card_item");
	var mouseEvent = "over";

	if(mouseEvent == "" || mouseEvent == "click"){
		btn.unbind().bind(mouseEvent,function(event){
			var t = $(this);
			t.parent().find(obj).toggleClass('flipped');
		});
	}else if(mouseEvent == "over"){
		btn.bind("mouseenter focusin",function(event){
			var t = $(this);
			t.parent().find(obj).addClass('flipped');
		});
		btn.bind("mouseleave focusout",function(event){
			var t = $(this);
			t.parent().find(obj).removeClass('flipped');
		});
	}
}