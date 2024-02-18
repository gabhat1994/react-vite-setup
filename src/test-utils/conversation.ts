import { Conversation, Message, RestPaginator } from '@twilio/conversations';

// We don't care about these two, as we override the default implementation of Conversation class.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeServices = {} as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeDescriptor = {} as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeLinks = {} as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fakeConfiguration = {} as any;

type IterationDirection = 'backwards' | 'forward';

export class ConversationStub extends Conversation {
  sid: string;

  totalMessagesCount: number;

  messages: Message[];

  nextMessageId: number;

  constructor(sid: string, totalMessagesCount: number) {
    super(fakeDescriptor, sid, fakeLinks, fakeConfiguration, fakeServices);
    this.sid = sid;
    this.totalMessagesCount = totalMessagesCount;
    this.messages = this._generateMessages(totalMessagesCount);
    this.nextMessageId = totalMessagesCount;
  }

  async sendMessage(message: string): Promise<number> {
    // eslint-disable-next-line no-plusplus
    const index = this.nextMessageId++;
    this.emit('messageAdded', this.buildMessage(message, index));
    return index;
  }

  async setAllMessagesRead(): Promise<number> {
    return this.totalMessagesCount;
  }

  async getMessages(
    pageSize: number = 30,
    anchor: number = -1,
    direction: IterationDirection = 'backwards',
  ) {
    const fromIndex = anchor === -1 ? this.totalMessagesCount : anchor;
    return this._createPageIterator(pageSize, fromIndex, direction);
  }

  // Recursive iterator that returns items until the total number of items is reached.
  private _createPageIterator = (
    pageSize: number,
    fromIndex: number,
    direction: IterationDirection,
  ) => {
    let toIndex: number;
    let items: Message[];
    let hasPrevPage: boolean;
    let hasNextPage: boolean;

    if (direction === 'backwards') {
      toIndex = Math.max(fromIndex - pageSize, 0);
      items = this.messages.slice(toIndex, fromIndex);
      hasPrevPage = toIndex > 0;
      hasNextPage = true;
    } else {
      toIndex = Math.min(fromIndex + pageSize, this.totalMessagesCount - 1);
      items = this.messages.slice(fromIndex, toIndex);
      hasPrevPage = true;
      hasNextPage = toIndex < this.totalMessagesCount;
    }

    const source = (newPageParams: {
      lastIndex: number;
      direction: IterationDirection;
    }) =>
      this._createPageIterator(
        pageSize,
        newPageParams.lastIndex,
        newPageParams.direction,
      );

    return new RestPaginator<Message>(
      items,
      source,
      hasPrevPage && { lastIndex: toIndex, direction: 'backwards' },
      hasNextPage && { lastIndex: toIndex, direction: 'forward' },
    );
  };

  public buildMessage(text: string, index: number) {
    return new Message(
      index,
      {
        sid: `message-${index + 1}`,
        type: 'text',
        author: 'fake-author',
        dateUpdated: new Date().toISOString(),
        text,
        subject: null,
      },
      this,
      fakeLinks,
      fakeConfiguration,
      fakeServices,
    );
  }

  private _generateMessages = (itemsCount: number) =>
    Array.from({ length: itemsCount }).map((_, index) =>
      this.buildMessage(`fake-message-${index + 1}`, index),
    );
}
