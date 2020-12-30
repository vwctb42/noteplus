$(document).ready(function(){
	$('.btn_screen_mode').bind("click",function(event){
		if($('.ic_lymod_basic').attr('class') == 'ic_lymod_basic'){
			$('.ic_lymod_basic').attr('class','ic_lymod_tile');
			$('.webcamchat').removeClass('active');
			$('.btn_screen_mode em').html('격자보기');
			roomVideos();
		}else{
			$('.ic_lymod_tile').attr('class','ic_lymod_basic');
			$('.btn_screen_mode em').html('목록보기');
			$('.webcamchat').addClass('active');
			roomVideos(1);
			webcamchatVideos();
		}
	})

	$('.btn_active_mark').bind("click",function(event){
		console.log($('.deactive'));
		if($('.webcamchat.deactive').length === 0){
			$('.webcamchat').addClass('deactive');
			$('.btn_active_mark .close').removeClass('active');
			$('.btn_active_mark .open').addClass('active');
		}else{
			$('.webcamchat').removeClass('deactive');
			$('.btn_active_mark .close').addClass('active');
			$('.btn_active_mark .open').removeClass('active');
		}
	});


	roomVideos();

});

function webcamchatVideos(){
	var activeId = 3;
	var isGlide = isNeedGlide();
	var $Videos = document.getElementById('glideVideos');
	if(isGlide){
		document.getElementById('webcamchat_wrap').style.cssText="display:none";
		document.getElementById('glide').style.cssText="display:block";
		document.getElementById('notePageWrap').style.cssText="width:90%;";
	}else{
		document.getElementById('webcamchat_wrap').style.cssText="display:flex";
		document.getElementById('glide').style.cssText="display:none";
		document.getElementById('notePageWrap').style.cssText="width:auto; display:flex";
		$Videos = document.getElementById('webcamchat_wrap');
	}
	var memberCount = document.getElementById('roomInput').value;  
	for(var i = 0; i < memberCount ; i++){
		if(isGlide){
			$Videos.append(getGlideVideoDom(i, activeId));
		}else{
			$Videos.append(getVideoWrapDom(i, activeId));
		}		
	}
	var myvideo = document.getElementsByClassName('glideVideo');  
	var handleSuccess = function (stream) {
		for(var i = 0; i < myvideo.length ; i++){
			myvideo[i].srcObject = stream; 
		}
	};
	navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);
	
	if(isGlide){
		mountGlide();
	}
}

//glide 라이브러리 사용 시
function getGlideVideoDom(i,activeId){
	var dom = document.createElement('li');
	dom.className = "glide__slide";
	if(activeId != i){
		dom.innerHTML = `<div class="glide_item_wrapper"><div class="glide_item_wrapper_inner"><div class="videoOffuserName">참가자이름</div><video class="glideVideo" playsinline autoplay loop muted></video><span class="name"><i class="xi-microphone-off"></i><span>참가자이름<span></span></div></div>`;
	}else{
		dom.innerHTML = `<div class="glide_item_wrapper expand videoOff"><div class="videoOffuserName">참가자이름</div><span class="name"><i class="xi-microphone-off"></i><span><span></span></div>`;
	}
	return dom;
}

//glide 사용 X, 중앙 정렬
function getVideoWrapDom(i,activeId){
	var dom = document.createElement('div');
	dom.className = "mentor";
	dom.innerHTML = `<div class="glide_item_wrapper"><video class="glideVideo" playsinline autoplay loop muted></video><span class="name"><i class="xi-microphone-off"></i><span>참가자이름<span></span></div>`;
	return dom;
}

//화면비에 따라 glide 라이브러리 적용 유무
function isNeedGlide(){
	var memberCount = document.getElementById('roomInput').value;  
	if(window.innerWidth >= 8400 && memberCount <= 6){
		return false;
	}
	if(window.innerWidth >= 6000 && memberCount <= 8){
		return false;
	}
	if(window.innerWidth >= 4200 && memberCount <= 6){
		return false;
	}
	if(window.innerWidth >= 3900 && memberCount <= 9){
		return false;
	}
	if(window.innerWidth >= 2400 && memberCount <= 8){
		return false;
	}
	if(window.innerWidth >= 2200 && memberCount <= 10){
		return false;
	}
	if(window.innerWidth >= 1600 && memberCount <= 9){
		return false;
	}
	if(window.innerWidth >= 1300 && memberCount <= 8){
		return false;
	}
	if(window.innerWidth >= 1100 && memberCount <= 6){
		return false;
	}
	if(window.innerWidth >= 980 && memberCount <= 5){
		return false;
	}
	if(window.innerWidth >= 660 && memberCount <= 4){
		return false;
	}
	if(window.innerWidth >= 550 && memberCount <= 3){
		return false;
	}
	
	if(window.innerWidth >= 400 && memberCount <= 2){
		return false;
	}

	if(window.innerWidth >= 300 && memberCount <= 1){
		return false;
	}
	return true;
}

