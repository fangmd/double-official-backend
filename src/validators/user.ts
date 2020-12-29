import { IsNotEmpty, MinLength } from 'class-validator'

export class CreateUser {
  @IsNotEmpty()
  username?: string

  @IsNotEmpty()
  password?: string
}

export class UpdateUser {
  @IsNotEmpty()
  username?: string
}

export class GetDeleteUser {
  @IsNotEmpty()
  id?: string
}

export class UserLogin {
  @IsNotEmpty()
  username?: string

  @IsNotEmpty()
  password?: string
}
