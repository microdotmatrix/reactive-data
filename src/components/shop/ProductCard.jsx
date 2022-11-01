import { useContext, useState } from 'react';
import { ShopContext } from "../../context/store";


export default function ProductCard({ product, optionSelect }) {
  const { addItemToCheckout } = useContext(ShopContext); 
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [variant, setVariant] = useState(product.variants[0])
  function handleSizeChange(e) {
    setVariantId(e)
    // send back size change
    const selectedVariant = variants.filter(v => v.id === e).pop()

    // update variant
    setVariant(selectedVariant)
  }

  return (
    <div className='w-5/6'>
      <div className="grid grid-cols-2">
        <div>
          <h2>{product.title}</h2>
          <p>{product.descriptionHtml}</p>
          
          <h3>${product.variants[0].price.amount}</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {product.variants.length < 1 ? (
              null
            ) : (
              <select name="variant-selector" id="variant-selector" value={variantId} onChange={(event) => handleSizeChange(event.target.value)}>
                {optionSelect}
              </select>
            )}
            <button className='add-to-cart' onClick={() => addItemToCheckout(product.variants[0].id.toString(), 1)}>
              Add to Cart
            </button>
          </div>
        </div>
        <div className="product__images grid grid-cols-3 gap-2">
          <div className="col-span-3">
            <img src={product.images[0].src.toString()} className="w-full object-cover" alt={product.title} />
          </div>
          {product.images.slice(1, 10).map((image, index) => (
            <div className='col-span-1' key={index}>
              <img src={image.src.toString()} className="w-full h-full object-cover" alt={product.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}