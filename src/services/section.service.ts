import { Injectable, NotFoundException } from "@nestjs/common";
import { Section } from "src/models/section.model";

@Injectable()
export class SectionService {

  async getById(id: number): Promise<Section> {
    const section = await Section.findOne({ where: { id: id } });

    return section;
  }

  async getByWorkspace(id: number): Promise<Section[]> {
    const sections = await Section.find({ 
      where: { 
        workspace: { 
          id: id 
        } 
      },
      relations: ["movies"],
      order: { created_at: "ASC" }
    });

    return sections;
  }

  async create(section: Section): Promise<Section> {
    const created = await Section.save(section);

    return created;
  }

  async update(sectionId: number, section: Section): Promise<void> {
    const finded = await Section.findOne({ where: { id: sectionId } });

    if (!finded) {
      throw new NotFoundException(`Not found any section with id: ${sectionId}`);
    }

    await Section.update({ id: sectionId }, section);
  }

  async delete(sectionId: number): Promise<void> {
    const finded = await Section.findOne({ where: { id: sectionId } }); 

    if (!finded) {
      throw new NotFoundException(`Not found any section with id: ${sectionId}`);
    }

    await Section.delete({ id: sectionId });
  }

}