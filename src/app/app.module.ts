import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'

//import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
//import { provideAuth, getAuth } from '@angular/fire/auth';
//import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms";
import { ChipsModule } from "primeng/chips";
import { AvatarModule } from 'primeng/avatar';
//import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from "primeng/toast";
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from "primeng/ripple";

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { CapComponent } from './cap/cap.component';
import { RecordsComponent } from './records/records.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { RecordComponent } from './record/record.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { OptionsComponent } from './options/options.component';
import { ToastComponent } from './toast/toast.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: RecordsComponent },
  { path: 'add', component: AddRecordComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'registration', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'record/:recordId', component: RecordComponent },
  { path: 'record/:recordId/edit', component: EditRecordComponent },
  { path: '**', component: NotFoundComponent },
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CapComponent,
    RecordsComponent,
    AddRecordComponent,
    EditRecordComponent,
    RecordComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    OptionsComponent,
    ToastComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'ru',
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    FormsModule,
    ChipsModule,
    AvatarModule,
    //MenuModule,
    CalendarModule,
    ToastModule,
    VirtualScrollerModule,
    SkeletonModule,
    EditorModule,
    SidebarModule,
    RippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
