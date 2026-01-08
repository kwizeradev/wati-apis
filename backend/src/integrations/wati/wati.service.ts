import { watiGetContacts, watiSendSessionFile } from './wati.client';
import type { Contact, WatiGetContactsResponse, WatiSendSessionFileResponse } from './wati.types';

export type SendPdfOptions = {
  whatsappNumber: string;
  fileName: string;
  fileBuffer: Buffer;
  caption?: string;
};

export async function sendPdfViaWati(options: SendPdfOptions): Promise<WatiSendSessionFileResponse> {
  return watiSendSessionFile({
    whatsappNumber: options.whatsappNumber,
    fileName: options.fileName,
    fileBuffer: options.fileBuffer,
    caption: options.caption,
  });
}

type GetContactsOptions = {
  pageSize?: number;
  pageNumber?: number;
};

function isDigitsOnly(value: unknown): value is string {
  return typeof value === 'string' && value.length >= 6 && value.length <= 20 && /^[0-9]+$/.test(value);
}

function uniqueByNumber(contacts: Contact[]): Contact[] {
  const map = new Map<string, Contact>();
  for (const c of contacts) {
    if (!map.has(c.whatsappNumber)) map.set(c.whatsappNumber, c);
  }
  return Array.from(map.values());
}

function extractContactsFromUnknown(data: WatiGetContactsResponse): Contact[] {
  const found: Contact[] = [];
  const visited = new Set<unknown>();

  const visit = (node: unknown, depth: number) => {
    if (depth > 6) return;
    if (node === null || node === undefined) return;
    if (visited.has(node)) return;
    visited.add(node);

    if (isDigitsOnly(node)) {
      found.push({ whatsappNumber: node });
      return;
    }

    if (Array.isArray(node)) {
      for (const item of node) visit(item, depth + 1);
      return;
    }

    if (typeof node !== 'object') return;

    const obj = node as Record<string, unknown>;

    const directCandidates: Array<[unknown, string | undefined]> = [
      [obj.whatsappNumber, typeof obj.name === 'string' ? obj.name : undefined],
      [obj.phone, typeof obj.name === 'string' ? obj.name : undefined],
      [obj.waId, typeof obj.name === 'string' ? obj.name : undefined],
      [obj.contactNumber, typeof obj.name === 'string' ? obj.name : undefined],
      [obj.login_user_phone, undefined],
    ];

    for (const [candidate, displayName] of directCandidates) {
      if (isDigitsOnly(candidate)) {
        found.push({ whatsappNumber: candidate, displayName });
      }
    }

    for (const value of Object.values(obj)) {
      visit(value, depth + 1);
    }
  };

  visit(data, 0);

  return uniqueByNumber(found);
}

export async function getContactsViaWati(options: GetContactsOptions = {}): Promise<Contact[]> {
  const response = await watiGetContacts({
    pageSize: options.pageSize ?? 50,
    pageNumber: options.pageNumber ?? 1,
  });

  return extractContactsFromUnknown(response);
}
