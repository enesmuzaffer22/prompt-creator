import React, { useState } from 'react';
import { Trash2, Plus, ChevronRight, ChevronDown } from 'lucide-react';
import { usePrompt } from '../context/PromptContext';

const DynamicInput = ({ data, path, onAdd, onRemove, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState('string'); // string, object, array
  const [isAdding, setIsAdding] = useState(false);
  
  // Get addArrayItem from context if available, or pass it down as prop
  const { addArrayItem } = usePrompt();

  const handleAdd = () => {
    if (newKey.trim()) {
      onAdd(path, newKey, newValue, newType);
      setNewKey('');
      setNewValue('');
      setNewType('string');
      setIsAdding(false);
    }
  };

  const handleAddArrayItem = (type) => {
      addArrayItem(path, type);
  };

  const isObject = (val) => typeof val === 'object' && val !== null && !Array.isArray(val);
  const isArray = (val) => Array.isArray(val);

  // If data is an array, render array items
  if (Array.isArray(data)) {
      return (
          <div className="ml-4 border-l-2 border-zinc-700 pl-4 my-2">
              {data.map((item, index) => (
                  <div key={index} className="mb-2">
                       <div className="flex items-center gap-2 group">
                            <span className="text-zinc-500 font-mono text-sm">[{index}]</span>
                            {isObject(item) || isArray(item) ? (
                                <span className="text-zinc-500 text-sm italic">{isArray(item) ? 'Array' : 'Object'}</span>
                            ) : (
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => onUpdate([...path, index], e.target.value)}
                                    className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded border border-zinc-700 focus:border-blue-500 outline-none flex-1"
                                />
                            )}
                            <button 
                                onClick={() => onRemove(path, index)}
                                className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                       </div>
                       {(isObject(item) || isArray(item)) && (
                           <DynamicInput 
                                data={item} 
                                path={[...path, index]} 
                                onAdd={onAdd} 
                                onRemove={onRemove} 
                                onUpdate={onUpdate} 
                           />
                       )}
                  </div>
              ))}
              <div className="mt-2 flex gap-2">
                  <button onClick={() => handleAddArrayItem('string')} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-blue-400 px-2 py-1 rounded border border-zinc-700">
                      + Add String
                  </button>
                  <button onClick={() => handleAddArrayItem('object')} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-purple-400 px-2 py-1 rounded border border-zinc-700">
                      + Add Object
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="ml-4 border-l-2 border-zinc-700 pl-4 my-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-2">
          <div className="flex items-center gap-2 group">
            {(isObject(value) || isArray(value)) && (
               <button onClick={() => setIsExpanded(!isExpanded)} className="text-zinc-400 hover:text-white">
                 {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
               </button>
            )}
            <span className="text-zinc-300 font-medium">{key}:</span>
            
            {(!isObject(value) && !isArray(value)) ? (
              <input
                type="text"
                value={value}
                onChange={(e) => onUpdate([...path, key], e.target.value)}
                className="bg-zinc-800 text-zinc-100 px-2 py-1 rounded border border-zinc-700 focus:border-blue-500 outline-none flex-1"
              />
            ) : (
                <span className="text-zinc-500 text-sm italic">{isArray(value) ? 'Array' : 'Object'}</span>
            )}
            
            <button 
              onClick={() => onRemove(path, key)}
              className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {(isObject(value) || isArray(value)) && isExpanded && (
            <DynamicInput 
              data={value} 
              path={[...path, key]} 
              onAdd={onAdd} 
              onRemove={onRemove} 
              onUpdate={onUpdate} 
            />
          )}
        </div>
      ))}

      {/* Add New Field Section */}
      <div className="mt-2">
        {!isAdding ? (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
          >
            <Plus size={14} /> Add Field
          </button>
        ) : (
          <div className="flex flex-col gap-2 bg-zinc-800/50 p-2 rounded border border-zinc-700">
            <div className="flex gap-2">
                <input
                type="text"
                placeholder="Key (e.g. hair)"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="bg-zinc-900 text-zinc-100 px-2 py-1 rounded border border-zinc-700 text-sm w-32"
                />
                <select 
                    value={newType} 
                    onChange={(e) => setNewType(e.target.value)}
                    className="bg-zinc-900 text-zinc-100 px-2 py-1 rounded border border-zinc-700 text-sm"
                >
                    <option value="string">String</option>
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                </select>
            </div>
            
            {newType === 'string' && (
                <div className="flex gap-2">
                    <input
                    type="text"
                    placeholder="Value (optional)"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="bg-zinc-900 text-zinc-100 px-2 py-1 rounded border border-zinc-700 text-sm flex-1"
                    />
                     <div className="flex gap-1">
                        <button
                            onClick={() => setNewValue('[Uploaded image]')}
                            className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs hover:bg-zinc-600"
                            title="Insert Image Placeholder"
                        >
                            Img
                        </button>
                        <button
                            onClick={() => setNewValue('[Uploaded document]')}
                            className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs hover:bg-zinc-600"
                            title="Insert Document Placeholder"
                        >
                            Doc
                        </button>
                    </div>
                </div>
            )}

            <div className="flex gap-2 mt-1">
                <button 
                onClick={handleAdd}
                className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-500"
                >
                Add
                </button>
                <button 
                onClick={() => setIsAdding(false)}
                className="text-zinc-400 hover:text-white text-xs"
                >
                Cancel
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicInput;
