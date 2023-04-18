import { Tag } from "./tag";

export interface Record {
  title: string;
  tag: Tag[];
  syllable: string;
  text: any[];
  date: any;
}
