import { Button } from 'antd';
import styles from './style.module.scss';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import AreaItem from '../AreaItem';
import { useAppSelector, useAppDispatch } from '../../../../store'
import { addChild, sortChild } from '../../../../store/reducer/homeManagement'
import type { Schema } from '../../../../../common/type'


const AreaList = () => {
    const { children = [] } = useAppSelector((state) => (state.homeManagement.schema))
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    const dispatch = useAppDispatch()

    const addItem = () => {
        dispatch(addChild({ name: '' }))
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id !== over.id) {
            const oldIndex = children.indexOf(active.id);
            const newIndex = children.indexOf(over.id);
            const newChildren = arrayMove(children, oldIndex, newIndex)
            dispatch(sortChild(newChildren))
        }
    }
    return (
        <div>
            <ul className={styles.list}>
                <DndContext
                    sensors={sensors}
                    modifiers={[restrictToVerticalAxis]}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={children} strategy={verticalListSortingStrategy} >
                        {
                            children.map((child: Schema, index: number) => (
                                <AreaItem child={child} key={index} index={index} />
                            ))
                        }
                    </SortableContext>
                </DndContext>
            </ul>
            <Button type="primary" ghost onClick={addItem}>新增页面区块</Button>
        </div>
    );
}

export default AreaList;