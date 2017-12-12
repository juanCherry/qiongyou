window.onload = function () {
	var search = document.getElementById('searchText');
	// 触发键盘抬起事件，开始搜索
	search.onkeyup = function (ev) {
		var e = ev || event;
		if (e.keyCode == 38 || e.keyCode == 40) {
			return;
		}

		// 获取到搜索框中的文字
		var searchText = document.getElementById('searchText').value;

		// 对搜索接口发起请求
		$.getJSON("http://restapi.amap.com/v3/assistant/inputtips?s=rsv3&key=fceb9f8df9c557673d762dc3b9a5ca6c&city=%E5%8C%97%E4%BA%AC&callback=?&platform=JS&logversion=2.0&sdkversion=1.3&appname=http%3A%2F%2Fbang.360.cn%2F&csid=DF4A0BE5-7971-4936-8B49-12C343FB4163&keywords="+searchText,function(data) {
			console.log(data);
　　　　            // 解析数据，展示UI
				drawUI(data)
						 });

	}

}




// 解析数据，展示UI
function drawUI(list) {
	var select = document.createElement('ul');
	// 添加下拉菜单边框样式
	select.className = 'menu';

	// for (var item of list.tips) {
	// 	var option = document.createElement('li')
	// 	option.innerHTML = item.name;
	// 	// option.isSelected = false;
	// 	select.appendChild(option);
	// }
	if(list.tips.length > 5){
		for(var i = 0 ; i < 5;i++){
			var option = document.createElement('li')
			option.innerHTML = list.tips[i].name;
			select.appendChild(option);
		}
	}else{
		for(var i = 0 ; i < list.tips.length;i++){
			var option = document.createElement('li')
			option.innerHTML = list.tips[i].name;
			select.appendChild(option);
		}
	}

	var selectOld = document.querySelectorAll('#menu ul')[0];

	var menu = document.getElementById('menu');
	menu.replaceChild(select, selectOld);

	// 绑定上下按钮事件
	selectAction(select);
}

var selectIndex = 0;
// 下拉菜单绑定上下箭头事件
function selectAction(select) {

	// 上38；下40
	document.onkeyup = function (ev) {
		var e = ev || event;


		if (e.keyCode == 40) {

			for (var i = 0; i < select.children.length; i++) {
				select.children[i].style.backgroundColor = 'white';
			}
			if (selectIndex >= select.children.length) {
				selectIndex = 0;
			}
			select.children[selectIndex].style.backgroundColor='rgb(240, 240, 240)';
			// 修改输入框中的文字
			var searchText = document.getElementById('searchText');
			searchText.value = select.children[selectIndex].innerHTML;
			selectIndex++;
		}

		if (e.keyCode == 38) {
			for (var i = 0; i < select.children.length-1; i++) {
				select.children[i].style.backgroundColor = 'white';

			}
			if (selectIndex <= 0) {
					selectIndex = select.children.length+1;
			}
			selectIndex--;
			select.children[selectIndex].style.backgroundColor='rgb(240, 240, 240)';
			// 修改输入框中的文字
			var searchText = document.getElementById('searchText');
			searchText.value = select.children[selectIndex].innerHTML;

		}
	}

	$('#searchText').focus(function(){
		$('.menu').css('display','block');
	})
	$('#searchText').blur(function(){
		$('.menu').css('display','none');
	})


}
