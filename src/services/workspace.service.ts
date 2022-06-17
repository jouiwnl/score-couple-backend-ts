import { Injectable } from "@nestjs/common";
import { User } from "src/models/user.model";
import { Workspace } from "src/models/workspace.model";

@Injectable()
export class WorkSpaceService {

  async createWorkspace(user: User): Promise<Workspace> {
    const workspace = await Workspace.save({ user: user });

    return workspace;
  }

  async getAll(): Promise<Workspace[]> {
    const workspaces = await Workspace.find({ relations: ["user", "colunas"] });
    console.log(workspaces)

    return workspaces;
  }

  async getWorkspace(userId: number): Promise<Workspace> {
    const workspace = await Workspace.findOne({ 
      where: {
        user: { 
          id: userId 
        } 
      },
      relations: ["colunas.movies"]
    })

    return workspace;
  }
}