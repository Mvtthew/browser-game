import express from 'express';
import Logger from '../../commons/Logger';
import JwtRepository from '../../security/JwtRepository';
import CharactersService from './CharactersService';

export default class CharactersController {
  public static Register(app: express.Express): void {
    app.post('/characters', async (req, res) => {
      const { name } = req.body;
      const createdCharacter = await CharactersService.CreateCharacter({ name });
      res.json(createdCharacter);
    });

    app.post('/characters/login', async (req, res) => {
      const { name } = req.body;
      const character = await CharactersService.FindCharacterByName(name);
      if (character) {
        res.json({ token: JwtRepository.SignToken({ _id: character._id }) });
      } else {
        res.status(401).end();
      }
    });

    Logger.Log('Registered CharactersController!');
  }
}
