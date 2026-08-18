import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAuthorDto,
  GetAuthorParams,
  ReadAuthorDto,
  ReadManyAuthorsDto,
  ReadManyAuthorsQueryDto,
} from './dto';
import { Prisma, PrismaService } from '../../prisma';
import { ReadAuthorsMapper } from './mappers/read.authors.mapper';

@Injectable()
export class AuthorsService {
  private readonly mapper = new ReadAuthorsMapper();
  constructor(private readonly prisma: PrismaService) {}

  async getMany(query: ReadManyAuthorsQueryDto): Promise<ReadManyAuthorsDto> {
    const name: Prisma.StringFilter | undefined = query.search
      ? { contains: query.search, mode: 'insensitive' }
      : undefined;

    const count = await this.prisma.author.count({
      where: { name },
    });

    const data = await this.prisma.author.findMany({
      take: query.take,
      skip: query.skip,
      where: { name },
    });

    return this.mapper.mapMany(count, data);
  }

  async getOne({ authorId }: GetAuthorParams): Promise<ReadAuthorDto> {
    const author = await this.prisma.author.findFirst({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return this.mapper.mapOne(author);
  }

  async create(data: CreateAuthorDto): Promise<string> {
    await this.checkName(data.name);

    const { id } = await this.prisma.author.create({
      data,
    });

    return id;
  }

  async update(authorId: string, data: CreateAuthorDto): Promise<void> {
    await this.checkName(data.name, authorId);

    await this.prisma.author.update({
      where: { id: authorId },
      data,
    });
  }

  async delete(authorId: string): Promise<void> {
    await this.prisma.author.delete({ where: { id: authorId } });
  }

  private async checkName(name: string, authorId?: string): Promise<void> {
    const id = authorId ? { not: authorId } : undefined;

    const existingOne = await this.prisma.author.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        id,
      },
    });

    if (existingOne) {
      throw new ConflictException(`Author ${name} already exists`);
    }
  }
}
