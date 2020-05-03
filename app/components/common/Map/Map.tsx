import React, { memo, useEffect, useRef } from 'react';
import ymapFetcher from 'utils/ymap-fetcher/ymap-fetcher';
import styles from './Map.module.css';

interface Props {
    coords: [number, number];
}

const Map = ({ coords }: Props): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ymap: ymaps.Map;

        (async (): Promise<void> => {
            await ymapFetcher();

            if (!divRef.current) {
                return;
            }

            ymap = new window.ymaps.Map(divRef.current, {
                center: coords,
                zoom: 18,
                controls: ['fullscreenControl', 'zoomControl', 'geolocationControl']
            });

            const myPlacemark = new window.ymaps.Placemark(coords, {});
            ymap.geoObjects.add(myPlacemark);
        })();

        // OnUnmount event
        return (): void => {
            // It's possible to move to another page before map initiated
            if (ymap) {
                ymap.destroy();
            }
        };
    }, [coords]);

    return (
        <div className={styles.root} ref={divRef} />
    );
};

export default memo(Map);
