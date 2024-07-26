import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProdutoService } from './../service/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Get('/foto/:foto')
    @HttpCode(HttpStatus.OK)
    findByfoto(@Param('foto') foto: string): Promise<Produto[]> {
        return this.produtoService.findByfoto(foto);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Produto[]> {
        return this.produtoService.findByNome(nome);
    }

    @Get('/preco/:preco')
    @HttpCode(HttpStatus.OK)
    findByPreco(@Param('preco') preco: number): Promise<Produto[]> {
        return this.produtoService.findByPreco(preco);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtoService.delete(id);
    }


}