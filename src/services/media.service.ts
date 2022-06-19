import { Injectable, NotFoundException } from "@nestjs/common";
import { Media } from "src/models/media.model";
import { Section } from "src/models/section.model";

@Injectable()
export class MediaService {

  async getAll(): Promise<Media[]> {
    const medias = await Media.find();
    return medias;
  }

  async getAllBySection(columnId: number): Promise<Media[]> {
    const medias = await Media.find({ 
      where: { 
        column: { 
          id: columnId 
        } 
      },
      order: { status: "DESC" }
    });

    return medias;
  }

  async getById(mediaId: number): Promise<Media> {
    const media = await Media.findOne({ where: { id: mediaId } });

    if (!media) {
      throw new NotFoundException(`Not found any media with id: ${mediaId}`);
    }

    return media;
  }

  async create(media: Media, sectionId: number): Promise<Media> {
    const section = await Section.findOne({ where: { id: sectionId } });

    if (!section) {
      throw new NotFoundException(`Not found any section with id: ${sectionId}`);
    }

    media.column = section;
    const saved = await Media.save(media);

    return saved;
  };

  async update(media: Media, mediaId: number): Promise<void> {
    const finded = await Media.findOne({ where: { id: mediaId } });

    if (!finded) {
      throw new NotFoundException(`Not found any media with id: ${mediaId}`);
    }

    await Media.update({ id: mediaId }, media);
  }

  async delete(mediaId: number): Promise<void> {
    const finded = await Media.findOne({ where: { id: mediaId } });

    if (!finded) {
      throw new NotFoundException(`Not found any media with id: ${mediaId}`);
    }

    await Media.delete({ id: mediaId });
  }



}