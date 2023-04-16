import { Component, Inject, Input } from '@angular/core';
import { Record } from "../interface/record";
import { RecordsService } from "../service/records.service";
import { StartTranslateService } from "../service/startTranslate.service";
import { AuthService } from "../service/auth.service";
import { ThemeService } from "../service/theme.service";
import { Router } from "@angular/router";

import slugify from '@sindresorhus/slugify';
import EditorJS from '@editorjs/editorjs'

import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})

export class AddRecordComponent {
  constructor(@Inject(DOCUMENT) private document: Document, private recordsService: RecordsService, private router: Router,
              public translateService: StartTranslateService, public authService: AuthService, private themeService: ThemeService) {}

  @Input() language!: string;

  editor!: EditorJS;
  Header = require('@editorjs/header');
  NestedList = require('@editorjs/nested-list');
  Delimiter = require('@editorjs/delimiter');
  Marker = require('@editorjs/marker');
  //SimpleImage = require('@editorjs/simple-image');
  ImageTool = require('@editorjs/image');
  Paragraph = require('@editorjs/paragraph');

  record: Record = {
    date: Number(new Date()),
    title: '',
    text: [],
    syllable: '',
    tag: []
  }
  date: Date = new Date();
  tag!: string[];

  saveBlock!: any;

  redact: boolean = false;
  editorTranslate!: string[];

  length: number = 1;
  page: number = 0;
  lang: string = '1 / 1';

  leftArrow!: boolean;
  rightArrow!: boolean;
  rightPlus!: boolean;

  countries!: any[];
  selectedCountries!: any[];
  filteredCountries!: any[];

  files: any[] = [];

  ngOnInit() {
    this.editorTranslate = this.translateService.getEditorTranslate();
    this.page = 0;
    this.leftArrow = false;
    this.rightArrow = false;
    this.rightPlus = true;
    this.redact = true;
    this.setEditor();
  }

  async ngOnChanges() {
    if (this.redact) {
      this.editorTranslate = this.translateService.getEditorTranslate();
      this.record.text[this.page] = await this.editor.save();
      await this.editor.destroy();
      this.setEditor();
    }
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

  async change() {
    if (!this.redact) {
      this.record.text[this.page] = await this.editor.save();
      this.setColor();
    }
    await this.editor.destroy();
    this.setEditor();
  }

  setHeight() {
    const cap = document.getElementById('cap') as HTMLLinkElement;
    return `${document.documentElement.clientHeight - cap.offsetHeight}px`
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
      autofocus: true,
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
        //api.caret.setToBlock(workingBlockIndex - 1, 'end');
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
            defaultLevel: 3,
          },
          shortcut: 'CMD+SHIFT+H'
        },
        list: {
          class: this.NestedList,
          shortcut: 'CMD+SHIFT+L',
          config: {
            defaultStyle: 'unordered',
          },
        },
        delimiter: {
          class: this.Delimiter,
          shortcut: 'CMD+SHIFT+D'
        },
        Marker: {
          class: this.Marker,
          shortcut: 'CMD+SHIFT+M',
        },
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

  async addRecord() {
    this.record.text[this.page] = await this.editor.save();
    if (!/.+/.test(this.record.title)) this.record.title = 'Nameless';
    this.record.date = Number(this.date);
    this.setColor();
    this.record.syllable = slugify(this.record.title) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    if (this.authService.getSigIn()) {
      await this.recordsService.addRecordBD(this.record).then(() => {
        this.authService.userUpdate();
      });
    } else {
      await this.recordsService.addRecord(this.record);
    }
    this.router.navigate(['/']).then();
  }
}

// this.record.text[0].blocks.push({
//   type: "image",
//   data: {
//     file: {
//       url: "https://firebasestorage.googleapis.com/v0/b/personal-diary-24924.appspot.com/o/%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B8%20%D0%B8%D1%81%D1%82%D0%B8%D0%BD%D1%8B.jpg?alt=media&token=c73bb6d9-342b-4590-87c2-f948f0c8e10c"
//     },
//     caption: "",
//     withBorder: false,
//     withBackground: true,
//     stretched: false
//   },
//   id: 'WCe5_JS60c'
// })
