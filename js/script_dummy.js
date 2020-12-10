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
		

		
	})

	


});

function webcamchatVideos(){
	var activeId = 0;
	activeId == null;
	var $glideVideos = document.getElementById('glideVideos');
	var memberCount = document.getElementById('roomInput').value;  
	for(var i = 0; i < memberCount ; i++){
		$glideVideos.append(getGlideVideoDom(i, activeId));
	}
	var myvideo = document.getElementsByClassName('glideVideo');  
	var handleSuccess = function (stream) {
		for(var i = 0; i < myvideo.length ; i++){
			myvideo[i].srcObject = stream; 
		}
	};
	navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);
	mountGlide();

	
}

function getGlideVideoDom(i,activeId){
	var dom = document.createElement('li');
	dom.className = "glide__slide";
	dom.innerHTML = `<div class="glide_item_wrapper"><video class="glideVideo" playsinline autoplay loop muted></video><span class="name"><span>참가자이름</span></span></div>`;
	return dom;
}

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
			500: {
				perView: 2
			},
		  900: {
				  perView: 4
			  },
		  1200: {
				  perView: 6
			  },
		  3000: {
				  perView: 8
			  }
		  }
	  }).mount();


	  
}
