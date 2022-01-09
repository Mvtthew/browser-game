import { Position } from '../../commons/interfaces/Position';
import { ICharacter } from '../../models/Character';
import CharactersService from '../characters/CharactersService';
import { MovementDirection } from './enums/MovementDirection.enum';

export default class MovementService {
  public static async MoveCharacter(character: ICharacter, direction: MovementDirection): Promise<void> {
    switch (direction as MovementDirection) {
      case MovementDirection.UP:
        character.position.y -= 1;
        if (character.position.y < 0) character.position.y = 0;
        break;
      case MovementDirection.RIGHT:
        character.position.x += 1;
        if (character.position.x < 0) character.position.y = 0;
        break;
      case MovementDirection.DOWN:
        character.position.y += 1;
        if (character.position.y > 9) character.position.y = 9;
        break;
      case MovementDirection.LEFT:
        character.position.x -= 1;
        if (character.position.x < 0) character.position.x = 0;
        break;
    }
    await character.save();
  }

  public static async GetAllCharactersPositions(): Promise<Position[]> {
    const characters = await CharactersService.FindAllCharacters();
    return characters.map((c) => c.position);
  }
}
