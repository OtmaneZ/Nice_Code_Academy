import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 rounded-lg mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            🐍 Bienvenue sur Nice Code Academy
          </h1>
          <p className="text-xl mb-8">
            Apprenez Python de manière ludique et progressive avec nos cours interactifs,
            exercices pratiques et activités amusantes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Commencer les cours
            </Link>
            <Link
              href="/sandbox"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Essayer le Sandbox
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">Cours Structurés</h3>
          <p className="text-gray-600">
            Apprenez Python étape par étape avec nos cours progressifs adaptés à tous les niveaux.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">💻</div>
          <h3 className="text-xl font-semibold mb-2">Éditeur Intégré</h3>
          <p className="text-gray-600">
            Codez directement dans votre navigateur et voyez les résultats instantanément.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">Exercices Pratiques</h3>
          <p className="text-gray-600">
            Validez vos connaissances avec des exercices corrigés automatiquement.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre aventure Python ?</h2>
        <p className="text-gray-600 mb-6">
          Rejoignez des milliers d&rsquo;apprenants et devenez un expert Python
        </p>
        <Link
          href="/courses"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Voir tous les cours →
        </Link>
      </section>
    </div>
  );
}
