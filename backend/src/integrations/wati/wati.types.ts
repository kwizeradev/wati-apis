export type WatiSendSessionFileRequest = {
  whatsappNumber: string;
  fileName: string;
  fileBuffer: Buffer;
  caption?: string;
};

export type WatiSendSessionFileResponse = unknown;

export type WatiTemplateParameter = {
  name: string;
  value: string;
};

export type WatiSendTemplateRequest = {
  whatsappNumber: string;
  template_name: string;
  broadcast_name: string;
  parameters: WatiTemplateParameter[];
};

export type WatiSendTemplateResponse = {
  result: boolean;
  messageId?: string;
};

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
