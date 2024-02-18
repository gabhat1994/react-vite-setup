export interface IInvitesRequest {
  name: string;
  profileImage: string;
  date: string;
}

export interface Content {
  _uid: string;
  Image: string;
  Header: string;
  Subtitle: string;
  component: string;
  _editable: string;
}

interface Story {
  name: string;
  created_at: Date;
  published_at: Date;
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
  first_published_at: Date;
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