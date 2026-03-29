import { useEffect, useState } from 'react';
import axios from 'axios';
import AssetForm from './components/AssetForm';
import AssetTable from './components/AssetTable';
import SearchBar from './components/SearchBar';

/**
 * Main Application Component
 * Manages the state and business logic for the Industrial Asset Tracker.
 */
function App() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAsset, setEditingAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // API Endpoint configuration
  const API_URL = 'https://localhost:7265/api/Asset';

  /**
   * Fetches all industrial assets from the backend API.
   * Updates the loading state during the request.
   */
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setAssets(response.data);
    } catch (error) {
      console.error("API Error (fetchAssets):", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filters the asset list based on the search query.
   * Matches against name, location, and type properties.
   */
  const filteredAssets = assets.filter((asset) => {
    const search = searchTerm.toLowerCase();
    return (
      asset.name?.toLowerCase().includes(search) ||
      asset.location?.toLowerCase().includes(search) ||
      asset.type?.toLowerCase().includes(search)
    );
  });

  /**
   * Handles the creation of a new asset.
   * @param {Object} assetData - The asset object to be stored.
   */
  const handleAddAsset = async (assetData) => {
    try {
      await axios.post(API_URL, assetData);
      fetchAssets(); // Refresh UI with updated data
      alert("Asset successfully registered! 🚀");
    } catch (error) {
      console.error("API Error (handleAddAsset):", error.response?.data);
      alert("Registration failed. Please check system logs.");
    }
  };

  /**
   * Handles the deletion of an existing asset.
   * @param {number} id - The unique identifier of the asset.
   */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to decommission this asset?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchAssets();
      } catch (error) {
        console.error("API Error (handleDelete):", error);
      }
    }
  };

  /**
   * Prepares the application for editing an existing asset.
   * Scrolls to the top to bring the form into focus.
   * @param {Object} asset - The asset data to be edited.
   */
  const startEdit = (asset) => {
    setEditingAsset(asset);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handles the update (PUT) request for a specific asset.
   * Maps frontend data to backend DTO expectations.
   */
  const handleUpdateAsset = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        name: updatedData.Name,
        type: updatedData.Type,
        location: updatedData.Location,
        isActive: updatedData.IsActive === true || updatedData.IsActive === "True"
      });

      setEditingAsset(null); // Return to 'Add' mode
      await fetchAssets();
      alert("Asset records updated successfully! 📝");
    } catch (error) {
      console.error("API Error (handleUpdateAsset):", error.response?.data);
      alert("Update failed. Invalid data format (Error 400).");
    }
  };

  // Initial data load on component mount
  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Section 1: Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Industrial Asset Tracker 🛠️
          </h1>
          <p className="text-gray-600 font-medium italic">
            Real-time equipment management and monitoring system
          </p>
        </header>
        
        {/* Section 2: Registration / Edit Form */}
        <AssetForm 
          onAdd={handleAddAsset} 
          editingAsset={editingAsset} 
          onUpdate={handleUpdateAsset} 
          onCancel={() => setEditingAsset(null)}
        />
        
        {/* Section 3: Control Panel (Statistics & Search) */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Asset Status Badges */}
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3">
                Asset Inventory
              </h3>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Total: {assets.length}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Active: {assets.filter(a => a.isActive).length}
                </span>
              </div>
            </div>

            {/* Global Search Component */}
            <div className="w-full md:w-1/2 lg:w-1/3">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
          </div>
        </div>

        {/* Section 4: Data Presentation (Loading Spinner or Table) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-semibold animate-pulse">
              Syncing with database...
            </p>
          </div>
        ) : (
          <>
            <AssetTable 
              assets={filteredAssets} 
              onDelete={handleDelete} 
              onEdit={startEdit} 
            />

            {/* Section 5: No Results Feedback */}
            {filteredAssets.length === 0 && assets.length > 0 && (
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center mt-4 shadow-sm">
                <span className="text-5xl block mb-4">🔎</span>
                <p className="text-gray-500 text-lg">
                  No matching assets found for <span className="font-bold text-gray-900 underline decoration-blue-500">"{searchTerm}"</span>
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg transition-all"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Section 6: App Metadata */}
        <footer className="mt-12 text-center text-gray-400 text-xs tracking-widest uppercase">
          Industrial Asset Tracker © 2026 • Stack: React 18 + .NET 8 API
        </footer>
      </div>
    </div>
  );
}

export default App;