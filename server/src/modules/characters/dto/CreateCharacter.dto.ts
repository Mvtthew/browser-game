export interface CreateCharacterDto {
  name: string;
  position?: {
    x: number;
    y: number;
  }
}
