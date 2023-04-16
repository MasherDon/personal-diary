import { OutputData } from "@editorjs/editorjs";
import { Tag } from "./tag";

export interface Record {
  title: string;
  tag: Tag[];
  syllable: string;
  text: OutputData[];
  date: any;
}
