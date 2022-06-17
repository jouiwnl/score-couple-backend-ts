import { Module } from "@nestjs/common";
import { SectionController } from "src/controllers/section.controller";
import { SectionService } from "src/services/section.service";

@Module({
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService]
})
export class SectionModule {

}