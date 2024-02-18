interface Link {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}

interface Article {
  Link: Link;
  _uid: string;
  component: string;
  _editable: string;
}

interface MoneyPageHeaderArticle {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}

interface ArticleSubcontent {
  type: string;
  content: SubSubcontent[];
}

interface SubSubcontent {
  content: SubSubSubcontent[];
  type: string;
}

interface SubSubSubcontent {
  text: string;
  type: string;
}

export interface FinancialSolution {
  Article: MoneyPageHeaderArticle;
  _uid: string;
  component: string;
}

export interface Section01 {
  _uid: string;
  Title: string;
  component: string;
  Description: string;
  Subtitle: string;
  Financial_Solutions: FinancialSolution[];
}
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
interface Section02 {
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
}

export interface Content {
  _uid: string;
  component: string;
  Money_Page_Header: Section01[];
  Money_Page_Layout: Section02[];
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
  alternates: unknown[];
  default_full_slug?: unknown;
  translated_slugs?: unknown;
}

export interface RootObject {
  story: Story;
  cv: number;
  rels: unknown[];
  links: unknown[];
}

export interface ArticleContent {
  _uid: string;
  Title: string;
  Content: ArticleSubcontent;
  Featured: boolean;
  component: string;
  Main_Image: MainImage;
  Sub_Category: [];
  Main_Category: string;
  Short_Description: string;
  Main_Button_Label?: string;
  Main_Button_Link?: string;
}

interface MainImage {
  id: number;
  alt: null;
  name: string;
  focus: null;
  title: null;
  filename: string;
}

interface ArticleStory {
  name: string;
  created_at: Date;
  published_at?: unknown;
  id: number;
  uuid: string;
  content: ArticleContent;
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
  alternates: unknown[];
  default_full_slug?: unknown;
  translated_slugs?: unknown;
}

export interface ArticleRootObject {
  story: ArticleStory;
  cv: number;
  rels: unknown[];
  links: unknown[];
}
