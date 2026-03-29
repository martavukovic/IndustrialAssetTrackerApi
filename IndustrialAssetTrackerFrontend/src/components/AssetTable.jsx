/**
 * AssetTable Component
 * Renders a tabular view of all industrial assets.
 * Provides interactive controls for editing and decommissioning records.
 */
function AssetTable({ assets, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="p-4 font-semibold text-gray-700">ID</th>
            <th className="p-4 font-semibold text-gray-700">Name</th>
            <th className="p-4 font-semibold text-gray-700">Location</th>
            <th className="p-4 font-semibold text-gray-700">Type</th>
            <th className="p-4 font-semibold text-gray-700">Status</th>
            <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50 transition-colors group">
              <td className="p-4 text-gray-600 font-mono text-sm">#{asset.id}</td>
              <td className="p-4 font-bold text-gray-800">{asset.name}</td>
              <td className="p-4 text-gray-600">{asset.location}</td>
              <td className="p-4 text-gray-600">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                   {asset.type}
                </span>
              </td>
              <td className="p-4">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    asset.isActive 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {asset.isActive ? "Active ✅" : "Inactive ❌"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-3">
                  {/* EDIT ACTION */}
                  <button 
                    onClick={() => onEdit(asset)} 
                    className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-1.5 px-4 rounded-lg shadow-sm transition-all active:scale-95"
                  >
                    Edit
                  </button>
                  
                  {/* DELETE ACTION */}
                  <button 
                    onClick={() => onDelete(asset.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1.5 px-4 rounded-lg shadow-sm transition-all active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State Feedback */}
      {assets.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500 italic text-lg text-balance">
            No assets found in the industrial database.
          </p>
        </div>
      )}
    </div>
  );
}

export default AssetTable;