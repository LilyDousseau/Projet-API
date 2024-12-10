# **Event Service API**

Event Service API est une application back-end développée avec NestJS permettant de gérer un ensemble d'événements. Elle fournit des fonctionnalités pour créer, consulter, modifier, rechercher et supprimer des événements.

## **Table des matières**

- [Contenu](#Contenu)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Endpoints](#endpoints)


---

## **Contenu**

1. ApiEvent

- Description : Interface représentant les événements tels qu'ils sont reçus depuis une source externe (par exemple, une API).

- Contenu :
Champs : id, title, lead_text, date_start, date_end, cover_url, address_name, address_street, latitude, longitude, price_type, etc.
Utilisé pour la conversion des données externes vers l'interface interne Event.

2. event.controller.ts

- Description : Gère les requêtes HTTP entrantes et appelle les services appropriés.

- Principales méthodes :
getEvents : Récupérer tous les événements ou un événement spécifique par ID.
markAsFavorite : Marquer ou démarquer un événement comme favori.
createEvent : Créer un nouvel événement.
searchEvents : Rechercher des événements par mot-clé.
deleteEvent : Supprimer un événement par ID.

3. event.service.ts

- Description : Contient la logique métier pour gérer les événements.

- Principales méthodes :
findAll : Récupérer tous les événements.
getEvent : Récupérer un événement spécifique par ID.
createEvent : Ajouter un nouvel événement à la liste.
deleteEvent : Supprimer un événement en fonction de son ID.
search : Rechercher des événements correspondant à un mot-clé.

4. event.module.ts

- Description : Déclare et configure les dépendances pour le module Event.

- Rôle : Connecte le contrôleur (EventController) et le service (EventService) afin qu'ils puissent interagir.

5. Event

- Description : Interface représentant un événement dans l'application.

- Champs principaux :
id : Identifiant unique de l'événement.
title : Titre de l'événement.
lead_text : Description courte.
date_start et date_end : Dates de début et de fin.
latitude et longitude : Coordonnées géographiques.
isFavorite : Indique si l'événement est marqué comme favori.

---

## **Fonctionnalités**

- Récupération de tous les événements ou d'un événement spécifique par ID.
- Création d’un nouvel événement.
- Marquage ou démarquage d’un événement comme favori.
- Recherche d’événements par mot-clé.
- Suppression d’un événement par ID.

---

## **Prérequis**

Avant de démarrer, assurez-vous d’avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/) (version 16 ou plus)
- [npm](https://www.npmjs.com/)
- [Git]

---

## **Installation**

1. Clonez le dépôt sur votre machine locale :
   git clone https://github.com/<votre-utilisateur>/<votre-repo>.git

2. Installer les dépendances : 
  npm install

3. Démarrer le serveur : 
  npm run start
  L'application sera disponible sur l'url https://app-1e608587-c9f5-480b-99ec-e45c317aa5b5.cleverapps.io/events

---

## **Endpoints**

1. Récupérer tous les événements
GET /events

2. Récupérer un événement spécifique
GET /events?id={id}

3. Marquer un événement comme favori
PATCH /events/{id}/favorite

4. Créer un nouvel événement
POST /events

5. Supprimer un événement
DELETE /events/{id}

6. Rechercher des événements
GET /events/search?query={mot-clé}

