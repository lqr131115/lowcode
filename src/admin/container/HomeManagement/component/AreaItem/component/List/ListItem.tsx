import { Form, Input } from 'antd';
import { forwardRef, useState } from 'react';
import type { BaseSyntheticEvent } from 'react';
import * as C from '../../../../../../../common/constant'
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};
const ListItem = ({ item = {} }: any, ref: any) => {
    const [form] = Form.useForm();
    const onFieldValueChange = (name: string, e: BaseSyntheticEvent | null, value?: any) => {
        form.setFieldValue(name, value ?? e?.target.value)
        setAttributes(form.getFieldsValue())
    }
    const [attributes, setAttributes] = useState(item)
    return (
        <Form ref={ref} form={form} {...layout} initialValues={attributes} >
            <Form.Item name='title' label="标题" >
                <Input onChange={(e) => { onFieldValueChange(C.LIST_FIELD_TITLE, e) }} />
            </Form.Item>
            <Form.Item name='description' label="介绍">
                <Input.TextArea onChange={(e) => { onFieldValueChange(C.LIST_FIELD_DESCRIPTION, e) }} />
            </Form.Item>
            <Form.Item
                name="cover"
                label="封面"
            >
                <Input onChange={(e) => { onFieldValueChange(C.LIST_FIELD_COVER, e) }} />
            </Form.Item>
            <Form.Item
                name="link"
                label="链接"
            >
                <Input onChange={(e) => { onFieldValueChange(C.LIST_FIELD_LINK, e) }} />
            </Form.Item>
        </Form>
    );
};

export default forwardRef(ListItem);