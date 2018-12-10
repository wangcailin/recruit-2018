$(function(){
	
	$(".submit").click(function () {
		$.ajax({
			url: "index/index/submit",
			type: "POST",
			data: $(".form").serializeArray(),
        	success: function (res) {
				alert("提交成功！");
				window.location.href = 'index/index/index';
            }
		})
    })

	$('.zoomify img').zoomify({
		"duration":300,
		"easing":"linear"
	});


	var drugfalg = true;//限制滑动
	var game = {
		phone_exp: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
		time: 60,
		all_time: 60,
		ajaxfalg: true,
		timfun: null
	};
	game.timfun = function(){
		clearTimeout(game.timfun);
		$('.getcode').text(game.time+'s');
		game.time -= 1;
		if(game.time < 0){
			$('.getcode').text('重新获取');
			game.time = game.all_time;
		} else {
			setTimeout(game.timfun, 1000);
		}
	}
	$('#fullpage').fullpage({
		//Navigation
		menu: '#menu',
		lockAnchors: false,//是否锚点起作用
		anchors:['firstPage', 'secondPage', 'threePage', 'fourPage', 'fivePage','sixPage','sevenPage','eightPage'],//锚点
		navigation: false,//导航点是否显示
		navigationPosition: 'right',//导航点位置
		navigationTooltips: ['firstSlide', 'secondSlide','threeSlide', 'fourSlide', 'fiveSlide','sixSlide','sevenSlide','eightSlide'],
		showActiveTooltip: true,

		//Scrolling
		css3: true,
		scrollingSpeed: 300,
		scrollBar: false,//是否使用滚动条
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		loopBottom: false,//循环滚动  最后一个滑动是否跳动到第一个
		loopTop: false,//循环滚动  第一个滑动是否跳动到最后一个
		dragAndMove: true,
		normalScrollElements: '.index_text',//可以避免自动滚动，，如果页面中有滑动内容
		touchSensitivity: 15,//屏幕触控灵敏度

		//Accessibility
		animateAnchor: true,//链接到指定页面
		recordHistory: false,//是否将滚动加入到浏览器history   手机返回键设置

		//Design
		controlArrows: true,
		verticalCentered: true,
		fixedElements: '#header, .footer',

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.slide',

		lazyLoading: true,//懒加载

		//events
		onLeave: function(index, nextIndex, direction){
			if(!drugfalg){
				return false;
			} else {
				drugfalg = false;
			}
			//console.log(index);//从该页码进入当前页
			//console.log(nextIndex);//当前页数字标识
			// console.log(direction);//通过什么方式进入，上/下

		},
		afterLoad: function(anchorLink, index){
			//console.log(anchorLink);//当前页锚点
			//console.log(index);//当前页数字标识
			// falg = false;

		},
		afterRender: function(){},//页面结构生成后触发的,初始化其他插件等
		afterResize: function(){},//浏览器窗口大小后触发
	});
	$('#fullpage').on('touchend', function(){
		drugfalg = true;
	})

	$('#phone').on('input propertychange', function(){
		$('#phone').val($('#phone').val().replace(/[^0-9-]+/,''));
		if( game.phone_exp.test($('#phone').val()) ){
			$('.iphonerror').text('');
			$('.coderror').text('');
		}
	})
	$('#code').on('input propertychange', function(){
		$('#code').val($('#code').val().replace(/[^0-9-]+/,''));
		if( $('#code').attr("vrt") == $('#code').val() ){
			$('.coderror').text('');
		}
	})
	$('.iphonerror').click(function(){
		$('#phone').focus();
	})
	$('.coderror').click(function(){
		$('#code').focus();
	})
	$('.submit-btn').click(function(){
		$('.fourpage').hide();
		$('.formpage').show();
		$.fn.fullpage.setAllowScrolling(false);
	})
	$('.arrow').click(function(){
		$.fn.fullpage.moveSectionDown();
	})
	// 点击提交
	$('.formbtn').click(function(){
		// 提交手机
		if(!game.ajaxfalg){return false;}
		if($('#phone').val().length <=0 || $('#phone').val() == ' '){
			$('.iphonerror').text('请输入手机号码');
			return false;
		} else if(!game.phone_exp.test($('#phone').val())) {
			$('.iphonerror').text('手机格式不正确');
			return false;
		}
		if($('#code').val().length <=0 || $('#code').val() == ' '){
			$('.coderror').text('请输入验证码');
			return false;
		}
		game.ajaxfalg = false;
		console.log('手机提交成功');
		$('.formpage').hide();
		$('.lastpage').show();
		// $('.center-wrap').removeClass('noactive').addClass('upload');
		// game.thispar_height = $('.imgbox').width();
		// $.ajax({
		// 	url: '',
		// 	type: '',
		// 	dataType: '',
		// 	data: {phone: $('#phone').val(), code: $('#code').val()},
		//  success: function(){

		//  }
		// })
		game.ajaxfalg = true;
	})

	// $.fn.fullpage.silentMoveTo('fourPage');


	$('.touchbtn').on({
		touchstart: function(){
			$(this).addClass('active');
		},
		touchend: function(){
			$(this).removeClass('active');
		}
	})
	var setTim;
	window.onload = function(){
		$('body').css({height:$('body').height()});
		setTim = setTimeout(function(){
			clearTimeout(setTim);
			$('.loading').remove();
		}, 500)
	}
	window.addEventListener('pageshow', function(e) {
		 if (e.persisted) {
			 location.reload();
		 }
	 });
})