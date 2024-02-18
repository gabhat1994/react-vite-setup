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

interface Article {
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
  Thumbnail: Asset;
  Asset_Title: string;
  Button_Label: string;
  Articles: Article[];
  Video_Duration: string;
}

interface SidePanel {
  _uid: string;
  Title: string;
  component: string;
  Description: string;
  Button_Label: string;
  _editable: string;
}

export interface Content {
  _uid: string;
  component: string;
  Section_01: Section01[];
  Section_02: Section01[];
  Section_03: Section01[];
  Side_Panel: SidePanel[];
  Schedule_a_call: ScheduleACall;
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

interface ScheduleACall {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}
