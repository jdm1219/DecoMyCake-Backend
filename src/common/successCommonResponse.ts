import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export function CommonApiOkResponse() {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          message: {
            type: 'string',
            example: 'OK',
          },
          status: {
            type: 'number',
            example: 200,
          },
          data: {
            nullable: true,
            example: null,
          },
        },
      },
    }),
  );
}
