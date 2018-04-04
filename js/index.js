var xhs = {
    videoIndex:$('.p3').index(),//视频页索引
    heavyIndex:$('.p4').index(),//倾斜手机页索引
    videod:$('#videos')[0],//video对象
    init : function(){
      xhs.initSwiper();
    },
    //初始化swiper
    initSwiper :function(){
        var mySwiper = new Swiper ('.swiper-body',{
            direction:'vertical',
            onSlideChangeStart: function(swiper){
                switch (swiper.activeIndex){
                    case xhs.videoIndex :
                        xhs.playVideo();
                        break;
                    case xhs.heavyIndex :
                        xhs.leanScreen();
                        xhs.videoIndex !=-1 ? xhs.videod.pause(): '';
                        break;
                    default:
                        xhs.videoIndex !=-1 ? xhs.videod.pause(): '';
                        break;
                }
            }
        });
        var mySwiper2 = new Swiper ('.p2-swiper',{
            loop:true,
            nextButton: '.button-next1',
            prevButton: '.button-prev1'
        })
    },
    //视频播放
    playVideo:function(){
        $('.p3 div').show();
        $('.p3 img').click(function(){
            $('.p3 div').fadeOut();
            xhs.videod.play();
        });
        xhs.videod.onended=function(){
            $('.p3 div').fadeIn();
        }
    },
    //倾斜屏幕
    leanScreen : function(){
        var imgWidth = $('.p4-1').width(),
            containerWidth =$('.p4').width(),
            differrenceWidth=imgWidth-containerWidth;
          var  translateWidth = imgWidth/2;
        if(window.DeviceMotionEvent){
            window.addEventListener('Deviceorientation',function(e){
                if(e.gamma>10){
                    translateWidth+=3;
                    translateWidth < differrenceWidth ? $('.p4-1').css('transform','translate3d(-'+translateWidth+'px, 0, 0)')  :translateWidth= differrenceWidth;
                }else if(e.gamma<-10){
                    translateWidth-=3;
                    translateWidth >0 ? $('.p4-1').css('transform','translate3d(-'+translateWidth+'px, 0, 0)')  : translateWidth=0;
                }
            },true)
        }
    }

};