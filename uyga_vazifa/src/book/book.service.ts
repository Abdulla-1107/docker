import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    return await this.prisma.book.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateBookDto) {
    return await this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.book.delete({ where: { id } });
  }
}
