import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Campo NOME deve ser preenchido.' })
  @IsString({ message: 'Só é permitido letras.' })
  @MaxLength(100, { message: 'Nome com no máximo, 100 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'Campo PREÇO deve ser preenchido.' })
  @IsNumber()
  price: number;
}
