class Worker {
  url: string;
  onmessage: (msg: string) => void;

  constructor(stringUrl: string) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg: string) {
    this.onmessage(msg);
  }
}

export default Worker;
