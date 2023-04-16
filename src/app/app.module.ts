import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";

import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from "primeng/toast";
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from "primeng/ripple";
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoFocusModule } from 'primeng/autofocus';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from "primeng/chips";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from "primeng/api";
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppComponent } from './app.component';
import { CapComponent } from './cap/cap.component';
import { RecordsComponent } from './records/records.component';
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
import { DropdownLangComponent } from './dropdown-lang/dropdown-lang.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { EditorAddRecordComponent } from './editor-add-record/editor-add-record.component';
import { EditorRecordComponent } from './editor-record/editor-record.component';
import { BookComponent } from './book/book.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookRecordsComponent } from './book-records/book-records.component';

const routes: Routes = [
  {
    path: '',
    title: 'Personal Diary',
    component: BookComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'search',
    title: 'Search',
    component: SearchComponent,
  },
  {
    path: 'add',
    title: 'Add record',
    component: EditorAddRecordComponent,
  },
  {
    path: 'record/:syllable',
    title: 'Record',
    component: EditorRecordComponent,
  },
  {
    path: 'not-found',
    title: 'Not Found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
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
    DropdownLangComponent,
    EditorAddRecordComponent,
    EditorRecordComponent,
    BookComponent,
    BookSearchComponent,
    BookRecordsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
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
    SkeletonModule,
    SidebarModule,
    RippleModule,
    TabViewModule,
    AccordionModule,
    InputTextModule,
    KeyFilterModule,
    DividerModule,
    PasswordModule,
    DropdownModule,
    ToggleButtonModule,
    AutoFocusModule,
    FieldsetModule,
    CheckboxModule,
    RadioButtonModule,
    ConfirmDialogModule,
    ChipModule,
    ProgressSpinnerModule,
    FileUploadModule,
    SplitButtonModule,
    TagModule,
    AutoCompleteModule,
  ],
  exports: [RouterModule],
  providers: [ MessageService, ConfirmationService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
