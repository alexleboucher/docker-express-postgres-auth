import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost } from 'inversify-express-utils';
import type { NextFunction, Request, Response } from 'express';

import type { IRequestHandler } from '@/app/request-handlers/request-handler.interface';
import { REQUEST_HANDLERS_DI_TYPES } from '@/container/request-handlers/di-types';
import { MIDDLEWARES_DI_TYPES } from '@/container/middlewares/di-types';

// The auth routes are a bit different from the other routes in the way that they don't call a use case
// but the authenticator directly because req, res and next are needed and it's not the responsibility
// of the domain layer to handle these objects.
@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(
    @inject(REQUEST_HANDLERS_DI_TYPES.LoginRequestHandler) private readonly loginRequestHandler: IRequestHandler,
    @inject(REQUEST_HANDLERS_DI_TYPES.LogoutRequestHandler) private readonly logoutRequestHandler: IRequestHandler,
    @inject(REQUEST_HANDLERS_DI_TYPES.AuthenticatedRequestHandler) private readonly authenticatedRequestHandler: IRequestHandler,
  ) {
    super();
  }

  @httpGet('/authenticated')
  public authenticated(req: Request, res: Response, next: NextFunction) {
    return this.authenticatedRequestHandler.handle(req, res, next);
  }

  @httpPost('/login')
  public async login(req: Request, res: Response, next: NextFunction) {
    return this.loginRequestHandler.handle(req, res, next);
  }

  @httpPost('/logout', MIDDLEWARES_DI_TYPES.AuthenticatedMiddleware)
  public async logout(req: Request, res: Response, next: NextFunction) {
    return this.logoutRequestHandler.handle(req, res, next);
  }
}