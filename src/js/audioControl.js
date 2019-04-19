(function($,root){
    function audioControl(){
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();
    }
    audioControl.prototype={
        play:function(){
            this.audio.play();
            this.status = "play";
        },
        pause:function(){
            this.audio.pause();
            this.status = "pause";
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function(time){
            this.audio.currentTime = time;
            this.play();
        },
        volume:function(num){
            this.audio.volume = num;
        },
        bindEvent:function(){
            $(this.audio).on('ended',function(){
                $('.next-btn').trigger('click');
            })
        }
    }
    root.audioControl = audioControl;
})(window.Zepto,window.player||(window.player={}))