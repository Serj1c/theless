import moment from 'moment';
import { EventModel } from 'models/EventModel';

export default (list: EventModel[], inclusive = false) => {
    const week: EventModel[] = [];
    const month: EventModel[] = [];
    const rest: EventModel[] = [];
    const endOfWeek = moment().endOf('isoWeek');
    const endOfMonth = moment().endOf('month');

    list.forEach((e) => {
        const date = moment(e.dateStart);

        if (date.isBefore(endOfWeek)) {
            week.push(e);

            if (inclusive) {
                month.push(e);
                rest.push(e);
            }
            return;
        }

        if (date.isBefore(endOfMonth)) {
            month.push(e);

            if (inclusive) {
                rest.push(e);
            }

            return;
        }

        rest.push(e);
    });

    return [week, month, rest];
};
