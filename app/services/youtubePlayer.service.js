(function(){

  angular.module("services")
  .service("youtubePlayerService",service);

  service.$inject = ['backEndService','$window'];

  function service(backEndService,$window){

    var _service = {
      setPlayer:setPlayer,
      getYouTubeIdFromURL:getYouTubeIdFromURL,
      loadVideo:loadVideo,
      getVideoSettingFromAContent:getVideoSettingFromAContent,
      currentContent:null,
      player:null,
      onPlayerStateChange:onPlayerStateChange
      playerContainer:null
    }

    function setPlayer(htmlElementId){
      if(!_service.player){
          _service.playerContainer = htmlElementId;
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        _service.interval = setInterval(function(){
          if($window.YT){ //api have been loaded;
            _service.player = new YT.Player(_service.playerContainer, {
              height: '390',
              width: '640',
              events: {
                'onStateChange': _service.onPlayerStateChange,
                'onReady': function(){
                  _service.loadVideo(_service.getVideoSettingFromAContent(_service.currentContent));
                },
              }
            });
            clearInterval(_service.interval);
          }
        },500)
      }
    }

    function getVideoSettingFromAContent(content){
      var settings = {
        videoId:_service.getYouTubeIdFromURL(content.contentUrl)
      }
      if(content.startTime !== undefined){settings.startSeconds = content.startTime }
      if(content.endTime !== undefined){settings.endSeconds = content.endTime }
      return settings;
    }

    function loadVideo(settings,htmlElementId){
      if(_service.player){
        _service.player.loadVideoById(settings);
      }else{
        _service.setPlayer(htmlElementId);
      }
    }



    function getYouTubeIdFromURL(url){
      //debugger;
     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
     var match = url.match(regExp);
     if (match && match[7].length == 11) {
       return  match[7];
     }
    }



    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {

      }else{

      }
    }

   return _service;
  }

})();
