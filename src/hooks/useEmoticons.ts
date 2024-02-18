export const useEmoticons = (text: string) => {
  const result = text
    .replace(/,:\)/gi, '\u{1F605}')
    .replace(/,:\(/gi, '\u{1F613}')
    .replace(/:\)/gi, '\u{1F642}')
    .replace(/:\|/gi, '\u{1F610}')
    .replace(/;\(/gi, '\u{1F62D}')
    .replace(/:,\(|:'\(/gi, '\u{1F622}')
    .replace(/>:\(/gi, '\u{1F620}')
    .replace(/:P/g, '\u{1F61B}')
    .replace(/:\$/gi, '\u{1F612}')
    .replace(/:@/gi, '\u{1F621}')
    .replace(/<3/gi, '❤️') // getting unexpeccted result with unicode
    .replace(/<\\3|<\/3/gi, '\u{1F494}')
    .replace(/;\)/gi, '\u{1F609}')
    .replace(/:,\)|:'\)/gi, '\u{1F602}')
    .replace(/:O/gi, '\u{1F62E}')
    .replace(/:D/gi, '\u{1F604}')
    .replace(/:\(/gi, '\u{1F626}')
    .replace(/B-\)/gi, '\u{1F60E}')
    .replace(/\(Y\)|\+1/gi, '\u{1F44D}')
    .replace(/-1/gi, '\u{1F44E}')
    .replace(/\(N\)|-1/gi, '\u{1F44E}');
  return result;
};
