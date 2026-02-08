'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function SandboxPage() {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRunCode = async (code: string) => {
    setOutput('');
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (data.success) {
        setOutput(data.output);
      } else {
        setError(data.errors || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Impossible de se connecter au backend. Assurez-vous qu\'il est démarré.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🎨 Sandbox Python</h1>
        <p className="text-lg text-gray-600">
          Testez votre code Python librement dans cet environnement d'expérimentation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Code</h2>
          <CodeEditor
            initialCode="# Écrivez votre code Python ici\nprint('Bonjour Nice Code Academy! 🐍')\n"
            onRun={handleRunCode}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Résultat</h2>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm min-h-[300px] overflow-auto">
            {!output && !error && (
              <div className="text-gray-500">
                Cliquez sur "Exécuter" pour voir le résultat...
              </div>
            )}
            {output && (
              <pre className="whitespace-pre-wrap">{output}</pre>
            )}
            {error && (
              <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Conseils d'utilisation</h3>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Utilisez <code className="bg-blue-100 px-1 rounded">print()</code> pour afficher des résultats</li>
          <li>Appuyez sur Tab pour indenter votre code</li>
          <li>Le code est exécuté de manière sécurisée sur le serveur</li>
          <li>Vous pouvez tester toutes les fonctionnalités de base de Python</li>
        </ul>
      </div>
    </div>
  );
}
