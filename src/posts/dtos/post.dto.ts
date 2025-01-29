import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly content: string;
  @IsDateString()
  @IsNotEmpty()
  readonly createdAt: Date;
}

export class UpdatePostDto extends PartialType(CreatePostDto){}
