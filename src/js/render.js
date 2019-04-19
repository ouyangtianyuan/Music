(function($,root){
    function render(info){
        var html = '<div class="tit">'+info.song+'</div>\
            <div class="name">'+info.singer+'</div>\
            <div class="musicname">'+info.album+'</div>'
        $('.info-box').html(html);
        $('.bg img').attr('src',info.image);
        $('.img-box').find('img').attr('src',info.image);
    }
    function isLike(data){
        var i = $('.control .like-btn i');
        if(data){
            i.attr('class','fa fa-heart');
        }else{
            i.attr('class','fa fa-heart-o');
        }
    }
    root.init = function(data){
        render(data);
        isLike(data.isLike);
    }
})(window.Zepto,window.player||(window.player={}))