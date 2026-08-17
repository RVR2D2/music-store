export class ReadAuthorDto {
  id: string;
  country: string;
  description?: string;
  photo?: string;
  dateOfBirth?: Date;
  dateOfDeath?: Date;
  albumsTotal: number;
}
