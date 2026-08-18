import { IsUUID } from 'class-validator';

export class GetAuthorParams {
  @IsUUID(7)
  authorId: string;
}
