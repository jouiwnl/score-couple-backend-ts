import { Body, Controller, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    const created = this.userService.createUser(user);

    return created;
  }

  @Put(":id")
  async update(@Body() user: User): Promise<{ message: string }> {
    this.userService.update(user);

    return { message: "User updated with success!" }  
  }

  @Get(":email")
  async getOneByEmail(@Param("email") email: string): Promise<User> {
    const user = await this.userService.getOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`Not found any users with email: ${email}`);
    }

    return user;
  }
}