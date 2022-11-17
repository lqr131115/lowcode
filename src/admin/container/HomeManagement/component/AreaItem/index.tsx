import { useState, useRef, forwardRef, useEffect } from 'react';
import { Button, Modal, Select } from 'antd';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppSelector, useAppDispatch } from '../../../../store'
import { deleteChild, updateChild } from '../../../../store/reducer/homeManagement'
import * as C from '../../../../../common/constant'
import Banner from './component/Banner';
import List from './component/List';
import Footer from './component/Footer';
import styles from './style.module.scss';
import type { Schema } from '../../../../../common/type'


const { Option } = Select
const map = {
    Banner,
    List,
    Footer,
} as any

const AreaItem = (props: any, ref: any) => {
    const { index, child } = props
    const itemRef = useRef<any>()
    const dispatch = useAppDispatch()
    const schema = useAppSelector((state) => {
        return state.homeManagement.schema.children[index] ?? {}
    })
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newSchema, setNewSchema] = useState<Schema>(schema)

    useEffect(() => {
        setNewSchema(schema)
    }, [schema])

    const render = (schema: Schema) => {
        const Component = map[schema.name]
        return Component ? <Component ref={itemRef} schema={schema} /> : null
    }
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
    } = useSortable({ id: child });

    const style = {
        transform: CSS.Transform.toString(transform),
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleModalOk = async () => {
        const name = newSchema.name
        try {
            switch (name) {
                case C.BANNER:
                    const res = await itemRef.current?.validateFields()
                    dispatch(updateChild({ index, newSchema: { ...newSchema, attributes: res } }))
                    break;
                case C.LIST:
                    const children = itemRef.current?.getChildren() || []
                    dispatch(updateChild({ index, newSchema: { ...newSchema, children } }))
                    break;
                case C.FOOTER:
                    const ret = await itemRef.current?.validateFields()
                    const childreN = itemRef.current?.getChildren() || []
                    dispatch(updateChild({ index, newSchema: { ...newSchema, attributes: ret, children: childreN } }))
                    break;
                default:
                    break;
            }
            setIsModalOpen(false)
        } catch (error) {
            console.error('error', error)
        }
    };

    const handleModalCancel = () => {
        setNewSchema(schema)
        setIsModalOpen(false)
    };

    const handleChange = (value: string) => {
        const newSSchema = { ...newSchema, name: value }
        setNewSchema(newSSchema)
    };

    const deleteItem = (index: number) => {
        dispatch(deleteChild(index))
    }

    return (
        <>
            <li className={styles.item} ref={setNodeRef} style={style} {...attributes} {...listeners} >
                <span className={styles.content} onClick={showModal}>{schema.name || '点击配置'}</span>
                <span className={styles.delete}>
                    <Button onClick={() => deleteItem(index)} size="small" type="dashed" danger>删除</Button>
                </span>
            </li>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} destroyOnClose={true}>
                <Select defaultValue={newSchema.name} style={{ width: '100%' }} onChange={handleChange}>
                    <Option value={C.BANNER}>{C.BANNER}</Option>
                    <Option value={C.LIST}>{C.LIST}</Option>
                    <Option value={C.FOOTER}>{C.FOOTER}</Option>
                </Select>
                <div className={styles.wrapper}>
                    {render(newSchema)}
                </div>
            </Modal>
        </>
    );
}

export default forwardRef(AreaItem);