import { Module } from "@nestjs/common";
import { MediaController } from "src/controllers/media.controller";
import { MediaService } from "src/services/media.service";

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService]
})
export class MediaModule {}