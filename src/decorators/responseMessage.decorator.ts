import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ESuccessMessage } from '@utils/response/response.enum';

export const ResponseMessage = (message: ESuccessMessage, source: string) => {
  return applyDecorators(
    SetMetadata('message', message.toLocaleLowerCase()),
    SetMetadata(
      'source',
      source.charAt(0).toUpperCase() + source.toLocaleLowerCase().slice(1),
    ),
  );
};
