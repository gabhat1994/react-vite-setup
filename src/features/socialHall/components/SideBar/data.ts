import { t } from 'i18next';
import {
  type SocialHallAttendee,
  type SocialGroup,
  type Knock,
  KnockType,
} from '@/apollo/generated/types';
import { type InputListTypes } from '@/components/Tabs/types';

export const sideBarTabs: InputListTypes[] = [
  {
    name: 'users',
    image: 'terms_m',
    text: t('noumena.social_hall.users'),
    labelSize: 'auto',
  },
  {
    name: 'groups',
    image: 'terms_m',
    text: t('noumena.social_hall.groups'),
    labelSize: 'auto',
  },
];

export const demoGroups: SocialGroup[] = [
  {
    _id: '62b56eccdfe3d9000d000001',
    name: '',
    channelName: 'Design Corner',
    users: [
      {
        _id: '62a244e77d2faa000ec98918',
        firstName: 'Tian',
        lastName: 'YongJin',
        middleName: null,
        title: 'YongJin',
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/62a244e77d2faa000ec98918/profile/guWR7CtaA6Dm07UYQ4WxT',
        },
      },
      {
        _id: '6284aee17de0a52570e73843',
        firstName: 'Shekhar',
        lastName: 'Sharma',
        middleName: null,
        title: 'Shekhar',
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/6284aee17de0a52570e73843/profile/zqiKP-aYM68hoxOEx9NQY',
        },
      },
    ],
  },
  {
    _id: '62b996274860fa0010000001',
    name: 'Fffffff',
    channelName: 'Web Development',
    users: [
      {
        _id: '623c66aad3235b0789645311',
        firstName: 'Susm',
        lastName: 'Hdjssbsb',
        middleName: null,
        title: 'Hellome',
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/623c66aad3235b0789645311/profile/D1enzH2sKCmgHIyRH21vj',
        },
      },
      {
        _id: '61b2ad7078623418b1bca2d9',
        firstName: 'SusmithaReddy',
        lastName: 'Gaddam',
        middleName: null,
        title:
          'Web designer,web tester,mobile developer,designer,graphic designer,YouTuber,react native developer,mobile application developer,software engineer',
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/61b2ad7078623418b1bca2d9/profile/AaxlQSB2KrSbU25B9RrjO',
        },
      },
      {
        _id: '623c5373d3235b15616327a1',
        firstName: 'Test',
        lastName: 'T',
        middleName: null,
        title: 'jjbbj',
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/623c5373d3235b15616327a1/profile/nBsWgtL3H1DOR3u0dJw0-',
        },
      },
    ],
  },
  {
    _id: '62b9f312034d51000f000002',
    name: '',
    channelName: 'Mobile Group',
    users: [
      {
        _id: '61c19f982e76941672417053',
        firstName: 'Android',
        lastName: 'Sha',
        middleName: null,
        title: 'Ravi',
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/61c19f982e76941672417053/profile/EpQ9UH_rkxQJLdrgx4noL',
        },
      },
      {
        _id: '61f00d93abc1244713113ac7',
        firstName: 'IOS',
        lastName: 'Ravi Kumar',
        middleName: null,
        title: 'Ravi Kumar',
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/61f00d93abc1244713113ac7/profile/vKenSqJyhrA5io6oT1Y-O',
        },
      },
    ],
  },
];

