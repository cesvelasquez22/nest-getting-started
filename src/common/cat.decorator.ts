import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const Cat = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const cat = request.body;

        return cat?.[data] ? cat?.[data] : cat;
    }
)