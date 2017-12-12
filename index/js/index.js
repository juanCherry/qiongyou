function setNum(num){
		 // 轮播图
 		var box = document.querySelector('#box');
 		var banner = document.querySelector('#banner');
 		var bannerW = banner.offsetWidth;
 		//得出contentTag的宽度
 		box.style.width = (bannerW * num) + 'px';
 		var index = 0;
 		//进入下一张图片的函数
 		function imgFn() {
 			index++;
 			//判断是否已经到最后一张图
 			if(index > num - 1) {
 				index = 0;
 			}
 			//获取到content标签需要向左移多少
 			var w = index * bannerW * (-1);

			$($('#banner').children().get(4)).children().attr('class','bannerli');
			$($($('#banner').children().get(4)).children().get(index)).attr('class','bannerli1');


 			box.style.left = w + 'px';
 		}
 		//自动轮播图
 		var timer = setInterval(imgFn, 3000);

 		//点击按钮时，会手动的切换

 		//变为上一张图片的函数
 		function imgLast() {
 			index--;
 			if(index < 0) {
 				index = (num - 1);
 			}
 			var W = index * bannerW * (-1);
 			box.style.left = W + 'px';
 		}
 		//清理自动轮播图,过两秒之后再自动轮播
 		function clearTimer() {
 			clearInterval(timer);
 			timer = setInterval(imgFn, 2000);
 		}
 		//左边按钮
 		$('.leftbtn').click(function() {
 				imgLast();
 				clearTimer();
 			})
 			//右边按钮
 		$('.rightbtn').click(function() {
 			clearTimer();
 			imgFn();
 		})
}

$(document).ready(function(){
	$('#firstModule').load('../html/head.html');
	$('.footer').load('../html/foot.html');

$('.sale div div').hover(function() {
	$(this).css('opacity', '.2');
}, function() {
	$(this).css('opacity', '0');
})
$('.jijiuCenter>div>div>div').hover(function() {
	$(this).addClass('active1');
}, function() {
	$(this).removeClass('active1');
})
$('.playCenter>div>div>div').hover(function() {
	$(this).addClass('active1');
}, function() {
	$(this).removeClass('active1');
})
$('.worldCenter>div>div>div').hover(function() {
	$(this).addClass('active1');
}, function() {
	$(this).removeClass('active1');
})


$(document).ready(function() {
	$('#banner ul li').each(function() {
		$('#banner ul li').hover(function() {
			$($(this).children().get(3)).css('display', 'block');
		}, function() {
			$($(this).children().get(3)).css('display', 'none');
		})
	})

})


$('.leftbtn').hover(function() {
	$(this).addClass('btnleft')
}, function() {
	$(this).removeClass('btnleft')
})
$('.rightbtn').hover(function() {
	$(this).addClass('btnright')
}, function() {
	$(this).removeClass('btnright')
})





})
