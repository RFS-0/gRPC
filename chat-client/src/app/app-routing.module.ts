import {Injectable, NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate} from '@angular/router';
import {RegistrationComponent} from "./pages/registration/registration.component";
import {Observable} from "rxjs";
import {IsRegistered} from "./is-registered.guard";
import {ChatComponent} from "./pages/chat/chat.component";
import {HistoryComponent} from "./pages/history/history.component";
import {UsersComponent} from "./pages/users/users.component";
import {UserComponent} from "./pages/user/user.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/chat'},
  {path: 'registration', component: RegistrationComponent},
  {path: 'chat', component: ChatComponent, canActivate: [IsRegistered]},
  {path: 'history', component: HistoryComponent, canActivate: [IsRegistered]},
  {path: 'user', component: UserComponent, canActivate: [IsRegistered]},
  {path: 'users', component: UsersComponent, canActivate: [IsRegistered]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
