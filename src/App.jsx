import React from 'react';
import { PromptProvider, usePrompt } from './context/PromptContext';
import CategoryCard from './components/CategoryCard';
import JsonPreview from './components/JsonPreview';

const MainContent = () => {
  const { promptData } = usePrompt();

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 font-sans selection:bg-blue-500/30">
      <header className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Prompt Creator
          </h1>
          <p className="text-zinc-400 mt-1">Build structured JSON prompts for AI image generation</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CategoryCard 
            title="Subject" 
            path={['subject']} 
            description="Define the main subject, characters, and their details."
          />
          <CategoryCard 
            title="Environment" 
            path={['environment']} 
            description="Describe the setting, background, and surrounding elements."
          />
          <CategoryCard 
            title="Camera Style" 
            path={['camera_style']} 
            description="Specify camera angles, lens types, and focus."
          />
          <CategoryCard 
            title="Lighting" 
            path={['lighting']} 
            description="Set the lighting conditions and atmosphere."
          />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <CategoryCard 
              title="Mood" 
              path={['mood']} 
              description="Overall emotional tone."
            />
             <CategoryCard 
              title="Art Style" 
              path={['art_style']} 
              description="Artistic style or medium."
            />
           </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <JsonPreview data={promptData} />
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <PromptProvider>
      <MainContent />
    </PromptProvider>
  );
}

export default App;
