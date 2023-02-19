import { ConfigModuleOptions } from '@nestjs/config';

export const environmentConfiguration = (): ConfigModuleOptions => {
  return {
    isGlobal: true,
    envFilePath:
      process.env.NODE_ENV === 'local'
        ? './src/environments/.local.env'
        : './src/environments/.dev.env',
    cache: true,
  };
};
