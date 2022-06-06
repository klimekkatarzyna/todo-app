import { getStringAfterCharacter } from './utilsFunctions';

export const invitationToken = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl'), '=');
