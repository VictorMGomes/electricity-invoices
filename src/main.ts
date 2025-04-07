import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { apiDocSetup } from './shared/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = process.env.APP_HOST ?? '0.0.0.0';
  const port = process.env.APP_PORT ?? 3000;
  const prefix = process.env.API_PREFIX ?? 'api';

  app.enableCors();

  app.setGlobalPrefix(prefix);

  apiDocSetup(app);

  await app.listen(port, host);
  console.log(`Running on: http://${host}:${port}/${prefix}`);
  console.log(
    `API documentation available at: http://${host}:${port}/${prefix}/doc`,
  );
  console.log(
    `API json available at: http://${host}:${port}/${prefix}/doc/json`,
  );
}
bootstrap().catch((err) => {
  console.error('Application failed to start', err);
});
