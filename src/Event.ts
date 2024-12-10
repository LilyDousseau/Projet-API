/**
 Permet de définir l'interface d'un événement que nous allons utiliser dans notre application
 */

export interface Event {
    id: string;
    title: string;
    lead_text: string;
    date_start: string | null;
    date_end: string | null;
    cover_url: string | null;
    address_name: string | null;
    address_street: string | null;
    latitude: number | null;
    longitude: number | null;
    price_type: string | null;
    isFavorite?: boolean;
}

