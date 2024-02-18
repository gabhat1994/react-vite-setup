import {
  ContractStatus,
  FeesCategoryTypes,
  NoumContactStatus,
  SowStatus,
} from '@/apollo/generated/types';

export const data = {
  _id: '6414680debb250000d1c23b0',
  contractNumber: 14,
  title: 'Contract with Activity Log 2',
  status: ContractStatus.Signed,
  linkedNoum: {
    _id: '62c80e7cb731d5000d0f250e',
    name: "Jakub Drozdek's Social Noum",
    profileImage:
      'https://noumena-img.s3-accelerate.amazonaws.com/Simulator Screen Shot - iPhone 13 - 2022-06-08 at 09,56,29.iNUFcRg5.png',
  },
  buyer: {
    _id: '63e9e3c6944620000ecc66d0',
    displayName: 'Mikolajj Wargowskiii',
    userId: {
      _id: '62c536adb13baa000e684b11',
      profile: {
        _id: '62c536adb13baa000e684b12',
        profilePictureThumbnail:
          'https://noumena-img.s3-accelerate.amazonaws.com/62c536adb13baa000e684b11/profile/62c536adb13baa000e684b11-1667984600553-thumbnail.png',
      },
      firstName: 'Mikolajj',
      lastName: 'Wargowskiii',
      userStatus: 'ACTIVE',
      email: 'mi********@noumena.global',
    },
    title: 'Developer',
    companyName: 'Mikołaj Inc.',
    street: 'NY',
    city: 'NY',
    country: 'us',
    zipCode: '10001',
    state: 'NY',
    apartmentNo: '123',
    createdAt: '2023-02-13T07:16:22.670Z',
    isConnectedWithNoum: false,
    status: NoumContactStatus.Active,
    ownerId: {
      _id: '6220c66f2b41f7600d1b5955',
    },
  },
  seller: {
    _id: '64065b57b0d57f8ba258a628',
    displayName: 'Jakub Drozdek',
    userId: {
      _id: '6220c66f2b41f7600d1b5955',
      profile: {
        _id: '6220c66f2b41f75c7b1b5956',
        profilePictureThumbnail:
          'https://noumena-img.s3-accelerate.amazonaws.com/6220c66f2b41f7600d1b5955/profile/6220c66f2b41f7600d1b5955-1655455202246-thumbnail.png',
      },
      firstName: 'Jakub',
      lastName: 'Drozdek',
      userStatus: 'ACTIVE',
      email: 'ja********@noumena.global',
    },
    title: 'test',
    companyName: '',
    street: 'test',
    city: 'test',
    country: 'us',
    zipCode: '123123',
    state: 'test',
    apartmentNo: 'test',
    createdAt: '2023-03-06T21:29:59.007Z',
    isConnectedWithNoum: false,
    status: NoumContactStatus.Active,
    ownerId: {
      _id: '6220c66f2b41f7600d1b5955',
    },
  },
  createdBy: {
    _id: '6220c66f2b41f7600d1b5955',
  },
  templateName: null,
  effectiveDate: '2023-03-17T13:15:49.820Z',
  terminationDate: null,
  terminationNoticeInDays: 0,
  legalJurisdiction: {
    country: 'us-ny',
    state: null,
    region: null,
  },
  arbitrationJurisdiction: {
    country: 'us-ny',
    state: null,
    region: null,
  },
  logo: null,
};

export const SowData = {
  _id: '6426a4dbfe5603000de7c8aa',
  SOWNumber: 18,
  status: SowStatus.Signed,
  title: 'Statement of Work',
  scopeOfWork: 'scope of work',
  effectiveDate: null,
  deliverables: [
    {
      title: 'deli 1',
      description: '',
      dueDate: null,
    },
  ],
  milestones: [
    {
      title: 'mile 1',
      description: '',
      dueDate: '1680275969211',
    },
  ],
  commission: [
    {
      description: 'bonus 1',
      amount: 200,
    },
    {
      description: 'bonus 2',
      amount: 50,
    },
  ],
  expenseReimbursement: [
    {
      description: 'expense 1',
      amount: 100,
    },
    {
      description: 'expense 2',
      amount: 10,
    },
  ],
  fees: {
    type: FeesCategoryTypes.Installments,
    feesData: [
      {
        description: null,
        amount: 200,
        dueDate: '1680275969211',
      },
      {
        description: null,
        amount: 300,
        dueDate: '1682632800000',
      },
    ],
  },
  linkedNoum: {
    _id: '62c80e7cb731d5000d0f250e',
    name: "Jakub Drozdek's Social Noum",
    profileImage:
      'https://noumena-img.s3-accelerate.amazonaws.com/Simulator Screen Shot - iPhone 13 - 2022-06-08 at 09,56,29.iNUFcRg5.png',
  },
  linkedContract: {
    _id: '64269f81aa8761000db7b890',
    status: ContractStatus.Draft,
    title: 'Service Agreement 31 Mar',
    effectiveDate: '2023-03-31T08:53:26.781Z',
    buyer: {
      _id: '6426f7c2b1bc4e000dcf073c',
      displayName: 'Michael Jordan',
      title: 'FIFA Coach',
      userId: {
        _id: '619f5f21433523318c243250',
        profile: {
          _id: '619f5f2143352374bd243251',
          profilePictureThumbnail:
            'https://noumena-img.s3-accelerate.amazonaws.com/619f5f21433523318c243250/profile/619f5f21433523318c243250-1659232050478-thumbnail.png',
        },
      },
    },
    seller: {
      _id: '64065b57b0d57f8ba258a628',
      displayName: 'Jakub Drozdek',
      title: 'Owner Title',
      userId: {
        _id: '6220c66f2b41f7600d1b5955',
        profile: {
          _id: '6220c66f2b41f75c7b1b5956',
          profilePictureThumbnail:
            'https://noumena-img.s3-accelerate.amazonaws.com/6220c66f2b41f7600d1b5955/profile/6220c66f2b41f7600d1b5955-1655455202246-thumbnail.png',
        },
      },
    },
    contractNumber: 18,
  },
  createdBy: {
    _id: '6220c66f2b41f7600d1b5955',
  },
  logo: null,
  timeline: [
    {
      timestamp: '2023-03-31T09:16:11.445Z',
      userId: '6220c66f2b41f7600d1b5955',
      fromStatus: null,
      toStatus: 'DRAFT',
    },
    {
      timestamp: '2023-03-31T15:20:50.523Z',
      userId: '6220c66f2b41f7600d1b5955',
      fromStatus: 'DRAFT',
      toStatus: 'ISSUED',
    },
    {
      timestamp: '2023-03-31T15:21:06.991Z',
      userId: '619f5f21433523318c243250',
      fromStatus: 'ISSUED',
      toStatus: 'DRAFT',
    },
    {
      timestamp: '2023-03-31T15:21:23.846Z',
      userId: '6220c66f2b41f7600d1b5955',
      fromStatus: 'DRAFT',
      toStatus: 'ISSUED',
    },
    {
      timestamp: '2023-03-31T15:22:28.351Z',
      userId: '619f5f21433523318c243250',
      fromStatus: 'ISSUED',
      toStatus: 'SIGNED',
    },
  ],
};
