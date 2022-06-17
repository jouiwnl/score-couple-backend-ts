import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { WorkSpaceService } from "src/services/workspace.service";

@Module({
  controllers: [UserController],
  providers: [UserService, WorkSpaceService],
  exports: [UserService]
})
export class UserModule {

}