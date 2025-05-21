import"https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js";import"https://cdn.jsdelivr.net/npm/simplelightbox/dist/simple-lightbox.min.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d="50417684-17ed75f37e39511e863ef1e3d",l=document.getElementById("search-form"),m=document.getElementById("search-input"),c=document.getElementById("gallery"),i=document.getElementById("loader");let u=new SimpleLightbox(".gallery a");l.addEventListener("submit",async a=>{a.preventDefault();const o=m.value.trim();if(!o){iziToast.warning({message:"Please enter a search query.",position:"topRight"});return}c.innerHTML="",i.classList.remove("hidden");try{const s=`https://pixabay.com/api/?key=${d}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true`,e=await(await fetch(s)).json();if(i.classList.add("hidden"),e.hits.length===0){iziToast.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"});return}const t=e.hits.map(r=>`
      <a href="${r.largeImageURL}">
        <div class="photo-card">
          <img src="${r.webformatURL}" alt="${r.tags}" />
          <div class="stats">
            <div><strong>Likes</strong><br>${r.likes}</div>
            <div><strong>Views</strong><br>${r.views}</div>
            <div><strong>Comments</strong><br>${r.comments}</div>
            <div><strong>Downloads</strong><br>${r.downloads}</div>
          </div>
        </div>
      </a>
    `).join("");c.innerHTML=t,u.refresh()}catch{i.classList.add("hidden"),iziToast.error({message:"Fetch error. Please try again later.",position:"topRight"})}});
