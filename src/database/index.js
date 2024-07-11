import mongoose from "mongoose";

const connectToDB = async () => {
  const connectUrl =
    "mongodb+srv://boluwatifeomirinde080:<password>@blog.li42ds6.mongodb.net/?retryWrites=true&w=majority&appName=Blog";

  mongoose
    .connect(connectUrl)
    .then(() => console.log("blog database connection is successfully"))
    .catch((err) => console.log(err));
};

export default connectToDB;
