/**
Permet de définir l'interface d'un événement récupérer depuis le l'url des evenements 
 * */ 


export interface ApiEvent {
    id: string;
    url: string;
    title: string;
    lead_text: string;
    description: string;
    date_start: string | null;
    date_end: string | null;
    occurrences: string | null;
    date_description: string | null;
    cover_url: string | null;
    cover_alt: string | null;
    cover_credit: string | null;
    tags: string[] | null;
    address_name: string | null;
    address_street: string | null;
    address_zipcode: string | null;
    address_city: string | null;
    lat_lon: {
        lon: number;
        lat: number;
    } | null;
    pmr: string | null;
    blind: string | null;
    deaf: string | null;
    transport: string | null;
    contact_url: string | null;
    contact_phone: string | null;
    contact_mail: string | null;
    contact_facebook: string | null;
    contact_twitter: string | null;
    price_type: string | null;
    price_detail: string | null;
    access_type: string | null;
    access_link: string | null;
    access_link_text: string | null;
    updated_at: string;
    image_couverture: string | null;
    programs: string | null; 
    address_url: string | null;
    address_url_text: string | null;
    address_text: string | null;
    title_event: string | null;
    audience: string | null;
    childrens: string | null; 
    group: string | null;
    locale: string | null;
}
