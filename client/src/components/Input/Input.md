Input - light mode

```js
import { InputVersion } from '../../enums';
import styled from 'styled-components';
import { COLOURS } from '../../constants';

<Input isIcon={true} colorType={InputVersion.primary} placeholder={'name'} />;
```

Input - dark mode

```js
import { InputVersion } from '../../enums';
import styled from 'styled-components';
import { COLOURS } from '../../constants';

const Wrapper = styled.div`
	background-color: ${COLOURS.grey};
`;
<Wrapper>
	<Input isIcon={true} colorType={InputVersion.primary} placeholder={'name'}></Input>
</Wrapper>;
```
