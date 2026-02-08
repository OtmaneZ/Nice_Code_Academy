/**
 * Nice Code Academy - Code Editor Component
 * Éditeur de code interactif avec coloration syntaxique
 */

class CodeEditor {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.textarea = null;
        this.outputDiv = null;
        this.init();
    }

    init() {
        if (!this.element) {
            console.error('Element not found');
            return;
        }

        // Créer la structure HTML de l'éditeur
        this.element.innerHTML = `
            <div class="code-editor-container">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">✍️ Éditeur de Code Python</h3>
                    <div class="space-x-2">
                        <button id="run-code-btn" class="btn-primary">
                            ▶️ Exécuter
                        </button>
                        <button id="clear-code-btn" class="btn-outline">
                            🗑️ Effacer
                        </button>
                    </div>
                </div>
                
                <textarea 
                    id="code-textarea" 
                    class="code-editor w-full"
                    placeholder="# Écris ton code Python ici...
print('Bonjour, Nice Code Academy!')"
                    spellcheck="false"
                ></textarea>
                
                <div id="code-output-container" class="mt-4 hidden">
                    <h4 class="text-md font-semibold mb-2">📊 Résultat :</h4>
                    <div id="code-output" class="code-output"></div>
                    <div id="execution-time" class="text-sm text-gray-600 mt-2"></div>
                </div>
            </div>
        `;

        this.textarea = document.getElementById('code-textarea');
        this.outputDiv = document.getElementById('code-output');
        this.outputContainer = document.getElementById('code-output-container');
        this.executionTimeDiv = document.getElementById('execution-time');

        // Attacher les événements
        document.getElementById('run-code-btn').addEventListener('click', () => this.runCode());
        document.getElementById('clear-code-btn').addEventListener('click', () => this.clearCode());

        // Support de la touche Tab
        this.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.textarea.selectionStart;
                const end = this.textarea.selectionEnd;
                this.textarea.value = this.textarea.value.substring(0, start) + '    ' + this.textarea.value.substring(end);
                this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;
            }
        });
    }

    async runCode() {
        const code = this.textarea.value.trim();
        
        if (!code) {
            this.showOutput('Erreur : Le code est vide!', true);
            return;
        }

        // Afficher un indicateur de chargement
        this.showOutput('⏳ Exécution en cours...', false);

        try {
            const result = await api.executeCode(code);
            
            if (result.error_message) {
                this.showOutput(`❌ Erreur:\n${result.error_message}`, true);
            } else {
                const output = result.output || '✅ Code exécuté avec succès (pas de sortie)';
                this.showOutput(output, false);
            }

            this.executionTimeDiv.textContent = `⏱️ Temps d'exécution: ${result.execution_time}ms`;
            
        } catch (error) {
            this.showOutput(`❌ Erreur de connexion:\n${error.message}`, true);
        }
    }

    showOutput(text, isError = false) {
        this.outputContainer.classList.remove('hidden');
        this.outputDiv.textContent = text;
        
        // Appliquer les styles appropriés
        this.outputDiv.className = 'code-output';
        if (isError) {
            this.outputDiv.classList.add('error');
        } else {
            this.outputDiv.classList.add('success');
        }
    }

    clearCode() {
        this.textarea.value = '';
        this.outputContainer.classList.add('hidden');
        this.executionTimeDiv.textContent = '';
    }

    setCode(code) {
        this.textarea.value = code;
    }

    getCode() {
        return this.textarea.value;
    }
}
