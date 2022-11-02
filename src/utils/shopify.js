import Client from 'shopify-buy'

export const client = Client.buildClient({
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN,
  domain: import.meta.env.VITE_SHOPIFY_URL,
});

export async function createCheckout() {
  const checkout = await client.checkout.create().then((checkout) => {
    localStorage.setItem('checkoutId', checkout.id);
  });
  return checkout
};

const checkoutId = localStorage.getItem('checkoutId');

export async function fetchCheckout (checkoutId) {
  const checkout = await client.checkout
    .fetch(checkoutId)
    .then((checkout) => {
      return checkout
    })
  .catch((err) => console.log(err));
};