//glidejs init
function mountGlide(){
	new Glide('#glide', {
		type:'slider',
		rewind:false,
		bound:true,
		gap:5,
		startAt:0,
		breakpoints: {
			300: {
				perView: 1
			},
			400: {
				perView: 2
			},
			550: {
				perView: 3
			},
		   	660: {
				perView: 4
			},
			980: {
				perView: 5
			},
		  	1100: {
				perView: 6
			  },
			1300: {
				perView: 8
			},
			1600: {
				perView: 9
			},	
		  	2200: {
				perView: 12
			},
			2400: {
				perView: 8
			},
			3900: {
				perView: 9
			},
			4200: {
				perView: 6,
				gap:20,
			},
			6000: {
				perView: 7,
				gap:20,
			},
		  	8400: {
				perView: 6,
				gap:20,
			}
		  }
	  }).mount();
}


/*
메인화면 분할 sample code
*/

var $screen = document.getElementsByClassName('webcamchatfullScreen');
function getVideoDom(i,memberCount,activeId){
	var dom = document.createElement('div');
	var WH = getWH(memberCount);
	dom.style.cssText = "width:"+WH.width+"%;height:"+WH.height+"%;";

	if(i == activeId-2){
		dom.className = "screenWrapper expand";
	}else{
		dom.className = "screenWrapper";
	}
	if(memberCount == 1){
		$screen[0].className = $screen[0].className+" singleVideo";
		dom.innerHTML = `<div class="screenBox"><video class="myvideo" playsinline autoplay loop></video></div>`;
	}else{
		$screen[0].className = $screen[0].className.split('singleVideo')[0];
		if(i != activeId){
			dom.innerHTML = `<div class="screenBox" ><div class="videoOffuserName">참가자이름</div><video class="myvideo" playsinline autoplay loop></video><div class="userNameSpace"><i class="xi-microphone-off"></i><span>참가자이름<span></div></div>`;
		}else{
			dom.innerHTML = `<div class="screenBox  videoOff" ><div class="videoOffuserName">참가자이름</div><div class="userNameSpace"><i class="xi-microphone-off"></i></div></div>`;
		}
	}
	return dom;
}

function roomVideos(num){
	var activeId = 3;
	var memberCount = document.getElementById('roomInput').value;  
	if(num){
		memberCount = num;
	}
	while($screen[0].hasChildNodes()){
		$screen[0].removeChild( $screen[0].firstChild ); 
	}
	for(var i = 0; i < memberCount ; i++){
		$screen[0].append(getVideoDom(i, memberCount, activeId));
	}
	var myvideo = document.getElementsByClassName('myvideo');  
	var handleSuccess = function (stream) {
		for(var i = 0; i < myvideo.length ; i++){
			myvideo[i].srcObject = stream; 
		}
	};
	navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);
}

//참가자 수에 따라서 화면 비율 조정
function getWH(key){
	var w = 100;
	var h = 100;
	switch (Number(key)) {
		case 1:
			break;
		case 2:
			w = 50;
			break;
		case 3:
		case 4:
			w = 50;
			h = 50;
			break;
		case 5:
		case 6:
			w = 33.3;
			h = 50;
			break;
		case 7:
		case 8:
		case 9:
			w = 33.3;
			h = 33.3;
			break;
		case 10:
		case 11:
		case 12:
			w = 25;
			h = 33.3;
			break;
		case 13:
		case 14:
		case 15:
		case 16:
			w = 25;
			h = 25;
			break;
		case 17:
		case 18:
		case 19:
		case 20:
			w = 20;
			h = 25;
			break;
		case 21:
		case 22:
		case 23:
		case 24:
			w = 20;
			h = 20;
			break;
		default:
			w = 16.6;
			h = 20;
			break;
	}
	return {width:w,height:h};
}
