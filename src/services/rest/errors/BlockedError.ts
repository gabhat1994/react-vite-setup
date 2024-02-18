class BlockedError extends Error {
  constructor() {
    super('You are in a blocked country');
    this.name = 'BlockedError';
  }
}

export default BlockedError;
