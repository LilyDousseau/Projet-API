import { Injectable, OnModuleInit } from '@nestjs/common';
import { Event } from './Event';
import { ApiEvent } from './ApiEvent';
import { catchError, firstValueFrom } from 'rxjs';
import * as fs from 'node:fs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EventService implements OnModuleInit {

    private eventList: Event[] = []; // Stockage des événements localement

    constructor(private readonly httpService: HttpService) {}

    async onModuleInit() {
        // Charger les événements depuis le fichier et l'API au démarrage du module
        await Promise.all([this.loadEventsFromAPI()]);
    }


    private async loadEventsFromAPI() {
        const limit = 100; // Nombre maximum d'éléments par requête
        let start = 0; // Position de départ pour la pagination
        let ApiEvents: ApiEvent[] = []; // Stockage de tous les événements récupérés
        let totalCount = 0; // Compteur total d'éléments renvoyé par l'API

        do {
            const response = await this.httpService
                .get<{ total_count: number; results: ApiEvent[] }>(
                    `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${limit}&start=${start}`
                )
                .toPromise();

            const apiData = response?.data;
            if (!apiData || !Array.isArray(apiData.results)) {
                throw new Error('Invalid API response structure');
            }

            // Ajouter les résultats à la liste des événements
            ApiEvents = ApiEvents.concat(apiData.results);

            // Mise à jour des paramètres pour la prochaine requête
            totalCount = apiData.total_count;
            start += limit; // Déplacer le point de départ

            //console.log(`Événements récupérés : ${ApiEvents.length}/${totalCount}`);
        } while (ApiEvents.length < totalCount);

        // Conversion des événements de l'API en objets Event
        const events: Event[] = this.mapApiEventToEvent(ApiEvents);

        // Stocker les événements dans votre système
        events.forEach((event: Event) => this.create(event));

        console.log(`Total des événements chargés dans la liste des Events : ${this.eventList.length}`);
        
    }


   /**
 * Mapping des objets `ApiEvent` vers les objets `Event`.
 * Cette fonction extrait uniquement les champs nécessaires.
 */
private mapApiEventToEvent(apiEvents: ApiEvent[]): Event[] {
    return apiEvents.map((apiEvent: ApiEvent) => ({
        id: apiEvent.id,
        title: apiEvent.title,
        lead_text: apiEvent.lead_text,
        date_start: apiEvent.date_start,
        date_end: apiEvent.date_end,
        cover_url: apiEvent.cover_url,
        address_name: apiEvent.address_name,
        address_street: apiEvent.address_street,
        latitude: apiEvent.lat_lon?.lat ?? null,
        longitude: apiEvent.lat_lon?.lon ?? null,
        price_type: apiEvent.price_type,
        isFavorite: false,
    }));
}


   /**
     * Ajouter un nouvel événement à la liste locale.
     * Vérifie qu'il n'existe pas déjà avant de l'ajouter.
     */
   create(event: Event): void {
    if (this.eventList.find(existingEvent => existingEvent.id === event.id)) {
        console.warn(`Event with ID ${event.id} already exists.`);
        return;
    }
    this.eventList.push(event);
    }

    /**
     * Récupérer un événement par son ID.
     */
    getEvent(id: string): Event {
        const event = this.eventList.find(existingEvent => existingEvent.id === id);
        if (event) {
            return event;
        }
        throw new Error(`Event with ID ${id} not found.`);
    }


    /**
     * Récupérer tous les événements triés par titre.
     */
    findAll(): Event[] {
        return this.eventList.sort((a, b) => a.title.localeCompare(b.title));
    }

    /**
     * Supprimer un événement par son ID.
     */
    deleteEvent(id: string): Event[] {
        this.eventList = this.eventList.filter(event => event.id !== id);
        return this.eventList;
    }

    /**
     * Créer un nouvel événement.
     */
    createEvent(event: Event): Event {
    this.eventList.push(event); // Ajout dans le tableau
    return event; // Retourne l'objet ajouté
    }

    /**
     * Rechercher des événements par une caractéristique (gratuit, payant, concert,...).
     */
    search(query: string): Event[] {
        return this.eventList.filter(event =>
          event.title.toLowerCase().includes(query.toLowerCase())
        ); 
      }

}

