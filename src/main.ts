import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiDocSetup } from './shared/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api');

  apiDocSetup(app);

  await app.listen(
    process.env.APP_PORT ?? 3000,
    process.env.APP_HOST ?? '0.0.0.0',
  );
}
bootstrap();
