import { type Knock, KnockType } from '@/apollo/generated/types';

const demoAttendees = [
  {
    _id: '624af0db4059c33170f6f900',
    firstName: 'Rimin',
    lastName: 'Li',
    middleName: null,
    title: 'Test123',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/624af0db4059c33170f6f900/profile/KjTjIL4Br2sTaQGXa3EgY',
    },
  },
  {
    _id: '624af0db4059c33170f6f900',
    firstName: 'Yongjin',
    lastName: 'Tian',
    middleName: null,
    title: 'Test123',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6284aee17de0a52570e73843/profile/zqiKP-aYM68hoxOEx9NQY',
    },
  },
  {
    _id: '624af0db4059c33170f6f900',
    firstName: 'Deshuai',
    lastName: 'Hong',
    middleName: null,
    title: 'Test123',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero auctor leo vulputate lobortis. Suspendisse ac est vel sapien dignissim ultrices. Vestibulum hendrerit magna quis laoreet feugiat. Sed non enim magna. Suspendisse non efficitur turpis, ut iaculis erat. Morbi non convallis lectus. Vestibulum ipsum lectus, mattis ut aliquet a, accumsan sed odio. Cras et sodales eros. Quisque accumsan eros eu faucibus mattis. Integer ut commodo lorem. Pellentesque massa felis, fermentum quis lacinia vitae, pulvinar ac lacus.',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/623c66aad3235b0789645311/profile/D1enzH2sKCmgHIyRH21vj',
    },
  },
];

export const demoNotifications: Knock[] = [
  {
    _id: '1',
    knockerUser: {
      _id: '624af0db4059c33170f6f900',
      firstName: 'Rimin',
      lastName: 'Li',
      middleName: null,
      title: 'Test123',
    },
    knockerUserId: '10',
    knockStatus: KnockType.Pending,
    knockMessage:
      'Hi! I believe we share some of the same interests and I wanted to meet you.',
  },
  {
    _id: '2',
    knockerUser: {
      _id: '624af0db4059c33170f6f900',
      firstName: 'Rimin',
      lastName: 'Li',
      middleName: null,
      title: 'Test123',
    },
    knockerUserId: '20',
    knockStatus: KnockType.Timeout,
    knockMessage: 'Sorry, busy now but I will come and find you later.',
  },
  {
    _id: '3',
    knockerUser: {
      _id: '624af0db4059c33170f6f900',
      firstName: 'Rimin',
      lastName: 'Li',
      middleName: null,
      title: 'Test123',
    },
    knockerUserId: '30',
    knockStatus: KnockType.Declined,
    receiverUser: demoAttendees[1],
  },
];

export const singleNotification: Knock[] = [
  {
    _id: '4',
    knockerUserId: '11',
    knockStatus: KnockType.Pending,
    receiverUser: demoAttendees[1],
  },
];

export const singleNotificationWithMessage: Knock[] = [
  {
    _id: '5',
    knockerUserId: '50',
    knockStatus: KnockType.Accepted,
    receiverUser: demoAttendees[1],
    knockMessage:
      'Hi! I believe we share some of the same interests and I wanted to meet you.',
  },
];
