import { Form, Input, InputNumber, Switch } from 'antd';
import { forwardRef, useState } from 'react';
import type { BaseSyntheticEvent } from 'react';
import * as C from '../../../../../../../common/constant'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const validateMessages = {
    required: '${label}是必须的!',
    types: {
        url: '${label}不是一个合法链接!',
        number: '${label}不是一个合法数字!',
    },
};

const Banner = ({ schema = {} }: any, ref: any) => {
    const [form] = Form.useForm();
    const [attributes, setAttributes] = useState(schema.attributes || {})

    const onFieldValueChange = (key: string, e: BaseSyntheticEvent | null, value?: any) => {
        form.setFieldValue(key, value ?? e?.target.value)
        setAttributes(form.getFieldsValue())
    }
    return (
        <Form ref={ref} form={form} {...layout} initialValues={attributes} validateMessages={validateMessages} requiredMark={false}>
            <Form.Item name='title' label="标题" rules={[{ required: true }]}>
                <Input onChange={(e) => { onFieldValueChange(C.BANNER_FIELD_TITLE, e) }} />
            </Form.Item>
            <Form.Item name='description' label="介绍">
                <Input.TextArea onChange={(e) => { onFieldValueChange(C.BANNER_FIELD_DESCRIPTION, e) }} />
            </Form.Item>
            <Form.Item label="显示头像" name="showAvatar">
                <Switch checkedChildren="显示" unCheckedChildren="隐藏" checked={attributes[C.BANNER_FIELD_SHOW_AVATAR]} onChange={(checked: boolean, e: BaseSyntheticEvent) => { onFieldValueChange(C.BANNER_FIELD_SHOW_AVATAR, e, checked) }} />
            </Form.Item>
            {
                attributes[C.BANNER_FIELD_SHOW_AVATAR] ? (<Form.Item
                    name="avatarUrl"
                    label="头像链接"
                    rules={[{ type: 'url' }]}
                >
                    <Input onChange={(e) => { onFieldValueChange(C.BANNER_FIELD_AVATAR_URL, e) }} />
                </Form.Item>) : null
            }
            <Form.Item
                name="bgUrl"
                label="背景图链接"
                rules={[{ required: true }, { type: 'url' }]}
            >
                <Input onChange={(e) => { onFieldValueChange(C.BANNER_FIELD_BG_URL, e) }} />
            </Form.Item>
            <Form.Item name='bgHeigh' label="背景图高度">
                <InputNumber min={100} max={1000} onChange={(value: any) => { onFieldValueChange(C.BANNER_FIELD_BG_HEIGH, null, value) }} />
            </Form.Item>
        </Form>
    );
};

export default forwardRef(Banner);