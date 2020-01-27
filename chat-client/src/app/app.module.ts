import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from "./header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import { RegistrationComponent } from './pages/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ChatComponent } from './pages/chat/chat.component';
import {IsRegistered} from "./is-registered.guard";
import {ChatServiceClient} from "../protobuffers/ChatServiceClientPb";
import {MatInputModule} from "@angular/material/input";
import { UsersComponent } from './pages/users/users.component';
import { HistoryComponent } from './pages/history/history.component';
import { UserComponent } from './pages/user/user.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    RegistrationComponent,
    ChatComponent,
    UsersComponent,
    HistoryComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
  ],
  providers: [IsRegistered],
  bootstrap: [AppComponent]
})
export class AppModule {
}
