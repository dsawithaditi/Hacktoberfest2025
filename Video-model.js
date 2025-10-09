import mongoose , {Schema} from mongoose;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile : {
        type : String,  //cloudinary url
        required : true
    },
    thumbnail : {
        type : String,  //cloudinary url
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : Number,  //cloudinary url
        required : true
    },
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true,
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
    
},{Timestamp : true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Vedio = mongoose.model("Video", videoSchema)
