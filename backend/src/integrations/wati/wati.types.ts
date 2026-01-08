export type WatiSendSessionFileRequest = {
  whatsappNumber: string;
  fileName: string;
  fileBuffer: Buffer;
  caption?: string;
};

export type WatiSendSessionFileResponse = unknown;

export type WatiGetContactsRequest = {
  pageSize?: number;
  pageNumber?: number;
  name?: string;
  attribute?: string;
  createdDate?: string;
};

export type WatiGetContactsResponse = unknown;

export type Contact = {
  whatsappNumber: string;
  displayName?: string;
};
