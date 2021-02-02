export const HOMEPAGE_URL = '/events';
export const TITLE_PREFIX = 'Less – ';

export const EMAIL = 'info@theless.com';
export const START_YEAR = 2020;

export const YM_ID = 62535382;
export const YM_OPTIONS = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
  defer: true,
};

export const GA_ID = 'UA-165389436-1';

export const TWITTER_SHARE_URL = `https://twitter.com/share?url=`;
export const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer.php?u=`;
export const HOST_URL =
  process.env.NODE_ENV === 'development'
    ? `https://theless.dev`
    : `https://theless.ru`;
