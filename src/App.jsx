import React from "react";
import { PromptProvider, usePrompt } from "./context/PromptContext";
import SubjectCard from "./components/SubjectCard";
import CategoryCard from "./components/CategoryCard";
import JsonPreview from "./components/JsonPreview";
import DynamicInput from "./components/DynamicInput";

const MainContent = () => {
  const { promptData, addField, removeField, updatePrompt } = usePrompt();

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 font-sans selection:bg-blue-500/30">
      <header className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Prompt Creator
          </h1>
          <p className="text-zinc-400 mt-1">
            Build structured JSON prompts for AI image generation
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Image Description & Resolution */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Image Description
              </label>
              <input
                type="text"
                value={promptData.image_description}
                onChange={(e) =>
                  updatePrompt("image_description", e.target.value)
                }
                placeholder="Enter image description..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Resolution
              </label>
              <input
                type="text"
                value={promptData.resolution}
                onChange={(e) => updatePrompt("resolution", e.target.value)}
                placeholder="e.g., 1920x1080"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <SubjectCard />

          <CategoryCard
            title="Environment"
            path={["environment"]}
            description="Describe the setting, background, and surrounding elements."
          />
          <CategoryCard
            title="Camera Style"
            path={["camera_style"]}
            description="Specify camera angles, lens types, and focus."
          />
          <CategoryCard
            title="Lighting"
            path={["lighting"]}
            description="Set the lighting conditions and atmosphere."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategoryCard
              title="Mood"
              path={["mood"]}
              description="Overall emotional tone."
            />
            <CategoryCard
              title="Art Style"
              path={["art_style"]}
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
