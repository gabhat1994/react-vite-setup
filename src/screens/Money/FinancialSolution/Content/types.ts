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
  Main_Button_Label: string;
  Main_Button_Link: string;
  _editable: string;
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
