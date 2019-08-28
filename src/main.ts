import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8843, ()=> {
    console.log('服务器已开启：http://localhost:8843/')
  });
}
bootstrap();
