import CharacterModel, { ICharacter } from '../../models/Character';
import { CreateCharacterDto } from './dto/CreateCharacter.dto';

export default class CharactersService {
  public static async CreateCharacter(character: CreateCharacterDto): Promise<ICharacter> {
    const createdCharacter = await CharacterModel.create(character);
    return createdCharacter;
  }

  public static async FindCharacterByName(name: string): Promise<ICharacter | null> {
    const character = await CharacterModel.findOne({ name });
    return character;
  }

  public static async FindAllCharacters(): Promise<ICharacter[]> {
    const characters = await CharacterModel.find();
    return characters;
  }
}
