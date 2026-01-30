import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async findAll() {
    const allMenus = await this.prisma.menu.findMany({
        orderBy: { createdAt: 'asc' } // or arbitrary order field if added
    });
    return this.buildTree(allMenus);
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
