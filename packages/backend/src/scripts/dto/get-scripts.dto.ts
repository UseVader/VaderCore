import { IsNumber, IsOptional, IsString } from "class-validator";

class GetScriptsDto {
    @IsNumber()
    @IsOptional()
    take?: number;

    @IsString()
    @IsOptional()
    cursor?: string;

}

export default GetScriptsDto;