import React, { useContext } from "react";
import { Icon } from "@iconify-icon/react";
import { ShopContext } from "../context/store";

import { motion } from "framer-motion";

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
  const { isCartOpen, closeCart, checkout, removeItemFromCheckout } =
    useContext(ShopContext);

  if (checkout.lineItems) {
    return (
      <motion.div
        layout
        initial={false}
        animate={isCartOpen ? "open" : "closed"}
        variants={{
          open: {
            width: "33%",
          },
          closed: {
            width: 0,
          },
        }}
        className="cart-container"
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-row justify-between p-3 w-full">
            <h4>Shopping Cart</h4>
            <button onClick={() => closeCart()}>
              <Icon icon="mdi:close" inline={true} width="20" />
            </button>
          </div>
          <div className="flex flex-col p-6 w-full flex-1">
            {checkout.lineItems?.length < 1 ? (
              <div className="cart-empty">Cart is Empty.</div>
            ) : (
              <>
                {checkout.lineItems?.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="flex flex-row gap-4">
                      <div className="w-1/3">
                        <figure className="w-full max-h-[300px] flex relative overflow-clip">
                          <img
                            src={item.variant.image.src}
                            alt={item.title}
                            style={{
                              maxWidth: "100%",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </figure>
                      </div>
                      <div className="w-2/3">
                        <div className="text-lg font-semibold text-slate-600">
                          {item.title}
                        </div>
                        <div className="text-xl font-semibold text-green-800">
                          {item.variant.price.toString()}
                        </div>
                        <div className="text-m">{item.quantity}</div>
                        <button
                          onClick={() =>
                            removeItemFromCheckout(item.id, item.quantity)
                          }
                        >
                          <Icon icon="mdi:trash-can" width="30" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex flex-col">
            <a href={checkout.webUrl} rel="noopener noreferrer">
              <button className="w-full px-8 py-6 bg-slate-400">
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
