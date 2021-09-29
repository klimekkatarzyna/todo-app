Tooltip - position bottom
```js
import { InputType } from "../../enums";
import styled from 'styled-components';
import { COLOURS } from "../../constants";

const Wrapper = styled.div`
    background-color: ${COLOURS.grey};
    height: 100px;
`;

<Wrapper>
    <Tooltip position={'bottom'}>{'name'}</Tooltip>
</Wrapper>
```