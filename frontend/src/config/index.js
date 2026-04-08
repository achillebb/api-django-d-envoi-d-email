// src/config/index.js

/**
 * Point d'entrée pour la configuration API
 * Permet d'importer facilement depuis @/config
 */

// Exporter tout depuis api.js
export * from './api';

// Exporter également par défaut pour plus de flexibilité
export { default } from './api';