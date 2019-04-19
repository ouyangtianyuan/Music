(function($,root){
    function bind(){
        var vol = $('.vol-box');
        var dot = vol.find('.vol-dot');
        var l = vol.offset().left;
        var w = vol.offset().width;
        var vIcon =$('.vol-wrapper .icon i');
        dot.on('touchstart',function(){
            

        }).on('touchmove',function(e){
            var x = e.changedTouches[0].clientX;
            var per = (x-l)/w;
            perFn(per);
        }).on('touchend',function(){

        });
        vol.on('click',function(e){
            var x = e.clientX;
            var per = (x-l)/w;
            perFn(per)
        })
        function perFn(per){
            if(per>1){
                per=1;
            }else if(per<0){
                per=0;
            }
            var wPer = per*100+'%';
            if(per==0){
                vIcon.attr('class','fa fa-volume-off');
            }else{
                vIcon.attr('class','fa fa-volume-down');
            }
            audio.volume(per);
            vol.find('.vol-top').css({
                width:wPer
            })
        }
    }
    root.volume = {
        bind:bind,
    }
})(window.Zepto,window.player||(window.player={}))