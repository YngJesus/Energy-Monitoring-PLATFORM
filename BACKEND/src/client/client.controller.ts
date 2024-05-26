import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/models/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { ForgetPasswordDto } from './dto/Forgot-pass.dto';
import { ResetPassDto } from './dto/reset-password.dto';

@ApiBearerAuth()
@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    this.clientService.update(id, updateClientDto);
    return 'Your profile  has been updated';
  }

  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.clientService.remove(id);
    return 'Your profile  has been deleted';
  }
  @Post('Forget')
  async Forget(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.clientService.Create(forgetPasswordDto);
  }
  @Post('Reset')
  async resetPassword(@Body() resetPassDto: ResetPassDto) {
    return await this.clientService.Reset(resetPassDto);
  }
}
