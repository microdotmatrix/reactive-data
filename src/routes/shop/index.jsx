import React, { lazy, Suspense } from 'react'
import { useLoaderData } from 'react-router-dom';
import { sleep } from '_u/api';
import { client } from '../../context/store';
import Content from '_c/Content'

import Loading from '_c/Loading';
const Products = lazy(() => import('_c/shop/Products'));
// import Products from '_c/shop/Products';

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
    <Content>
      <h1>Buy Shit</h1>
      <Suspense fallback={<Loading />}>
        <Products products={products} />
      </Suspense>
    </Content>
  )
}
