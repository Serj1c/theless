import { LocationModel} from './location';

export interface EventModel {
   id: string;
   slug: string;
   location: LocationModel;
   link?: string;
   name: string;
   dateStart: number;
   dateEnd: number;
   address: string;
   cover: string;
   description?: string;
   coordinates?: [number, number];
}
