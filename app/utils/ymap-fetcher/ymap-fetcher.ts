const API_KEY = 'a4bd45f2-9434-4534-aef5-eeb541d15758';
const API_URL = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU&onload=ymapsReady`;

const ymapFetcher = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if ('ymaps' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ymaps.ready(resolve);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).ymapsReady = resolve;

    const scriptNode = document.createElement('script');

    scriptNode.onerror = reject;
    scriptNode.src = API_URL;

    const firstScriptNode = document.getElementsByTagName('script')[0];

    if (firstScriptNode) {
      firstScriptNode.before(scriptNode);
    } else {
      document.head.appendChild(scriptNode);
    }
  });

export default ymapFetcher;
