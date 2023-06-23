import * as turbo from '@hotwired/turbo';

turbo.start();

function toggleImageClass(pathname, addClass = true) {
  // find the image that corresponds to the album that was clicked
  const albumLinkEl = document.querySelector(`[href="${pathname}"]`);
  const img = albumLinkEl.querySelector('img');

  if (addClass) {
    img.classList.add('album-image');
  } else {
    img.classList.remove('album-image');
  }
}

async function handleHomeNavigation(event) {
  let pathname

  const transition = document.startViewTransition(async () => {
    await event.detail.resume();

    pathname =
      turbo.navigator.lastVisit?.location.pathname ||
      turbo.navigator.currentVisit?.referrer.pathname;

    toggleImageClass(pathname);
  });

  await transition.finished;

  toggleImageClass(pathname, false);
}

function handleAlbumNavigation(event) {
  // find the image that corresponds to the album that was clicked
  toggleImageClass(location.pathname);

  document.startViewTransition(() => {
    event.detail.resume();
  });
}

function beforeRender(event) {
  // prevent adding multiple event listeners
  document.removeEventListener('turbo:before-render', beforeRender);

  // loads the next page's HTML but doesn't render it
  event.preventDefault();

  if (!'startViewTransition' in document) {
    // no View Transitions API support; fall back
    event.detail.resume();
    return;
  }

  if (location.pathname === '/') {
    handleHomeNavigation(event);
  } else {
    handleAlbumNavigation(event);
  }
}

document.addEventListener('turbo:load', () => {
  document.addEventListener('turbo:before-render', beforeRender);
});
