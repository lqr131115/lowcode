import { Form, Input, Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { forwardRef, useState, useImperativeHandle, createRef, RefObject } from 'react';
import { FormInstance } from 'rc-field-form';
import type { BaseSyntheticEvent } from 'react';
import * as C from '../../../../../../../common/constant'
import Item from './Item';
import styles from './style.module.scss'

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};

const validateMessages = {
    required: '${label}是必须的!',
};

interface Child {
    id: string,
    name: string,
    link: string
}

const Footer = ({ schema = {} }: any, ref: any) => {
    const [form] = Form.useForm();

    const [attributes, setAttributes] = useState(schema.attributes || {})
    const [children, setChildren] = useState<Child[]>(schema.children || [])
    const [batch, setBatch] = useState<boolean>(false)
    const [deletes, setDeletes] = useState<string[]>([])
    const refs = children.map(() => (createRef<FormInstance>()))

    useImperativeHandle(ref, () => ({
        getChildren: () => {
            const children: Child[] = []
            refs.forEach((reF: RefObject<FormInstance>) => {
                const attrs = reF.current?.getFieldsValue()
                children.push(attrs)
            })
            return children
        },
        validateFields: () => {
            return form.validateFields()
        }
    }));

    const onFieldValueChange = (key: string, e: BaseSyntheticEvent | null, value?: any) => {
        form.setFieldValue(key, value ?? e?.target.value)
        setAttributes(form.getFieldsValue())
    }
    const addChild = () => {
        const oldChildren = [...children]
        oldChildren.unshift({ id: Date.now() + '' + Math.random(), name: '', link: '' })
        setChildren(oldChildren)
    }
    const batchOperate = () => {
        if (children.length === 0) {
            return
        }
        setBatch(true)
    }
    const deleteChild = () => {
        if (deletes.length === 0) {
            setBatch(false)
            return
        }
        const set = new Set(deletes)
        const newChildren = [...children].filter((child: Child) => !set.has(child.id))
        setChildren(newChildren)
        setBatch(false)
    }
    const onCheckboxChange = (e: CheckboxChangeEvent, id: string) => {
        const oldDeletes = [...deletes]
        const checked = e.target.checked
        if (checked) {
            oldDeletes.push(id)
        } else {
            const idx = oldDeletes.indexOf(id)
            oldDeletes.splice(idx, 1)
        }
        setDeletes(oldDeletes)
    }
    return (
        <div>
            <Form form={form} {...layout} initialValues={attributes} validateMessages={validateMessages} requiredMark={false}>
                <Form.Item
                    name="copyright"
                    label="版权号"
                    rules={[{ required: true }]}
                >
                    <Input onChange={(e) => { onFieldValueChange(C.FOOTER_FIELD_COPYRIGHT, e) }} />
                </Form.Item>
                <Form.Item
                    name="record"
                    label="备案"
                    rules={[{ required: true }]}
                >
                    <Input onChange={(e) => { onFieldValueChange(C.FOOTER_FIELD_RECORD, e) }} />
                </Form.Item>
            </Form>
            <div className={styles.btns}>
                <Button type="primary" onClick={addChild} style={{ marginRight: 10 }}>添加</Button>
                {!batch && <Button danger onClick={batchOperate} disabled={children.length === 0}>批量操作</Button>}
                {batch && <Button type="primary" danger onClick={deleteChild}>删除</Button>}
            </div>
            {children.map((child: Child, index: number) => (
                <div key={child.id || index} className={styles.wrapper}>
                    {
                        batch && (<div className={styles.checkbox}>
                            <Checkbox onChange={(e: CheckboxChangeEvent) => { onCheckboxChange(e, child.id) }}></Checkbox>
                        </div>)
                    }
                    <div className={styles.item}>
                        <Item ref={refs[index]} item={child} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default forwardRef(Footer);