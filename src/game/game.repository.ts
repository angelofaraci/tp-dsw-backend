import { Repository } from "../shared/repository.js";
import { Game } from "./game.entity.js";

const games = [
   new Game (
    '1',
    'The Legend Of Zelda: Breath Of The Wild',
    'Hey! Listen!',
    'https://static.tycsports.com/sites/default/files/nota_periodistica/botw-share_icon.jpg',
    new Date(2017, 0o3, 0o3),
    'https://www.nintendo.com/es-ar/store/products/the-legend-of-zelda-breath-of-the-wild-switch/',
    ['https://twitter.com/ZeldaOfficialJP'],
    83
    )
];

export class GameRepository implements Repository<Game>{
   public findAll(): Game[] | undefined {
      return games
   }
   
   public findOne(item: { id: string; }): Game | undefined {
      return games.find((games) => games.id = item.id)
   }

   public add(item: Game): Game | undefined {
    games.push(item)
      return item
   }

   public update(item: Game): Game | undefined {
      const gameIdx = games.findIndex((games) => games.id === item.id)
      if (gameIdx !== -1) {
        games[gameIdx]={...games[gameIdx], ...item}
      }
      return games[gameIdx]  
   }

   public delete(item: { id: string; }): Game | undefined {
      const reviewIdx = games.findIndex((reviews) => reviews.id === item.id)
      if (reviewIdx !== -1) {
         const deletedReviews = games[reviewIdx]
         games.splice(reviewIdx, 1)
         return deletedReviews
      }
   }
}