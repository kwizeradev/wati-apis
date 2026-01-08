import axios from 'axios';
import FormData from 'form-data';

import { watiConfig } from '../../config/wati.config';
import { IntegrationError } from '../../utils/errors';

import type { WatiSendSessionFileRequest, WatiSendSessionFileResponse, WatiSendTemplateRequest, WatiSendTemplateResponse } from './wati.types';

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

export async function watiSendTemplate(
  request: WatiSendTemplateRequest,
): Promise<WatiSendTemplateResponse> {
  const url = `/api/v1/sendTemplateMessage`;

  console.log('WATI Send Template Request:', request.parameters);

  try {
    const response = await watiHttp.post(
      url,
      {
        template_name: request.template_name,
        broadcast_name: request.broadcast_name,
        parameters: request.parameters,
      },
      {
        params: {
          whatsappNumber: request.whatsappNumber,
          tenantId : watiConfig.tenantId,
        },
        headers: {
          Authorization: `Bearer ${watiConfig.token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data as WatiSendTemplateResponse;
  } catch (error) {
    console.error('WATI Template Message Error:', error);
    throw new IntegrationError('Failed to send template message via WATI');
  }
}
