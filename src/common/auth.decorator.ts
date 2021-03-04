import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/core/guards/auth.guard"
import { RolesGuard } from "src/core/guards/roles.guard"

export const Auth = (...roles: string[]) => {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard),
    )
}