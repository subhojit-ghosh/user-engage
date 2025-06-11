import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SourceGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const id = request.headers['x-source-id'];
    const apiKey = request.headers['x-source-api-key'];

    if (!id || !apiKey) {
      throw new UnauthorizedException(
        'Missing required headers: x-source-id and x-source-api-key'
      );
    }

    const cacheKey = `source:${id}`;

    const source = await this.cacheManager.get(cacheKey);

    if (!source) {
      throw new UnauthorizedException('Source not found');
    }

    console.log(request.headers);

    return true;
  }
}
