import {
  Document, model, Schema, Types,
} from 'mongoose';

export interface ICharacter extends Document {
  _id?: Types.ObjectId;
  name: string;
  position: {
    x: number;
    y: number;
  }
}

const schema = new Schema<ICharacter>({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: {
      x: Number,
      y: Number,
    },
    default: { x: 0, y: 0 },
  },
});

const CharacterModel = model<ICharacter>('Character', schema);

export default CharacterModel;
