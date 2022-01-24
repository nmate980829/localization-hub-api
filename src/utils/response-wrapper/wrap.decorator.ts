import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Response } from 'src/types/response.dto';

export class CustomResponseOptions {
  isArray?: boolean;
  created?: boolean;
  excludeUnauthorized?: boolean;
  notEntity?: boolean;
}

export const ApiCustomResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: CustomResponseOptions,
) => {
  const data =
    options?.isArray === true
      ? {
          type: 'array',
          items: { $ref: getSchemaPath(model) },
        }
      : { $ref: getSchemaPath(model) };

  const schema = {
    schema: {
      allOf: [
        { $ref: getSchemaPath(Response) },
        {
          properties: {
            data,
          },
        },
      ],
    },
  };
  const response =
    options?.created === true
      ? ApiCreatedResponse(schema)
      : ApiOkResponse(schema);
  const extraResponses = [];

  if (options?.excludeUnauthorized !== true)
    extraResponses.push(ApiUnauthorizedResponse);
  if (options?.notEntity !== true)
    extraResponses.push(ApiForbiddenResponse, ApiNotFoundResponse);
  return applyDecorators(ApiExtraModels(model), response, ...extraResponses);
};

export const ApiOk = <TModel extends Type<any>>(
  model: TModel,
  options?: CustomResponseOptions,
) => {
  return ApiCustomResponse(model, options);
};

export const ApiOkArray = <TModel extends Type<any>>(
  model: TModel,
  options?: CustomResponseOptions,
) => {
  return ApiCustomResponse(model, { isArray: true, ...options });
};

export const ApiCreated = <TModel extends Type<any>>(
  model: TModel,
  options?: CustomResponseOptions,
) => {
  return ApiCustomResponse(model, { created: true, ...options });
};

export const ApiCreatedArray = <TModel extends Type<any>>(
  model: TModel,
  options?: CustomResponseOptions,
) => {
  return ApiCustomResponse(model, { created: true, isArray: true, ...options });
};
