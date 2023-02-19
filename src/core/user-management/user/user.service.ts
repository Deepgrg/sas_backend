import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne(
      {
        email: email,
      },
      {
        populate: ['password'],
      },
    );

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const hash = await argon2.hash(password);
    return hash;
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const flag = await argon2.verify(hash, password);
    return flag;
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(dto.password);
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    await this.userRepository.persistAndFlush(user);
  }

  async updateUser(dto: UpdateUserDto) {
    const user = await this.getUserById(dto.id);
    this.userRepository.assign(user, { ...dto });
    await this.userRepository.persistAndFlush(user);
  }

  async activateUser(userId: number) {
    const user = await this.getUserById(userId);
    this.userRepository.assign(user, { isActive: true });
    await this.userRepository.persistAndFlush(user);
  }

  async archiveUser(userId: number) {
    const user = await this.getUserById(userId);
    this.userRepository.assign(user, { isActive: false });
    await this.userRepository.persistAndFlush(user);
  }

  async deleteUser(userId: number) {
    const user = await this.getUserById(userId);
    await this.userRepository.removeAndFlush(user);
  }
}
