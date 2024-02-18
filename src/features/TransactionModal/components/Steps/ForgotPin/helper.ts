import { type QuestionOutput } from '@/apollo/generated/types';
import { type TSecurityQuestion } from './type';

export const prepareData = (
  questions: QuestionOutput[],
  answers: { answer: string }[],
) => {
  const res: (TSecurityQuestion | null | undefined)[] = [];
  if (questions.length === answers.length) {
    for (let i = 0; i < questions.length; i += 1) {
      const obj = { id: questions[i].id, answer: answers[i].answer };
      res.push(obj);
    }
  }
  return res;
};
