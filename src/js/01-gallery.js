import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const listRef = document.querySelector('.gallery');

const createImgEl = galleryItems
  .map(({ preview, original, description }) => {
    return `
  <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
 </a>
    `;
  })
  .join('');

listRef.insertAdjacentHTML('beforeend', createImgEl);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
