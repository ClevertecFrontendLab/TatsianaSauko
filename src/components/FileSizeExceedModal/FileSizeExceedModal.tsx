import { Button, Modal, Typography } from 'antd';
import { FileSizeExceedModalProps } from '../../types/Props';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useResponsiveWidth } from '@hooks/useResponsiveWidth';

import './fileSizeExceedModal.css';

const { Title, Text } = Typography;

export const FileSizeExceedModal = ({ visible, onClose }: FileSizeExceedModalProps) => {
    const modalWidth = useResponsiveWidth(328, 416);

    return (
        <Modal
            className='modal-file-error'
            footer={false}
            centered
            open={visible}
            onCancel={onClose}
            closable={false}
            width={modalWidth}
        >
            <div className='result-file-error'>
                <div className='block-title__wrapper'>
                    <CloseCircleOutlined
                        className='icon-result'
                        style={{ color: 'var(--character-light-error)', fontSize: '24px' }}
                    />
                    <div className='block-title'>
                        <Title level={5} className='title'>
                            Файл слишком большой
                        </Title>
                        <Text type='secondary' className='subtitle'>
                            Выбирите файл размером [......] МБ.
                        </Text>
                    </div>
                </div>
                <Button
                    data-test-id='big-file-error-close'
                    type='primary'
                    className='btn-close'
                    onClick={onClose}
                    size='large'
                >
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
