import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormInstance } from 'rc-field-form';
import { forwardRef, useState, useImperativeHandle, createRef, RefObject } from 'react';
import ListItem from './ListItem';
import styles from './style.module.scss'

interface Child {
  id: string,
  title: string
  description: string
  cover: string
  link: string
}

const List = ({ schema = {} }: any, ref: any) => {

  const [children, setChildren] = useState<Child[]>(schema.children || [])
  const [batch, setBatch] = useState<boolean>(false)
  const [deletes, setDeletes] = useState<string[]>([])
  const refs = children.map(() => (createRef<FormInstance>()))
  useImperativeHandle(ref, () => ({
    getChildren: () => {
      const children: Child[] = []
      refs.forEach((ref: RefObject<FormInstance>) => {
        const attrs = ref.current?.getFieldsValue()
        children.push(attrs)
      })
      return children
    }
  }));
  const addChild = () => {
    const oldChildren = [...children]
    oldChildren.unshift({ id: Date.now() + '', title: '', description: '', cover: '', link: '' })
    setChildren(oldChildren)
  }
  const batchOperate = () => {
    if (children.length === 0) {
      return
    }
    setBatch(true)
  }
  const deleteChild = () => {
    if(deletes.length === 0){
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
    <>
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
            <ListItem ref={refs[index]} item={child} />
          </div>
        </div>
      ))}
    </>
  );
};

export default forwardRef(List);