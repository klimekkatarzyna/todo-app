```js
const [showPassword, setShowPassowrd] = React.useState(false);
const handledSetPassword = () => setShowPassowrd(!showPassword);

<InputWrapper className='flex items-center relative'>
	<input className='w-full p-2' />
	<InputEye showPassword={showPassword} handledSetPassword={handledSetPassword} />
</InputWrapper>;
```
