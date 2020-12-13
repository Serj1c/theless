interface Item {
  type: 'item';
  title: string;
  url: string;
}

interface Divider {
  type: 'divider';
}

export const menuItems: (Item | Divider)[] = [
  {
    type: 'item',
    title: 'События',
    url: '/events',
  },
  {
    type: 'item',
    title: 'Места',
    url: '/places',
  },
  {
    type: 'item',
    title: 'Туры',
    url: '/tours',
  },
  {
    type: 'item',
    title: 'Обучение',
    url: '/learning',
  },
  {
    type: 'item',
    title: 'Магазин',
    url: '/shop',
  },
  {
    type: 'item',
    title: 'Блог',
    url: '/blog',
  },
  {
    type: 'divider',
  },
  {
    type: 'item',
    title: 'Избранное',
    url: '/profile/favorites',
  },
];
