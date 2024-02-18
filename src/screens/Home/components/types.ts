interface Asset {
  id: number;
  alt?: unknown;
  name: string;
  focus?: unknown;
  title?: unknown;
  filename: string;
  copyright?: unknown;
  fieldtype: string;
}

interface Link {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}

export interface Article {
  Link: Link;
  _uid: string;
  component: string;
  _editable: string;
}

export interface Section01 {
  _uid: string;
  Title: string;
  component: string;
  Description: string;
  _editable: string;
  Asset: Asset;
  Thumbnail: Asset;
  Asset_Title: string;
  Button_Label: string;
  Articles: Article[];
  Video_Duration: string;
}

export interface SidePanel {
  _uid: string;
  Title: string;
  component: string;
  Description: string;
  Button_Label: string;
  _editable: string;
}

export interface ScheduleACall {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}
