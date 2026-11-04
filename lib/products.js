/**
 * Official IVA Essentials Product & SKU Registry
 * Maps product slugs, names, and identifiers to their official Database SKUs and UUIDs
 */

export const OFFICIAL_PRODUCTS = [
  {
    name: 'Vinayaka Pooja Samagri',
    slug: 'vinayaka-pooja-samagri',
    sku: 'IVA-RIT-VIPO-367',
    productId: '37b0af7b-e7c1-4f16-a27e-a7336a3a4352',
    price: 699
  },
  {
    name: 'Shiva Pooja Samagri',
    slug: 'shiva-pooja-samagri',
    sku: 'IVA-RIT-SHPO-926',
    productId: '76ac3f01-d64f-4c16-9e0e-834513144190',
    price: 699
  },
  {
    name: 'yatra kit',
    slug: 'yatra-kit',
    sku: 'IVA-RIT-YAKI-546',
    productId: '954fcbf1-6837-4d06-91af-8e76e877dc34',
    price: 1
  },
  {
    name: 'Blessed Kit',
    slug: 'blessed-kit',
    sku: 'IVA-RIT-BLKI-538',
    productId: 'c2dd34a4-a660-4329-aa3d-1a0616351bc1',
    price: 1
  },
  {
    name: '12 Bead Rudraksha Band',
    slug: '12-bead-rudraksha-band',
    sku: 'IVA-RIT-12BE-664',
    productId: 'eabdb7da-bdfe-4a48-a517-05c1144985bd',
    price: 2
  },
  {
    name: 'Shree Vishnu Pooja Samagri',
    slug: 'shree-vishnu-pooja-samagri',
    sku: 'IVA-RIT-VISH-269',
    productId: '748a74c6-f26e-4225-98f6-1e92a557c981',
    price: 699
  },
  {
    name: 'Shree Mahalaxmi Pooja Samagri',
    slug: 'shree-mahalaxmi-pooja-samagri',
    sku: 'IVA-RIT-SHMA-679',
    productId: '2982c9d6-5eb2-4e24-8a1d-927a8a7e8c06',
    price: 699
  }
];

export const SKU_MAP = {
  // Vinayaka Pooja Samagri
  'vinayaka-pooja-samagri': 'IVA-RIT-VIPO-367',
  'vinayaka pooja samagri': 'IVA-RIT-VIPO-367',
  'ganesh-samagri': 'IVA-RIT-VIPO-367',
  'ganesh': 'IVA-RIT-VIPO-367',
  'vinayaka': 'IVA-RIT-VIPO-367',
  '37b0af7b-e7c1-4f16-a27e-a7336a3a4352': 'IVA-RIT-VIPO-367',
  'IVA-RIT-VIPO-367': 'IVA-RIT-VIPO-367',

  // Shiva Pooja Samagri
  'shiva-pooja-samagri': 'IVA-RIT-SHPO-926',
  'shiva pooja samagri': 'IVA-RIT-SHPO-926',
  'shiva-samagri': 'IVA-RIT-SHPO-926',
  'shiva': 'IVA-RIT-SHPO-926',
  '76ac3f01-d64f-4c16-9e0e-834513144190': 'IVA-RIT-SHPO-926',
  'IVA-RIT-SHPO-926': 'IVA-RIT-SHPO-926',

  // yatra kit
  'yatra-kit': 'IVA-RIT-YAKI-546',
  'yatra kit': 'IVA-RIT-YAKI-546',
  'yatra': 'IVA-RIT-YAKI-546',
  '954fcbf1-6837-4d06-91af-8e76e877dc34': 'IVA-RIT-YAKI-546',
  'IVA-RIT-YAKI-546': 'IVA-RIT-YAKI-546',

  // Blessed Kit
  'blessed-kit': 'IVA-RIT-BLKI-538',
  'blessed kit': 'IVA-RIT-BLKI-538',
  'blessed': 'IVA-RIT-BLKI-538',
  'c2dd34a4-a660-4329-aa3d-1a0616351bc1': 'IVA-RIT-BLKI-538',
  'IVA-RIT-BLKI-538': 'IVA-RIT-BLKI-538',

  // 12 Bead Rudraksha Band
  '12-bead-rudraksha-band': 'IVA-RIT-12BE-664',
  '12 bead rudraksha band': 'IVA-RIT-12BE-664',
  '12-bead': 'IVA-RIT-12BE-664',
  'rudraksha-band': 'IVA-RIT-12BE-664',
  'rudraksha': 'IVA-RIT-12BE-664',
  'eabdb7da-bdfe-4a48-a517-05c1144985bd': 'IVA-RIT-12BE-664',
  'IVA-RIT-12BE-664': 'IVA-RIT-12BE-664',

  // Shree Vishnu Pooja Samagri
  'shree-vishnu-pooja-samagri': 'IVA-RIT-VISH-269',
  'vishnu-pooja-samagri': 'IVA-RIT-VISH-269',
  'vishnu': 'IVA-RIT-VISH-269',
  'vishnu-samagri': 'IVA-RIT-VISH-269',
  '748a74c6-f26e-4225-98f6-1e92a557c981': 'IVA-RIT-VISH-269',
  'IVA-RIT-VISH-269': 'IVA-RIT-VISH-269',

  // Shree Mahalaxmi Pooja Samagri
  'shree-mahalaxmi-pooja-samagri': 'IVA-RIT-SHMA-679',
  'shree-mahalakshmi-pooja-samagri': 'IVA-RIT-SHMA-679',
  'mahalaxmi-pooja-samagri': 'IVA-RIT-SHMA-679',
  'lakshmi-samagri': 'IVA-RIT-SHMA-679',
  'laxmi-samagri': 'IVA-RIT-SHMA-679',
  'lakshmi': 'IVA-RIT-SHMA-679',
  '2982c9d6-5eb2-4e24-8a1d-927a8a7e8c06': 'IVA-RIT-SHMA-679',
  'IVA-RIT-SHMA-679': 'IVA-RIT-SHMA-679',
};

/**
 * Returns the official SKU for any product identifier, slug, or name
 */
export function getProductSku(identifier) {
  if (!identifier) return '';
  const key = String(identifier).trim().toLowerCase();
  return SKU_MAP[key] || SKU_MAP[identifier] || '';
}

/**
 * Returns full product details by identifier, slug, or SKU
 */
export function getProductDetails(identifier) {
  const sku = getProductSku(identifier);
  if (sku) {
    return OFFICIAL_PRODUCTS.find(p => p.sku === sku) || null;
  }
  return null;
}

/**
 * Fetch all products from Backend API (/api/products)
 */
export async function fetchProductsApi() {
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');
  try {
    const res = await fetch(`${API_URL}/api/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.success && Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.warn('⚠️ [Products API] Fetch failed, using fallback catalog:', err.message);
    return [];
  }
}

/**
 * Fetch a single product from Backend API by slug or UUID (/api/products/:slugOrId)
 */
export async function fetchProductBySlugApi(slugOrId) {
  if (!slugOrId) return null;
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');
  try {
    const res = await fetch(`${API_URL}/api/products/${encodeURIComponent(slugOrId)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success && data.data ? data.data : null;
  } catch (err) {
    console.warn(`⚠️ [Products API] Fetch product ${slugOrId} failed:`, err.message);
    return null;
  }
}
