interface GetTitle {
  (period: string | null, location: string): string;
}

export const getTitle: GetTitle = (period, locationName) => {
  switch (period) {
    case 'week': {
      return `События в ${locationName} на этой неделе`;
    }
    case 'month': {
      return `События в ${locationName} в этом месяце`;
    }
    case 'all': {
      return `Все события в ${locationName}`;
    }
    default: {
      return `События в ${locationName}`;
    }
  }
};
