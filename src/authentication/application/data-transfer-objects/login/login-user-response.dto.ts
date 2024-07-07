import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'string',
  })
  email: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
  })
  updatedAt: Date;

  @ApiProperty({
    type: 'string',
  })
  token: string;

  constructor(
    id: string,
    email: string,
    name: string,
    token: string,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.token = token;
    this.phoneNumber = phoneNumber;
    this.updatedAt = updatedAt;
  }
}
