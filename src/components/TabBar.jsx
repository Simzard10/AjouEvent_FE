import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'

const TabBar = ({ def }) => {
  const [selectedTab, setSelectedTab] = useState(def)
  const { mode } = useStore()

  const handleTabClick = (tab) => {
    if (selectedTab !== tab) {
      setSelectedTab(tab)
    }
  }

  return (
    <div className="bg-white p-4 mt-10 w-full">
      <div className="flex flex-col-2">
        <TabButton
          tab="material"
          label="Material Sourcing"
          selected={selectedTab === 'material'}
          onClick={handleTabClick}
        />
        <TabButton
          tab="products"
          label="Upcycled Products"
          selected={selectedTab === 'products'}
          onClick={handleTabClick}
        />
        {mode === 'seller' && selectedTab && (
          <div className="flex items-center justify-end w-full">
            <Link
              to={
                selectedTab === 'material'
                  ? '/material/request'
                  : '/product/upload'
              }
              className="bg-[#FBFBFB] rounded-3xl shadow-md font-extralight text-sm pl-6 pt-3 pr-6 pb-3 mb-2"
            >
              {selectedTab === 'material'
                ? 'Write Material Request'
                : 'Add New Products'}
            </Link>
          </div>
        )}
      </div>
      <hr />
    </div>
  )
}

const TabButton = ({ tab, label, selected, onClick }) => {
  const tabStyle = selected
    ? 'w-56 bg-gray-300 text-black px-4 py-2 rounded-tl-md rounded-tr-md text-center'
    : 'w-56 text-black px-4 py-2 text-center'

  return (
    <Link
      to={`/${tab}`}
      className={`${tabStyle} font-light text-base`}
      onClick={() => onClick(tab)}
    >
      {label}
    </Link>
  )
}

export default TabBar
