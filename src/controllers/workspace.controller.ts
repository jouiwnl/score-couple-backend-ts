import { Controller, Get, Inject, Param } from "@nestjs/common";
import { Movie } from "src/models/movie.model";
import { Workspace } from "src/models/workspace.model";
import { WorkSpaceService } from "src/services/workspace.service";

@Controller("/workspaces")
export class WorkSpaceController {
    constructor(@Inject(WorkSpaceService) private readonly workspaceService: WorkSpaceService) {}

    @Get()
    async getAll(): Promise<Workspace[]> {
      const finded = await this.workspaceService.getAll();

      return finded
    }

    @Get("/user/:userId")
    async getByUserId(@Param("userId") userId: number): Promise<Workspace> {
      const finded = await this.workspaceService.getWorkspace(userId);

      return finded;
    }

    @Get(":workspaceId/shuffle")
    async shuffleAndPick(@Param("workspaceId") workspaceId: number): Promise<Movie> {
      const movieShuffled = await this.workspaceService.shuflleAndPick(workspaceId);

      return movieShuffled;
    }
}