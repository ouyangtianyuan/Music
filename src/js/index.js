var $ = window.Zepto;
var root = window.player;
var $body = $(document.body);
var index = 0;
var list, control;
var audio = new root.audioControl();
var $playBtn = $('.play-btn');
var $menu = $('.m-list');
var imgBox = $('.wrapper .img-box');
var t,rotateX=0;
function bindEvent() {
    $playBtn.on('toggleClass', function () {
        if ($playBtn.hasClass('runing')) {
            $(this).find('i').attr('class', 'fa fa-pause');
        } else {
            $(this).find('i').attr('class', 'fa fa-play');
        }
    })
    $body.on('click', '.prev-btn', function () {
        var index = control.prev();
        $(this).trigger("playChange", index);
        audio.play();
        root.pro.start(0);
        $playBtn.addClass('runing').trigger('toggleClass');
        rotate();
    })
    $body.on('click', '.next-btn', function () {
        var index = control.next();
        $(this).trigger("playChange", index);
        audio.play();
        root.pro.start(0);
        $playBtn.addClass('runing').trigger('toggleClass');
        rotate();
    })
    $body.on('click', '.play-btn', function () {
        if (audio.status == "play") {
            audio.pause();
            root.pro.stop();
            $playBtn.removeClass('runing').trigger('toggleClass'); 
            stopRotate();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        } else {
            audio.play();
            root.pro.start();
            $playBtn.addClass('runing').trigger('toggleClass');
            rotate();
        }
    })
    $body.on('playChange', function (e, index,flag) {
        audio.getAudio(list[index].audio);
        if (audio.status == "play"||flag) {
            audio.play();
            $playBtn.addClass('runing').trigger('toggleClass');
            rotate();
        }
        root.menu.getActive(control);
        root.init(list[index]);
        root.pro.renderAllTime(list[index].duration);
        root.pro.update(0);
    })
    $body.on('click','.like-btn',function(){
        var $i = $(this).find('i');
        if($i.hasClass('fa-heart')){
            $i.removeClass('fa-heart').addClass('fa-heart-o');
        }else{
            $i.removeClass('fa-heart-o').addClass('fa-heart');
        }
    })
}

function rotate(){
    clearInterval(t);
    t = setInterval(function(){
        rotateX++;
        imgBox.css({
            transform:'rotate('+rotateX+'deg)'
        })
    },20)
}
function stopRotate(){
    clearInterval(t);
}

function bindTouch() {
    var $dot = $('.pro-dot');
    var offset = $('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $dot.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per < 0) {
            per = 0;
        } else if (per > 1) {
            per = 1;
        }
        root.pro.update(per);

    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        perFn(per);
    })
    $('.pro-wrapper').on('click',function(e){
        var x = e.clientX;
        var per = (x - left) / width;
        perFn(per);
        root.pro.update(per);
    })
    function perFn(per){
        if (per < 0) {
            per = 0;
        } else if (per > 1) {
            per = 1;
        }
        var curDuration = per * list[control.index].duration;
        var curTime = curDuration * per;
        audio.playTo(curTime);
        if (curTime == curDuration && curDuration > 0) {
            $playBtn.removeClass('runing').trigger('toggleClass');
        } else {
            $playBtn.addClass('runing').trigger('toggleClass');
        }
        root.pro.start(per);
        rotate();
    }
}


function getData(url) {
    $.ajax({
        type: 'get',
        url: url,
        success: function (data) {
            list = data;
            bindEvent();
            bindTouch();
            root.menu.renderMenu(data);
            control = new root.control(data.length);
            $body.trigger('playChange', 0);
        },
        error: function () {

        }
    })
}

getData('../mock/data.json')