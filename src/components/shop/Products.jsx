import React from 'react'
import { Link } from 'react-router-dom';

import { formatCurrency } from '../../utils/helpers';

export default function Products({ products }) {
  return (
    <div>
      <ul className="product-list grid grid-cols-1 md:grid-cols-2 gap-2">
        {products.map(({ title, handle, images, descriptionHtml, variants }, index) => (
          <li className='grid grid-cols-2 gap-4' key={index}>
            <div style={{ blockSize: '15em', overflow: 'hidden' }}>
              <Link to={`/shop/${handle}`}>
                <img src={images[0].src.toString()} className="w-full h-full object-cover" alt={title} />
              </Link>
            </div>
            <div>
              <h4 className='product-name'><Link to={`/shop/${handle}`}>{title}</Link></h4>
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
              <h5>{formatCurrency(variants[0].price.amount.toString())}</h5>
            </div>
          </li>
        ))} 
      </ul>
    </div>
  )
}
