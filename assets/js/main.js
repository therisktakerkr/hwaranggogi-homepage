(()=>{
  document.documentElement.classList.add('js-cinema');
  const header=document.querySelector('.site-header');
  const hero=document.querySelector('.cinematic-hero');
  const source=document.querySelector('.hwarang-history');
  const locationPhoto=document.querySelector('[data-parallax="location"]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setNav=()=>header?.classList.toggle('scrolled',scrollY>20);
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  let ticking=false;
  const updateScroll=()=>{
    ticking=false; setNav();
    if(reduced) return;
    if(hero){const r=hero.getBoundingClientRect();hero.style.setProperty('--hero-scroll',clamp(-r.top/Math.max(r.height*.72,1)).toFixed(3));}
    if(source){const r=source.getBoundingClientRect();const p=clamp((innerHeight-r.top)/(r.height+innerHeight*.3));source.style.setProperty('--source-progress',p.toFixed(3));}
    if(locationPhoto){const r=locationPhoto.getBoundingClientRect();const p=clamp((innerHeight-r.top)/(innerHeight+r.height));locationPhoto.style.setProperty('--location-shift',p.toFixed(3));}
  };
  const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}};
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});updateScroll();

  const targets=document.querySelectorAll('[data-cinema]');
  if(reduced){targets.forEach(el=>el.classList.add('is-visible'));}
  else{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    }),{rootMargin:'0px 0px -12% 0px',threshold:.12});
    targets.forEach(el=>observer.observe(el));
  }

  const button=document.querySelector('[data-nav-toggle]'),nav=document.querySelector('.mobile-nav');
  if(button&&nav){
    const setOpen=open=>{button.setAttribute('aria-expanded',String(open));nav.dataset.open=String(open);nav.toggleAttribute('inert',!open);nav.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':''};
    setOpen(false);button.addEventListener('click',()=>setOpen(button.getAttribute('aria-expanded')!=='true'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));addEventListener('keydown',e=>{if(e.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){setOpen(false);button.focus()}});
  }
})();

/* V15: introduce the brand, then clear the frame for the food after 2.6 seconds. */
(()=>{
  const hero=document.querySelector('[data-hero-reveal]');
  if(!hero||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let hideTimer;
  const scheduleHide=(delay=2600)=>{
    clearTimeout(hideTimer);
    hideTimer=setTimeout(()=>{
      if(!hero.matches(':focus-within')){
        hero.classList.remove('is-interacting');
        hero.classList.add('hero-copy-hidden');
      }
    },delay);
  };
  const reveal=()=>{
    hero.classList.remove('hero-copy-hidden');
    hero.classList.add('is-interacting');
    scheduleHide(2600);
  };
  scheduleHide();
  hero.addEventListener('pointermove',reveal,{passive:true});
  hero.addEventListener('pointerdown',reveal,{passive:true});
  hero.addEventListener('touchstart',reveal,{passive:true});
  hero.addEventListener('focusin',reveal);
  hero.addEventListener('focusout',()=>scheduleHide(1200));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) scheduleHide(2600)});
})();


/* V25: synchronize the signature film with menu highlights. */
(()=>{
  const media=document.querySelector('.signature-v25-media');
  const video=media?.querySelector('video');
  const card=document.querySelector('[data-sync-card="true"]');
  if(!media||!video||!card) return;
  const labels=[...media.querySelectorAll('[data-scene]')];
  const items=[...card.querySelectorAll('[data-sync]')];
  const price=card.querySelector('.signature-price');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sceneFor=t=>{
    const d=video.duration||4;
    const x=((t%d)+d)%d;
    if(x<.72) return 'pork';
    if(x<1.42) return 'fire';
    if(x<2.18) return 'ramen';
    if(x<2.92) return 'albap';
    if(x<3.55) return 'final';
    return 'unlimited';
  };
  let last='';
  const render=()=>{
    const scene=reduced?'final':sceneFor(video.currentTime);
    if(scene!==last){
      last=scene;
      labels.forEach(el=>el.classList.toggle('is-active',el.dataset.scene===scene));
      items.forEach(el=>el.classList.toggle('is-sync-active',el.dataset.sync===scene || (scene==='unlimited'&&el.dataset.sync==='final')));
      price?.classList.toggle('is-price-active',scene==='final'||scene==='unlimited');
      card.classList.toggle('is-scene-active',true);
    }
    requestAnimationFrame(render);
  };
  render();
})();

/* Load the Instagram embed script only once the Instagram section actually
   scrolls into view, instead of on every page load. Cuts an unconditional
   third-party script + iframe from the initial page weight. */
(()=>{
  const section=document.getElementById('instagram');
  if(!section) return;
  let loaded=false;
  const loadEmbed=()=>{
    if(loaded) return;
    loaded=true;
    const script=document.createElement('script');
    script.async=true;
    script.src='https://www.instagram.com/embed.js';
    document.body.appendChild(script);
  };
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){loadEmbed();observer.disconnect();}
  }),{rootMargin:'200px 0px'});
  observer.observe(section);
})();
