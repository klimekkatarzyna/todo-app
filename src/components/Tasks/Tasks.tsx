import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { InputType } from '../../enums';
import { ITask } from '../../interfaces';
import { removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import TaskItem from './TaskItem/TaskItem';
import useTask from './useTask';

interface IUseParams {
    listId: string;
}

const CreateTask = () => {
    const history = useHistory(); 
    const { listId } = useParams<IUseParams>();
    const { mutateCreateTask, getTasksOfCurrentListQuery, getTasksOfCurrentListLoading } = useTask();
   
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
            mutateCreateTask({ title: taskName, parentFolderId: listId })
        } catch {
            // TODO: handle error
        }
    }, [taskName, listId]);

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
            ) : (getTasksOfCurrentListQuery?.body.tasks?.map((task: ITask) => 
                <TaskItem task={task} />
            ))}
        </div>
    );
};

export default CreateTask;