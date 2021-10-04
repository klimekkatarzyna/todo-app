Item with number
```js
import { Sun } from '@styled-icons/feather/Sun';
import { COLOURS } from "../../constants";
import { IListItem, IListItemType } from '../../interfaces';

const mainList = [{
    type: IListItemType.MY_DAY,
    name: 'Mój dzien',
    tasksNumber: undefined,
    icon: <Sun />,
    color: COLOURS.fontColor,
    url: 'myday'
}];

<MenuListItem listItem={mainList} />
```

Item with custom icon and color
```js
import { COLOURS } from "../../constants";
import { Sun } from '@styled-icons/feather/Sun';
import { IListItem, IListItemType } from '../../interfaces';

const mainList = [{
    type: IListItemType.MY_DAY,
    name: 'Mój dzien',
    tasksNumber: 3,
    icon: <Sun />,
    color: COLOURS.fontColor,
    url: 'myday'
}];

<MenuListItem listItem={mainList} />
```