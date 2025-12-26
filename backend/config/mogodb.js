import mongoose  from "mongoose";

const connnectDb = async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("DB CONNECTED");
        
    })
        
        await mongoose.connect(`${process.env.MONGODB_URI}/HEVEN`)
}
export default connnectDb;