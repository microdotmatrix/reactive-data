import { useContext } from 'react'
import { ShopContext } from '_x/store'
import { Icon } from '@iconify-icon/react'

const MobileNav = () => {
  const { isNavOpen, closeNav, openNav } = useContext(ShopContext)
  return (
    <div className="mobile-nav">
      {!isNavOpen ? (
        <button
          onClick={() => openNav()}
        >
          <Icon icon="mdi:menu" width="3em" />
        </button>
      ) : (
        <button
          onClick={() => closeNav()}
        >
          <Icon icon="mdi:close" width="3em" />
        </button>
      )}
    </div>
  )
}

export default MobileNav
