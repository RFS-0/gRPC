import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ChatClientServiceImpl} from "./chat-client-service-impl.service";

@Injectable({
  providedIn: 'root',
})
export class IsRegistered implements CanActivate {
  constructor(private chatClientService: ChatClientServiceImpl, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.chatClientService.isUserRegistered()) {
      return true;
    }
    this.router.navigate(['/registration']);
    return false;
  }
}
