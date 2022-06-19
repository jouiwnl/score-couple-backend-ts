import { Injectable, NotFoundException } from "@nestjs/common";
import { MediaStatus } from "src/models/media.model";
import { Section } from "src/models/section.model";

const enumOrder = {
  [MediaStatus.DOING]: 1,
  [MediaStatus.NOTSTARTED]: 2,
  [MediaStatus.COMPLETED]: 3,
  [MediaStatus.CANCELED]: 4
} as const;

@Injectable()
export class SectionService {

  async getById(id: number): Promise<Section> {
    const section = await Section.findOne({ where: { id: id } });

    return section;
  }

  async getByWorkspace(id: number): Promise<any> {
    let sections = await Section.find({ 
      where: { 
        workspace: { 
          id: id 
        } 
      },
      relations: ["medias"],
      order: { created_at: "ASC" }
    });

    let sections_sorted = sections.map(section => {
      return {
        id: section.id,
        title: section.title,
        created_at: section.created_at,
        medias: section.medias.sort((a, b) => enumOrder[MediaStatus[a.status]] - enumOrder[MediaStatus[b.status]])
      }
    })

    return sections_sorted;
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