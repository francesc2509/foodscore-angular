export interface Restaurant {
    id?: number;
    name: string;
    image: string;
    cuisine: string[];
    description: string;
    phone: string;
    daysOpen: number[];
    lat: number;
    lng: number;
    address: string;
    avatar?: string;
    mine?: boolean;
}
