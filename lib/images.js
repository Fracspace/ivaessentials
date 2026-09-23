// Image asset mapping serving 100% local images from public/images
export const IMAGES = {
  logo: {
    darkText: '/images/iva-logo.png',
    lightText: '/images/iva-logo-light.png',
    original: '/images/iva-logo-original.png'
  },
  hero: {
    bg: '/images/hero-bg.jpg',
    fallbackBg: '/images/hero-bg.jpg',
    hands: '/images/hands-pooja.png',
    fallbackHands: '/images/blessed-kit.jpg',
    kashiSilhouette: '/images/kashi-silhouette.jpg',
    fallbackKashiSilhouette: '/images/hero-bg.jpg',
    sigBlessedKit: '/images/sig-blessed-kit.png',
    fallbackSigBlessedKit: '/images/blessed-kit.jpg'
  },
  products: {
    blessedKit: {
      id: 'blessed-kit',
      name: 'Blessed Kit',
      price: 1499,
      local: '/images/blessed-kit.jpg',
      url: '/images/blessed-kit.jpg',
      heroUrl: '/images/blessed-kit.jpg',
      insideUrl: '/images/inside-blessed-kit.jpg'
    },
    yatraKit: {
      id: 'yatra-kit',
      name: 'Yatra Kit',
      price: 199,
      local: '/images/yatra-kit.jpg',
      url: '/images/yatra-kit.jpg',
      secondaryUrl: '/images/yatra-kit-secondary.jpg'
    },
    lakshmiSamagri: {
      id: 'lakshmi-samagri',
      name: 'Shree Mahalakshmi Pooja Samagri',
      price: 699,
      local: '/images/lakshmi-kit.jpg',
      url: '/images/lakshmi-kit.jpg'
    },
    shivaSamagri: {
      id: 'shiva-samagri',
      name: 'Shree Shiva Pooja Samagri',
      price: 699,
      local: '/images/shiva-kit.jpg',
      url: '/images/shiva-kit.jpg'
    },
    ganeshSamagri: {
      id: 'ganesh-samagri',
      name: 'Shree Vinayaka Pooja Samagri',
      price: 699,
      local: '/images/ganesh-kit.jpg',
      url: '/images/ganesh-kit.jpg'
    },
    vishnuSamagri: {
      id: 'vishnu-samagri',
      name: 'Shree Vishnu Pooja Samagri',
      price: 699,
      local: '/images/vishnu-kit.jpg',
      url: '/images/vishnu-kit.jpg'
    },
    sacredGifting: {
      id: 'sacred-gifting',
      name: 'Sacred Gifting',
      price: 1299,
      local: '/images/sacred-gifting.jpg',
      url: '/images/sacred-gifting.jpg'
    }
  },
  journey: {
    sankalp: '/images/sankalp-received.jpg',
    temple: '/images/temple-rituals.jpg',
    packed: '/images/kit-packed.jpg',
    delivery: '/images/kit-delivered.jpg'
  }
};

/**
 * Always returns local path
 */
export function getImageSrc(localPath) {
  return localPath;
}
