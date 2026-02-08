/**
 * Nice Code Academy - API Client
 * Gestion des appels API vers le backend
 */

class APIClient {
    constructor(baseURL = 'http://localhost:8000/api') {
        this.baseURL = baseURL;
    }

    /**
     * Effectue une requête HTTP
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // === COURS ===
    async getCourses(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/courses?${queryString}`);
    }

    async getCourse(courseId) {
        return this.request(`/courses/${courseId}`);
    }

    async getCourseBySlug(slug) {
        return this.request(`/courses/slug/${slug}`);
    }

    // === EXERCICES ===
    async getExercisesByCourse(courseId) {
        return this.request(`/exercises/course/${courseId}`);
    }

    async getExercise(exerciseId) {
        return this.request(`/exercises/${exerciseId}`);
    }

    async submitCode(exerciseId, code) {
        return this.request('/exercises/submit', {
            method: 'POST',
            body: JSON.stringify({
                exercise_id: exerciseId,
                code: code
            }),
        });
    }

    async executeCode(code) {
        return this.request('/exercises/execute', {
            method: 'POST',
            body: JSON.stringify({ code }),
        });
    }

    // === ACTIVITÉS ===
    async getActivities(type = null) {
        const params = type ? `?activity_type=${type}` : '';
        return this.request(`/activities${params}`);
    }

    async getActivity(activityId) {
        return this.request(`/activities/${activityId}`);
    }

    async submitQuizAnswer(activityId, answer) {
        return this.request('/activities/submit-quiz', {
            method: 'POST',
            body: JSON.stringify({
                activity_id: activityId,
                answer: answer
            }),
        });
    }

    async getRandomJoke() {
        return this.request('/activities/type/joke');
    }
}

// Instance globale
const api = new APIClient();
