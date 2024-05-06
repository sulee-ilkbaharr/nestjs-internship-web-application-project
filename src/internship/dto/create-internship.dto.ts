import { IsNotEmpty } from 'class-validator';

export class CreateInternshipDto {
  @IsNotEmpty()
  title: string;

  // @IsNotEmpty()
  // description: string;
}
