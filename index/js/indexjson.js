$(document).ready(function(){
	var bannerli = $('#banner li');
	$.getJSON('http://127.0.0.1:8888/getMenu', function(data) {
		//获取json数据，将其加入标签中
		for(var i = 0; i < bannerli.length; i++) {
			$($(bannerli[i]).children().get(1)).text(data[i].title);
			for(var j = 0; j < data[i].mainCity.length; j++) {
				var a = $('<a></a>').text(data[i].mainCity[j]);
				a.addClass('bannera');
				$($(bannerli[i]).children().get(2)).append(a);
			}

			if(data[i].moreCity.length / 2 < 1){
				$(bannerli[i]).children().get(3).style.width = (1 * 300)+'px';
			}else if(data[i].moreCity.length / 2 >= 1){
				$(bannerli[i]).children().get(3).style.width = (2 * 300)+'px';
			}

			//将title动态加入标签中
			for(var k = 0 ; k < data[i].moreCity.length; k++){
				var numleft;
				var numtop;
				if(k==0){
						numleft = '30px';
						numtop = '0px';
				}else if(k==1){
						numleft = '300px';
						numtop = '0px';
				}else if(k==2){
						numleft = '30px';
						numtop = '200px';
				}
				var div = $('<div></div>').addClass('divcss').css({
					'left':numleft,
					'top':numtop
				});
				var p = $('<p></p>').addClass('p1');
				p.text(data[i].moreCity[k].cityName);
				var hr = $('<hr>').addClass('hr1');
				//创建每个小div里面的a标签
				var p1 = $('<p></p>').addClass('p2');
				var aCityName = $('<a></a>');
				for(var m = 0 ; m < data[i].moreCity[k].items.length; m++){
					if(i==5){
						var a = $('<a></a>').css({
							'display':'inline-block',
							'width':'60px',
							'height':'60px',
							 "margin": "10px",
							 "margin-left":"5px"
						});
						var img = $('<img/>').attr('src',data[i].moreCity[k].items[m]).addClass('p1img');
						a.append(img);
						p1.append(a);
					}else{
						var a = $('<a></a>').addClass('acss');
						a.text(data[i].moreCity[k].items[m]);
						p1.addClass('p1imgcss');

						p1.append(a);
						a.hover(function(){
							$(this).css({
								"color":"green",
								"text-decoration":"underline"
							})
						},function(){
							$(this).css({
								"text-decoration": "none",
								"color": "gray"
							})
						})
					}
				}
				div.append(p).append(hr).append(p1);
				$($(bannerli[i]).children().get(3)).append(div);
			}
		}

	})

		//再获取到li下面的div标签中所需要填写的值

	$.getJSON('http://127.0.0.1:8888/getBanner',function (data){
		var box = $('#box');
		console.log(data);
		var banner = $('#banner');
		var ul = $('<ul></ul>').css({
			'position':'absolute',
			'width':'500px',
			'height':'5px',
			'left':'700px',
			'top':'400px'
		});
		for(var i = 0 ; i < data.length; i++){
			var div = $('<div></div>').addClass('boxdiv');
			var img = $('<img/>').attr('src',data[i].imgUrl).css({
				'width':'1347px',
				'height':'420px',
			});
			var li = $('<li></li>').addClass('bannerp');
			ul.append(li);
			div.append(img);
			box.append(div);
		}
		banner.append(ul);
		 setNum(data.length);
	})


	$.getJSON('http://127.0.0.1:8888/getFreeWalk',function(data){
		console.log(data);
		var freeUl = $('.jijiuUl');
		var freeCenter = $('.jijiuCenter');
		for(var i = 0; i < data.length; i++){
			var li = $('<li></li>').addClass('freeli');
			var Li = li;
			var a = $('<a></a>').addClass('freea');
			if(i==0){
				li.addClass('active');
			}
			a.text(data[i].title);
			li.append(a);
			freeUl.append(li);

			//创建div标签用来存放每一个datatitle对应的数据
			var div = $('<div></div>');
			if(i==0){
				div.css('z-index','2');
			}
			div.addClass('freeOne');
			for(var j = 0 ; j < data[i].data.length; j++){
				//创建的是jijiudiv1，2，3，4，5，6，7
				var div1 = $('<div></div>');
				var cover = $('<div></div>').css('z-index','5');
				div.append(cover);
				var img = $('<img/>').attr('src',data[i].data[j].imgUrl);

				var jipiao = $('<p></p>');
				jipiao.text('机票').addClass('jipiaocss');
				var jiaGe = $('<p></p>');
				var jiaGelabel = $('<label></label>');
				jiaGelabel.text(data[i].data[j].price).addClass('jiagelabel');
				var jiaGespan = $('<span></span>');
				jiaGespan.text('元起');
				jiaGe.append(jiaGelabel).append(jiaGespan).addClass('jiagecss');
				var pText = $('<p></p>');
				pText.text(data[i].data[j].title);
				var br = $('<br/>');
				var labelText = $('<label></label>');
				labelText.text(data[i].data[j].time)
				pText.append(br).append(labelText);
				if(j == 0){
					div1.addClass('div1head').addClass('freenextdiv');
					cover.addClass('onehover');
					img.addClass('imghead');
					pText.addClass('p1Textcss').css({
						'width':'553px'
					});
				}else if(j == 1 || j == 2){
					div1.addClass('divcenterdiv').css({
						'left':(570+(j-1)*270+(j*25)) + 'px'
					}).addClass('freenextdiv');
					cover.addClass('havehover').css({
						'left':(570+(j-1)*270+(j*25)) + 'px',
						'top':'0px'
					});
					img.addClass('imgcenter');
					pText.addClass('pTextcss');
				}else if(j == 3){
					div1.addClass('divlastdiv');
					cover.addClass('havehover').css({
						'left':'0px'
					});
					img.addClass('imgcenter');
					pText.addClass('pTextcss');
				}else{
					div1.addClass('divlastdiv').css({
						'left':(270+(j-4)*270+((j-3)*27)) + 'px'
					});
					cover.addClass('havehover').css({
						'left':(270+(j-4)*270+((j-3)*27)) + 'px'
					});
					img.addClass('imgcenter');
					pText.addClass('pTextcss');
				}
				var divlast = $('<div></div>').addClass('lastdivf');
				var imglast = $('<img/>').attr('src','../img/arrowBg_30.gif').addClass('lastimg');
				var plast1 = $('<p></p>').text('查看更多').addClass('plast1');
				var plast2 = $('<p></p>').text('机酒自由行产业').addClass('plast2');
				var plast3 = $('<p></p>').addClass('plast3');
				var alast1 = $('<a></a>').html('机票');
				var alast2 = $('<a></a>').html('酒店');
				var alast3 = $('<a></a>').html('机+酒');
				var alast4 = $('<a></a>').html('邮轮');
				plast3.append(alast1).append(alast2).append(alast3).append(alast4);
				divlast.append(imglast).append(plast1).append(plast2).append(plast3);
				div1.append(img).append(jipiao).append(jiaGe).append(pText);
				div.append(div1);
			}
			div.append(divlast);
			freeCenter.append(div);

			divlast.hover(function(){
				$($(this).children().get(0)).attr('src','../img/changelastimg.png').css({
					'left':'94px',
					'top':'92px'
				})
			},function(){
				$($(this).children().get(0)).attr('src','../img/arrowBg_30.gif').css({
					'left':'100px',
					'top':'100px'
				})
			})
		}
		var freeLi = $('.jijiuUl li');
		$('.jijiuUl li').each(function(){
			$('.jijiuUl li').hover(function(){
					freeLi.attr('class','clearactive');
					$(this).attr('class','active')
			})
		})
		$('.jijiuUl li').hover(function(){
				var index = $(this).index();
				var freeDiv = $('.freeOne');
				freeDiv.removeClass('showhover');
				 $(freeDiv[index]).fadeIn(300,function(){
					 $(this).addClass('showhover');
				 })
				// $(freeDiv[index]).fadeIn(3000,function(){
				// 		freeDiv.removeClass('showhover');
				// 		$(this).addClass('showhover');
				// });
		})
		var freeA = $($('.jijiuUl li a'));
		$('.jijiuUl li a').each(function(){
			$('.jijiuUl li a').hover(function(){
					freeA.attr('class','clearaActive');
					$(this).attr('class','aActive');
			})
		})
		$('.onehover').hover(function(){
			$(this).addClass('hoverH');
		},function(){
			$(this).removeClass('hoverH');
		})
		$('.havehover').hover(function(){
			$(this).addClass('hoverH');
			},function(){
			$(this).removeClass('hoverH');
		})
	})
})
