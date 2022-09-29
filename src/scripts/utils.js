export function getLink(href) {
  const fullLink = new URL(href, location.href).href

  return [...document.querySelectorAll('a')].find(
    (link) => link.href === fullLink
  )
}

export async function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout)
  })
}
