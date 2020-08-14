/**
 * 제   목 : slide-image를위한 JQuery 
 * 작성자 : 조재청
 * 연락처 : nick2615@nver.com	
 */
//적용할 효과선택
//1.슬라이드, 2.fadeOut
var effect=2;//
//적용할 이미지 목록
var img_url=[
	"/images/img1.jpg",
	"/images/img2.jpg",
	"/images/img3.jpg"]

//이미지 넓이,높이 설정
var viewHeight=520;
var viewWidth=1920;
var images_wrap; //이미지 묶음 ul태그
var images;
/*////////////////////////////////////////////////////*/
/*///////li태그에 background-image 적용//////////////////*/
/*////////////////////////////////////////////////////*/
function setImages(){
	images=$("#visual .visual-area .images-wrap li");
	
	for(var i=0; i < img_url.length; i++){
		$(images[i])
			.css("width", viewWidth)
			.css("height", viewHeight)
			.css("background","url("+img_url[i]+") no-repeat center");
	}
	
	//.visual-area css 적용
	var visual_area=$("#visual .visual-area");
	visual_area
			.css("position", "relative")
			.css("width", viewWidth)
			.css("height", viewHeight)
			.css("overflow", "hidden")
			.css("margin", "0 auto");
}

/*////////////////////////////////////////////////////*/
/*///////li태그를 가로방향으로 길게 배치//////////////////*/
/*////////////////////////////////////////////////////*/
function setSlideImages(){
	setImages();
	
	//.images-wrap css 적용
	images_wrap=$("#visual .visual-area .images-wrap");
	images_wrap
			.css("width", viewWidth * img_url.length)
			.css("display", "flex")
			.css("position", "absolute")
			.css("top", 0)
			.css("left", 0);
}

/*////////////////////////////////////////////////////*/
/*/////////다음이미지 슬라이드/////////////////////////////*/
/*////////////////////////////////////////////////////*/
var speed=1000;//이동하는시간
var delay=5000;//지연시간
function next(){
	images_wrap.stop().animate({left : -viewWidth}, speed, function(){
		var firstLi=$("#visual .visual-area .images-wrap li:first-child");
		var lastLi=$("#visual .visual-area .images-wrap li:last-child");
		//첫번째 이미지를--> 마지막이미지 다음으로 이동
		//firstLi.insertAfter(lastLi);
		
		//마직이미지 다음에 첫번째이미지 배치
		lastLi.after(firstLi);
		
		//left 0으로수정
		images_wrap.css("left", 0);
	});
	//재귀처리(자기자신 호출)
	setTimeout(next, delay);
}
/*////////////////////////////////////////////////////*/
/*/////////setFadeOut///////////////////////////*/
/*////////////////////////////////////////////////////*/

function setFadeOut(){
	setImages();
	images_wrap=$("#visual .visual-area .images-wrap");
	images_wrap.css("position", "relative");
	
	images=$("#visual .visual-area .images-wrap li");
	images.css("position", "absolute").css("top", 0).css("left", 0);
		
	var images=$("#visual .visual-area .images-wrap li");
	var z_idx=img_url.length;
	for(var i=0; i < img_url.length; i++){
		$(images[i]).css("z-index", z_idx);
		$(images[i]).attr("value", z_idx--);
	}
	
}
/*////////////////////////////////////////////////////*/
/*/////////setFadeOut 실행///////////////////////////*/
/*////////////////////////////////////////////////////*/
function fadeOut(){
	var target=$("#visual .visual-area .images-wrap li.first");
	//first.fadeOut(2000);
	target.stop().animate({opacity:0}, speed, function(){
		
		//모든 이미지 z-index를 변경
		for(var i=0; i < img_url.length; i++){
			var val= $(images[i]).val();
			
			var idx= (val+1)%4;
			if(idx==0){idx++;}
			$(images[i]).css("z-index", idx);
			$(images[i]).attr("value", idx);
			
			if(idx == img_url.length){
				$(images[i]).addClass("first");
			}
		}
		//target 변경
		target.removeClass("first");
		target.css("opacity", 1);
	});
	
	setTimeout(fadeOut, delay);
}

/*////////////////////////////////////////////////////*/
/*/////////JQuery-ready///////////////////////////////*/
/*////////////////////////////////////////////////////*/
$(function(){
	if(effect==1){
		setSlideImages();
		setTimeout(next, delay);
	}else if(effect==2){
		setFadeOut();
		setTimeout(fadeOut, delay);
	}
});







