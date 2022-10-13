import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function CustomApiOkResponse<DataDto extends Type<unknown>>(
  dataDto?: DataDto,
) {
  return applyDecorators(
    ApiExtraModels(dataDto),
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
            type: 'object',
            nullable: true,
            $ref: getSchemaPath(dataDto),
          },
        },
      },
    }),
  );
}
