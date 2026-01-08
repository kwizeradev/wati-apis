import type { Contact } from '../../integrations/wati/wati.types';

export type GetContactsResponseDto = {
  contacts: Contact[];
};
