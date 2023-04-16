import { Component, Inject, Input } from '@angular/core';
import { Record } from "../interface/record";
import { RecordsService } from "../service/records.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { StartTranslateService } from "../service/startTranslate.service";
import { AuthService } from "../service/auth.service";
import { MenuItem } from "primeng/api";
import { ThemeService } from "../service/theme.service";

import slugify from '@sindresorhus/slugify';
import EditorJS from '@editorjs/editorjs'

import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})

export class RecordComponent {
  constructor(@Inject(DOCUMENT) private document: Document, private recordsService: RecordsService, public router: Router, public authService: AuthService,
              private activatedRoute: ActivatedRoute, private fireAuth: AngularFireAuth, public translateService: StartTranslateService,
              private themeService: ThemeService) {}

  editor!: EditorJS;
  Header = require('@editorjs/header');
  NestedList = require('@editorjs/nested-list');
  Delimiter = require('@editorjs/delimiter');
  Marker = require('@editorjs/marker');
  //SimpleImage = require('@editorjs/simple-image');
  ImageTool = require('@editorjs/image');
  Paragraph = require('@editorjs/paragraph');

  button!: MenuItem[];
  translateButton!: string[];

  record!: Record;
  date!: Date;

  tag!: string[];
  tagSave!: string[];

  redact!: boolean;
  editorTranslate!: string[];
  uploadedFiles: any[] = [];

  saveBlock!: any;

  lang!: string;
  length: number = 1;
  page: number = 0;
  title!: string;

  leftArrow!: boolean;
  rightArrow!: boolean;
  rightPlus!: boolean;

  files: any[] = [];

  countries!: any[];
  selectedCountries!: any[];
  filteredCountries!: any[];

  @Input() language!: string;

  async ngOnInit() {
    this.page = 0;
    this.leftArrow = false;

    const syllable = this.activatedRoute.snapshot.paramMap.get('syllable');
    // @ts-ignore
    this.redact = this.activatedRoute.queryParams['value']['edit'];

    this.fireAuth.authState.subscribe(user => {
      this.editorTranslate = this.translateService.getEditorTranslate();
      this.translateButton = this.translateService.getButtonTranslate();
      this.setButton();
      if (user) {
        this.recordsService.getRecordBD(syllable||'',user?.uid||'').then(record => {
          this.logicRecord(record);
        });
      } else {
        this.recordsService.getRecord(syllable || '').then(record => {
          this.logicRecord(record);
        });
      }
    });
  }

  logicRecord(record: any) {
    if (record) {
      this.length = record['text'].length;
      if (record['text'].length > 1) {
        this.rightArrow = true;
        this.rightPlus = false;
      } else {
        this.rightArrow = false;
        this.rightPlus = true;
      }
      this.title = record['title'];
      this.record = {
        title: record['title'],
        tag: record['tag'],
        syllable: record['syllable'],
        text: record['text'],
        date: record['date']
      };
      this.date = new Date(this.record.date);
      this.tag = this.record.tag.map((item) => {
        return item.tag;
      })
      this.tagSave = this.record.tag.map((item) => {
        return item.tag;
      })
      this.setEditor();
      this.label();
    } else {
      this.router.navigate(['not-found']).then();
    }
  }

  async ngOnChanges() {
    if (this.redact) {
      this.editorTranslate = this.translateService.getEditorTranslate();
      this.record.text[this.page] = await this.editor.save();
      await this.editor.destroy();
      this.setEditor();
    }
    this.translateButton = this.translateService.getButtonTranslate();
    this.setButton();
  }

  uploadHandler(event: any) {
    // console.log(event, this.uploadedFiles)
    // for(let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }
  }

  filterCountry(event: any) {
    // let filtered: any[] = [];
    // let query = event.query;
    // for (let i = 0; i < this.countries.length; i++) {
    //   let country = this.countries[i];
    //   if (country.tag.toLowerCase().indexOf(query.toLowerCase()) > -1) {
    //     filtered.push(country);
    //   }
    // }
    // this.filteredCountries = filtered;
  }

  setImage() {

  }

  deleteImage() {

  }

  setHeight() {
    const cap = document.getElementById('cap') as HTMLLinkElement;
    return `${document.documentElement.clientHeight - cap.offsetHeight}px`
  }

  setButton() {
    this.button = [
      {
        label: this.translateButton[0],
        icon: 'pi pi-trash',
        command: () => {
          if (this.authService.getSigIn()) {
            this.recordsService.deleteRecordBD(this.record.syllable).then(() => {
              this.authService.userUpdate();
            });
          } else {
            this.recordsService.deleteRecord(this.record.syllable).then();
          }
          this.router.navigate(['/']).then();
        }
      },
    ]
  }

  setColor() {
    const tags = [];
    for(let n = 0; n < this.tag?.length; n++) {
      if (this.record.tag[n]?.tag !== this.tag[n]) {
        tags.push({tag: this.tag[n], color: this.themeService.setColor()})
      } else {
        tags.push(this.record.tag[n]);
      }
    }
    this.record.tag = tags;
  }

  label() {
    this.lang = `${this.page + 1} / ${this.length}`;
  }

  navigate(tag: string) {
    for (let n = 0; n < this.tagSave.length; n++) {
      if (this.tagSave[n] === tag) {
        this.router.navigate(['/search'], {queryParams: {tag: tag}}).then();
        break;
      }
    }
  }

  setSaveString() {
    setTimeout(async () => {
      this.record.text[this.page] = await this.editor.save();
      await this.editor.destroy();
      this.length++;
      this.page++;
      this.leftArrow = true;
      this.rightArrow = false;
      this.rightPlus = true;
      this.label();
      this.record.text[this.page] = this.saveBlock;
      this.setEditor();
    },100);
  }

