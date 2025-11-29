import React from 'react';
import { Copy, Check } from 'lucide-react';

const JsonPreview = ({ data }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-zinc-100 font-semibold">JSON Output</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded transition-colors"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-black/30 rounded p-4 font-mono text-sm">
        <pre className="text-green-400">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default JsonPreview;
