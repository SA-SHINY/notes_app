import React from 'react'

const TagFilter = ({ allTags, selectedTag, setSelectedTag }) => {
  if (allTags.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <i className="fas fa-tags text-red-500 text-sm"></i>
        <span className="text-sm font-medium text-gray-300">Filter by tags:</span>
        {selectedTag && (
          <button 
            onClick={() => setSelectedTag('')} 
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <i className="fas fa-times-circle"></i> Clear filter
          </button>
        )}
      </div>
      
      <div className="relative">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800 pb-2">
          <div className="flex gap-2 min-w-max">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  selectedTag === tag 
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md transform scale-105' 
                    : 'bg-gray-900/80 backdrop-blur-sm text-gray-300 hover:bg-gray-800 hover:shadow-md border border-gray-700'
                }`}
              >
                <i className={`fas ${selectedTag === tag ? 'fa-check-circle' : 'fa-hashtag'} text-xs`}></i>
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/50 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent pointer-events-none"></div>
      </div>
      
      <div className="flex justify-center mt-2">
        <div className="text-xs text-gray-500 animate-pulse flex items-center gap-1">
          <i className="fas fa-arrow-left"></i>
          <span>scroll to see more tags</span>
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  )
}

export default TagFilter