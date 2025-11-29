// Synchronize hero video across pages using localStorage
(function(){
  const KEY_TIME = 'bg_hero_time';
  const KEY_TS = 'bg_hero_time_ts';
  const SAVE_MS = 1000;
  function safeNum(v){ return (v===null||v===undefined||isNaN(v))?0:Number(v); }

  function initForVideo(video){
    if(!video) return;
    let saveTimer = null;
    function save(){
      try{
        localStorage.setItem(KEY_TIME, String(video.currentTime||0));
        localStorage.setItem(KEY_TS, String(Date.now()));
      }catch(e){/* ignore */}
    }
    // when metadata ready, seek to synced time
    function restore(){
      try{
        const saved = safeNum(localStorage.getItem(KEY_TIME));
        const savedTs = safeNum(localStorage.getItem(KEY_TS));
        const now = Date.now();
        const elapsed = savedTs?((now - savedTs)/1000):0;
        let target = saved + elapsed;
        if(video.duration && isFinite(video.duration) && video.duration > 0){
          // loop the target within duration
          target = target % video.duration;
          if(target < 0) target = 0;
        }
        // only seek if difference is noticeable
        if(Math.abs((video.currentTime||0) - target) > 0.5){
          try{ video.currentTime = target; }catch(e){}
        }
        // try play (muted videos usually allowed to autoplay)
        const p = video.play();
        if(p && p.catch){ p.catch(()=>{}); }
      }catch(e){/* ignore */}
    }

    video.addEventListener('loadedmetadata', restore);
    video.addEventListener('canplay', restore);
    // periodic save
    saveTimer = setInterval(()=>{
      if(!video.paused && !video.ended){ save(); }
    }, SAVE_MS);

    document.addEventListener('visibilitychange', ()=>{ if(document.hidden) save(); });
    window.addEventListener('beforeunload', save);
  }

  function findAndInit(){
    const v = document.querySelector('.hero-video');
    if(v) initForVideo(v);
  }

  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    findAndInit();
  } else {
    document.addEventListener('DOMContentLoaded', findAndInit);
  }
})();
