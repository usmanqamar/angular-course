import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './interceptor/request.interceptor';
import { ShoppingListService } from '../shopping-list.module/services/shopping-list.service';
import { AuthGuardService } from '../shared.module/guards/auth-guard.service';
import { AuthService } from '../auth.module/auth.service';
@NgModule({
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RequestInterceptorService,
    //   multi: true,
    // },
    // ShoppingListService,
    //AuthService,
    AuthGuardService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
