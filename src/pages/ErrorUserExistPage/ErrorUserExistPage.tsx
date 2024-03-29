import { history } from '@redux/configure-store';
import { Typography, Button } from 'antd';
import errorIcon from '/png/error.png';

import './errorUserExistPage.css';

const { Title, Text } = Typography;

export const ErrorUserExistPage = () => (
    <div className='error-user-exist'>
        <img src={errorIcon} alt='Error' className='icon-user-exist-error' />
        <div className='block-title'>
            <Title level={3} className='title'>
                Данные не сохранились
            </Title>
            <Text type='secondary'>
                Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.
            </Text>
        </div>
        <Button
            block
            type='primary'
            size={'large'}
            className='button'
            onClick={() => history.back()}
            data-test-id='registration-back-button'
        >
            Назад к регистрации
        </Button>
    </div>
);
