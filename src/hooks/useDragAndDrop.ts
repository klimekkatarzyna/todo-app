import React, { useCallback, useState } from 'react';

export interface IinitialDnDState<T> {
	draggedFrom: number;
	draggedTo: number;
	isDragging: boolean;
	originalOrder: T[];
	updatedOrder: T[];
}

const initialDnDState = {
	draggedFrom: 0,
	draggedTo: 0,
	isDragging: false,
	originalOrder: [],
	updatedOrder: [],
};

export const useDragAndDrop = <T>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
	const [dragAndDrop, setDragAndDrop] = useState<IinitialDnDState<T>>(initialDnDState);

	const onDragStart = useCallback(
		(event: React.DragEvent<HTMLDivElement>, index: number) => {
			const initialPosition = Number(event.currentTarget.dataset.position);

			setDragAndDrop({
				...dragAndDrop,
				draggedFrom: initialPosition,
				isDragging: true,
				originalOrder: list,
			});

			event.dataTransfer.setData('text/html', '');
		},
		[list]
	);

	const onDragOver = useCallback(
		(event: React.DragEvent<HTMLDivElement>, index: number): void => {
			event.preventDefault();

			let newList = dragAndDrop.originalOrder;

			// index of the item being dragged
			const draggedFrom = dragAndDrop.draggedFrom;

			// index of the droppable area being hovered
			const draggedTo = Number(event.currentTarget.dataset.position);

			const itemDragged = newList[draggedFrom];
			const remainingItems = newList.filter((item, index) => index !== draggedFrom);

			newList = [...remainingItems.slice(0, draggedTo), itemDragged, ...remainingItems.slice(draggedTo)];

			if (draggedTo !== dragAndDrop.draggedTo) {
				setDragAndDrop({
					...dragAndDrop,
					updatedOrder: newList,
					draggedTo: draggedTo,
				});
			}
		},
		[dragAndDrop]
	);

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>): void => {
			setList(dragAndDrop.updatedOrder);

			setDragAndDrop({
				...dragAndDrop,
				draggedFrom: 0,
				draggedTo: 0,
				isDragging: false,
			});
		},
		[dragAndDrop]
	);

	const onDragLeave = useCallback((): void => {
		setDragAndDrop({
			...dragAndDrop,
			draggedTo: 0,
		});
	}, [dragAndDrop]);

	return {
		dragAndDrop,
		onDragStart,
		onDragOver,
		onDrop,
		onDragLeave,
	};
};
