import { useState } from 'react'

export default function ProductImages({ product }) {
  const [primaryImage, setPrimaryImage] = useState(product.images[0].src);

  return (
    <>
      {product.images.map((image, index) => (
        <button
          key={index}
          onClick={() => setPrimaryImage(image.src.toString())}
        >
          <img
            src={image.src.toString()}
            className="w-full h-full object-cover"
            alt={product.title}
          />
        </button>
      ))}
    </>
  )
}
