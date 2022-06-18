import { Injectable, NotFoundException } from "@nestjs/common";
import { MovieStatus } from "src/models/movie.model";
import { Section } from "src/models/section.model";

const enumOrder = {
  [MovieStatus.DOING]: 1,
  [MovieStatus.NOTSTARTED]: 2,
  [MovieStatus.COMPLETED]: 3,
  [MovieStatus.CANCELED]: 4
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
      relations: ["movies"],
      order: { created_at: "ASC" }
    });

    let sections_sorted = sections.map(section => {
      return {
        id: section.id,
        title: section.title,
        created_at: section.created_at,
        movies: section.movies.sort((a, b) => enumOrder[MovieStatus[a.status]] - enumOrder[MovieStatus[b.status]])
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