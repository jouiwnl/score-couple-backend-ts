import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { MediaModule } from './modules/media.module';
import { SectionModule } from './modules/section.module';
import { UserModule } from './modules/user.module';
import { WorkspaceModule } from './modules/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    WorkspaceModule,
    SectionModule,
    MediaModule
  ]
})
export class AppModule {}
