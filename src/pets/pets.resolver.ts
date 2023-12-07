import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from "./dto/create-pet.input.dto";

@Resolver(of => Pet)
export class PetsResolver {
  constructor(
    private readonly petsService: PetsService
  ) {}

  @Query(returns => [Pet])
  async pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Mutation(returns => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }
}
