import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { ProdutoService } from '../../produto/service/produto.service';

@Injectable()

export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
        private produtoService: ProdutoService
    ) {}

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            relations: {
                produtos: true
            }
        });
    }

    async findById(id: number): Promise<Categoria> {

        let categoria = await this.categoriaRepository.findOne({
            where: {
                 id 
            },
            relations: {
                produtos: true
            }
        });

        if (!categoria)
            throw new HttpException ('Categoria não encontrada', HttpStatus.NOT_FOUND);

            return categoria;
        
    }

    async findBytipo(tipo: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            },
            relations: {
                produtos: true
            }
        });
    }

    async create(categoria: Categoria): Promise<Categoria> {
        
        if (categoria.produtos){

        await this.produtoService.findById(categoria.produtos[0].id)

        }

        return this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria> {

        let buscaCategoria = await this.findById(categoria.id);

        if (!buscaCategoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);

        return this.categoriaRepository.save(categoria);

    }

    async delete(id: number): Promise<DeleteResult> {

        let buscacategoria = await this.findById(id);

        if (!buscacategoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id);

    }
  
}