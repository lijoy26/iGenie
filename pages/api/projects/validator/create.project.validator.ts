import { CreateProjectDto } from "../../interface/project.t";
import { CreateUserDto } from "../../interface/user.t";
import { Projectschema } from "./create.project.schema";
const ValidateProjectCreationObject = async (project: CreateProjectDto) => {
    try {
        const value = await Projectschema.validateAsync(project);
        return value;
    }
    catch (err) {
        return err;
    }
}

export default ValidateProjectCreationObject;