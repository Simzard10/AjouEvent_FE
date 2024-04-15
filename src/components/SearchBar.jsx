import React, { useState } from 'react'

const SearchBar = ({ currentPage, setKeyword }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    // 예시로 console.log를 사용했지만, 실제로는 검색 API 호출 등의 로직을 추가하면 됩니다.
    console.log(`Searching "${searchTerm}" on ${currentPage} page`)

    // 검색어 부모 컴포넌트에 검색어 전달
    setKeyword(searchTerm)
  }

  return (
    <div className="flex justify-center mt-8 text-base font-light">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`Search on ${currentPage}`}
        className="border border-gray-300 px-4 w-[50%] py-2 mr-2 rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-blue-500 rounded-r-md focus:outline-none"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
