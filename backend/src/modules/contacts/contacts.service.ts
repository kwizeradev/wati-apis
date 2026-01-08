import { getContactsViaWati } from '../../integrations/wati/wati.service';

import type { GetContactsResponseDto } from './contacts.types';

export class ContactsService {
  async getContacts(): Promise<GetContactsResponseDto> {
    const contacts = await getContactsViaWati();
    return { contacts };
  }
}
