import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { InputType } from '../../enums';
import { ITask, ITaskStatus } from '../../interfaces';
import { handleResertInput, removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import ComplitedTasks from './ComplitedTasks';
import TaskItem from './TaskItem/TaskItem';
import useTask from './useTask';

interface IUseParams {
    listId: string;
}

const CreateTask = () => {
    const history = useHistory(); 
    const { listId } = useParams<IUseParams>();
    const { mutateCreateTask, getTasksOfCurrentListQuery, getTasksOfCurrentListLoading, mutateChangeTaskStatusToComplete } = useTask();
   
   useEffect(() => {
        history.listen(() => setTaskName('')) 
   }, [history]);

    const [taskName, setTaskName] = useState<string>('');

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const clearStr = removesWhitespaceFromString(event.target.value); 
        setTaskName(clearStr);
    }, []);
    
    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            mutateCreateTask({ title: taskName, parentFolderId: listId, themeColor: 'blue' });
            handleResertInput(setTaskName);
        } catch {
            // TODO: handle error
        }
    }, [taskName, listId]);

    const onMarkTaskAsCompleted = useCallback((taskId: string) => {
        mutateChangeTaskStatusToComplete({ taskId: taskId, taskStatus: ITaskStatus.complete });
    }, []);

    const inComletedTasks = useMemo(() => getTasksOfCurrentListQuery?.body.tasks?.filter(task => task.taskStatus === ITaskStatus.inComplete), [getTasksOfCurrentListQuery]);
    const comletedTasks = useMemo(() => getTasksOfCurrentListQuery?.body.tasks?.filter(task => task.taskStatus === ITaskStatus.complete), [getTasksOfCurrentListQuery]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Input
                    isIcon
                    name='taskName'
                    colorType={InputType.primary}
                    isTaskInput
                    placeholder={'Dodaj zadanie'}
                    value={taskName}
                    autoFocus
                    onChange={handleChange}
                />
            </form>

            {getTasksOfCurrentListLoading ? (
                <span>{'loaging...'}</span>
            ) : (
                <>
                    {inComletedTasks?.map((task: ITask) => 
                        <TaskItem task={task} onChange={onMarkTaskAsCompleted} />
                    )}
                    {!!comletedTasks?.length && (
                        <ComplitedTasks comletedTasks={comletedTasks} />
                    )}
                </>
            )}
        </div>
    );
};

export default CreateTask;