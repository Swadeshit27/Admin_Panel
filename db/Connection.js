import mongoose from "mongoose";

/*****************  Database connection  **************************/
export const Connect = async () => {
   try {
     await mongoose.connect(process.env.MONGOOSE_URL);
     console.log("connected to database.....");
   } catch {
     console.log("no connection.....");
   }
};
