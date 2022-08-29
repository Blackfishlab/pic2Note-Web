import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { PasswordresetComponent } from './auth/passwordreset/passwordreset.component';
import { NotesComponent } from './notes/notes.component';
import { NotevieweditComponent } from './notes/noteviewedit/noteviewedit.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  { path: "", component: SplashComponent},
  { path: "notes", canActivate: [AuthGuard], component: NotesComponent},
  { path: "note/:noteId", canActivate: [AuthGuard], component: NotevieweditComponent},
  { path: "login", component: LoginComponent},
  { path: "passwordreset", component: PasswordresetComponent},
  { path: "page-not-found", component: PagenotfoundComponent},
  { path: '**', redirectTo: '/page-not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

