import { Query, Mutation, Resolver, Args, Int } from "@nestjs/graphql";
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from "./dto/create-pet.input.dto";

@Resolver(of => Pet)
export class PetsResolver {
  constructor(
    private readonly petsService: PetsService
  ) {}

  @Mutation(returns => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Query(returns => [Pet])
  async pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(returns => Pet)
  async getPet(@Args('id', {type: () => Int}) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }
}
