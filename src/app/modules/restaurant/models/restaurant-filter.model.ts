export interface RestaurantFilter {
    name: string;
    isActive: boolean;
    handler: (event: Event) => void;
    label: string;
}
