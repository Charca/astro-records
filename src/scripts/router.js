import * as Turbo from '@hotwired/turbo'
import { getLink, wait } from './utils'

Turbo.start()

function onBeforeRender(event) {
  event.preventDefault()

  if (!document.createDocumentTransition) {
    event.detail.resume()
  }

  if (location.pathname === '/') {
    handleHomeNavigation(event)
  } else {
    handleAlbumNavigation(event)
  }

  document.removeEventListener('turbo:before-render', onBeforeRender)
}

async function handleHomeNavigation(event) {
  const transition = document.createDocumentTransition()

  const vynil = document.querySelector('.vynil-image')
  if (vynil) {
    vynil.classList.add('vynil-animation-out')

    await wait(300)
  }

  let image

  transition
    .start(async () => {
      event.detail.resume()

      await new Promise((resolve) => requestAnimationFrame(resolve))

      const fromPath =
        Turbo.navigator.lastVisit?.location.pathname ||
        Turbo.navigator.currentVisit.referrer.pathname

      const link = getLink(fromPath)
      image = link.querySelector('.card-image')
      image.classList.add('tag-album-cover')
    })
    .then(() => {
      image.classList.remove('tag-album-cover')
    })
}

function handleAlbumNavigation(event) {
  const toPath = location.pathname
  const link = getLink(toPath)
  const image = link.querySelector('.card-image')
  image.classList.add('tag-album-cover')

  const transition = document.createDocumentTransition()
  transition.start(() => {
    image.classList.remove('tag-album-cover')
    event.detail.resume()
  })
}

document.addEventListener('turbo:load', (event) => {
  document.addEventListener('turbo:before-render', onBeforeRender)
})
