
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDate = (date: string | number | Date): string => {
    if (!date) {
        return '--';
    }

    return format(new Date(date), 'MMMM dd, yyyy hh:mm a', {
        locale: enUS,
    });
};
