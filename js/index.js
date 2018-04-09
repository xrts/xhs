//p5听点评数据
var audioWords = [
    "1该户型位于项目楼栋两侧，东南边和西南边。户型主卧、客厅朝南，通透性较强采光充足；双卫生间设计，私密性更强，生活舒适度也更高",
    "2该户型分布在楼栋的凸出位置，户型方正，格局紧凑，卧室及客厅全朝南设计，采光充足。",
    "3该户型位于两个单元衔接位置，该户型三房皆有飘窗设计，可做延展设计；主卧及客厅朝南设计，户型通透采光充足",
    "4整体户型设计方正，空间布局优化合理，两个卧室朝南，客厅朝南，配备有大面积宽景阳台，采光性能极佳。",
    "5整体户型功能格局清晰，客厅和主卧均朝南，各个空间户型方正，后期空间利用率高。全明户型，各部分空间均有窗，居住舒适度好",
    "6各个空间户型方正，方便室内家具布置，有利于采光和通风，居住起来舒适、方便；两个卧室朝南，采光性好，有利于业主身心健康。"
];
var bigImg1 =[
    'http://s0.ifengimg.com/2017/10/26/10-1_900a23fe.jpg',
    'http://s0.ifengimg.com/2017/10/26/10-2_e3489098.jpg',
    'http://s0.ifengimg.com/2017/10/26/10-3_5c950746.jpg',
    'http://s0.ifengimg.com/2017/10/26/573d102e9e6abc63fdcd4d8fc31067c2.jpg',
    'http://s0.ifengimg.com/2017/10/26/dbead3edffde8b873462336d00fb584e.jpg',
    'http://s0.ifengimg.com/2017/10/26/c2240eb3ec80dcf4ea8dcd0fb88615ae.jpg'
];
var bigImg2 =[
    'http://s0.ifengimg.com/2017/10/27/cd4fa4668ff758753a835e0f8c7478ab.jpg '
];
var xhs = {
    videoIndex:$('.p3').index(),//视频页索引
    heavyIndex:$('.p4').index(),//倾斜手机页索引
    videod:$('#videos')[0],//video对象
    myScroll:null,//评论页滚动
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
      xhs.commentSub();
      xhs.moreComments();
      xhs.signUp();
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
                swiper.activeIndex != 4 ? xhs.bdAudio.activePlayer && xhs.bdAudio.activePlayer.pause && xhs.bdAudio.activePlayer.pause():'';
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
    },
    //图片弹层初始化
    initImagsZoom : function() {
        document.addEventListener("DOMContentLoaded",function(event){
            ImagesZoom.init({
                'elem':'.list1',
                'imgSrc':bigImg1
            });
            ImagesZoom.init({
                'elem':'.list2',
                'imgSrc':bigImg2
            });
        },false)
    },
    //评论提交
    commentSub: function(){
        $('.sendBtn').on('click',function(e){
            e.preventDefault();
            var _val = $(".comments textarea").val();
            if(_val.length >= 100){
                _val = _val.slice(0,100);
            }
            if(_val===''){
                alert("填写内容才可以发生哦~");
            }else{
                var _html = '<li class="clearfix">' +
                    '    <div class="imgbox">' +
                    '        <img src="'+ wxUser.headPic +'">' +
                    '    </div>' +
                    '    <div class="txtbox">' +
                    '        <p>'+ wxUser.name +'</p>' +
                    '        <p>'+ _val +'</p>' +
                    '    </div>' +
                    '</li>';
                $("#commentList_0 ul").prepend(_html);
                $(".comments textarea").val("");
                //发送评论数据
                $.ajax({
                    url: "http://wx.house.ifeng.com/hbook/api/index",
                    type: "post",
                    dataType: "jsonp",
                    jsonp: "_cb",
                    data: {
                        openid: wxUser.openid,
                        desc: _val,
                        active_id: wxUser.active_id
                    },
                    success: function(json){
                        if(json.errno==0){
                            console.log(json.msg);
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        console.log(textStatus);
                    }
                });
            }
        })
    },
    //查看更多评论
    moreComments : function(){
        //阻止默认事件触发
        $("#commentList")[0].addEventListener('touchmove',function(e){e.preventDefault();},isPassive() ? {
            capture: false,
            passive: false
        }:false);
        $(".moreComment").on("click",function(e){
            e.preventDefault();
            //请求评论列表数据
            $.ajax({
                url: "http://wx.house.ifeng.com/hbook/api/getlist",
                type: "post",
                dataType: "jsonp",
                jsonp: "_cb",
                data: {
                    active_id: wxUser.active_id
                },
                success: function(json){
                    if(json.errno=='ok'){
                        var html = "";
                        for(i in json.data){
                            html += '<li class="clearfix">' +
                                '    <div class="imgbox">' +
                                '        <img src="' + json.data[i].headimgurl + '">' +
                                '    </div>' +
                                '    <div class="txtbox">' +
                                '        <p>'+ json.data[i].nickname +'点评</p>' +
                                '        <p>'+ json.data[i].comment +'</p>' +
                                '    </div>' +
                                '</li>';
                        }
                        $("#commentList ul").html(html);
                        $(".commentPop").show();
                        if(!xhs.myScroll){
                            xhs.myScroll = new IScroll('#commentList', { mouseWheel: true, scrollbars: false});
                        }else{
                            xhs.myScroll.refresh();
                            xhs.myScroll.scrollTo(0, 0);
                        }
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(textStatus);
                }
            });
            $(".commentPop-close").on("mousedown touchstart", function(e){
                e.preventDefault();
                $(".commentPop").hide();
            });
        })
    },
    //报名
    signUp:function(){
        var addSignUp = new signUpGroup(jQuery("#addSignUp"));
        addSignUp.activityId = 1627;//报名活动ID
        addSignUp.styleType = 1;//报名样式 1：吸附右侧样式；2：吸附左侧样式
        addSignUp.stylebackGround = "";//报名背景 宽高220*340
        addSignUp.success = function(){
            $("#success").show();
        };
        addSignUp.init();
    }

};