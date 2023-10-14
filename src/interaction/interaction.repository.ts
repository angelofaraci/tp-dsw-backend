import { InteractionModel, Interaction } from "./interaction.entity.js"

export class InteractionRepository {
   public async findAll(): Promise<Interaction[] | undefined> {
      return await InteractionModel.find()
   }
   
//searchs by id and returns one object
   public async findOne(item: Partial<Interaction> ): Promise< Interaction | undefined> {
       return await InteractionModel.findOne({id: item.id}) || undefined
   
   }

//adds an object to the db
   public async add(item:Interaction): Promise < Interaction | undefined> {
      console.log('entra aca')
      const newInteraction = new InteractionModel(item)
      if (await InteractionModel.findOne({id: item.id})){
         return undefined
      }
      await newInteraction.save()

      return newInteraction
   }

//searchs an object and updates it
   public async update(item: Interaction): Promise < Interaction | undefined > {
      const result = await InteractionModel.findOneAndUpdate(item)
      return result || undefined
   }


//searchs an object and deletes it
   public async remove(item:Partial<Interaction>): Promise< Interaction | undefined>{
      return await InteractionModel.findOneAndDelete(item) || undefined
   }
}



