import { Injectable, NotImplementedException } from '@nestjs/common';
import {
  CreateAuthorDto,
  GetAuthorParams,
  ReadAuthorDto,
  ReadManyAuthorsDto,
  ReadManyAuthorsQueryDto,
} from './dto';

@Injectable()
export class AuthorsService {
  getMany(query: ReadManyAuthorsQueryDto): Promise<ReadManyAuthorsDto> {
    throw new NotImplementedException(
      `Method not implemented ${JSON.stringify(query)}`,
    );
  }

  getOne({ authorId }: GetAuthorParams): Promise<ReadAuthorDto> {
    throw new NotImplementedException(`Method not implemented ${authorId}`);
  }

  create(data: CreateAuthorDto): Promise<string | any> {
    throw new NotImplementedException(
      `Method not implemented ${JSON.stringify(data)}`,
    );
  }

  update(authorId: string, data: CreateAuthorDto): Promise<void> {
    throw new NotImplementedException(
      `Method not implemented ${authorId} ${JSON.stringify(data)}`,
    );
  }

  delete(authorId: string): Promise<void> {
    throw new NotImplementedException(`Method not implemented ${authorId}`);
  }
}