export const demoAttendees: SocialHallAttendee[] = [
  {
    _id: '62b561edcbb511000d4be588',
    isHost: false,
    socialHallId: '60b72ad6cd9af83bfa32eabe',
    location: [3.4, 4.5],
    entryTime: '2022-06-27T14:18:50.306Z',
    exitTime: '2022-06-27T15:18:50.316Z',
    attendeeId: {
      _id: '624af0db4059c33170f6f900',
      firstName: 'Li',
      lastName: 'Rimin',
      middleName: null,
      title: 'Test123',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
      profile: {
        profilePicture:
          'https://noumena-img.s3-accelerate.amazonaws.com/624af0db4059c33170f6f900/profile/KjTjIL4Br2sTaQGXa3EgY',
      },
      skills: [
        {
          _id: '61c180f0e617a7b91d228c48',
          name: 'Programming & Tech Other',
          icon: 'Programming & Tech Other',
        },
        {
          _id: '61c1a47fe617a72de822a49f',
          name: 'Podcast Writing',
          icon: 'Podcast Writing',
        },
        {
          _id: '61c1a47fe617a73b4022a4aa',
          name: 'Technical Writing',
          icon: 'Technical Writing',
        },
      ],
    },
  },
  {
    _id: '62b51f6834af3c94d90618bf',
    isHost: false,
    socialHallId: '60b72ad6cd9af83bfa32eabe',
    location: [3.4, 4.5],
    entryTime: '2022-06-27T12:29:45.764Z',
    exitTime: '2022-06-27T13:29:45.769Z',
    attendeeId: {
      _id: '6220c66f2b41f7600d1b5955',
      firstName: 'Jakub',
      lastName: 'Drozdek',
      middleName: null,
      title: 'Hello',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
      profile: {
        profilePicture:
          'https://noumena-img.s3-accelerate.amazonaws.com/6220c66f2b41f7600d1b5955/profile/Y32urKW1Kq0bZ6XOzaSKK',
      },
      skills: [
        {
          _id: '61c1a6a6e617a7af3222a4c8',
          name: 'Website Creation',
          icon: 'Website Creation',
        },
      ],
    },
  },
  {
    _id: '62b51f6f34af3c94d90618d5',
    isHost: false,
    socialHallId: '60b72ad6cd9af83bfa32eabe',
    location: [3.4, 4.5],
    entryTime: '2022-06-27T13:22:49.871Z',
    exitTime: '2022-06-27T14:22:49.875Z',
    attendeeId: {
      _id: '61a885f93eb5863ce23d4556',
      firstName: 'Dorian',
      lastName: 'Mazur',
      middleName: null,
      title: 'Test',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
      profile: {
        profilePicture:
          'https://noumena-img.s3-accelerate.amazonaws.com/61a885f93eb5863ce23d4556/profile/yJK3YiA6Zt8U6h515Lhkh',
      },
      skills: [
        {
          _id: '5fb25b0da1f8a4d5dc5669a8',
          name: 'Other Sales and Marketing',
          icon: 'Other Sales and Marketing',
        },
        {
          _id: '5fb25b0da1f8a4d5dc5669aa',
          name: 'Business Consulting',
          icon: 'Business Consulting',
        },
        {
          _id: '61c18499e617a7b3cf228f9b',
          name: 'Real Estate Development',
          icon: 'Real Estate Development',
        },
        {
          _id: '61c18640e617a71e5a2290fe',
          name: 'Childcare Services',
          icon: 'Childcare Services',
        },
      ],
    },
  },
  {
    _id: '62b51f5234af3c94d9061876',
    isHost: false,
    socialHallId: '60b72ad6cd9af83bfa32eabe',
    location: [3.4, 4.5],
    entryTime: '2022-06-24T08:00:08.752Z',
    exitTime: '2022-06-24T12:41:25.053Z',
    attendeeId: {
      _id: '6284ea5e4b4ec77e2eb8f95a',
      firstName: 'Arun',
      lastName: 'Sharma',
      middleName: null,
      title: 'Arun',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
      profile: {
        profilePicture:
          'https://noumena-img.s3-accelerate.amazonaws.com/6284ea5e4b4ec77e2eb8f95a/profile/cmLdOiNx2f_J7SJo9su5b',
      },
      skills: [
        {
          _id: '61c182a5e617a7178a228dc8',
          name: 'IT Consulting',
          icon: 'IT Consulting',
        },
        {
          _id: '61c182a5e617a76c8b228dca',
          name: 'IT Security',
          icon: 'IT Security',
        },
      ],
    },
  },
  {
    _id: '62b51e6d34af3c94d9061571',
    isHost: false,
    socialHallId: '60b72ad6cd9af83bfa32eabe',
    location: [3.4, 4.5],
    entryTime: '2022-06-27T13:33:54.693Z',
    exitTime: '2022-06-27T14:33:54.696Z',
    attendeeId: {
      _id: '6266301efa505c0a0d58b1a9',
      firstName: 'Lucas',
      lastName: 'Piera',
      middleName: null,
      title: 'Software Developer',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
      profile: {
        profilePicture:
          'https://noumena-img.s3-accelerate.amazonaws.com/6266301efa505c0a0d58b1a9/profile/DnghvoCyTi9Cw9nm3tao3',
      },
      skills: [
        {
          _id: '61c182a5e617a744c5228dce',
          name: 'Other IT & Engineering  Services',
          icon: 'Other IT & Engineering  Services',
        },
        {
          _id: '61c182a5e617a77956228dcc',
          name: 'SaaS',
          icon: 'SaaS',
        },
        {
          _id: '61c182a5e617a79f2c228dd6',
          name: 'Mechanical Engineer',
          icon: 'Mechanical Engineer',
        },
      ],
    },
  },
  {
    _id: '62b51f3434af3c94d9061813',
    isHost: false,
    socialHallId: '60b72ad6cd9af83bfa32eabe',
    location: [3.4, 4.5],
    entryTime: '2022-06-27T14:18:16.915Z',
    exitTime: '2022-06-27T15:18:16.919Z',
    attendeeId: {
      _id: '62556ef6ea2caa36251607e7',
      firstName: 'Auto',
      lastName: 'User',
      middleName: null,
      title: 'Professional Quality Assurance Engineer - 7185',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
      profile: {
        profilePicture:
          'https://noumena-img.s3-accelerate.amazonaws.com/62556ef6ea2caa36251607e7/profile/VUmjQIrszvr8B2HJ7EcsT',
      },
      skills: [
        {
          _id: '6083c5abf6c3a4824fee16b8',
          name: 'User Testing',
          icon: 'User Testing',
        },
      ],
    },
  },
];

export const demoKnocks: Knock[] = [
  {
    _id: '1',
    knockerUser: {
      _id: '624af0db4059c33170f6f900',
      firstName: 'Rimin',
      lastName: 'Li',
      middleName: null,
      title: 'Test123',
    },
    knockerUserId: '624af0db4059c33170f6f900',
    knockStatus: KnockType.Pending,
    knockMessage:
      'Hi! I believe we share some of the same interests and I wanted to meet you.',
  },
];
