//p5听点评数据
var audioWords = [
    "1该户型位于项目楼栋两侧，东南边和西南边。户型主卧、客厅朝南，通透性较强采光充足；双卫生间设计，私密性更强，生活舒适度也更高",
    "2该户型分布在楼栋的凸出位置，户型方正，格局紧凑，卧室及客厅全朝南设计，采光充足。",
    "3该户型位于两个单元衔接位置，该户型三房皆有飘窗设计，可做延展设计；主卧及客厅朝南设计，户型通透采光充足",
    "4整体户型设计方正，空间布局优化合理，两个卧室朝南，客厅朝南，配备有大面积宽景阳台，采光性能极佳。",
    "5整体户型功能格局清晰，客厅和主卧均朝南，各个空间户型方正，后期空间利用率高。全明户型，各部分空间均有窗，居住舒适度好",
    "6各个空间户型方正，方便室内家具布置，有利于采光和通风，居住起来舒适、方便；两个卧室朝南，采光性好，有利于业主身心健康。"
];

var xhs = {
    videoIndex:$('.p3').index(),//视频页索引
    heavyIndex:$('.p4').index(),//倾斜手机页索引
    videod:$('#videos')[0],//video对象
    myScroll:null,
    bdAudio: null,
    p5SwiperIndex:0,//P5页当前swiper索引

    //p5图片
    bigImg1 :[
        'http://s0.ifengimg.com/2017/10/26/10-1_900a23fe.jpg',
        'http://s0.ifengimg.com/2017/10/26/10-2_e3489098.jpg',
        'http://s0.ifengimg.com/2017/10/26/10-3_5c950746.jpg',
        'http://s0.ifengimg.com/2017/10/26/573d102e9e6abc63fdcd4d8fc31067c2.jpg',
        'http://s0.ifengimg.com/2017/10/26/dbead3edffde8b873462336d00fb584e.jpg',
        'http://s0.ifengimg.com/2017/10/26/c2240eb3ec80dcf4ea8dcd0fb88615ae.jpg'
    ],
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
            },
            onSlideChangeEnd: function(swiper){
                swiper.activeIndex != 4? xhs.bdAudio.activePlayer && xhs.bdAudio.activePlayer.pause && xhs.bdAudio.activePlayer.pause():'';
            }
        });
        var mySwiper2 = new Swiper ('.p2-swiper',{
            loop:true,
            nextButton: '.button-next1',
            prevButton: '.button-prev1'
        });
        var mySwiper3 = new Swiper ('.p5-swiper',{
            nextButton:'.button-next2',
            prevButton:'.button-prev2',
            onInit: function(swiper){
                xhs.playAudio();
            },
            onSlideChangeEnd:function(swiper){
                xhs.p5SwiperIndex = swiper.activeIndex;
                $('#p5-des .p5-des').eq(xhs.p5SwiperIndex).fadeIn().siblings().fadeOut();
                xhs.bdAudio.activePlayer &&  xhs.bdAudio.activePlayer.pause &&  xhs.bdAudio.activePlayer.pause();

            }

        });
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
            window.addEventListener('deviceorientation',function(e){
                if(e.gamma>10){
                    translateWidth+=3;
                    translateWidth < differrenceWidth ? $('.p4-1').css('transform','translate3d(-'+translateWidth+'px, 0, 0)')  :translateWidth= differrenceWidth;
                }else if(e.gamma<-10){
                    translateWidth-=3;
                    translateWidth >0 ? $('.p4-1').css('transform','translate3d(-'+translateWidth+'px, 0, 0)')  : translateWidth=0;
                }
            },true);
        }
    },
    //语音播报
    playAudio : function (){
        if (audioWords[xhs.p5SwiperIndex].length) {
            xhs.bdAudio = new baiduAudio("musicH5", audioWords[xhs.p5SwiperIndex], xhs.p5SwiperIndex);
            xhs.bdAudio.init();
        }
    }

};