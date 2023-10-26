import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}




  @Post('signup')
  async signup(@Body() userSignUpDto :UserSignUpDto): Promise<UserEntity> {

    return await this.usersService.signup(userSignUpDto);
  }



  @Post('signin')
  async signin(@Body() userSignInDto : UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }>{
    const user =  await this.usersService.signin(userSignInDto);

    const accessToken = await this.usersService.accessToken(user);

    return {accessToken, user};
  }




  //@AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }







  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity){
    return currentUser;
  } 







  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //return this.usersService.create(createUserDto);
    return 'hi'
  }

  

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
