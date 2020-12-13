interface Location {
  name: string;
  slug: string;
}

export interface FavoriteModel {
  id: string;
  slug: string;
  location: Location;
  name: string;
  address: string;
  cover: string;
  dateStart: string;
  dateEnd: string;
  isFavorite: boolean;
}
