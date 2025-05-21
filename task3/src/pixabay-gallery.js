import iziToast from 'https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js';
import SimpleLightbox from 'https://cdn.jsdelivr.net/npm/simplelightbox/dist/simple-lightbox.esm.min.js';

const API_KEY = '50417684-17ed75f37e39511e863ef1e3d';
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return iziToast.warning({ message: 'Please enter a search query.', position: 'topRight' });

  gallery.innerHTML = '';
  loader.classList.remove('hidden');

  try {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`);
    const data = await response.json();

    loader.classList.add('hidden');

    if (data.hits.length === 0) {
      return iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
      });
    }

    const markup = data.hits.map(hit => `
      <a href="${hit.largeImageURL}">
        <div class="photo-card">
          <img src="${hit.webformatURL}" alt="${hit.tags}" />
          <div class="stats">
            <div><strong>Likes</strong><br>${hit.likes}</div>
            <div><strong>Views</strong><br>${hit.views}</div>
            <div><strong>Comments</strong><br>${hit.comments}</div>
            <div><strong>Downloads</strong><br>${hit.downloads}</div>
          </div>
        </div>
      </a>
    `).join('');

    gallery.innerHTML = markup;
    lightbox.refresh();
  } catch (err) {
    loader.classList.add('hidden');
    iziToast.error({ message: 'Fetch error. Please try again later.', position: 'topRight' });
  }
});