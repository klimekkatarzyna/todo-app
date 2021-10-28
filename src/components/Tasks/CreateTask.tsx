import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { InputType } from '../../enums';
import { IUseParams } from '../../interfaces';
import { handleResertInput, removesWhitespaceFromString } from '../../utils/utilsFunctions';
import { Input } from '../Input/Input';
import useTask from './useTask';

const CreateTask = () => {
    const history = useHistory(); 
    const { listId } = useParams<IUseParams>();
    const { mutateCreateTask } = useTask();
   
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
        </div>
    );
};

export default CreateTask;