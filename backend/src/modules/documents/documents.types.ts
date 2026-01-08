export type CreateDocumentRequestDto = {
  fullName: string;
  whatsappNumber: string;
  description: string;
  referenceId: string;
  amount: number;
};

export type DocumentPayload = {
  fullName: string;
  whatsappNumber: string;
  description: string;
  referenceId: string;
  amount: number;
  dateIso: string;
};

export type SendDocumentResult = {
  referenceId: string;
};
