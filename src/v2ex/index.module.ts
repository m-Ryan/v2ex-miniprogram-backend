import { Module, CacheModule } from '@nestjs/common';
import { V2exController } from './index.controller';
import { V2exService } from './index.service';
import * as fsStore from 'cache-manager-fs-binary';
@Module({
  imports: [CacheModule.register({
    ttl: 60, // seconds
    max: 300, // seconds
    store: fsStore,
    options: {
      reviveBuffers: true,
      binaryAsStream: true,
      ttl: 60 /* seconds */,
      maxsize: 1000 * 1000 * 1000 /* max size in bytes on disk */,
      path: 'diskcache',
      preventfill: true
  }
  })],
  controllers: [V2exController],
  providers: [V2exService],
})
export class V2exModule {}