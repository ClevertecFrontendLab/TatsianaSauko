import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentItem } from '@components/CommentItem';
import { ModalFeedback } from '@components/ModalFeedback';
import { ModalFeedbackError } from '@components/ModalFeedbackError';
import { ModalFeedbackSuccess } from '@components/ModalFeedbackSuccess';
import { ModalGetDataError } from '@components/ModalGetDataError';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { feedback, getFeedback } from '@redux/ActionCreators';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/AuthSlice';
import { feedbackSelector } from '@redux/slices/FeedbackSlice';
import { Button, Layout, Typography } from 'antd';

import { FormFeedback } from '../../types/Types';

import './feedbacksPage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();
    const { feedbacks } = useSelector(feedbackSelector);
    const [visibleCount, setVisibleCount] = useState(4);
    const [expanded, setExpanded] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isModalGetData, setIsModalGetData] = useState(false);
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalError, setIsModalError] = useState(false);
    const { token } = useSelector(authSelector);

    useEffect(() => {
        dispatch(getFeedback({ token })).catch(() => {
            setIsModalGetData(true);
        });
    }, []);

    const handleExpandClick = () => {
        if (expanded) {
            setVisibleCount(4);
        } else {
            setVisibleCount(feedbacks.length);
        }
        setExpanded(!expanded);
    };

    const handleModalToggle = () => {
        setIsModal(false);
        setIsModalError(false);
        if (isModalGetData) {
            setIsModalGetData(false);
            history.back();
        }
        if (isModalSuccess) {
            setIsModalSuccess(false);
            dispatch(getFeedback({ token }));
            history.push(Path.Feedbacks);
        }
    };

    const handleFeedbackSubmit = async (formData: FormFeedback) => {
        try {
            await dispatch(feedback(formData, token));
            setIsModalSuccess(true);
        } catch {
            setIsModalError(true);
        }
    };

    const handleCreateFeedback = () => {
        setIsModal(true);
    };

    return (
        <Content className={feedbacks.length ? 'feedbacks' : 'feedbacks add-flex'}>
            {isModalGetData && (
                <ModalGetDataError
                    isModalGetData={isModalGetData}
                    handleModalToggle={handleModalToggle}
                />
            )}
            {isModal && (
                <ModalFeedback
                    isModal={isModal}
                    handleModalToggle={handleModalToggle}
                    handleFeedbackSubmit={handleFeedbackSubmit}
                />
            )}
            {isModalError && (
                <ModalFeedbackError
                    isModalError={isModalError}
                    handleModalToggle={handleModalToggle}
                    handleCreateFeedback={handleCreateFeedback}
                />
            )}
            {isModalSuccess && (
                <ModalFeedbackSuccess
                    isModalSuccess={isModalSuccess}
                    handleModalToggle={handleModalToggle}
                />
            )}
            {feedbacks.length > 0 ? (
                <div className='feedbacks__full-wrapper'>
                    <div className='feedbacks__full'>
                        {feedbacks.slice(0, visibleCount).map((item) => (
                            <CommentItem data={item} key={item.id} />
                        ))}
                    </div>
                    <div className='feedbacks__full__buttons'>
                        <Button
                            type='primary'
                            size='large'
                            className='btn-feedback'
                            onClick={handleCreateFeedback}
                            data-test-id='write-review'
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            size='large'
                            className='btn-collapse'
                            onClick={handleExpandClick}
                            data-test-id='all-reviews-button'
                        >
                            {expanded ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className='feedbacks__empty-wrapper'>
                    <div className='feedbacks__empty'>
                        <div className='info'>
                            <Title level={3} className='title'>
                                Оставьте свой отзыв первым
                            </Title>
                            <Text type='secondary' className='subtitle'>
                                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                                Поделитесь своим мнением и опытом с другими пользователями, и
                                помогите им сделать правильный выбор.
                            </Text>
                        </div>
                        <Button
                            type='primary'
                            size='large'
                            className='btn-feedback'
                            onClick={handleCreateFeedback}
                            data-test-id='write-review'
                        >
                            Написать отзыв
                        </Button>
                    </div>
                </div>
            )}
        </Content>
    );
};
