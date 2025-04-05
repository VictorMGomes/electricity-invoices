import {
  DocumentBuilder,
  SwaggerModule,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { INestApplication, applyDecorators } from '@nestjs/common';
import { patchNestJsSwagger } from 'nestjs-zod';
import { SystemService } from '@src/shared/services/system/system.service';

export function apiDocSetup(app: INestApplication) {
  patchNestJsSwagger();

  const configService = app.get(SystemService);

  const config = new DocumentBuilder()
    .setTitle(configService.getAppName())
    .setDescription(configService.getAppDescription())
    .setVersion(configService.getAppVersion())
    .setContact(
      configService.getAppAuthor().name,
      configService.getAppAuthor().url,
      configService.getAppAuthor().email,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${process.env.API_PREFIX}/doc`, app, document, {
    customSiteTitle: configService.getAppName(),
    jsonDocumentUrl: `${process.env.API_PREFIX}/doc/json`,
  });
}

export function apiDocGenerator(paramName?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const summary = propertyKey
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

    const decorators = [
      ApiOperation({ summary }),
      ApiOkResponse(),
      ApiBadRequestResponse(),
      ApiUnauthorizedResponse(),
      ApiNotFoundResponse(),
      ApiInternalServerErrorResponse(),
    ];

    if (paramName) {
      decorators.push(
        ApiParam({
          name: paramName,
          example: 1,
          description: `ID do ${summary.toLowerCase()}`,
        }),
      );
    }

    applyDecorators(...decorators)(target, propertyKey, descriptor);
  };
}
