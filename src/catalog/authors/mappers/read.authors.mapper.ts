import { Author } from '../../../../generated/prisma/client';
import { ReadAuthorDto, ReadManyAuthorsDto } from '../dto';

export class ReadAuthorsMapper {
  public mapOne(author: Author): ReadAuthorDto {
    return {
      id: author.id,
      name: author.name,
      country: author.country,
      description: author.description,
      photo: author.photo,
      dateOfBirth: author.dateOfBirth,
      dateOfDeath: author.dateOfDeath,
      albumsTotal: 0,
    };
  }

  public mapMany(count: number, data: Author[]): ReadManyAuthorsDto {
    return {
      count,
      data: data.map((one) => this.mapOne(one)),
    };
  }
}
