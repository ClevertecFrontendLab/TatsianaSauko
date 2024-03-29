import { Button, Form, Modal, Input, Rate } from 'antd';
import { ModalProps } from '../../types/Props';
import { useEffect, useState } from 'react';
import { FieldData } from 'rc-field-form/lib/interface';
import { FormFeedback } from '../../types/Types';
import { feedbackSelector, setUserFeedback } from '@redux/slices/FeedbackSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useSelector } from 'react-redux';
import { StarFillIcon, StarIcon } from '../../icons';

import './modalFeedback.css';

export const ModalFeedback = ({ isModal, handleModalToggle, handleFeedbackSubmit }: ModalProps) => {
    const dispatch = useAppDispatch();
    const { userFeedback } = useSelector(feedbackSelector);
    const [isDisabled, setIsDisabled] = useState(!Boolean(userFeedback.rating));
    const [rateValue, setRateValue] = useState(userFeedback.rating);
    const [modalWidth, setModalWidth] = useState(window.innerWidth < 576 ? 328 : 539);

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth < 576 ? 328 : 539);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onFinish = (value: FormFeedback) => {
        dispatch(setUserFeedback(value));
        handleModalToggle();
        handleFeedbackSubmit(value);
    };

    const handleFieldsChange = (changedFields: FieldData[]) => {
        if (changedFields[0]?.name[0] === 'rating') {
            setIsDisabled(changedFields[0]?.value > 0 ? false : true);
            setRateValue(changedFields[0]?.value);
        }
    };

    return (
        <Modal
            className='modal-feedback'
            title='Ваш отзыв'
            centered
            open={isModal}
            width={modalWidth}
            onCancel={handleModalToggle}
            footer={null}
        >
            <Form
                name='message'
                className='form-feedback'
                initialValues={{ message: userFeedback.message }}
                onFinish={onFinish}
                onFieldsChange={(changedFields, _): void => {
                    handleFieldsChange(changedFields);
                }}
            >
                <Form.Item name='rating'>
                    <Rate
                        value={rateValue}
                        character={({ index }) => {
                            if (typeof index !== 'undefined') {
                                return rateValue !== 0 && index < rateValue ? (
                                    <StarFillIcon />
                                ) : (
                                    <StarIcon />
                                );
                            }
                            return null;
                        }}
                    />
                </Form.Item>
                <Form.Item name='message'>
                    <Input.TextArea
                        autoSize={{ minRows: 2 }}
                        placeholder='Расскажите, почему Вам понравилось наше приложение.'
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        block
                        type='primary'
                        size={'large'}
                        htmlType='submit'
                        className='btn-feedback'
                        disabled={isDisabled}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
