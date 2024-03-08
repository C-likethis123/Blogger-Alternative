import { Schema, Model, model } from "mongoose";

/**
 * Represents logged in users
 */
interface User {
    email: string;
    access_token: string,
    refresh_token: string,
}
const UserSchema: Schema<User> = new Schema({
    email: String, // make this unique?
    // tokens from OAuth
    access_token: String,
    refresh_token: String,
});

const UserModel: Model<User> = model("User", UserSchema);

export default UserModel;