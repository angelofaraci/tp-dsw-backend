import { Game } from "./game.entity.js";

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
   public async findAll(): Promise<{} | undefined> {
      return await Game.find()
   }
   
   public async findOne(item: {id:string} ): Promise < {} | null | undefined> {
      return await Game.findOne({id: item.id})
   }

   public async add(item: {}): Promise < {} | undefined> {
    const newGame = new Game(item)
      if (await Game.findOne({id: newGame.id})) {return undefined}
    await newGame.save()
    return item
   }

   public async update(item: {}): Promise <{} | null> {
      await Game.findOneAndUpdate(item) 
      return item
   }

   public async delete(item: { id: string; }): Promise <{} | null | undefined> {
      return await Game.findOneAndDelete(item)
   }
}