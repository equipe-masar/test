# GRH MASAR — Application de Gestion des Ressources Humaines

Résumé
------
GRH MASAR est une application de gestion des ressources humaines (GRH) dédiée à la gestion du personnel, des congés, des paies et des activités RH quotidiennes. Ce dépôt contient l'interface web minimale et les scripts associés pour le prototype / MVP.

État actuel du projet (avancement)
----------------------------------
Veuillez mettre à jour cette checklist selon l'avancement réel du projet — les éléments cochés reflètent les fonctionnalités déjà implémentées :

- [ ] Version initiale du dépôt et documentation de base
- [x] Page d'accueil / maquette HTML/CSS
- [x] Catalogue de fonctionnalités (wireframes)
- [ ] Authentification (login / gestion des sessions)
- [ ] Gestion des employés (CRUD)
- [ ] Gestion des congés (demande / approbation / historique)
- [ ] Gestion des paies (génération des bulletins)
- [ ] Notifications / e‑mails
- [ ] API REST pour intégration (documentation OpenAPI/Swagger)
- [ ] Tests unitaires et d'intégration
- [ ] Déploiement (CI/CD, Docker)
- [ ] Documentation utilisateur et guide d'administration

Version actuelle : 0.1.0 (mettre à jour)

Fonctionnalités principales
---------------------------
- Gestion centralisée des fiches employés (identité, poste, contrat)
- Processus de demande et validation de congés
- Affichage des évènements et calendriers RH
- Module de recherche et filtrage des employés
- Stockage local pour la démo (à remplacer par une API/BD en production)

Prérequis
---------
- Navigateur moderne (Chrome, Firefox, Edge)
- Pour le développement : Node.js et npm (si des outils frontend sont ajoutés), Python (pour un serveur simple) ou Docker selon la configuration choisie.

Installation et exécution locale
--------------------------------
Option 1 — ouvrir en local (si projet statique)
1. Cloner le dépôt :
   git clone https://github.com/equipe-masar/test.git
2. Ouvrir `index.html` dans votre navigateur (double‑clic).

Option 2 — serveur HTTP simple (recommandé pour éviter les problèmes CORS)
1. Se placer dans le dossier du projet :
   cd test
2. Démarrer un serveur simple (ex. Python) :
   - Python 3 :
     python -m http.server 8000
   - Ensuite ouvrir : http://localhost:8000

Option 3 — avec Node (si package.json présent)
1. Installer les dépendances :
   npm install
2. Lancer l'application :
   npm start
3. Ouvrir : http://localhost:3000 (ou le port configuré)

Structure du dépôt
------------------
- index.html — page principale / maquettes
- styles.css — styles et responsive
- script.js — logique frontend (produits, filtres, panier pour la démo)
- README.md — documentation (vous êtes ici)

Remarque : adaptez cette structure si le backend ou d'autres dossiers ont été ajoutés (api/, server/, migrations/, etc.).

Configuration & données
-----------------------
- Pour la démo, les données peuvent provenir de sources statiques ou de placeholder (ex : picsum.photos).
- En phase de développement, utilisez une base de données (PostgreSQL, MySQL, MongoDB) et fournissez les variables d'environnement (DATABASE_URL, SECRET_KEY, etc.).
- Indiquez ici les commandes de migration / seed si elles existent :
  - Exemple (frameworks courants) :
    - php artisan migrate --seed
    - rails db:migrate db:seed
    - npm run migrate && npm run seed

Tests
-----
- Décrire comment lancer les tests unitaires et d'intégration (ex. `npm test`, `pytest`, `phpunit`).
- Inclure des instructions pour le reporting de couverture si disponible.

Déploiement
----------
- Fournir la stratégie recommandée (Heroku, Netlify, Vercel, Docker + Kubernetes, provider interne).
- Indiquer les étapes basiques : build, variables d'environnement, migrations, services externes (SMTP, SSO).

Contribution
------------
1. Forkez le dépôt
2. Créez une branche feature/x ou fix/x
3. Ouvrez une Pull Request décrivant les changements
4. Respectez le guide de style et fournissez des tests si possible

Roadmap (à court terme)
----------------------
- Implémenter l'authentification et la gestion des rôles (admin / RH / employé)
- Ajouter l'API REST et la persistance en base
- Ajouter les modules congés et paie avec workflow d'approbation
- Mettre en place CI/CD et environnement de staging

Contacts / Auteurs
------------------
- Équipe MASAR (liste des contributeurs / responsables projet)
- Pour tout problème ou suggestion : créer une issue sur ce dépôt

Licence
-------
Indiquer la licence du projet (ex. MIT, Apache-2.0). Exemple :
MIT © Équipe MASAR — voir le fichier LICENSE pour plus de détails.

Notes finales
-------------
Ce README est une base — dites-moi précisément l'état actuel du projet (quelles fonctionnalités sont implémentées, s'il y a un backend, bases de données, scripts de migration, tests existants, etc.) et je mettrai à jour le document pour refléter exactement l'avancement et les instructions d'installation/exécution adaptées.
