import { LevelingModel , Leveling} from "./leveling.entity.js"

export class LevelingRepository {
   public async findAll(): Promise<Leveling[] | undefined> {
      return await LevelingModel.find()
   }
   
//searchs by id and returns one object
   public async findOne(item: Partial<Leveling> ): Promise< Leveling | undefined> {
       return await LevelingModel.findOne({id: item.id}) || undefined
   
   }

//adds an object to the db
   public async add(item:Leveling): Promise < Leveling | undefined> {
      console.log('entra aca')
      const newLeveling = new LevelingModel(item)
      if (await LevelingModel.findOne({id: item.id})){
         return undefined
      }
      await newLeveling.save()

      return newLeveling
   }

//searchs an object and updates it
   public async update(item: Leveling): Promise < Leveling | undefined > {
      const result = await LevelingModel.findOneAndUpdate(item)
      return result || undefined
   }


//searchs an object and deletes it
   public async remove(item:Partial<Leveling>): Promise< Leveling | undefined>{
      return await LevelingModel.findOneAndDelete(item) || undefined
   }
}



