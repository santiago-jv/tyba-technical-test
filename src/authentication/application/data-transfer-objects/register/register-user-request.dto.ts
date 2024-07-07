import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequestDto {
  @ApiProperty({
    type: 'string',
  })
  email: string;

  @ApiProperty({
    type: 'string',
  })
  password: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'string',
  })
  phoneNumber: string;

  constructor(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}
