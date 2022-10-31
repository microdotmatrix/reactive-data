import React from 'react'
import { Link } from 'react-router-dom';

export default function Products({ products }) {
  return (
    <div>
      <ul className="product-list grid grid-cols-2 gap-2">
        {products.map(({ title, handle, images, description, variants }, index) => (
          <li className='grid grid-cols-2 gap-4' key={index}>
            <div style={{ blockSize: '15em', overflow: 'hidden' }}>
              <img src={images[0].src.toString()} className="w-full h-full object-cover" alt={title} />
            </div>
            <div>
              <h4><Link to={`/shop/${handle}`}>{title}</Link></h4>
              <p className='text-sm'>{description}</p>
              <h5>{variants[0].priceV2.amount.toString()}</h5>
            </div>

          </li>
        ))} 
      </ul>
    </div>
  )
}
