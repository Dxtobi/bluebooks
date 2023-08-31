import { BookModel } from "../../../models/index.models"








export const storyServices = {

    addNewBook: async (data:CreateBookDto) => {
       try {
        const res= await BookModel.create(data)
        return  res
       } catch (error) {
        return error
       }
    },

    addNewChapter: async (data:AddChapterBookDto) => {
        try {
            

            const exist = await BookModel.findOne({ author: data.author, _id: data.mainStory })
            if (!exist) {
                console.log('nop')
               throw new Error("bad request");
            }

           // console.log(exist)
            data.numberOfPages = exist.numberOfPages += 1
            data.coverArtUrl = exist.coverArtUrl
            const res = await BookModel.create(data)
            await BookModel.findByIdAndUpdate(exist?._id, { numberOfPages: Number(exist.numberOfPages += 1) })
            
            console.log('updated')
         return  res
        } catch (error) {
            console.log(error)
         return error
        }
    },
    
    removeBook: async (Id:string) => {
        try {
          return  'id'+Id
        } catch (error) {
            return error
        }
    },
    
     removeChapter: async (Id:string) => {
        try {
          return  'id'+Id
        } catch (error) {
            return error
        }
    },
     
    update: async (id:string, data: any) => {
        try {
            console.log(data.subtitle, id)
            const res = await BookModel.findByIdAndUpdate(id, {...data},  { new: true })
            return  res
        } catch (error) {
            return error
        }
     },

}