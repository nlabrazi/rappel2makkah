import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateArticleDto} from './dto/create-article.dto';
import {UpdateArticleDto} from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: {id},
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      return await this.prisma.article.update({
        where: {id},
        data: updateArticleDto,
      });
    } catch {
      throw new NotFoundException(`Article #${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.article.delete({
        where: {id},
      });
      return {message: `Article #${id} deleted`};
    } catch {
      throw new NotFoundException(`Article #${id} not found`);
    }
  }
}
