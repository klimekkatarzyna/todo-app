import React, { useCallback, useState } from 'react';
import { ITask } from '../interfaces';

interface IinitialDnDState {
    draggedFrom: number;
    draggedTo: number;
    isDragging: boolean;
    originalOrder: ITask[];
    updatedOrder: ITask[];
}

const initialDnDState: IinitialDnDState = {
    draggedFrom: 0,
    draggedTo: 0,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
}

const useDragAndDrop = (list: any, setList: any) => {
    const [dragAndDrop, setDragAndDrop] = useState<IinitialDnDState>(initialDnDState);

    const onDragStart = useCallback((event, index: number) => {
        const initialPosition = Number(event.currentTarget.dataset.position as HTMLElement);

        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list
        });
        
        event.dataTransfer.setData("text/html", '');
    }, [list]);


    const onDragOver = useCallback((event, index) => {
        event.preventDefault();
  
        let newList = dragAndDrop.originalOrder;
        
        // index of the item being dragged
        const draggedFrom = dragAndDrop.draggedFrom; 

        // index of the droppable area being hovered
        const draggedTo = Number(event.currentTarget.dataset.position); 

        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);

        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];
            
        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo
            })
        }
    }, [dragAndDrop]);

    const onDrop = useCallback((event) => {
        setList(dragAndDrop.updatedOrder);
  
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: 0,
            draggedTo: 0,
            isDragging: false
        });
    }, [dragAndDrop]);

    const onDragLeave = useCallback(() => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: 0
        });
    }, [dragAndDrop]);

    return {
        dragAndDrop,
        onDragStart,
        onDragOver,
        onDrop,
        onDragLeave
    }
};

export default useDragAndDrop;