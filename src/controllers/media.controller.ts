import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { Media, MediaStatus } from "src/models/media.model";
import { MediaService } from "src/services/media.service";

@Controller("/medias")
export class MediaController {

  constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

  @Get()
  async getAll(): Promise<Media[]> {
    const medias = await this.mediaService.getAll();

    return medias;
  };

  @Get("/colunas/:id")
  async getBySectionId(@Param("id") sectionId: number): Promise<Media[]> {
    const medias = await this.mediaService.getAllBySection(sectionId);

    return medias;
  }

  @Get(":id")
  async getById(@Param("id") mediaId: number): Promise<Media> {
    const media = await this.mediaService.getById(mediaId);

    return media;
  };

  @Post("/column/:id")
  async create(@Param("id") columnId: number, @Body() media: Media): Promise<Media> {
    media.status = MediaStatus.NOTSTARTED;
    const created = await this.mediaService.create(media, columnId);

    return created;
  };

  @Put(":id")
  async update(@Param("id") mediaId: number, @Body() media: Media): Promise<{ message: string }> {
    this.mediaService.update(media, mediaId);

    return { message: "Register updated with success" }
  };

  @Delete(":id")
  async delete(@Param("id") mediaId: number): Promise<void> {
    this.mediaService.delete(mediaId);
  };

}