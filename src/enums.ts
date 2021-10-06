export enum InputType {
    primary = 'primary',
    secondary = 'secondary'
}

export enum ContextualMenuOpion {
    add_new_task = 'add_new_task',
    mark_as_done = 'mark_as_done',
    date_today = 'date_today',
    date_tomorrow = 'date_tomorrow',
    move_task = 'move_task',
    copy_task = 'copy_task',
    remove_task = 'remove_task'
    // TODO: add more
}

export enum SideMenuType {
    myDay = 'myDay',
    planned = 'planned',
    important = 'important',
    assigned = 'assigned',
    inbox = 'inbox'
}

export type AppColorType = 'grey' | 'blue' | 'red' | 'green';