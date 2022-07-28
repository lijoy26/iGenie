import { CreateFileDto } from "../../interface/file.t";
import { Fileschema } from "./create.file.schema";
const ValidateFileCreationObject = async (file: CreateFileDto) => {
    try {
        const value = await Fileschema.validateAsync(file);
        return value;
    }
    catch (err) {
        return err;
    }
}

export default ValidateFileCreationObject;