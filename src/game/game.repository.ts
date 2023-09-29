import { GameModel, Game } from "./game.entity.js";


export class GameRepository{
   public async findAll(): Promise< Game[] | undefined> {
      return await GameModel.find()
   }
   
//searchs by id and returns one object
   public async findOne(item: Partial<Game> ): Promise < Game | undefined> {
      return await GameModel.findOne({id: item.id}) || undefined
   }

//adds an object to the db
   public async add(item: Game): Promise < Game | undefined> {
    const newGame = new GameModel(item)
      if (await GameModel.findOne({id: newGame.id})) {return undefined}
    await newGame.save()
    return item
   }


//searchs an object and updates it
   public async update(item: Game): Promise <Game | undefined> {
      const result = await GameModel.findOneAndUpdate(item) 
      return result || undefined
   }


//searchs an object and deletes it
   public async delete(item: Partial<Game>): Promise <Game  | undefined> {
      return await GameModel.findOneAndDelete(item) || undefined
   }
}


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