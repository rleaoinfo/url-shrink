import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly usersService: UsersService) {}

	async canActivate(
		context: ExecutionContext,
	) {
		const request = context.switchToHttp().getRequest();
		const authorizationToken: string = request.headers.token;

		if (!authorizationToken) {
			throw new UnauthorizedException();
		}
		const user = await this.usersService.findOneToken(authorizationToken);

		if (!user) {
			throw new UnauthorizedException();
		}

		request.user = user;

		return true;
	}
}