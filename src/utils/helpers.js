export const formatCurrency = price => {
  return '$' + parseFloat(price).toFixed(2)
}

export function saveLocalData(cart, checkoutId, checkoutUrl) {
  localStorage.setItem(import.meta.env.VITE_LOCALSTORE_NAME, JSON.stringify([cart, checkoutId, checkoutUrl]))
}

function getLocalData() {
  return JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALSTORE_NAME))
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData()

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]])
    }
    else {
      setCart([localData[0]])
    }
    setCheckoutId(localData[1])
    setCheckoutUrl(localData[2])
  }
}