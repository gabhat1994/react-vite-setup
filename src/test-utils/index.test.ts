import { MockFile } from '.';

describe('Mock file for file upload testing', () => {
  it('should be defined', () => {
    const file = MockFile();
    expect(file).not.toBeNull();
  });

  it('should have default values', () => {
    const file = MockFile();
    expect(file.name).toBe('mock.txt');
    expect(file.size).toBe(1024);
  });

  it('should have specific values', () => {
    const size = 1024 * 1024 * 2;
    const file = MockFile('pic.jpg', size, 'image/jpeg');
    expect(file.name).toBe('pic.jpg');
    expect(file.size).toBe(size);
    expect(file.type).toBe('image/jpeg');
  });
});
