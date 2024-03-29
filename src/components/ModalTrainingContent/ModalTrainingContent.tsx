import { getColorForName } from '@utils/getColorForName';
import { Button } from 'antd';
import { TrainingContentProps } from '../../types/Props';
import { EditFilled, EditOutlined } from '@ant-design/icons';

import './modalTrainingContent.css';

export const ModalTrainingContent = ({ value, onClick }: TrainingContentProps) => {
    return (
        <ul className='training-content'>
            {value.map((activity, index) => (
                <li key={activity._id} className={activity.isImplementation ? 'disabled' : ''}>
                    <div
                        className='marker'
                        style={{ backgroundColor: getColorForName(activity.name) }}
                    />
                    {activity.name}
                    <Button
                        className='icon-edit'
                        data-test-id={`modal-update-training-edit-button${index}`}
                        disabled={activity.isImplementation}
                        onClick={
                            activity.isImplementation ? undefined : () => onClick(activity.name)
                        }
                        icon={
                            activity.isImplementation ? (
                                <EditFilled />
                            ) : (
                                <EditOutlined style={{ color: 'var(--primary-light-6)' }} />
                            )
                        }
                    ></Button>
                </li>
            ))}
        </ul>
    );
};
