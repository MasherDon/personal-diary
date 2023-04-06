import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

import { ConfirmationService, MessageService } from "primeng/api";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms";
import { ChipsModule } from "primeng/chips";
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from "primeng/toast";
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from "primeng/ripple";
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoFocusModule } from 'primeng/autofocus';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { InplaceModule } from 'primeng/inplace';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

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
import { ToastComponent } from './toast/toast.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OptionsComponent } from './options/options.component';
import { RestoreComponent } from './restore/restore.component';
import { EditDataComponent } from './edit-data/edit-data.component';

const routes: Routes = [
  { path: '', component: RecordsComponent },
  { path: 'add', component: AddRecordComponent },
  { path: 'search', component: SearchComponent },
  { path: ':recordId', component: RecordComponent },
  { path: ':recordId/edit', component: EditRecordComponent },
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
    ToastComponent,
    SidebarComponent,
    OptionsComponent,
    RestoreComponent,
    EditDataComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    FormsModule,
    ChipsModule,
    AvatarModule,
    CalendarModule,
    ToastModule,
    VirtualScrollerModule,
    //SkeletonModule,
    EditorModule,
    SidebarModule,
    RippleModule,
    TabViewModule,
    AccordionModule,
    InputTextModule,
    KeyFilterModule,
    DividerModule,
    //TooltipModule,
    PasswordModule,
    ScrollPanelModule,
    DropdownModule,
    ToggleButtonModule,
    AutoFocusModule,
    FieldsetModule,
    CheckboxModule,
    RadioButtonModule,
    //InplaceModule,
    ConfirmDialogModule,
  ],
  providers: [ MessageService, ConfirmationService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
