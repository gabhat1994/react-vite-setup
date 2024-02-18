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

interface Section01 {
  _uid: string;
  Title: string;
  component: string;
  Description: string;
  _editable: string;
  Asset: Asset;
  Asset_Title: string;
  Button_Label: string;
  Articles: Article[];
}

interface SidePanel {
  _uid: string;
  Title: string;
  component: string;
  Description: string;
  Button_Label: string;
  _editable: string;
}

interface Attrs {
  level: number;
}

interface Mark {
  type: string;
}

interface Attrs2 {
  alt: string;
  src: string;
  title: string;
}

interface Content4 {
  text: string;
  type: string;
  marks: Mark[];
  attrs: Attrs2;
}

interface Content3 {
  type: string;
  attrs: Attrs;
  content: Content4[];
}

interface Content2 {
  type: string;
  content: Content3[];
}

interface MainImage {
  id: number;
  alt: string;
  name: string;
  focus?: unknown;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
}

export interface Content {
  _uid: string;
  Title: string;
  Content: Content2;
  Featured: boolean;
  component: string;
  Main_Image: MainImage;
  Sub_Category: string[];
  Main_Category: string;
  Short_Description: string;
  Section_01: Section01[];
  Section_02: Section01[];
  Section_03: Section01[];
  Side_Panel: SidePanel[];
  special_noum_id: string;
  admin_event_chamber_id: string;
  Noum_recommendations: string[];
  Event_meeting_link: EventMeetingLink;
  _editable: string;
}

interface EventMeetingLink {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}

interface Alternate {
  id: number;
  name: string;
  slug: string;
  published: boolean;
  full_slug: string;
  is_folder: boolean;
  parent_id: number;
}

interface Story {
  name: string;
  created_at: Date;
  published_at?: unknown;
  id: number;
  uuid: string;
  content: Content;
  slug: string;
  full_slug: string;
  sort_by_date?: unknown;
  position: number;
  tag_list: unknown[];
  is_startpage: boolean;
  parent_id: number;
  meta_data?: unknown;
  group_id: string;
  first_published_at?: unknown;
  release_id?: unknown;
  lang: string;
  path?: unknown;
  alternates: Alternate[];
  default_full_slug?: unknown;
  translated_slugs?: unknown;
}

export interface ArticleDetails {
  story: Story;
  cv: number;
  rels: unknown[];
  links: unknown[];
}
