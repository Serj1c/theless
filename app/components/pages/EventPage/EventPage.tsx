import React from 'react';
import { Footer, Header, Page, SubscriptionForm, PageHeader } from 'components/common';
import { Link } from 'components/ui';
import { EventModel } from 'models';
import { Cover, MapSection, Description } from './components';

interface Props {
    item?: EventModel;
}

const EventPage = ({ item }: Props): JSX.Element => (
    <Page
        header={<Header inverted />}
        footer={<Footer />}
    >
        {/* Cover section */}
        <Cover
            img={item.cover} />

        {/* Headline section */}
        <PageHeader title={item.name} />

        {/* Description section*/}
        <Description item={item} />

        {/* Map  section */}
        {item.coordinates && (
            <MapSection coordinates={item.coordinates} />
        )}

        {/* Subscription form */}
        <SubscriptionForm
            title='Подписаться на&nbsp;это событие'
            params={{
                eventId: item.id
            }}
        />
    </Page>
);

export default EventPage;
