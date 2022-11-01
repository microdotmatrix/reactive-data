import React, { lazy, Suspense } from 'react'
import { useParams, useLoaderData } from 'react-router-dom'; 
import { client } from '../../context/store';

import Content from '_c/Content'
const ProductCard = lazy(() => import('_c/shop/ProductCard'));

export async function loader({ params }) {
  let handle = params.handle;
  return await client.product.fetchByHandle(handle);
}

export default function Product() {
  let handle = useParams();
  let product = useLoaderData();
  const optionSelect = product.variants.map((variant, index) => {
    return (
      <select name={variant.title} id={variant.id}>{variant.title}</select>
    )
  })
  if (!product) {
    return (
      <div className='w-full h-full flex flex-col items-center'>
        <Icon icon="bxs:angry" width="12rem" />
        <h2>Where's my product!?</h2>
      </div>
    )
  }
  return (
    <Content>
      <Suspense fallback={"Loading product info..."}>
        <ProductCard product={product} handle={handle} optionSelect={optionSelect} />
      </Suspense>
    </Content>
  )
}
