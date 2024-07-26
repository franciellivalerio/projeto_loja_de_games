import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaController } from "./controllers/categoria.controller";
import { CategoriaService } from "./service/categoria.service";
import { ProdutoService } from './../produto/service/produto.service';
import { ProdutoModule } from './../produto/produto.module';

@Module({
    imports: [TypeOrmModule.forFeature([Categoria]), ProdutoModule],

    providers: [ CategoriaService, ProdutoService],
    controllers: [ CategoriaController],
    exports: [TypeOrmModule]
})

export class CategoriaModule {}