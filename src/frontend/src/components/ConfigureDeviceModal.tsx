import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { NetworkDevice, NetworkConfiguration } from '../types/NetworkDevice';
import { networkApi } from '../api/networkApi';

interface Props {
    device: NetworkDevice | null;
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ConfigureDeviceModal: React.FC<Props> = ({
    device,
    visible,
    onClose,
    onSuccess
}) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (device) {
                await networkApi.configureDevice(device.id, values);
                message.success('Device configured successfully');
                onSuccess();
                onClose();
            }
        } catch (error) {
            message.error('Failed to configure device');
        }
    };

    return (
        <Modal
            title="Configure Device"
            visible={visible}
            onOk={handleOk}
            onCancel={onClose}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="IP Address"
                    name="ip"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Subnet Mask"
                    name="mask"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Gateway" name="gateway">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ConfigureDeviceModal;

