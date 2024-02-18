import type React from 'react';

export type LayoutType =
  | 'Chambers'
  | 'Discovery'
  | 'MyAccount'
  | 'Home'
  | 'Community'
  | 'Articles'
  | 'Contracts'
  | 'Invoices'
  | 'Contacts'
  | 'Campaigns';

export type LayoutProps = {
  rightContent?: React.ReactNode;
  type?: LayoutType;
  children: React.ReactNode;
  onGoBack?(): void;
};

export interface BannerContent {
  description: string | undefined;
  buttonText: string | undefined;
  buttonLink: string | undefined;
}

interface Content {
  _uid: string;
  component: string;
  ButtonLink: string;
  ButtonText: string;
  Description: string;
  _editable: string;
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
