import {IsNotEmpty, IsString, IsOptional} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsString()
  @IsOptional()
  audioUrl?: string;
}
