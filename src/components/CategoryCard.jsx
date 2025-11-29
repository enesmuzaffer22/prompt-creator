import React from 'react';
import DynamicInput from './DynamicInput';
import { usePrompt } from '../context/PromptContext';

const CategoryCard = ({ title, path, description }) => {
  const { promptData, addField, removeField, updatePrompt } = usePrompt();

  // Helper to get data at path
  const getData = (obj, pathArr) => {
    let current = obj;
    for (let key of pathArr) {
      if (current && current[key]) {
        current = current[key];
      } else {
        return {};
      }
    }
    return current;
  };

  const data = getData(promptData.image_description, path);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4 shadow-lg">
      <div className="mb-4 border-b border-zinc-800 pb-2">
        <h3 className="text-lg font-semibold text-zinc-100 capitalize">{title}</h3>
        {description && <p className="text-zinc-400 text-sm">{description}</p>}
      </div>
      
      <DynamicInput 
        data={data} 
        path={path} 
        onAdd={addField} 
        onRemove={removeField} 
        onUpdate={updatePrompt} 
      />
    </div>
  );
};

export default CategoryCard;
