'use client';

import { useState } from 'react';

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (code: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  initialCode = '# Écrivez votre code Python ici\n', 
  onRun,
  readOnly = false 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (onRun) {
      setIsRunning(true);
      await onRun(code);
      setIsRunning(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key support
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-4 text-sm text-gray-600 font-mono">main.py</span>
        </div>
        {!readOnly && onRun && (
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-sm font-semibold"
          >
            {isRunning ? '⏳ Exécution...' : '▶️ Exécuter'}
          </button>
        )}
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        className="w-full p-4 font-mono text-sm focus:outline-none resize-none"
        style={{ 
          minHeight: '300px',
          tabSize: 4,
        }}
        spellCheck={false}
      />
    </div>
  );
}
