import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Section } from "src/models/section.model";
import { SectionService } from "src/services/section.service";

@Controller("/colunas")
export class SectionController {

  constructor(@Inject(SectionService) private readonly sectionService: SectionService) {}

  @Get(":id")
  async getById(@Param("id") id: number): Promise<Section> {
    const section = await this.sectionService.getById(id);

    if (!section) {
      throw new NotFoundException(`Not found any section with id: ${id}`);
    }

    return section;
  };

  @Get("/workspace/:id")
  async getAllByWorkspace(@Param("id") workspaceId: number): Promise<Section[]> {
    const sections = await this.sectionService.getByWorkspace(workspaceId);

    if (!sections.length) {
      throw new NotFoundException(`Not found any section with workspace id: ${workspaceId}`);
    }

    return sections;
  };

  @Post()
  async create(@Body() section: Section): Promise<Section> {
    const created = await this.sectionService.create(section);

    return created;
  };

  @Put("/:id")
  async update(@Param("id") sectionId: number, @Body() section: Section): Promise<void> {
    this.sectionService.update(sectionId, section);
  };

  @Delete("/:id")
  async delete(@Param("id") sectionId: number): Promise<void> {
    await this.sectionService.delete(sectionId);
  };

}