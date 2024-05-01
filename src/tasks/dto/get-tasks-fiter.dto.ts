import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus; //optinal

  @IsOptional() //Bunu Ekle hata almamak için
  @IsString()
  search?: string; //optinal
}
