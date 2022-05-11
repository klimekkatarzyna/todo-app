Input - light mode

```js
import { InputVersion } from '../../enums';
import { COLOURS } from '../../constants';

<Input isIcon={true} colorType={InputVersion.primary} placeholder={'name'} />;
```

Input - dark mode

```js
import { InputVersion } from '../../enums';

<div className='bg-grey'>
	<Input isIcon={true} colorType={InputVersion.primary} placeholder={'name'}></Input>
</div>;
```
