import { Injectable, NotFoundException } from "@nestjs/common";
import { Media } from "src/models/media.model";
import { User } from "src/models/user.model";
import { Workspace } from "src/models/workspace.model";
import { In } from "typeorm";

import * as _ from 'lodash';

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
      relations: ["colunas.medias"]
    })

    return workspace;
  }

  async shuflleAndPick(workspaceId: number): Promise<Media> {
    let medias = await Media.find({
       where: { 
        column: { 
          workspace: { 
            id : workspaceId
          } 
        },

        status: In(["NOTSTARTED", "DOING"])
      } 
    });

    if (!medias.length) {
      throw new NotFoundException(`Nenhum filme foi sorteado :(`);
    }

    const shuffled = _.shuffle(medias);

    return shuffled[0];
  }
}