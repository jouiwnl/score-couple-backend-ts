import { Module } from "@nestjs/common";
import { WorkSpaceController } from "src/controllers/workspace.controller";
import { WorkSpaceService } from "src/services/workspace.service";

@Module({
  controllers: [WorkSpaceController],
  providers: [WorkSpaceService],
  exports: [WorkSpaceService]
})
export class WorkspaceModule {

}