var ph = ph || {};

$('.port-close-button').click(function(){
    console.log("CLOSE");
    $.colorbox.close();
});

ph.initDocument = function(){
    var modelData = null;
    //var $progress = $('#sample2-progress').text('0 / 100');
    var loader = new PxLoader();

    var imgArray = Array();
    //BACKGROUND IMAGE
    imgArray[0] = "css/img/bg_2.png";

    imgArray[1] = "/img/portfolio/th/spotify-kiosk-cannes-th.png";
    imgArray[2] = "/img/portfolio/th/city-center-th.png";
    imgArray[3] = "/img/portfolio/th/interpol-website-th.png";
    imgArray[4] = "/img/portfolio/th/fisher-investments-th.png";
    imgArray[5] = "/img/portfolio/th/pixies-music-th.png";
    imgArray[6] = "/img/portfolio/th/interpol-antics-th.png";
    imgArray[7] = "/img/portfolio/th/maybelline-color-advisor-th.png";
    imgArray[8] = "/img/portfolio/th/sweet-talk-iphone-app-th.png";
    imgArray[9] = "/img/portfolio/th/ford-innovation-th.png";
    imgArray[10] = "/img/portfolio/th/crayola-64-days-xmas-th.png";
    imgArray[11] = "/img/portfolio/th/adidas-mls-th.png";
    imgArray[12] = "/img/portfolio/th/adidas-basketball-th.png";
    imgArray[13] = "/img/portfolio/th/ween-iphone-th.png";
    imgArray[14] = "/img/portfolio/th/streets-of-san-francisco-th.png";
    imgArray[15] = "/img/portfolio/th/ever-after-high-th.png";


    imgArray[16] = "/img/portfolio/spotify-cannes.jpg";
    imgArray[17] = "/img/portfolio/city-center.jpg";
    imgArray[18] = "/img/portfolio/interpol.jpg";
    imgArray[19] = "/img/portfolio/fisher-investments.jpg";
    imgArray[20] = "/img/portfolio/pixies-music.jpg";
    imgArray[21] = "/img/portfolio/interpol-antics.png";
    imgArray[22] = "/img/portfolio/maybelline-my-color-advisor.png";
    imgArray[23] = "/img/portfolio/sweet-talk-iphone-app.png";
    imgArray[24] = "/img/portfolio/ford-innovations.jpg";
    imgArray[25] = "/img/portfolio/crayola-64-days-xmas.png";
    imgArray[26] = "/img/portfolio/adidas-mls.png";
    imgArray[27] = "/img/portfolio/adidas-basketball.png";
    imgArray[28] = "/img/portfolio/ween.png";
    imgArray[29] = "/img/portfolio/streets-of-san-francisco-iphone.png";
    imgArray[30] = "/img/portfolio/ever-after-high.png";

    imgArray[31] = "/css/img/icons/facebook.png";
    imgArray[32] = "/css/img/icons/flickr.png";
    imgArray[33] = "/css/img/icons/email.png";
    imgArray[34] = "/css/img/icons/facebook.png";
    imgArray[35] = "/css/img/icons/flickr.png";
    imgArray[36] = "/css/img/icons/linkedin.png";
    imgArray[37] = "/css/img/icons/pinterest.png";
    imgArray[38] = "/css/img/icons/twitter.png";

    for(var i=0; i < imgArray.length; i++) {
        var pxImage = new PxLoaderImage(imgArray[i]);
        pxImage.imageNumber = i + 1;
        loader.add(pxImage);
    }

    loader.addProgressListener(function(evt) {
        var ratio = (evt.completedCount/evt.totalCount)*100;
        var position;

        if(ratio < 20){
            position = "0px";
        }else if(ratio < 35){
            position = "-75px";
        }else if(ratio < 55){
            position = "-150px";
        }else if(ratio < 70){
            position = "-225px";
        }else if(ratio < 85){
            position = "-300px";
        }else{
            position = "-375px";
        }
        $('#logo').css('background-position', "0px "+position);
    });

    loader.addCompletionListener(function() {
        ph.loadModelData();
        $('#logo').css('background-position', "0px -375px");
    });

    loader.start();
};

ph.loadModelData = function(){
    console.log("LOAD MODEL DATA");

    $.ajax({
        'url': '/json/dataModel.json',
        'dataType': "json",
        'success': function (error) {
            modelData = error;
            ph.initDisplay();
        }
    });
}

ph.initDisplay = function(){
    console.log("init display");
    // var $res = $('#resolution');
    var $content = $('#resolution .content');
    $("#home .title").clone().appendTo($content);
    $("#about .presentation .desc").clone().appendTo($content);
    $("footer .follow").clone().appendTo($content);

    ph.launchIntro();

    ph.resizeWindow();
    $(window).resize(function(){
        ph.resizeWindow();
    });

    //console.log("modelData 2 : " + modelData);

    ph.currentPart = '#home';
    ph.navAnim = false;

    // init functions
    //ph.displayTimeline();
    //ph.grabWeatherInfo();
    ph.animNav();
    ph.animScroll();
    //ph.targetLink();
   // ph.initContact();
    //ph.configProject();
};

ph.resizeWindow = function(){

    ph.resizeBackground('#bg');
    if($(window).width() < 960){
        $("#page, #project").fadeOut(800, function(){
            if(!$("#resolution").hasClass('display')){
                $("#resolution").fadeIn(800);
                $("#resolution").addClass('display');
            }
        });
    }else{
        $("#resolution").fadeOut(800, function(){
            if($("#resolution").hasClass('display')){
                if($("header").css("top") == "0px"){
                    $("#page").fadeIn(800);
                }else{
                    $("#project").fadeIn(800);
                }
                $("#resolution").removeClass('display');
            }
        });
    }

};

