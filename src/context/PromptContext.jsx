import React, { createContext, useContext, useState } from 'react';

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
  const [promptData, setPromptData] = useState({
    image_description: {
      subject: {},
      environment: {},
      camera_style: {},
      lighting: {},
      mood: "",
      art_style: ""
    }
  });

  const updatePrompt = (path, value) => {
    setPromptData(prev => {
      const newData = { ...prev };
      let current = newData.image_description;
      
      // Handle root level keys inside image_description
      if (!Array.isArray(path)) {
          current[path] = value;
          return newData;
      }

      // Navigate to the parent of the target
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      
      // Set the value
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const addField = (path, key, value = "", type = "string") => {
    setPromptData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      let current = newData.image_description;
      
      for (let i = 0; i < path.length; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      
      if (type === "object") {
        current[key] = {};
      } else if (type === "array") {
        current[key] = [];
      } else {
        current[key] = value;
      }
      return newData;
    });
  };

  const addArrayItem = (path, type = "string") => {
    setPromptData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData.image_description;

      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }

      if (Array.isArray(current)) {
        if (type === "object") {
          current.push({});
        } else {
          current.push("");
        }
      }
      return newData;
    });
  };

  const removeField = (path, key) => {
    setPromptData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData.image_description;
      
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      
      if (Array.isArray(current)) {
        current.splice(key, 1); // key is index for arrays
      } else {
        delete current[key];
      }
      return newData;
    });
  };

  return (
    <PromptContext.Provider value={{ promptData, updatePrompt, addField, removeField, addArrayItem }}>
      {children}
    </PromptContext.Provider>
  );
};
