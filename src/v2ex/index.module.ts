import { Module, CacheModule } from '@nestjs/common';
import { V2exController } from './index.controller';
import { V2exService } from './index.service';
@Module({
  imports: [
    CacheModule.register({
      ttl: 60, // seconds
      max: 300, // seconds
    }),
  ],
  controllers: [V2exController],
  providers: [V2exService],
})
export class V2exModule {}
