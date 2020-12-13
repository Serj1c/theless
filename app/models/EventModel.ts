interface Location {
  name: string;
  slug: string;
}

export interface EventModel {
  id: string;
  slug: string;
  location: Location;
  link?: string;
  name: string;
  dateStart: string;
  dateEnd: string;
  address: string;
  cover: string;
  description?: string;
  coordinates?: [number, number];
  isFavorite?: boolean;
}
