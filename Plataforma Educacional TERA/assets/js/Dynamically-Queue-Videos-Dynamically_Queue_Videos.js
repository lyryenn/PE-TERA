var player,
  $playerWidth = "100%",
  vidList = [],
  time_update_interval = 0;
$("#dqv .vids img").each(function () {
  vidList.push($(this).data("video-id"));
});
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video-placeholder", {
    width: $playerWidth,
    videoId: vidList[0],
    playerVars: { color: "white", playlist: vidList.slice(1).join(",") },
    events: { onReady: initialize },
  });
}
function initialize() {
  updateTimerDisplay(),
    updateProgressBar(),
    clearInterval(time_update_interval),
    (time_update_interval = setInterval(function () {
      updateTimerDisplay(), updateProgressBar();
    }, 1e3)),
    $("#volume-input").val(Math.round(player.getVolume()));
}
function formatTime(e) {
  e = Math.round(e);
  var t = Math.floor(e / 60),
    a = e - 60 * t;
  return (a = 10 > a ? "0" + a : a), t + ":" + a;
}
function updateTimerDisplay() {
  $("#current-time").text(formatTime(player.getCurrentTime())),
    $("#duration").text(formatTime(player.getDuration()));
}
function updateProgressBar() {
  $("#progress-bar").val(
    (player.getCurrentTime() / player.getDuration()) * 100
  );
}
var player,
  $playerWidth = "100%",
  time_update_interval = 0;
$(function () {
  $("#progress-bar").on("mouseup touchend", function (e) {
    var t = player.getDuration() * (e.target.value / 100);
    player.seekTo(t);
  }),
    $("#play").on("click", function () {
      player.playVideo();
    }),
    $("#pause").on("click", function () {
      player.pauseVideo();
    }),
    $("#mute-toggle").on("click", function () {
      var e = $(this);
      player.isMuted()
        ? (player.unMute(), e.text("volume_up"))
        : (player.mute(), e.text("volume_off"));
    }),
    $("#volume-input").on("change", function () {
      player.setVolume($(this).val());
    }),
    $("#speed").on("change", function () {
      player.setPlaybackRate($(this).val());
    }),
    $("#quality").on("change", function () {
      player.setPlaybackQuality($(this).val());
    }),
    $("#next").on("click", function () {
      player.nextVideo();
    }),
    $("#prev").on("click", function () {
      player.previousVideo();
    }),
    $(".thumbnail").on("click", function () {
      var e = $(this).attr("data-video-id");
      player.cueVideoById(e);
    }),
    $("pre code").each(function (e, t) {
      hljs.highlightBlock(t);
    }),
    onYouTubeIframeAPIReady();
});
