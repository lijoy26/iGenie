import { CreateUserDto } from "../../interface/user.t";
import { Userschema } from "./create.user.schema";
const ValidateUserCreationObject = async (user: CreateUserDto) => {
    try {
        const value = await Userschema.validateAsync(user);
        return value;
    }
    catch (err) {
        return err;
    }
}

export default ValidateUserCreationObject;