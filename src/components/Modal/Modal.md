Modal

```js
import styled from 'styled-components';
const Wrapper = styled.div`
	position: relative;
	> div {
		position: relative;
	}
`;

<Wrapper>
	<Modal title={'Lista zostanie trwale usunieta.'} />
</Wrapper>;
```

Modal - title & subtitle

```js
import styled from 'styled-components';
const Wrapper = styled.div`
	position: relative;
	> div {
		position: relative;
	}
`;

<Wrapper>
	<Modal title={'Lista zostanie trwale usunieta.'} subtitle={'Tej akcji nie można cofnąć'} />
</Wrapper>;
```
