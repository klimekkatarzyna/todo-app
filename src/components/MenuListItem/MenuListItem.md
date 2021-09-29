Item with number
```js
import styled from 'styled-components';
import { COLOURS } from "../../constants";

const Wrapper = styled.div`
    background-color: ${COLOURS.grey};
`;
<Wrapper>
    <MenuListItem name={'Do ogarnięcia'} tasksNumber={3} />
 </Wrapper>
```

Item with custom icon and color
```js
import { COLOURS } from "../../constants";
import styled from 'styled-components';
import { Sun } from '@styled-icons/feather/Sun';

const Wrapper = styled.div`
    background-color: ${COLOURS.grey};
`;

<Wrapper>
    <MenuListItem name={'Do ogarnięcia'} icon={<Sun />} colorType={COLOURS.yellow}/>
</Wrapper>
```