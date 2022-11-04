import React, { Component } from "react";
import { client } from './store';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    product: {},
  };

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

  async fetchCollections() {
    const collections = await client.collection.fetchAllWithProducts();
    this.setState({ collections: collections });
  }

  async fetchCollectionWithId() {
    const collection = await client.collection.fetchWithProducts(id, { productsFirst: 50 });
    this.setState({ products: collection.products })

    return products;
  }



  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithId: this.fetchProductWithId,
          fetchProductWithHandle: this.fetchProductWithHandle,
          fetchCollections: this.fetchCollections,
          fetchCollectionWithId: this.fetchCollectionWithId
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductContext };

export default ProductProvider;