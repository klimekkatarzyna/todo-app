```js
import styled from 'styled-components';
const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	> input {
		width: 100%;
		padding: 0.5rem;
	}
`;

const [showPassword, setShowPassowrd] = React.useState(false);
const handledSetPassword = () => setShowPassowrd(!showPassword);

<InputWrapper>
	<input />
	<InputEye showPassword={showPassword} handledSetPassword={handledSetPassword} />
</InputWrapper>;
```
