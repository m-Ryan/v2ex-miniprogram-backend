import { Module } from '@nestjs/common';
import { V2exController } from './index.controller';
import { V2exService } from './index.service';
@Module({
  imports: [
  ],
  controllers: [V2exController],
  providers: [V2exService],
})
export class V2exModule {}
