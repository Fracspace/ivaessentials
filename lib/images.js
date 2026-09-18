// Image asset helper mapping local user files to CDN fallbacks
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
    fallbackHands: 'https://ivaessentials.com/cdn/shop/files/ChatGPT_Image_Apr_23_2026_12_55_42_PM.png?v=1777456760&width=1200',
    kashiSilhouette: '/images/kashi-silhouette.jpg',
    fallbackKashiSilhouette: 'https://ivaessentials.com/cdn/shop/files/ShivaSilhoutte_2.jpg?v=1779078433&width=2600',
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
      insideUrl: 'https://ivaessentials.com/cdn/shop/files/insideBlessedKit_90cb4623-f70a-4f25-a0e4-2336095fd761.png?height=1024&v=1782120045'
    },
    yatraKit: {
      id: 'yatra-kit',
      name: 'Yatra Kit',
      price: 199,
      local: '/images/yatra-kit.png',
      url: 'https://cdn.shopify.com/s/files/1/0705/4095/1667/files/yatraKit_4.png?v=1782802193',
      secondaryUrl: '/images/yatra-kit-secondary.jpg'
    },
    lakshmiSamagri: {
      id: 'lakshmi-samagri',
      name: 'Shree Mahalakshmi Pooja Samagri',
      price: 699,
      local: '/images/lakshmi-kit.png',
      url: 'https://ivaessentials.com/cdn/shop/files/lakshmiPookaKit.png?v=1777456303&width=1200'
    },
    shivaSamagri: {
      id: 'shiva-samagri',
      name: 'Shree Shiva Pooja Samagri',
      price: 699,
      local: '/images/shiva-kit.png',
      url: 'https://ivaessentials.com/cdn/shop/files/shivaPoojaKit.png?v=1777456301&width=900'
    },
    ganeshSamagri: {
      id: 'ganesh-samagri',
      name: 'Shree Vinayaka Pooja Samagri',
      price: 699,
      local: '/images/ganesh-kit.png',
      url: 'https://ivaessentials.com/cdn/shop/files/ganeshPoojaKit.png?v=1777456304&width=900'
    },
    vishnuSamagri: {
      id: 'vishnu-samagri',
      name: 'Shree Vishnu Pooja Samagri',
      price: 699,
      local: '/images/vishnu-kit.png',
      url: 'https://ivaessentials.com/cdn/shop/files/hanumanPoojaKit.png?v=1777456300&width=900'
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
 * Returns either local path if available or fallback url
 */
export function getImageSrc(localPath, fallbackUrl) {
  return fallbackUrl || localPath;
}
