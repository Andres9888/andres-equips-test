export interface Drawer {
  visible: boolean;
  currentBank: Datum | null;
}
export interface ListingsData {
  meta: Meta;
  data: Datum[];
  totals: Totals;
}

export interface Datum {
  data: Data;
  score: number;
  highlight: Highlight;
}

export interface Data {
  ZIP: string;
  ACTIVE: number;
  ADDRESS: string;
  WEBADDR: string;
  STNAME: string;
  ASSET: number;
  NETINC: number;
  ESTYMD: string;
  NAME: string;
  UNINUM: string;
  ID: string;
  OFFICES?: number;
}

export interface Highlight {
  'PRIORNAME1.raw'?: string[];
  'NAME.raw': string[];
  'PRIORNAME2.raw'?: string[];
  'PRIORNAME3.raw'?: string[];
}

export interface Meta {
  total: number;
  parameters: Parameters;
  index: Index;
}

export interface Index {
  name: string;
  createTimestamp: Date;
}

export interface Parameters {
  filters: string;
  fields: string;
  limit: string;
  offset: string;
}

export interface Totals {
  count: number;
}

export interface Note {
  ID: string;
  note: string;
}
