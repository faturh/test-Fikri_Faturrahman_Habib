import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../prisma.service';
import * as fs from 'fs';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    try {
        return await this.prisma.menu.create({
          data: createMenuDto,
        });
    } catch (error) {
        fs.writeFileSync('error.txt', `Create error: ${error.message}`);
        throw error;
    }
  }

  async findAll() {
    try {
        const allMenus = await this.prisma.menu.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return this.buildTree(allMenus);
    } catch (error) {
        fs.writeFileSync('error.txt', `FindAll error: ${error.message}`);
        throw error;
    }
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }

  private buildTree(menus: any[], parentId: string | null = null) {
    return menus
      .filter((menu) => menu.parentId === parentId)
      .map((menu) => ({
        ...menu,
        children: this.buildTree(menus, menu.id),
      }));
  }
}
