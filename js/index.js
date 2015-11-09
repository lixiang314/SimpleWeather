// var cityname = $.cookie('CITY_NAME');
var cityname = "hangzhou"


$(document).ready(function() {
	// checkCookie();
	$('.info-base').css('height',$(window).height()-65);
});


avalon.ready(function() {
	avalon.filters.timeFilter = function(str){
		var timeArr = str.split(" ");
		return  timeArr[1];
	}

	avalon.filters.tmpFilter = function(str){
		var tmp = Number(str);
		var tmpLevel ='l-c';

		if(tmp>=30){
			tmpLevel = 'l-a';
		}
		else if(tmp>=20){
			tmpLevel = 'l-b';
		}
		else if(tmp>=15){
			tmpLevel = 'l-c';
		}
		else if(tmp>=10){
			tmpLevel = 'l-d';
		}
		else if(tmp>=0){
			tmpLevel = 'l-e';
		}
		else{
			tmpLevel = 'l-f';
		}
		return  tmpLevel;
	}

	vmodel = avalon.define("page", function(vm) {
		vm.result= {};
	});

	if(cityname==null || cityname == 'null' || cityname == 'undefined' || cityname == undefined || cityname == '')
	{
		$('.form-inoput-city').show();
		$('#btn-ok').click(function(){
			cityname = $('[name=input-city-name]').val();
			if(cityname==""){
				alert('请输入城市名!');
				return;
			}
			$.cookie('CITY_NAME',cityname);
			getInfo(cityname);
		});
	}


	if(cityname!=null){
		getInfo(cityname);
	}



});

function getInfo(city) {
	$.ajax({
		// url : 'http://apis.baidu.com/heweather/weather/free?city='+city,
		url : 'testData.json',
		dataType : 'json',
		type : "get",
		async : false,
		headers : {
			apikey : '31d17cb5d8919936c964a3edb380ebe3'
		},
		success : function(data) {
			if(data['HeWeather data service 3.0'][0].status=='ok'){
				$('.form-inoput-city').fadeOut(300);
				vmodel.result = data['HeWeather data service 3.0'][0];
			}
			else if(data['HeWeather data service 3.0'][0].status=='unknown city'){
				alert('他妈的城市名不对');
				$.cookie('CITY_NAME', '', { expires: -1 });
			}
		}
	});
}

