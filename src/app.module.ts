import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V2exModule } from './v2ex/index.module';

@Module({
  imports: [V2exModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
