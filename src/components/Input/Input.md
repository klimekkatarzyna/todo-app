Input - dark mode
```js
import { InputType } from "../../enums";
import styled from 'styled-components';
import { COLOURS } from "../../constants";

const Wrapper = styled.div`
    background-color: ${COLOURS.grey};
`;

<Wrapper>
    <Input isIcon={true} type={InputType.dark} placeholder={'name'}></Input>
</Wrapper>
```

Input - light mode
```js
import { InputType } from "../../enums";
import styled from 'styled-components';
import { COLOURS } from "../../constants";

const Wrapper = styled.div`
    background-color: ${COLOURS.grey};
`;
<Wrapper>
    <Input isIcon={true} type={InputType.light} placeholder={'name'}></Input>
</Wrapper>
```