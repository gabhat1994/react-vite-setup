const fakeContext = {
  fillRect: vi.fn(),
};

export class HTMLCanvasElementStub {
  context = fakeContext;

  getContext() {
    return this.context;
  }
}
