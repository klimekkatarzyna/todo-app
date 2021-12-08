Task incompleted and not importance

```js
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const taskData = {
	createdAt: new Date(),
	importance: 'high',
	parentFolderId: '1',
	groupName: 'group name',
	title: 'Title',
	themeColor: 'grey',
	_id: '2',
	taskStatus: 'inComplete',
	deadline: new Date(),
};

const onHandleChange = React.useCallback(() => {}, []);

const onClickImportanceButton = React.useCallback(() => {}, []);
<Router>
	<div style={{ display: 'flex' }}>
		<TaskDetails
			taskData={taskData}
			isCompleted={false}
			isChecked={false}
			onClickImportanceButton={onClickImportanceButton}
			onHandleChange={onHandleChange}
		/>
	</div>
</Router>;
```

Task completed and marked as important, theme red

```js
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const taskData = {
	createdAt: new Date(),
	importance: 'high',
	parentFolderId: '1',
	groupName: 'group name',
	title: 'Title',
	themeColor: 'red',
	_id: '2',
	taskStatus: 'inComplete',
	deadline: new Date(),
};

const onHandleChange = React.useCallback(() => {}, []);

const onClickImportanceButton = React.useCallback(() => {}, []);
<Router>
	<div style={{ display: 'flex' }}>
		<TaskDetails
			taskData={taskData}
			isCompleted={true}
			isChecked={true}
			onClickImportanceButton={onClickImportanceButton}
			onHandleChange={onHandleChange}
		/>
	</div>
</Router>;
```