  deletePag() {
    setTimeout(async () => {
      let text = [];
      for (let n = 0; n < this.record.text.length; n++) {
        if (n !== this.page) {
          text.push(this.record.text[n]);
        }
      }
      this.record.text = text;
      this.length--;
      this.page--;
      await this.editor.destroy();
      this.setEditor();
      this.leftArrow = this.page !== 0;
      if (this.length === this.page + 1) {
        this.rightArrow = false;
        this.rightPlus = true;
      } else {
        this.rightArrow = true;
        this.rightPlus = false;
      }
      this.label();
    },100);
  }

  setEditor() {
    this.editor = new EditorJS({
      minHeight: 0,
      readOnly: !this.redact,
      // @ts-ignore
      logLevel: 'ERROR',
      holder: 'editor',
      placeholder: this.editorTranslate[0],
      autofocus: this.redact,
      data: this.record.text[this.page],
      onChange: async (api, event) => {
        if (event.type === 'block-removed'){
          const content = await api.saver.save();
          if (!content.blocks.length&&this.editor.blocks.getBlockByIndex(0)?.name==='paragraph'&&this.page>0) {
            this.deletePag();
          }
        }
        const limit = 550;
        const editor = this.document.getElementById('editor') as HTMLLinkElement;
        const height = editor.clientHeight;
        if (height < limit) {
          return;
        }
        const workingBlockIndex = event.detail.index;
        if (this.page + 1 === this.length) {
          const content = await api.saver.save();
          const workingBlock = event.detail.target;
          const workingBlockSaved = content.blocks.filter(block => block.id === workingBlock.id);
          if (workingBlockSaved.length) {
            content.blocks = workingBlockSaved;
            this.saveBlock = content;
            this.setSaveString();
          }
        }
        this.editor.blocks.delete(workingBlockIndex);
      },
      tools: {
        paragraph: {
          class: this.Paragraph,
          inlineToolbar: true,
          config: {
            preserveBlank: true,
          }
        },
        image: {
          class: this.ImageTool,
          toolbox: false,
        },
        header: {
          class: this.Header,
          config: {
            placeholder: this.editorTranslate[1],
            levels: [1, 2, 3],
            defaultLevel: 3
          },
          shortcut: 'CMD+SHIFT+H'
        },
        list: {
          class: this.NestedList,
          shortcut: 'CMD+SHIFT+L',
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        delimiter: {
          class: this.Delimiter,
          shortcut: 'CMD+SHIFT+D'
        },
        Marker: {
          class: this.Marker,
          shortcut: 'CMD+SHIFT+M',
        }
      },
      i18n: {
        messages: {
          ui: {
            "blockTunes": {
              "toggler": {
                "Click to tune": this.editorTranslate[2],
                "or drag to move": this.editorTranslate[3]
              },
            },
            "inlineToolbar": {
              "converter": {
                "Convert to": this.editorTranslate[4]
              }
            },
            "toolbar": {
              "toolbox": {
                "Add": this.editorTranslate[5]
              }
            }
          },
          toolNames: {
            "Text": this.editorTranslate[6],
            "Heading": this.editorTranslate[7],
            "List": this.editorTranslate[8],
            "Delimiter": this.editorTranslate[9],
            "Link": this.editorTranslate[10],
            "Marker": this.editorTranslate[11],
            "Bold": this.editorTranslate[12],
            "Italic": this.editorTranslate[13],
          },
          tools: {
            "warning": {
              "Title": this.editorTranslate[14],
              "Message": this.editorTranslate[15],
            },
            "link": {
              "Add a link": this.editorTranslate[16]
            },
            "stub": {
              'The block can not be displayed correctly.': this.editorTranslate[17]
            }
          },
          blockTunes: {
            "unordered": {
              "Unordered": this.editorTranslate[18]
            },
            "ordered": {
              "Ordered": this.editorTranslate[19]
            },
            "delete": {
              "Delete": this.editorTranslate[20]
            },
            "moveUp": {
              "Move up": this.editorTranslate[21]
            },
            "moveDown": {
              "Move down": this.editorTranslate[22]
            }
          },
        }
      }
    });
  }

  onUpload(event: any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  async change() {
    if (!this.redact) {
      this.record.text[this.page] = await this.editor.save();
      this.setColor();
    }
    await this.editor.destroy();
    this.setEditor();
  }

  async switch(left: boolean) {
    if (this.redact) this.record.text[this.page] = await this.editor.save();
    await this.editor.destroy();
    if(left) {
      this.page--
    } else {
      if (this.rightPlus) this.length++;
      this.page++
    }
    this.setEditor();
    this.leftArrow = this.page !== 0;
    if (this.length === this.page + 1) {
      this.rightArrow = false;
      this.rightPlus = true;
    } else {
      this.rightArrow = true;
      this.rightPlus = false;
    }
    this.label();
  }

  async updateRecord() {
    this.record.text[this.page] = await this.editor.save();
    this.record.date = Number(this.date);
    const syllable = this.record.syllable;
    this.setColor();
    if (this.title !== this.record.title) {
      if (!/.+/.test(this.record.title)) this.record.title = 'Nameless';
      this.record.syllable = slugify(this.record.title) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }
    if (this.authService.getSigIn()) {
      await this.recordsService.updateRecordBD(this.record, syllable).then(() => {
        this.authService.userUpdate();
      });
    } else {
      await this.recordsService.updateRecord(this.record, syllable);
    }
    this.router.navigate(['/']).then();
  }
}
