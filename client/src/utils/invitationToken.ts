import { getStringAfterCharacter } from './utilsFunctions';

export const invitationToken: string = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl'), '=');
