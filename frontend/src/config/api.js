// src/config/api.js

/**
 * Configuration de l'API pour ReaxAcademy
 * Point de connexion avec le backend Django
 */

// URL de base de l'API Django
export const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Configuration des timeouts (en millisecondes)
export const API_TIMEOUT = 10000; // 10 secondes

// Endpoints de l'API
export const apiEndpoints = {
  // Formulaire de contact
  contact: `${API_BASE_URL}/contact/`,
  
  // Formulaire d'inscription
  inscription: `${API_BASE_URL}/inscription/`,
  
  // Autres endpoints (à ajouter plus tard)
  // newsletter: `${API_BASE_URL}/newsletter/`,
  // temoignages: `${API_BASE_URL}/temoignages/`,
};

// Configuration des headers par défaut
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Messages d'erreur personnalisés
export const errorMessages = {
  NETWORK_ERROR: "Impossible de se connecter au serveur. Vérifiez que Django est bien lancé sur http://127.0.0.1:8000",
  SERVER_ERROR: "Une erreur serveur est survenue. Veuillez réessayer plus tard.",
  VALIDATION_ERROR: "Veuillez vérifier les champs du formulaire.",
  TIMEOUT_ERROR: "La requête a pris trop de temps. Veuillez réessayer.",
};

// Vérification de la configuration
export const checkApiConfig = () => {
  console.log('✅ API Configuration chargée:');
  console.log(`   - Base URL: ${API_BASE_URL}`);
  console.log(`   - Contact: ${apiEndpoints.contact}`);
  console.log(`   - Inscription: ${apiEndpoints.inscription}`);
  console.log(`   - Timeout: ${API_TIMEOUT}ms`);
};

// Export par défaut
export default {
  API_BASE_URL,
  API_TIMEOUT,
  apiEndpoints,
  defaultHeaders,
  errorMessages,
  checkApiConfig,
};