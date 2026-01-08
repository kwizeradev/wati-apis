import { http } from './http';

export type Contact = {
  whatsappNumber: string;
  displayName?: string;
};

export type GetContactsResponse = {
  data: {
    contacts: Contact[];
  };
};

export async function getContacts(): Promise<GetContactsResponse> {
  const response = await http.get('/api/contacts');
  return response.data as GetContactsResponse;
}
