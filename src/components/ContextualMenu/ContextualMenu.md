```js
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { contextualMenuFirstOpion } from '../../constants';
import { ContextualMenuItem } from './ContextualMenuItem';

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
	<Router>
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{contextualMenuFirstOpion.map(listItem => (
				<ContextualMenuItem key={listItem?.name} listItem={listItem} listElementId={'1'} />
			))}
		</div>
	</Router>
</QueryClientProvider>;
```
