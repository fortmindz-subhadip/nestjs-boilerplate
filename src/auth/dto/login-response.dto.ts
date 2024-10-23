import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class LoginResponseDto {
  @ApiProperty()
  accesstoken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  tokenExpires: number;

  @ApiProperty({
    type: () => User,
  })
  user: User;
}
