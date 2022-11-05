import { lazy, Suspense, useContext, useState } from "react";
import { ShopContext } from "../../context/store";

import { formatCurrency } from "../../utils/helpers";

export default function ProductCard({ product, optionSelect }) {
  const { addItemToCheckout } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [variant, setVariant] = useState(product.variants[0]);
  const [primaryImage, setPrimaryImage] = useState(product.images[0].src);
  const [variantPrice, setVariantPrice] = useState(product.variants[0].price.amount);

  function updateQuantity(e) {
    if (e === "") {
      setQuantity("");
    } else {
      setQuantity(Math.floor(e));
    }
  }
  function handleSizeChange(e) {
    setVariantId(e);
    // send back size change
    const selectedVariant = product.variants.filter((v) => v.id === e).pop();
    const selectedVariantImg = selectedVariant.image.src;
    const selectedVariantPrice = selectedVariant.price.amount;
    // update variant
    setVariant(selectedVariant);
    setPrimaryImage(selectedVariantImg);
    setVariantPrice(selectedVariantPrice);
  }
  
  const price = variantPrice;

  return (
    <div className="w-full mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8 order-2 md:order-1 md:py-12 lg:py-20 2xl:py-24">
          <h2>{product.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          {product.variants.length > 1 ? (
            <select
              name="variant-selector"
              id="variant-selector"
              value={variantId}
              onChange={(event) => handleSizeChange(event.target.value)}
            >
              {optionSelect}
            </select>
          ) : (
            <span className="opacity-0">...</span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <h3 className="mb-0">{formatCurrency(price)}</h3>
            <button
              className="btn"
              onClick={() =>
                addItemToCheckout(variantId.toString(), 1)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="product__images order-1 md:order-2 flex flex-col gap-2">
          <div className="flex-1">
            <img
              src={primaryImage.toString()}
              className="w-full object-cover"
              alt={product.title}
            />
          </div>
          
          {product.images.length > 1 ? (
            <div className="thumbnails flex flex-row w-full">
              {product.images.map((image, index) => (
                <button
                  className="flex-1"
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
            </div>
          ): (
            <span className="hidden">Only one image.</span>
          )}
        </div>
      </div>
    </div>
  );
}
