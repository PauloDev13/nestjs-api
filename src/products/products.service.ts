import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepo.create(createProductDto);
    return this.productsRepo.save(product);
  }

  findAll() {
    return this.productsRepo.find();
  }

  findOne(id: number) {
    return this.productsRepo.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateResult = await this.productsRepo.update(id, updateProductDto);
    if (updateResult.affected) {
      throw new EntityNotFoundError(Product, id);
    }
    return this.productsRepo.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.productsRepo.delete(id);
    if (deleteResult.affected) {
      throw new EntityNotFoundError(Product, id);
    }
  }
}
