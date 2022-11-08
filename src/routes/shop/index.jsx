import React, { lazy, Suspense } from 'react'
import { useLoaderData } from 'react-router-dom';
import { client } from '../../context/store';

import Loading from '_c/Loading';
const Products = lazy(() => import('_c/shop/Products'));

export async function loader() {
  return await client.product.fetchAll();
}

export default function Shop() {
  let products = useLoaderData();

  if (!products) {
    return (
      <h3 className='text-center'>We outta shit.</h3>
    )
  }
  return (
    <>
      <h1 className='title'>Web Store</h1>
      <h4 className="sub-title">Ecommerce Integration with Shopify</h4>
      <Suspense fallback={<Loading />}>
        <Products products={products} />
      </Suspense>
    </>
  )
}
