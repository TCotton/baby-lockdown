import {connection, mediaQuery} from './main';
import videojs from 'video.js';
import 'wavesurfer.js';
import WaveSurfer from 'videojs-wavesurfer';
import poster from './../img/eye.jpg';
// Avoid `console` errors in browsers that lack a console.
(function () {
  let method;
  let noop = function () {
  };
  let methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  let length = methods.length;
  let console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

let largeVideo;
let smallVideo;

if (window.location.host === 'rough-cloud-0056.on.fleek.co') {
  smallVideo = 'https://tcotton-team-bucket.storage.fleek.co/baby/baby-smaller.mp4';
  largeVideo = 'https://tcotton-team-bucket.storage.fleek.co/baby/baby-smaller.mp4';
}
const video = connection === 'slow' ? smallVideo : largeVideo;
const options = {
  controls: true,
  autoplay: false,
  loop: false,
  width: 950,
  height: 540,
  inactivityTimeout: 0,
  bigPlayButton: false,
  preload: true,
  poster: poster,
  plugins: {
    wavesurfer: {
      backend: 'MediaElement',
      displayMilliseconds: false,
      debug: true,
      barGap: mediaQuery ? 2 : 10,
      waveColor: '#152868',
      progressColor: '#cc3215',
      cursorColor: mediaQuery ? 'darkgrey' : 'white',
      cursorColor: mediaQuery ? 'darkgrey' : 'white',
      barHeight: 1,
      cursorWidth: mediaQuery ? 1 : 10,
      height: mediaQuery ? 64 : 128,
      normalize: mediaQuery ? true : false,
      barWidth: mediaQuery ? 2 : 10,
      barRadius: 0,
      hideScrollbar: true,
      container: '#waveform',
      responsive: true,
      partialRender: false,
      scrollParent: true,
      fillParent: true,
      interact: false
    }
  }
};

// create player
let player = videojs('myVideo', options, function () {
  // print version information at startup
  const msg = 'Using video.js ' + videojs.VERSION +
    ' with videojs-wavesurfer ' +
    videojs.getPluginVersion('wavesurfer') +
    ' and wavesurfer.js ' + WaveSurfer.VERSION;
  videojs.log(msg);

  // load file
  player.src({src: video, type: 'video/mp4'});
});

player.on('waveReady', function () {
  console.log('waveform: ready!');
  console.log('Thanks for the tunes Four Tet');
  const loading = document.querySelectorAll('.loading');
  if (loading) loading.forEach(x => x.classList.remove('.loading'));
  const ldsRoller = document.querySelector('.lds-roller');
  ldsRoller.classList.add('loading');
});

player.on('playbackFinish', function () {
  console.log('playback finished.');
});

// error handling
player.on('error', function (element, error) {
  console.warn('ERROR:', error);
});
