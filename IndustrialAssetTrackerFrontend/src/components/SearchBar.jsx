/**
 * SearchBar Component
 * Provides a real-time filtering input for the asset list.
 * Includes a quick-clear feature for better user experience.
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      {/* Search Icon (Left) */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>

      {/* Main Search Input */}
      <input
        type="text"
        placeholder="Search by name, location or type..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
      />

      {/* Quick Clear Button (Right) - Only visible when there is text */}
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
          title="Clear search"
        >
          <span className="text-lg font-bold">✕</span>
        </button>
      )}
    </div>
  );
}

export default SearchBar;