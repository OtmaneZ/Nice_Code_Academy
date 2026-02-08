'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function SandboxPage() {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [tutorialActive, setTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [currentCode, setCurrentCode] = useState("# Écrivez votre code Python ici\nprint('Bonjour Nice Code Academy! 🐍')\n");

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
        // Étape 2 du tutoriel : vérifier que le code a été exécuté
        if (tutorialActive && tutorialStep === 2) {
          setTutorialStep(3);
        }
      } else {
        setError(data.errors || 'Une erreur est survenue');
      }
    } catch {
      setError('Impossible de se connecter au backend. Assurez-vous qu\'il est démarré.');
    }
  };

  const startTutorial = () => {
    setTutorialActive(true);
    setTutorialStep(1);
    setCurrentCode('');
  };

  const checkCode = () => {
    const code = currentCode.toLowerCase().trim();
    
    // Vérifier si le code contient print("salut") ou print('salut')
    if (code.includes('print') && code.includes('salut')) {
      // Vérifier les parenthèses
      if (!code.includes('(') || !code.includes(')')) {
        alert('❌ Tu as oublié les parenthèses ! Il faut écrire print("salut")');
        return;
      }
      // Vérifier les guillemets
      if (!code.includes('"') && !code.includes("'")) {
        alert('❌ Tu as oublié les guillemets ! Il faut écrire print("salut") ou print(\'salut\')');
        return;
      }
      // Code correct !
      setTutorialStep(2);
    } else if (code.includes('print')) {
      alert('❌ Presque ! Tu as écrit print() mais il faut mettre "salut" à l\'intérieur !');
    } else {
      alert('❌ Tu dois écrire print("salut") dans l\'éditeur de code !');
    }
  };

  const closeTutorial = () => {
    setTutorialActive(false);
    setTutorialStep(0);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🎨 Sandbox Python</h1>
        <p className="text-lg text-gray-600">
          Testez votre code Python librement dans cet environnement d&rsquo;expérimentation
        </p>
      </div>

      {tutorialActive && (
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="text-5xl">👨‍🏫</div>
            <div className="flex-1">
              {tutorialStep === 1 && (
                <>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">Étape 1 : Écris ton premier code</h3>
                  <p className="text-purple-700 mb-4">
                    Écris <code className="bg-purple-200 px-2 py-1 rounded font-mono">print(&quot;salut&quot;)</code> dans l&rsquo;éditeur, puis clique sur ce bouton :
                  </p>
                  <button
                    onClick={checkCode}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    ✓ C&rsquo;est bon !
                  </button>
                </>
              )}
              {tutorialStep === 2 && (
                <>
                  <h3 className="text-xl font-bold text-green-800 mb-2">✅ Parfait !</h3>
                  <p className="text-green-700 mb-4">
                    Maintenant clique sur le bouton <strong>▶️ Exécuter</strong> pour voir le résultat !
                  </p>
                </>
              )}
              {tutorialStep === 3 && (
                <>
                  <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Bravo !</h3>
                  <p className="text-green-700 mb-4">
                    Tu as réussi ton premier code Python ! Tu peux maintenant expérimenter librement dans le Sandbox.
                  </p>
                  <button
                    onClick={closeTutorial}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Fermer le tutoriel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Code</h2>
          <CodeEditor
            initialCode={currentCode}
            onRun={handleRunCode}
            onCodeChange={setCurrentCode}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Résultat</h2>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm min-h-[300px] overflow-auto">
            {!output && !error && (
              <div className="text-gray-500">
                Cliquez sur &quot;Exécuter&quot; pour voir le résultat...
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

      {!tutorialActive && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={startTutorial}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg shadow-lg"
          >
            📚 Tutoriel
          </button>
        </div>
      )}
    </div>
  );
}
