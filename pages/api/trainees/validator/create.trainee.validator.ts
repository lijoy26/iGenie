import { CreateUserDto } from "../../interface/user.t";
import { TraineeSchema } from "./create.trainee.schema";
const ValidateTraineeCreationObject = async (user: CreateUserDto) => {
    try {
        const value = await TraineeSchema.validateAsync(user);
        return value;
    }
    catch (err) {
        return err;
    }
}

export default ValidateTraineeCreationObject;