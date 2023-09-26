import { Game, GameClass } from "./game.entity.js";

/* 
    '1',
    'The Legend Of Zelda: Breath Of The Wild',
    'Hey! Listen!',
    'https://static.tycsports.com/sites/default/files/nota_periodistica/botw-share_icon.jpg',
    new Date(2017, 0o3, 0o3),
    'https://www.nintendo.com/es-ar/store/products/the-legend-of-zelda-breath-of-the-wild-switch/',
    ['https://twitter.com/ZeldaOfficialJP'],
    83
 */
export class GameRepository{
   public async findAll(): Promise< GameClass[] | undefined> {
      return await Game.find()
   }
   
   public async findOne(item: Partial<GameClass> ): Promise < GameClass | undefined> {
      return await Game.findOne({id: item.id}) || undefined
   }

   public async add(item: GameClass): Promise < GameClass | undefined> {
    const newGame = new Game(item)
      if (await Game.findOne({id: newGame.id})) {return undefined}
    await newGame.save()
    return item
   }

   public async update(item: GameClass): Promise <GameClass | undefined> {
      const result = await Game.findOneAndUpdate(item) 
      return result || undefined
   }

   public async delete(item: Partial<GameClass>): Promise <GameClass  | undefined> {
      return await Game.findOneAndDelete(item) || undefined
   }
}