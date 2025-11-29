import React, { useState } from 'react';
import DynamicInput from './DynamicInput';
import { usePrompt } from '../context/PromptContext';
import { Trash2, Plus } from 'lucide-react';

const TEMPLATES = {
  human: {
    clothing: {
      head: "",
      top: "",
      bottom: "",
      shoes: ""
    },
    holding: "",
    expression: "",
    pose: ""
  },
  car: {
    brand: "",
    model: "",
    year: "",
    color: "",
    modifications: []
  },
  animal: {
    species: "",
    breed: "",
    color: "",
    action: ""
  },
  object: {
    material: "",
    color: "",
    shape: "",
    texture: ""
  }
};

const SubjectCard = () => {
  const { promptData, addField, removeField, updatePrompt, addArrayItem } = usePrompt();
  
  // Ensure subject is an array
  const subjects = Array.isArray(promptData.image_description.subject) 
    ? promptData.image_description.subject 
    : [];

  const handleAddSubject = () => {
      // Add an empty object as a new subject
      addArrayItem(['subject'], 'object');
  };

  const handleRemoveSubject = (index) => {
      removeField(['subject'], index);
  };

  const handleTypeChange = (index, type) => {
    if (type && TEMPLATES[type]) {
      // Apply template to the specific subject at index
      const templateWithType = {
          type: type,
          ...JSON.parse(JSON.stringify(TEMPLATES[type]))
      };
      updatePrompt(['subject', index], templateWithType);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4 shadow-lg">
      <div className="mb-4 border-b border-zinc-800 pb-2 flex justify-between items-center">
        <div>
            <h3 className="text-lg font-semibold text-zinc-100 capitalize">Subjects</h3>
            <p className="text-zinc-400 text-sm">Define the main subjects.</p>
        </div>
        <button 
            onClick={handleAddSubject}
            className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500 transition-colors"
        >
            <Plus size={14} /> Add Subject
        </button>
      </div>
      
      {subjects.length === 0 && (
          <div className="text-zinc-500 text-center py-4 italic">
              No subjects added. Click "Add Subject" to start.
          </div>
      )}

      {subjects.map((subject, index) => (
          <div key={index} className="mb-6 border-l-2 border-zinc-700 pl-4 relative group">
              <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 text-sm font-mono">Subject #{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <select 
                        onChange={(e) => handleTypeChange(index, e.target.value)}
                        className="bg-zinc-800 text-zinc-100 text-xs px-2 py-1 rounded border border-zinc-700 outline-none focus:border-blue-500"
                        defaultValue=""
                    >
                        <option value="" disabled>Select Type...</option>
                        <option value="human">Human</option>
                        <option value="car">Car</option>
                        <option value="animal">Animal</option>
                        <option value="object">Object</option>
                    </select>
                    <button 
                        onClick={() => handleRemoveSubject(index)}
                        className="text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove Subject"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
              </div>

              <DynamicInput 
                data={subject} 
                path={['subject', index]} 
                onAdd={addField} 
                onRemove={removeField} 
                onUpdate={updatePrompt} 
              />
          </div>
      ))}
    </div>
  );
};

export default SubjectCard;
