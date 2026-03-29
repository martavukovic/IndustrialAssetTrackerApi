import { useState, useEffect } from 'react';

/**
 * AssetForm Component
 * Handles both the registration of new industrial equipment 
 * and the modification of existing asset records.
 */
function AssetForm({ onAdd, editingAsset, onUpdate, onCancel }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [isActive, setIsActive] = useState(true);

  /**
   * Effect Hook: populates the form fields when an asset is selected for editing.
   * Resets the form to default values when the edit mode is cleared.
   */
  useEffect(() => {
    if (editingAsset) {
      setName(editingAsset.name || '');
      setLocation(editingAsset.location || '');
      setType(editingAsset.type || '');
      setIsActive(editingAsset.isActive ?? true);
    } else {
      resetForm();
    }
  }, [editingAsset]);

  const resetForm = () => {
    setName('');
    setLocation('');
    setType('');
    setIsActive(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct data object to match C# DTO requirements
    const assetData = {
      Name: name,
      Type: type,
      Location: location,
      IsActive: isActive ? "True" : "False" 
    };

    if (editingAsset) {
      onUpdate(editingAsset.id, assetData);
    } else {
      onAdd(assetData);
    }

    resetForm();
  };

  return (
    <section className={`p-6 rounded-xl border mb-8 transition-all duration-300 shadow-sm ${
      editingAsset ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100' : 'bg-white border-gray-200'
    }`}>
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        {editingAsset ? '🛠️ Edit Asset Records' : '➕ Register New Equipment'}
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <input 
          type="text" placeholder="Asset Name" value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white placeholder-gray-400" 
          required 
        />
        <input 
          type="text" placeholder="Location (e.g. Sector A)" value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white placeholder-gray-400" 
          required 
        />
        <input 
          type="text" placeholder="Asset Type" value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white placeholder-gray-400" 
          required 
        />
        
        <select 
          value={isActive} 
          onChange={(e) => setIsActive(e.target.value === 'true')}
          className="p-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
        >
          <option value="true">Operational ✅</option>
          <option value="false">Out of Service ❌</option>
        </select>

        <div className="flex gap-2 w-full md:w-auto">
          <button 
            type="submit" 
            className={`flex-1 md:flex-none font-bold py-2 px-6 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer ${
              editingAsset ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {editingAsset ? 'Save Changes' : 'Register Asset'}
          </button>

          {editingAsset && (
            <button 
              type="button" 
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default AssetForm;