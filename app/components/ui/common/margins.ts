export type Margin = 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const DEFAULT_MARGIN: Margin = 'm';

export const margins = [
  {
    name: 'none',
    size: 0,
  },
  {
    name: 'xxs',
    size: 2,
  },
  {
    name: 'xs',
    size: 4,
  },
  {
    name: 's',
    size: 10,
  },
  {
    name: 'm', // Default value
    size: 16,
  },
  {
    name: 'l',
    size: 24,
  },
  {
    name: 'xl',
    size: 32,
  },
  {
    name: 'xxl',
    size: 64,
  },
];
