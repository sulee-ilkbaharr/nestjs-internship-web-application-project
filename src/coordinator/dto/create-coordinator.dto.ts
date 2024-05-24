import { IsNotEmpty } from 'class-validator';

export class CreateCoordinatorDto {
  @IsNotEmpty()
  IDno: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;
}
