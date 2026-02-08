/**
 * Nice Code Academy - Application principale
 */

class App {
    constructor() {
        this.currentPage = 'home';
        this.courses = [];
        this.init();
    }

    async init() {
        console.log('🚀 Nice Code Academy - Initialisation');
        this.setupNavigation();
        await this.loadHomePage();
    }

    setupNavigation() {
        // Navigation basique (à améliorer avec le frontend)
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                e.preventDefault();
                const page = e.target.dataset.nav;
                this.navigateTo(page);
            }
        });
    }

    async navigateTo(page) {
        this.currentPage = page;
        
        switch (page) {
            case 'home':
                await this.loadHomePage();
                break;
            case 'courses':
                await this.loadCoursesPage();
                break;
            case 'sandbox':
                await this.loadSandboxPage();
                break;
            case 'activities':
                await this.loadActivitiesPage();
                break;
            default:
                console.error('Page inconnue:', page);
        }
    }

    async loadHomePage() {
        console.log('📄 Chargement de la page d\'accueil');
        // TODO: Implémenter le chargement de la page d'accueil
    }

    async loadCoursesPage() {
        console.log('📚 Chargement des cours');
        try {
            const response = await api.getCourses();
            this.courses = response.courses;
            console.log('Cours chargés:', this.courses);
        } catch (error) {
            console.error('Erreur lors du chargement des cours:', error);
        }
    }

    async loadSandboxPage() {
        console.log('🎮 Chargement du sandbox');
        // TODO: Implémenter le sandbox
    }

    async loadActivitiesPage() {
        console.log('🎯 Chargement des activités');
        try {
            const activities = await api.getActivities();
            console.log('Activités chargées:', activities);
        } catch (error) {
            console.error('Erreur lors du chargement des activités:', error);
        }
    }

    // Utilitaires
    showNotification(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // TODO: Implémenter un système de notifications visuelles
    }
}

// Initialiser l'application au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
