import { IS_PUBLIC_ROUTE } from '@common/constants.common';
import { SetMetadata } from '@nestjs/common';

export const PublicRoute = () => {
  return SetMetadata(IS_PUBLIC_ROUTE, true);
};
