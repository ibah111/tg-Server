import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserCreateInput } from "./user.input";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post()
    async createUser(@Body() body: UserCreateInput) { 
        return this.userService.createUserOnStart(body);
    }
    @Get()
    async getUser() {
        return 'this method must return user by id';
    }
    @Get()
    async getAllUsers() { 
        return 'this method must return all Users from DB';
    }

}
