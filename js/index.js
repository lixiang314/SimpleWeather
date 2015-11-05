var cityname = $.cookie("CITY_NAME");

if (cityname==null) {
	$('.form-inoput-city').show();

	$('#btn-ok').click(function(){
		cityname = $('[name=input-city-name]').val();
		$.cookie("CITY_NAME",cityname);
		getInfo(cityname);
	});
}

$(document).ready(function() {

});



avalon.ready(function() {
	vmodel = avalon.define("page", function(vm) {
		vm.result= {};
	});
	if(cityname != "" || cityname != null){
		getInfo(cityname);
	}

});

function getInfo(city) {
	$.ajax({
		url : 'http://apis.baidu.com/heweather/weather/free?city='+city,
		dataType : 'json',
		type : "get",
		async : false,
		headers : {
			apikey : '31d17cb5d8919936c964a3edb380ebe3'
		},
		success : function(data) {
			vmodel.result = data['HeWeather data service 3.0'][0];
		}
	});
}