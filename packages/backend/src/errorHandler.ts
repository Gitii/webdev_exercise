import Boom, { isBoom } from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { QueryFailedError } from 'typeorm';

export default function errorHandler(request: Request, h: ResponseToolkit) {
  const response = request.response;
  if (!isBoom(response)) {
    return h.continue;
  }

  console.error(`[ERROR] ${response.stack!}`);

  if (response instanceof QueryFailedError) {
    if (response.message.includes('UNIQUE constraint failed')) {
      return Boom.conflict();
    }
  }

  return h.continue;
}
