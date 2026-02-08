'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function AlgorithmesPage() {
  const [currentSection, setCurrentSection] = useState<'cours' | 'exercice'>('cours');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [exercise2Completed, setExercise2Completed] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(1);

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
        
        if (currentSection === 'exercice') {
          // Vérifier exercice 1 (nombres de 1 à 5)
          if (currentExercise === 1) {
            const hasCorrectOutput = data.output.includes('1') && 
                                      data.output.includes('2') && 
                                      data.output.includes('3') && 
                                      data.output.includes('4') && 
                                      data.output.includes('5');
            
            if (hasCorrectOutput) {
              setExerciseCompleted(true);
            }
          }
          
          // Vérifier exercice 2 (somme = 55)
          if (currentExercise === 2) {
            const hasCorrectOutput = data.output.includes('55');
            
            if (hasCorrectOutput) {
              setExercise2Completed(true);
            }
          }
        }
      } else {
        setError(data.errors || 'Une erreur est survenue');
      }
    } catch {
      setError('Impossible de se connecter au backend. Assurez-vous qu&rsquo;il est démarré.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🧮 Introduction aux Algorithmes</h1>
        <p className="text-lg text-gray-600">
          Apprends ce qu&rsquo;est un algorithme et comment le créer en Python
        </p>
      </div>

      {/* Navigation Cours / Exercice */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setCurrentSection('cours')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentSection === 'cours'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📚 Cours
        </button>
        <button
          onClick={() => setCurrentSection('exercice')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentSection === 'exercice'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ✏️ Exercice
        </button>
      </div>

      {/* Section Cours */}
      {currentSection === 'cours' && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Qu&rsquo;est-ce qu&rsquo;un algorithme ?</h2>
          
          {/* Définition */}
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">📖 Définition</h3>
            <p className="text-gray-700 text-lg">
              Un <strong>algorithme</strong> est une suite d&rsquo;instructions précises et ordonnées 
              qui permettent de résoudre un problème ou d&rsquo;accomplir une tâche. C&rsquo;est comme 
              une recette de cuisine : tu suis les étapes dans l&rsquo;ordre pour obtenir le résultat désiré.
            </p>
          </div>

          {/* Caractéristiques */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Les caractéristiques d&rsquo;un bon algorithme</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✓ Précis</h4>
                <p className="text-gray-700">Chaque étape doit être clairement définie</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✓ Fini</h4>
                <p className="text-gray-700">L&rsquo;algorithme doit se terminer après un nombre fini d&rsquo;étapes</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✓ Efficace</h4>
                <p className="text-gray-700">Il doit résoudre le problème de manière optimale</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✓ Général</h4>
                <p className="text-gray-700">Il peut s&rsquo;appliquer à différentes situations</p>
              </div>
            </div>
          </div>

          {/* Exemples */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">💡 Exemples d&rsquo;algorithmes</h3>
            
            {/* Exemple 1 : Algorithme de la vie quotidienne */}
            <div className="mb-6 bg-purple-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-purple-800 mb-3">
                Exemple 1 : Se brosser les dents
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Prendre la brosse à dents</li>
                <li>Mettre du dentifrice sur la brosse</li>
                <li>Ouvrir le robinet</li>
                <li>Mouiller la brosse</li>
                <li>Brosser les dents pendant 2 minutes</li>
                <li>Rincer la bouche</li>
                <li>Rincer la brosse</li>
                <li>Ranger la brosse</li>
              </ol>
            </div>

            {/* Exemple 2 : Algorithme Python simple */}
            <div className="mb-6 bg-yellow-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-yellow-800 mb-3">
                Exemple 2 : Afficher les nombres de 1 à 10
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>Algorithme en français :</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-4">
                <li>Commencer avec le nombre 1</li>
                <li>Afficher le nombre</li>
                <li>Ajouter 1 au nombre</li>
                <li>Si le nombre est inférieur ou égal à 10, retourner à l&rsquo;étape 2</li>
                <li>Sinon, terminer</li>
              </ol>
              <p className="text-gray-700 mb-3">
                <strong>En Python :</strong>
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                <pre>{`# Boucle pour afficher les nombres de 1 à 10
for nombre in range(1, 11):
    print(nombre)`}</pre>
              </div>
            </div>

            {/* Exemple 3 : Trouver le maximum */}
            <div className="mb-6 bg-pink-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-pink-800 mb-3">
                Exemple 3 : Trouver le plus grand nombre
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>Algorithme :</strong> Trouver le plus grand nombre dans une liste
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                <pre>{`# Trouver le maximum dans une liste
nombres = [5, 12, 3, 18, 7]
maximum = nombres[0]  # On commence par le premier

for nombre in nombres:
    if nombre > maximum:
        maximum = nombre

print(f"Le plus grand nombre est : {maximum}")`}</pre>
              </div>
            </div>
          </div>

          {/* Bouton pour passer à l'exercice */}
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentSection('exercice')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              Passer à l&rsquo;exercice 🚀
            </button>
          </div>
        </div>
      )}

      {/* Section Exercice */}
      {currentSection === 'exercice' && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">✏️ Exercice pratique</h2>
          
          {/* Exercice 1 */}
          {currentExercise === 1 && (
            <>
              <div className="mb-4">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                  Exercice 1
                </span>
              </div>

              <div className="mb-6 bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">📝 Consigne</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Crée un algorithme qui affiche les nombres de <strong>1 à 5</strong> en utilisant une boucle <code className="bg-orange-200 px-2 py-1 rounded">for</code>.
                </p>
                
                <div className="mb-4 bg-purple-50 p-4 rounded border border-purple-200">
                  <p className="font-semibold text-purple-800 mb-2">🔑 Mots-clés à utiliser :</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">for</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">range</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">print</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">in</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border border-orange-200">
                  <p className="text-gray-700 font-semibold mb-2">Résultat attendu :</p>
                  <pre className="text-gray-800">1
2
3
4
5</pre>
                </div>
              </div>

              {/* Indice */}
              <details className="mb-6 bg-blue-50 p-4 rounded cursor-pointer">
                <summary className="font-semibold text-blue-800 cursor-pointer">
                  💡 Besoin d&rsquo;un indice ? Clique ici
                </summary>
                <div className="mt-3 text-gray-700">
                  <p className="mb-2">Utilise une boucle <code className="bg-blue-200 px-2 py-1 rounded">for</code> avec <code className="bg-blue-200 px-2 py-1 rounded">range()</code></p>
                  <p>Rappel : <code className="bg-blue-200 px-2 py-1 rounded">range(1, 6)</code> génère les nombres de 1 à 5</p>
                </div>
              </details>

              {exerciseCompleted && (
                <div className="mb-6 bg-green-50 border-2 border-green-500 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Bravo !</h3>
                  <p className="text-green-700 text-lg mb-4">
                    Tu as réussi ! Tu as créé ton premier algorithme en Python. Continue comme ça ! 🚀
                  </p>
                  <button
                    onClick={() => {
                      setCurrentExercise(2);
                      setOutput('');
                      setError('');
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Exercice suivant →
                  </button>
                </div>
              )}
            </>
          )}

          {/* Exercice 2 */}
          {currentExercise === 2 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                  Exercice 2
                </span>
                <button
                  onClick={() => {
                    setCurrentExercise(1);
                    setOutput('');
                    setError('');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← Exercice 1
                </button>
              </div>

              <div className="mb-6 bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">📝 Consigne</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Crée un algorithme qui <strong>calcule et affiche la somme</strong> de tous les nombres de <strong>1 à 10</strong>.
                </p>
                
                <div className="mb-4 bg-purple-50 p-4 rounded border border-purple-200">
                  <p className="font-semibold text-purple-800 mb-2">🔑 Mots-clés à utiliser :</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">somme</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">for</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">range</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">+=</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">print</span>
                    <span className="bg-purple-200 px-3 py-1 rounded font-mono text-sm">in</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border border-orange-200">
                  <p className="text-gray-700 font-semibold mb-2">Résultat attendu :</p>
                  <pre className="text-gray-800">55</pre>
                  <p className="text-gray-600 text-sm mt-2">
                    (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55)
                  </p>
                </div>
              </div>

              {/* Indice */}
              <details className="mb-6 bg-blue-50 p-4 rounded cursor-pointer">
                <summary className="font-semibold text-blue-800 cursor-pointer">
                  💡 Besoin d&rsquo;un indice ? Clique ici
                </summary>
                <div className="mt-3 text-gray-700">
                  <p className="mb-2">1. Crée une variable <code className="bg-blue-200 px-2 py-1 rounded">somme = 0</code></p>
                  <p className="mb-2">2. Utilise une boucle <code className="bg-blue-200 px-2 py-1 rounded">for</code> pour parcourir les nombres de 1 à 10</p>
                  <p className="mb-2">3. À chaque tour, ajoute le nombre à la somme avec <code className="bg-blue-200 px-2 py-1 rounded">somme += nombre</code></p>
                  <p>4. Affiche la somme finale avec <code className="bg-blue-200 px-2 py-1 rounded">print(somme)</code></p>
                </div>
              </details>

              {exercise2Completed && (
                <div className="mb-6 bg-green-50 border-2 border-green-500 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Excellent !</h3>
                  <p className="text-green-700 text-lg">
                    Tu maîtrises maintenant les boucles et les variables d&rsquo;accumulation ! Tu es sur la bonne voie pour devenir un expert en algorithmes ! 💪
                  </p>
                </div>
              )}
            </>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Ton code</h3>
              <CodeEditor
                initialCode="# Écris ton code ici pour afficher les nombres de 1 à 5\n"
                onRun={handleRunCode}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Résultat</h3>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm min-h-[300px] overflow-auto">
                {!output && !error && (
                  <div className="text-gray-500">
                    Exécute ton code pour voir le résultat...
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

          {/* Bouton retour au cours */}
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentSection('cours')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              ← Retour au cours
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
