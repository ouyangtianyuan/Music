(function($,root){
    var str = '';
    var con;
    var $menu = $('.menu-wra');
    function renderMenu(data,index){
        data.forEach(function(ele,index){
            str+='<li>\
            <span>'+ele.song+'-'+ele.singer+'</span>\
            </li>'
        })
        $menu.find('.m-list').html(str);
        $menu.find('li').eq(index).addClass('active');
        bind();
    }
    function bind(){
        $menu.find('li').on('click',function(e){
            var index = $(this).index();
            con.index = index;
            $(this).addClass('touch');
            $menu.find('li').removeClass('active');
            $menu.find('li').eq(index).addClass('active');
            $menu.find('.menu-box').removeClass('show');
            $menu.fadeOut();
            $(this).trigger("playChange", [index,true]);
            root.pro.start(0);
            $playBtn.addClass('runing').trigger('toggleClass');
            e.stopPropagation();
        }).on('touchstart',function(){
            $(this).addClass('touch');
        }).on('touchend',function(){
            $(this).removeClass('touch');
        })
        $('.list-btn').on('click',function(e){
            $menu.fadeIn();
           $menu.find('.menu-box').addClass('show');
           $menu.find('.touch').removeClass('touch');
           root.volume.bind();
           style();
           e.stopPropagation();
        })
        $menu.find('.menu-box').on('click',function(e){
            e.stopPropagation();
        })
        $('.close-btn').on('click',function(e){
            $(this).addClass('touch');
            $menu.find('.menu-box').removeClass('show');
            $menu.fadeOut();
            e.stopPropagation();
        }).on('touchstart',function(){
            $(this).addClass('touch');
        }).on('touchend',function(){
            $(this).removeClass('touch');
        })
        $menu.on('click',function(e){
            $(this).find('.menu-box').removeClass('show');
            $(this).fadeOut();
        })
    }
    function getActive(constrol){
        con = constrol;
        $menu.find('li').removeClass('active'); 
        $menu.find('li').eq(constrol.index).addClass('active'); 
    }
    function style(){
        var num = 0.5 - Math.random();
        if(num>0){
            $('.menu-box').addClass('active')
        }else{
            $('.menu-box').removeClass('active');
        }
    }
    root.menu = {
        renderMenu:renderMenu,
        getActive:getActive,
    }
})(window.Zepto,window.player||(window.player={}))