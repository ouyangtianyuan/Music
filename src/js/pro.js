(function($,root){
    //渲染每一首歌的总时间
    var $body = $(document.body);
    var allTime,frameId;
    var startTime ,lastPer = 0;
    function renderAllTime(time){
        lastPer = 0;
        allTime  = time;
        time = initTime(time);
        $body.find('.all-time').html(time);
    }
    //将时间格式化
    function initTime(t){
        t = Math.round(t);
        var m = Math.floor(t/60);
        var s = t - m*60;
        if(m<10){
            m = '0'+m;
        }
        if(s<10){
            s = '0'+s;
        }
        return m + ':' + s;
    }
    //开始时间
    function start(p){
        lastPer= p == undefined ? lastPer : p;
        startTime = new Date().getTime();
        cancelAnimationFrame(frameId);
        function frame(){
            var curTime = new Date().getTime();
            var per = lastPer+(curTime - startTime)/(allTime*1000);
            if(per<=1){
                update(per)
                frameId=requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
            
        }
        frame();
    }
    //停止计时
    function stop(){
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer =lastPer + (stopTime - startTime) /(allTime*1000);
    }
    function update(per){
        var curTime = allTime * per;
        curTime = initTime(curTime);
        $body.find('.cur-time').html(curTime);
        var perX = per*100+'%';
        $body.find('.pro-top').css({
            width:perX
        })
    }
    root.pro={
        renderAllTime :renderAllTime,
        start:start,
        stop:stop,
        update:update,
    }
})(window.Zepto,window.player||(window.player={}))