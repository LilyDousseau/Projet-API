import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  
  //Pour lancer en local sur Bruno
  //await app.listen(3000); 

  
  //Pour déployer sur CleverCloud
  const port = process.env.PORT;
  await app.listen(port); 
}
bootstrap();
