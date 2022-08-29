import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/note/note.component';
import { SplashComponent } from './splash/splash.component';
import { NotesService } from './notes/notes.service';
import { NotedeleteComponent } from './notes/notedelete/notedelete.component';
import { NotevieweditComponent } from './notes/noteviewedit/noteviewedit.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { PasswordresetComponent } from './auth/passwordreset/passwordreset.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ErrormodalComponent } from './shared/errormodal/errormodal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotesComponent,
    NoteComponent,
    SplashComponent,
    NotedeleteComponent,
    NotevieweditComponent,
    PagenotfoundComponent,
    LoginComponent,
    PasswordresetComponent,
    ErrormodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [NotesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
