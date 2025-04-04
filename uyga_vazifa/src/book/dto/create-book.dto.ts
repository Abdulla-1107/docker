import { IsString, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  price: number;
}
