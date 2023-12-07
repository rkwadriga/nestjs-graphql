import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsNotEmpty()
  @IsAlpha()
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;
}