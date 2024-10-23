import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
  @ApiProperty()
  accesstoken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  tokenExpires: number;
}
