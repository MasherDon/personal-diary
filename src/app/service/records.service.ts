import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Record } from "../interface/record";

@Injectable({
  providedIn: 'root'
})

export class RecordsService {
  constructor(private fireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {}

  async addRecordBD(record: Record) {
    this.fireAuth.authState.subscribe(async user => {
      const name = 'user/' + user?.uid + '/records';
      this.angularFirestore.firestore.collection(name).add(record).then();
    });
  }

  async addRecord(record: Record) {
    let records;
    try {
      records = await JSON.parse(localStorage.getItem('records')||'');
    } catch (error) {  }
    if (records) {
      localStorage.removeItem('records');
      records.push(record);
      localStorage.setItem('records', JSON.stringify(records));
    } else {
      localStorage.setItem('records', JSON.stringify([record]));
    }
  }

  async updateRecordBD(record: Record, syllable: string) {
    this.fireAuth.authState.subscribe(async (user) => {
      const name = 'user/' + user?.uid + '/records';
      const records = await this.getAllRecordsBD(user?.uid || '');
      for (let n = 0; n < records.docs.length; n++) {
        const doc = await records.docs[n].data();
        if (doc['syllable'] === syllable) {
          await this.angularFirestore.firestore.collection(name).doc(records.docs[n].id).update({title: record.title}).then();
          await this.angularFirestore.firestore.collection(name).doc(records.docs[n].id).update({tag: record.tag}).then();
          await this.angularFirestore.firestore.collection(name).doc(records.docs[n].id).update({text: record.text}).then();
          await this.angularFirestore.firestore.collection(name).doc(records.docs[n].id).update({date: record.date}).then();
          await this.angularFirestore.firestore.collection(name).doc(records.docs[n].id).update({syllable: record.syllable}).then();
          break;
        }
      }
    });
  }

  async updateRecord(record: Record, syllable: string) {
    const records = await this.getAllRecords();
    for (let n = 0; n < records.length; n++) {
      if (records[n]['syllable'] === syllable) {
        records[n] = record;
        break;
      }
    }
    localStorage.removeItem('records');
    localStorage.setItem('records', JSON.stringify(records));
  }

  async deleteRecordBD(syllable: string) {
    this.fireAuth.authState.subscribe(async (user) => {
      const name = 'user/' + user?.uid + '/records';
      const records = await this.getAllRecordsBD(user?.uid || '');
      for (let n = 0; n < records.docs.length; n++) {
        const doc = await records.docs[n].data();
        if (doc['syllable'] === syllable) {
          await this.angularFirestore.firestore.collection(name).doc(records.docs[n].id).delete();
          break;
        }
      }
    });
  }

  async deleteRecord(syllable: string) {
    const records = await this.getAllRecords();
    const altRecords = [];
    for (let n = 0; n < records.length; n++) {
      if (records[n]['syllable'] !== syllable) {
        altRecords.push(records[n]);
      }
    }
    localStorage.removeItem('records');
    localStorage.setItem('records', JSON.stringify(altRecords));
  }

  async clearLocalSave() {
    localStorage.removeItem('records');
  }

  async addLocalSave() {
    this.fireAuth.authState.subscribe(async user => {
      const name = 'user/' + user?.uid + '/records';
      const records = await this.getAllRecords();
      for (let n = 0; n < records.length; n++) {
        this.angularFirestore.firestore.collection(name).add(records[n]).then();
      }
      localStorage.removeItem('records');
    });
  }

  async getTagsBD(uid: string) {
    const docs = await this.getAllRecordsBD(uid);
    const set = new Set();
    const tags = [];
    for (let n = 0; n < docs.docs.length; n++) {
      const doc = await docs.docs[n].data();
      for(let i = 0; i < doc['tag'].length; i++) {
        set.add({tag: doc['tag'][i]});
      }
    }
    for (let item of set) {
      // @ts-ignore
      tags.push(item['tag']);
    }
    return tags;
  }

  async getTags() {
    const records = await this.getAllRecords();
    const set = new Set();
    const tags = [];
    for (let n = 0; n < records.length; n++) {
      for(let i = 0; i < records[n]['tag'].length; i++) {
        set.add({tag: records[n]['tag'][i]});
      }
    }
    for (let item of set) {
      // @ts-ignore
      tags.push(item['tag']);
    }
    return tags;
  }

  async getRecord(syllable: string) {
    const records = await this.getAllRecords();
    for (let n = 0; n < records.length; n++) {
      if (records[n]['syllable'] === syllable) {
        return records[n];
      }
    }
  }

  async getRecordBD(syllable: string, uid: string) {
    const docs = await this.getAllRecordsBD(uid);
    for (let n = 0; n < docs.docs.length; n++) {
      const doc = await docs.docs[n].data();
      if (doc['syllable'] === syllable) {
        return doc;
      }
    }
    return undefined;
  }

  async getAllRecords() {
    let records;
    try {
      records = await JSON.parse(localStorage.getItem('records')||'')||[];
    } catch (error) {}
    return records?records:[];
  }

  async getAllRecordsBDArray(uid: string) {
    const name = 'user/' + uid + '/records';
    const array = [];
    const docs = await this.angularFirestore.firestore.collection(name).get();
    for (let n = 0; n < docs.docs.length; n++) {
      array.push(await docs.docs[n].data());
    }
    return array;
  }

  async getAllRecordsBD(uid: string) {
    const name = 'user/' + uid + '/records';
    return await this.angularFirestore.firestore.collection(name).orderBy('date', 'asc').get();
  }
}
