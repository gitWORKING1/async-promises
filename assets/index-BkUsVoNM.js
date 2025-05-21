import i from"https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js";import l from"https://cdn.jsdelivr.net/npm/simplelightbox/dist/simple-lightbox.esm.min.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const m="50417684-17ed75f37e39511e863ef1e3d",u=document.getElementById("search-form"),g=document.getElementById("search-input"),d=document.getElementById("gallery"),a=document.getElementById("loader");let f=new l(".gallery a");u.addEventListener("submit",async c=>{c.preventDefault();const r=g.value.trim();if(!r)return i.warning({message:"Please enter a search query.",position:"topRight"});d.innerHTML="",a.classList.remove("hidden");try{const o=await(await fetch(`https://pixabay.com/api/?key=${m}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`)).json();if(a.classList.add("hidden"),o.hits.length===0)return i.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"});const t=o.hits.map(e=>`
      <a href="${e.largeImageURL}">
        <div class="photo-card">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="stats">
            <div><strong>Likes</strong><br>${e.likes}</div>
            <div><strong>Views</strong><br>${e.views}</div>
            <div><strong>Comments</strong><br>${e.comments}</div>
            <div><strong>Downloads</strong><br>${e.downloads}</div>
          </div>
        </div>
      </a>
    `).join("");d.innerHTML=t,f.refresh()}catch{a.classList.add("hidden"),i.error({message:"Fetch error. Please try again later.",position:"topRight"})}});
