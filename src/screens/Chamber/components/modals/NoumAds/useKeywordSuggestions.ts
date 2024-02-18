import { toString } from 'nlcst-to-string';
import { retext } from 'retext';
import retextPos from 'retext-pos';
import retextKeywords from 'retext-keywords';
import { useCallback } from 'react';

export function useKeywordSuggestions() {
  const extract = useCallback(async (text: string) => {
    const { data } = await retext()
      .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
      .use(retextKeywords)
      .process(text);

    const suggestions = {
      keywords: (data?.keywords || []).map((k) => toString(k.matches[0].node)),
      phrases: (data?.keyphrases || []).map((phrase) =>
        phrase.matches[0].nodes.map((d) => toString(d)).join(''),
      ),
    };

    return suggestions;
  }, []);

  return extract;
}
