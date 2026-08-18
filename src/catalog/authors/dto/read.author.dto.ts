export class ReadAuthorDto {
  id?: string;
  name: string;
  country: string;
  description?: string | null;
  photo: string | null;
  dateOfBirth?: Date;
  dateOfDeath?: Date | null;
  albumsTotal: number;
}
