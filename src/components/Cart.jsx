import React, { useContext, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { ShopContext } from "../context/store";

import { motion } from "framer-motion";

import { formatCurrency } from '../utils/helpers'

const sidebar = {
  open: (width = 500) => ({
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Cart = () => {
  // TODO: Write subtotal calculator function

  // Get functions for cart from context
  const { isCartOpen, closeCart, checkout, updateQuantityInCheckout, removeItemFromCheckout } = useContext(ShopContext);

  if (checkout.lineItems) {
    return (
      <motion.div
        layout
        initial={false}
        animate={isCartOpen ? "open" : "closed"}
        variants={{
          open: {
            width: "36%",
          },
          closed: {
            width: 0,
          },
        }}
        className="cart-container"
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex flex-row justify-between items-center p-3 w-full">
            <h3>Shopping Cart</h3>
            <button onClick={() => closeCart()}>
              <Icon icon="mdi:close" inline={true} width="40" />
            </button>
          </div>
          <div className="flex flex-col p-2 w-full flex-1">
            {checkout.lineItems?.length < 1 ? (
              <div className="cart-empty">Cart is Empty.</div>
            ) : (
              <>
                {checkout.lineItems?.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="flex flex-row">
                      <div className="w-1/3">
                        <figure className="w-full flex relative overflow-clip" style={{ blockSize: '160px' }}>
                          <img
                            src={item.variant.image.src}
                            alt={item.title}
                            style={{
                              maxWidth: "100%",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <figcaption className="absolute bottom-2 right-2">
                            <button
                              onClick={() => removeItemFromCheckout(item.id, item.quantity)}
                            >
                              <Icon icon="carbon:trash-can" width="30" />
                            </button>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="w-2/3 flex flex-col px-4">
                        <div className="flex-1 font-semibold text-slate-600 smooch-sans">
                          <span className="text-xl lg:text-2xl xl:text-3xl">
                            {item.title}
                          </span>
                          <span> - </span>
                          <span className="text-md lg:text-xl xl:text-xl">
                            {item.variant.title}
                          </span>
                        </div>
                        <div className="flex-auto text-xl md:text-2xl lg:text-3xl font-semibold text-gray-500 oswald">
                          {formatCurrency(item.variant.price.amount)} <span className="text-sm text-gray-300 font-light">ea.</span>
                        </div>
                        <div className="flex flex-col items-start">
                          <label htmlFor="quantity" className="text-sm">Qty:</label>
                          <div className="flex flex-row gap-1">
                            <button className="border border-slate-200/20 rounded-md my-auto flex items-center justify-center p-2" onClick={() => updateQuantityInCheckout(item.id, item.quantity - 1)}>
                              <Icon icon="carbon:subtract" width="18" />
                            </button>
                            <div className="text-xl text-center font-semibold flex items-center justify-center py-2 px-4">
                              {item.quantity}
                            </div>
                            <button className="border border-slate-200/20 rounded-md my-auto flex items-center justify-center p-2" onClick={() => updateQuantityInCheckout(item.id, item.quantity + 1)}>
                              <Icon icon="carbon:add" width="18" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex flex-col">
            <a href={checkout.webUrl} rel="noopener noreferrer">
              <button className="w-full px-8 py-6 btn t">
                Checkout
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default Cart;
