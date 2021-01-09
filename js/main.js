const isSupportedEffectiveType = !!navigator?.connection?.effectiveType;
const isSupportedType = !!navigator?.connection?.type;
const isSupportedSaveData = !!navigator?.connection?.saveData;
const isSupportedDeviceMemory = !!navigator?.deviceMemory;

const lowfi = ['slow-2g', '2g', '3g']
let nc;
let nm;
let connection;

if (isSupportedEffectiveType) {
  nc = navigator?.connection
  if (nc && nc.effectiveType.length > 0) {
    if (lowfi.indexOf(nc.effectiveType) >= 0) {
      connection = 'veryslow'
    } else {
      connection = 'fast'
    }
  } else {
    connection = 'slow'
  }
}

if (isSupportedType) {
  nc = navigator?.connection
  if (nc && nc.type.length > 0) {
    if (lowfi.indexOf(nc.type) >= 0) {
      connection = 'veryslow'
    } else {
      connection = 'fast'
    }
  } else {
    connection = 'slow'
  }
}

if (isSupportedSaveData) {
  nc = navigator?.connection;
  if (nc.saveData) {
    connection = 'veryslow';
  }
}

if (isSupportedDeviceMemory) {
  nm = navigator?.deviceMemory;
  connection = nm < 1 ? 'slow' : 'fast';
}

const mediaQuery = window.matchMedia('(max-width: 950px)').matches;

if (mediaQuery.matches) {
  connection = 'slow';
}

export {connection, mediaQuery};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service_worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

