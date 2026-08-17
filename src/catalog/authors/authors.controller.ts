import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import {
  CreateAuthorDto,
  GetAuthorParams,
  ReadAuthorDto,
  ReadManyAuthorsDto,
  ReadManyAuthorsQueryDto,
} from './dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getMany(
    @Query() query: ReadManyAuthorsQueryDto,
  ): Promise<ReadManyAuthorsDto> {
    return this.authorsService.getMany(query);
  }

  @Get(':authorId')
  getOne(@Param() { authorId }: GetAuthorParams): Promise<ReadAuthorDto> {
    return this.authorsService.getOne({ authorId });
  }

  @Post()
  async create(@Body() data: CreateAuthorDto): Promise<ReadAuthorDto> {
    const id = await this.authorsService.create(data);
    return this.authorsService.getOne(id);
  }

  @Put(':authorId')
  async update(
    @Param() { authorId }: GetAuthorParams,
    @Body() data: CreateAuthorDto,
  ): Promise<ReadAuthorDto> {
    await this.authorsService.update(authorId, data);
    return this.authorsService.getOne({ authorId });
  }

  @Delete(':authorId')
  delete(@Param() { authorId }: GetAuthorParams): Promise<void> {
    return this.authorsService.delete(authorId);
  }
}
