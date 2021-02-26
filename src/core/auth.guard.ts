import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request =  context.switchToHttp().getRequest();
        if (request) return true;
        /* return validateRequest(request);
        * The logic inside the validateRequest() function 
        * can be as simple or sophisticated as needed. 
        * The main point of this example is to show 
        * how guards fit into the request/response cycle.
        */
    }
}