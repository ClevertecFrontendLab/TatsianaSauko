import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { trainingSelector } from '@redux/slices/TrainingSlice';
import { Button, Empty } from 'antd';

import empty from '/png/empty-image.png';
import { TrainingEditProps } from '../../types/Props';

import './modalEditContent.css';

export const ModalEditContent = ({ onClick }: TrainingEditProps) => {
    const { training } = useSelector(trainingSelector);

    return (
        <ul className='training-edit-content'>
            {training.exercises.length === 1 && training.exercises[0].name.trim() === '' ? (
                <Empty
                    image={empty}
                    imageStyle={{
                        height: 32,
                        width: 32,
                    }}
                    className='empty'
                    description={false}
                />
            ) : (
                training.exercises.map((item, index) => (
                    <li key={item._id}>
                        {item.name}
                        {item.name !== '' && (
                            <Button
                                className='icon-edit'
                                data-test-id={`modal-update-training-edit-button${index}`}
                                onClick={onClick}
                                icon={<EditOutlined style={{ color: 'var(--primary-light-6)' }} />}
                            />
                        )}
                    </li>
                ))
            )}
        </ul>
    );
};
