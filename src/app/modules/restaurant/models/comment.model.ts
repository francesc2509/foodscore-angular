import { User } from '../../../models';

export interface Comment {
    stars: number;
    text: string;
    date?: string;
    user?: User;
    fullStars?: boolean[];
    emptyStars?: boolean[];
}
