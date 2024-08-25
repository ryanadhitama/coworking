import React from 'react';

const SwitchMode = ({ viewMode, onSwitchMode }) => {
  return (
    <div className="flex space-x-2">
      <button
        className={`px-4 py-2 rounded-lg font-medium ${
          viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onSwitchMode('list')}
      >
        List
      </button>
      <button
        className={`px-4 py-2 rounded-lg font-medium ${
          viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onSwitchMode('grid')}
      >
        Grid
      </button>
    </div>
  );
};

export default SwitchMode;
