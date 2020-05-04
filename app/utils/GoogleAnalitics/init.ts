interface Ga {
    (action: 'create', accountId: string, param: 'auto'): void;
    (action: 'send', method: 'pageview'): void;
    (action: 'set', method: 'page', url: string): void;
    q?: any[];
    l?: number;
}

declare global {
    interface Window {
        ga?: Ga;
        GoogleAnalyticsObject: 'ga';
    }
}

export const init = (accountId: string): void => {
    window.GoogleAnalyticsObject = 'ga';
    window.ga = window.ga || function (): void {
        (window.ga.q = window.ga.q || []).push(arguments);
    };
    window.ga.l = Number(new Date());

    const element = document.createElement('script');
    element.async = true;
    element.src = 'https://www.google-analytics.com/analytics.js';
    document.body.prepend(element);

    window.ga('create', accountId, 'auto');
    window.ga('send', 'pageview');
};
