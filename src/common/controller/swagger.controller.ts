import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiUnauthorizedResponse({ description: '유효하지 않은 토큰입니다.' })
@ApiForbiddenResponse({ description: '접근 권한이 없습니다.' })
@ApiNotFoundResponse({ description: '리소스를 찾을 수 없습니다.' })
export class SwaggerController {}
