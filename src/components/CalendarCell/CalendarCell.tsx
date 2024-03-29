import { getColorForName } from '@utils/getColorForName';
import { trainingSelector } from '@redux/slices/TrainingSlice';
import { useSelector } from 'react-redux';
import { CalendarCellProps } from '../../types/Props';
import { getDataForDate } from '@utils/getDataForDate';

import './calendarCell.css';
import moment from 'moment';

export const CalendarCell = ({ value }: CalendarCellProps) => {
    const { activitiesData } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, moment(value).toISOString());

    return (
        <ul className='events'>
            {dataForDate.map((activity) => (
                <li key={activity.name}>
                    <span
                        className='marker'
                        style={{ backgroundColor: getColorForName(activity.name) }}
                    />
                    {activity.name}
                </li>
            ))}
        </ul>
    );
};
