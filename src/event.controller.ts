import { Controller, Get, Post, Param, Query, Body, Patch, Delete, NotFoundException } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './Event';

@Controller('events')
export class EventController {

  constructor(private readonly eventService: EventService) {}

   /**
   * Récupérer tous les événements ou un événement spécifique si un id est donné.
   */
    @Get()
    getEvents(@Query('id') id?: string): Event | Event[] {
    if (id) {
      const event = this.eventService.getEvent(id);
      if (!event) {
        throw new NotFoundException({
          statusCode: 404,
          message: `Event with ID ${id} not found.`,
          error: 'Not Found'
        });
      }
      return event;
    }
    return this.eventService.findAll();
    }


    /**
     * Marquer un événement comme favori.
     */
    @Patch(':id/favorite')
    markAsFavorite(@Param('id') id: string): string {
    const event = this.eventService.getEvent(id); // Récupère l'événement par son ID
    if (!event) {
        throw new Error(`Event with ID ${id} not found.`);
    }

    // Met à jour la propriété isFavorite
    event.isFavorite = !event.isFavorite;
    return `Event with ID ${id} has been update.`;
    }

    @Post()
    async createEvent(@Body() event: Event): Promise<Event> {
    return this.eventService.createEvent(event); // Appel au service pour sauvegarder les données
    }

    @Get('search')
    async searchEvents(@Query('query') query: string): Promise<Event[]> {
    return this.eventService.search(query); // Appel au service pour effectuer la recherche
    }

    /**
    * Supprimer un événement par son ID.
    */
    @Delete(':id')
    deleteEvent(@Param('id') id: string): Event[] {
    return this.eventService.deleteEvent(id); // Appel au service pour supprimer l'événement
    }

}