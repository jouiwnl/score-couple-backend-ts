import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/models/user.model";
import { WorkSpaceService } from "./workspace.service";

@Injectable()
export class UserService {

  constructor(@Inject(WorkSpaceService) private workspaceService: WorkSpaceService) {}

  async createUser(user: User): Promise<User> {
    const created = await User.save(user);
    this.workspaceService.createWorkspace(created);

    return created;
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = await User.findOne({ 
      where: { email: email }
    })

    return user;
  }

  async update(user: User): Promise<void> {
    const updated = await User.update({ id: user.id }, user);
  }
}