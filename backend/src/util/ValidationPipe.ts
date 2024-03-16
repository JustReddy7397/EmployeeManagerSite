import {ValidatorOptions} from "@nestjs/common/interfaces/external/validator-options.interface";
import {ValidationError} from "@nestjs/common";

export interface ValidationPipe extends ValidatorOptions {
    transform: true;
    disableErrorMessages: false;
    whitelist: true;
    exceptionFactory: (errors: ValidationError[]) => any;

}