//ph.grabWeatherInfo = function(){
//    $.ajax({
//        //url : "http://api.wunderground.com/api/6e64fef0e717782f/conditions/q/CA/San_Francisco.json",
//        url : "http://api.wunderground.com/api/6e64fef0e717782f/geolookup/forecast/q/US/94596.json",
//        dataType : "jsonp",
//        success : function(parsed_json) {
//            var Forcast = parsed_json['forecast']['simpleforecast']['forecastday'];
////            var location = parsed_json['current_observation']['city'];
////            var temp_f = parsed_json['current_observation']['temp_f'];
////            //var conditions = parsed_json['current_observation'][''];
////            var icon = parsed_json['current_observation']['icon_url'];
//
//            //var w_date = parsed_json['forecast']['date'];
//            //var w-time = parsed_json['forecast']['date'];
//
//            //alert("w_date : " + w_date);
//
//            //$("aside #temperature .weather-value").text(44);
//            var weather_time = Forcast[0]['date']['hour'] + ":" + Forcast[0]['date']['min'] + " " + Forcast[0]['date']['ampm']
//            $("aside #time .weather-value").text(weather_time);
//
//        }
//    });
//}

ph.launchIntro = function(){
    TweenLite.to($('#bg'), 1, {opacity: "1"});
    $('section, footer').fadeIn(1000, function(){
        $(this).css("display", "block");
    });
    TweenLite.to($('#home .title'),.75, {margin: "325px", opacity: "1", delay: 0.7});
    TweenLite.to($('header  nav'), 1, {top: "0px", delay: 1.2});
    TweenLite.to($('#home .scroll'), 1, {bottom: "0px", opacity: "1", delay: 1.2});
    TweenLite.to($('#home aside'),.45, {left: "0px", delay:1.4});
};

ph.animScroll = function(callback) {
    var $header = $("header");
    $(window).on("scroll", function(event){
        var scroll = $(window).scrollTop();
        //if($("#project").css('display') != "block"){
        //}

        if(scroll >= 720){
            if(!$header.hasClass('scroll')){
                $header.addClass('scroll');
                TweenLite.to($("header .wrapper"), 0.2, {"top": "0px"});
            }
        }else{
            if($header.hasClass('scroll')){
                TweenLite.to($("header .wrapper"), 0.3, {"top": "-80px", onComplete:function(){
                    $header.removeClass('scroll');
                }});
            }
        }

        $home = $('#home').position().top;
        $portfolio = $('#portfolio').position().top +800;
        //$about = $('#about').position().top +800;
        //$experiments = $('#experiments').position().top +800;
        $contact = $('#contact').position().top +800;

        var lastCurrentPart = ph.currentPart;

        // get current part
        if(scroll < ($portfolio - 79)){
            ph.currentPart = '#home';
        }else if((scroll >= ($portfolio - 79))&&(scroll < ($home - 79))){
            ph.currentPart = '#portfolio';
        }
        else{
            ph.currentPart = '#contact';
        }

        if((lastCurrentPart != ph.currentPart)&&(ph.navAnim==false)){
            $('header nav').find('li.current').removeClass('current');
            $('header nav li a').each(function(){
                var $this = $(this);
                if($this.attr('href')==ph.currentPart){
                    $this.parent().addClass('current');
                }
            });
        }
    })
};

ph.animNav = function(){
    // nav control
    $('header').on('click',' nav a',function(event){
        // var
        $link = $(this);
        ph.navAnim = true;
        // disable click if current menu 
        if($link.parent().hasClass('current')){
            return false;
        }
        // animation
        if($link.attr('href') == "#home"){
            var position = 0;
        }else{
            var position = ($('body').find($link.attr('href')).position().top)+800;
        }
        // scrollTo
        $('body,html').animate({
            scrollTop : position
        },'slow', function(){
            ph.navAnim = false;
            $link.parents('nav').find('li.current').removeClass('current');
            $link.parent('li').addClass('current');
        });
        return false;
    });
    $('#home').on('click','.scroll',function(event){
        $('body,html').animate({
            scrollTop : 800
        },'slow', function(){

        });
        return false;
    });
};

$('a.portfolio').colorbox({
    opacity:0.85,
    fixed:false,
    transition:"elastic",
    height:"540px",
    closeButton:false,
    width:"100%",
    open:false
});



$('article').hover(
    function() {
        TweenLite.to($('.info', this), .75, {top: "0"});
    }, function() {
        TweenLite.to($('.info', this), .75, {top: "240"});
    }
);

ph.resizeBackground = function(img, callback) {
    var $image = $(img);
    var image_width = $image.width();
    var image_height = $image.height();
    var over = image_width / image_height;
    var under = image_height / image_width;

    var body_width = $(window).width();
    var body_height = $(window).height();

    if (body_width / body_height >= over) {
        $image.css({
            'width': body_width + 'px',
            'height': Math.ceil(under * body_width) + 'px',
            'left': '0px',
            'top': Math.abs((under * body_width) - body_height) / -2 + 'px'
        });
    } else {
        $image.css({
            'width': Math.ceil(over * body_height) + 'px',
            'height': body_height + 'px',
            'top': '0px',
            'left': Math.abs((over * body_height) - body_width) / -2 + 'px'
        });
    }
    if(callback){callback();}
};

$(document).ready(ph.initDocument);