import axios from 'axios';
import FormData from 'form-data';

import { watiConfig } from '../../config/wati.config';
import { IntegrationError } from '../../utils/errors';

import type {
  WatiGetContactsRequest,
  WatiGetContactsResponse,
  WatiSendSessionFileRequest,
  WatiSendSessionFileResponse,
} from './wati.types';

const watiHttp = axios.create({
  baseURL: watiConfig.baseUrl,
  timeout: 30_000,
});

export async function watiSendSessionFile(
  request: WatiSendSessionFileRequest,
): Promise<WatiSendSessionFileResponse> {
  const form = new FormData();
  form.append('file', request.fileBuffer, {
    filename: request.fileName,
    contentType: 'application/pdf',
  });

  const url = `/api/v1/sendSessionFile/${encodeURIComponent(request.whatsappNumber)}`;

  try {
    const response = await watiHttp.post(url, form, {
      params: request.caption ? { caption: request.caption } : undefined,
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${watiConfig.token}`,
      },
      maxBodyLength: Infinity,
    });

    return response.data as WatiSendSessionFileResponse;
  } catch (error) {
    throw new IntegrationError('Failed to send file via WATI');
  }
}

export async function watiGetContacts(
  request: WatiGetContactsRequest,
): Promise<WatiGetContactsResponse> {
  const url = '/api/v1/getContacts';

  try {
    const response = await watiHttp.get(url, {
      params: {
        pageSize: request.pageSize,
        pageNumber: request.pageNumber,
        name: request.name,
        attribute: request.attribute,
        createdDate: request.createdDate,
      },
      headers: {
        Authorization: `Bearer ${watiConfig.token}`,
      },
    });

    return response.data as WatiGetContactsResponse;
  } catch {
    throw new IntegrationError('Failed to fetch contacts via WATI');
  }
}
