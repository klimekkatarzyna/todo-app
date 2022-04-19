List item

```js
import { QueryClient, QueryClientProvider } from 'react-query';
import { Sun } from 'react-feather';
import { COLOURS } from '../../constants';
import { IListItem } from '../../interfaces/list';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

const mainList = {
	isMainList: false,
	title: 'Mój dzien',
	icon: <Sun />,
	themeColor: 'green',
	createdAt: new Date(),
	url: 'myday',
};

<QueryClientProvider client={queryClient}>
	<Router>
		<MenuListItem listItem={mainList} />
	</Router>
</QueryClientProvider>;
```

Item with number

```js
import { QueryClient, QueryClientProvider } from 'react-query';
import { Sun } from 'react-feather';
import { COLOURS } from '../../constants';
import { IListItem } from '../../interfaces/list';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

const mainList = {
	isMainList: false,
	title: 'Mój dzien',
	icon: <Sun />,
	themeColor: 'green',
	createdAt: new Date(),
	url: 'myday',
	taskNumber: 100,
};

<QueryClientProvider client={queryClient}>
	<Router>
		<MenuListItem listItem={mainList} />
	</Router>
</QueryClientProvider>;
```

Item with custom icon and color

```js
import { QueryClient, QueryClientProvider } from 'react-query';
import { COLOURS } from '../../constants';
import { Sun } from 'react-feather';
import { IListItem } from '../../interfaces/list';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

const mainList = {
	isMainList: true,
	title: 'Mój dzien',
	icon: <Sun />,
	themeColor: 'red',
	createdAt: new Date(),
	url: '/',
};

<QueryClientProvider client={queryClient}>
	<Router>
		<MenuListItem listItem={mainList} />
	</Router>
</QueryClientProvider>;
```
