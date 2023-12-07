import { Query, Mutation, Resolver, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input.dto';
import { Owner } from '../owners/owner.entity';

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

  @ResolveField(returns => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
}
