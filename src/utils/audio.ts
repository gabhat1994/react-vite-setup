export function playOnce(file: string) {
  const audio = new Audio(file);
  audio.loop = false;
  audio.play();
}
