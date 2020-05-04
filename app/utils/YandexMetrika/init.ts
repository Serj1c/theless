/**
 * Counter initialize option
 * @see {@link https://yandex.ru/support/metrica/code/counter-initialize.html?lang=ru}
 */
interface InitOptions {
    accurateTrackBounce?: boolean | number;
    childIframe?: boolean;
    clickmap?: boolean;
    defer?: boolean;
    ecommerce?: boolean | string | string[];
    params?: {} | {}[];
    userParams?: {};
    trackHash?: boolean;
    trackLinks?: boolean;
    trustedDomains?: string[];
    type?: 0 | 1;
    ut?: 'noindex';
    webvisor?: boolean;
    triggerEvent?: boolean;
}

interface VisitParams {
    /** Цена цели. Вы можете указать цену как в валюте, так и в условных единицах. */
    order_price?: number;
    /** Используйте это поле, если хотите передать цену цели в валюте. */
    currency?: string;
}

/**
 * @see {@link https://yandex.ru/support/metrica/objects/hit.html Hit}
 */
interface HitOptions {
    /** Callback-функция, вызываемая после отправки данных о просмотре */
    callback?: () => void;
    /** Контекст, доступный в callback-функции по ключевому слову this */
    ctx?: {};
    /** Параметры визита */
    params?: VisitParams;
    /** URL с которого посетитель загрузил содержимое текущей страницы */
    referer?: string;
    /** Заголовок текущей страницы */
    title?: string;
}

interface Ym {
    (accountId: number, method: 'init', options: InitOptions): void;
    (accountId: number, method: 'hit', url: string, options?: HitOptions): void;
    (accountId: number, method: 'reachGoal', target: string, params?: VisitParams, cb?: () => void, ctx?: {}): void;
    a?: any[];
    l?: number;
}

declare global {
    interface Window {
        ym?: Ym;
    }
}

export const init = (accountId: number, options: InitOptions): void => {
    window.ym = window.ym || function (): void {
        (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Number(new Date());
    const element = document.createElement('script');
    element.async = true;
    element.src = 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js';
    document.body.prepend(element);

    window.ym(accountId, 'init', options);
}
