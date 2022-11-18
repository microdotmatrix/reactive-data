import React, { Component } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();

export const client = Client.buildClient({
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN,
  domain: import.meta.env.VITE_SHOPIFY_URL,
});

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    lineItem: {},
    isCartOpen: false,
  };

  componentDidMount() {
    //Check if localStorage has a checkout_id saved
    if (localStorage.checkout) {
      this.fetchCheckout(localStorage.checkout);
    } else {
      this.createCheckout();
    }
  }

  async createCheckout() {
    // localStorage.setItem("checkout", checkout);
    const checkout = await client.checkout.create().then((checkout) => {
      this.setState({
        checkout: checkout
      })
    });
  };

  async fetchCheckout (checkoutId) {
    const checkout = await client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((err) => console.log(err));
  };

  async addItemToCheckout (variantId, quantity) {
    const lineItemsToAdd = {
      variantId,
      quantity: parseInt(quantity, 10),
    };
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      [lineItemsToAdd]
    ).then(checkout => {
      this.setState({ checkout: checkout });
    });
    // console.log(checkout);

    this.openCart();
  };

  async updateQuantityInCheckout(lineItemId, quantity) {
    const lineItemsToUpdate = [
      {
        id: lineItemId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.updateLineItems(
      this.state.checkout.id,
      lineItemsToUpdate
    ).then(checkout => {
      this.setState({ checkout: checkout });
    });
  }

  async removeItemFromCheckout (lineItemId, quantity) {
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      [lineItemId]
    ).then(checkout => {
      this.setState({ checkout: checkout })
    });
  };

  async getCheckoutSubtotal(lineItems, quantity) {
    
    let totalPrice = 0
    lineItems.forEach(item => totalPrice += parseInt(item.variant.quantity) * parseFloat(item.variant.price.amount))
    return Math.round(totalPrice * 100) / 100
  }

  async fetchAllProducts() {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  async fetchProductWithId() {
    const product = await client.product.fetch(id);
    this.setState({ product: product });
    // console.log(JSON.stringify(product));

    return product;
  };

  async fetchProductWithHandle() {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });
    // console.log(JSON.stringify(product));

    return product;
  };

  fetchCollections = async () => {
    const collections = await client.collection.fetchAllWithProducts();
    this.setState({ collections: collections });
  }

  fetchCollectionWithId = async (id) => {
    const collection = await client.collection.fetchWithProducts(id, { productsFirst: 50 });
    this.setState({ products: collection.products })

    return products;
  }

  closeNav = () => {
    this.setState({ isNavOpen: false });
  };

  openNav = () => {
    this.setState({ isNavOpen: true });
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          fetchProductWithHandle: this.fetchProductWithHandle,
          fetchCollections: this.fetchCollections,
          fetchCollectionWithId: this.fetchCollectionWithId,
          getCheckoutSubtotal: this.getCheckoutSubtotal,
          closeNav: this.closeNav.bind(this),
          openNav: this.openNav.bind(this),
          closeCart: this.closeCart.bind(this),
          openCart: this.openCart.bind(this),
          addItemToCheckout: this.addItemToCheckout.bind(this),
          updateQuantityInCheckout: this.updateQuantityInCheckout.bind(this),
          removeItemFromCheckout: this.removeItemFromCheckout.bind(this),
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;