import { QuizQuestion } from './types';

export interface PronounRow {
  id: string;
  person: string;
  subjective: string;      // 주격
  subjectiveMeaning: string;
  possessive: string;      // 소유격
  possessiveMeaning: string;
  objective: string;       // 목적격
  objectiveMeaning: string;
  possessivePronoun: string; // 소유대명사
  possessivePronounMeaning: string;
  reflexive: string;       // 재귀대명사
  reflexiveMeaning: string;
}

export const pronounData: PronounRow[] = [
  {
    id: "p1",
    person: "1인칭 단수 (나)",
    subjective: "I",
    subjectiveMeaning: "나는/내가",
    possessive: "my",
    possessiveMeaning: "나의",
    objective: "me",
    objectiveMeaning: "나를/나에게",
    possessivePronoun: "mine",
    possessivePronounMeaning: "나의 것",
    reflexive: "myself",
    reflexiveMeaning: "나 자신"
  },
  {
    id: "p2",
    person: "2인칭 단수 (너)",
    subjective: "you",
    subjectiveMeaning: "너는/네가",
    possessive: "your",
    possessiveMeaning: "너의",
    objective: "you",
    objectiveMeaning: "너를/너에게",
    possessivePronoun: "yours",
    possessivePronounMeaning: "너의 것",
    reflexive: "yourself",
    reflexiveMeaning: "너 자신"
  },
  {
    id: "p3",
    person: "3인칭 단수 남성 (그)",
    subjective: "he",
    subjectiveMeaning: "그는/그가",
    possessive: "his",
    possessiveMeaning: "그의",
    objective: "him",
    objectiveMeaning: "그를/그에게",
    possessivePronoun: "his",
    possessivePronounMeaning: "그의 것",
    reflexive: "himself",
    reflexiveMeaning: "그 자신"
  },
  {
    id: "p4",
    person: "3인칭 단수 여성 (그녀)",
    subjective: "she",
    subjectiveMeaning: "그녀는/그녀가",
    possessive: "her",
    possessiveMeaning: "그녀의",
    objective: "her",
    objectiveMeaning: "그녀를/그녀에게",
    possessivePronoun: "hers",
    possessivePronounMeaning: "그녀의 것",
    reflexive: "herself",
    reflexiveMeaning: "그녀 자신"
  },
  {
    id: "p5",
    person: "3인칭 단수 사물 (그것)",
    subjective: "it",
    subjectiveMeaning: "그것은/그것이",
    possessive: "its",
    possessiveMeaning: "그것의",
    objective: "it",
    objectiveMeaning: "그것을/그것에게",
    possessivePronoun: "-",
    possessivePronounMeaning: "(없음)",
    reflexive: "itself",
    reflexiveMeaning: "그것 자신"
  },
  {
    id: "p6",
    person: "1인칭 복수 (우리)",
    subjective: "we",
    subjectiveMeaning: "우리는/우리가",
    possessive: "our",
    possessiveMeaning: "우리의",
    objective: "us",
    objectiveMeaning: "우리를/우리에게",
    possessivePronoun: "ours",
    possessivePronounMeaning: "우리의 것",
    reflexive: "ourselves",
    reflexiveMeaning: "우리 자신"
  },
  {
    id: "p7",
    person: "2인칭 복수 (너희들)",
    subjective: "you",
    subjectiveMeaning: "너희들은",
    possessive: "your",
    possessiveMeaning: "너희들의",
    objective: "you",
    objectiveMeaning: "너희들을",
    possessivePronoun: "yours",
    possessivePronounMeaning: "너희들의 것",
    reflexive: "yourselves",
    reflexiveMeaning: "너희들 자신"
  },
  {
    id: "p8",
    person: "3인칭 복수 (그들/그것들)",
    subjective: "they",
    subjectiveMeaning: "그들은/그들이",
    possessive: "their",
    possessiveMeaning: "그들의",
    objective: "them",
    objectiveMeaning: "그들을/그들에게",
    possessivePronoun: "theirs",
    possessivePronounMeaning: "그들의 것",
    reflexive: "themselves",
    reflexiveMeaning: "그들 자신"
  }
];

export const pronounQuiz: QuizQuestion[] = [
  {
    id: "pq1",
    type: "multiple-choice",
    question: "나의 책은 책상 위에 있다. (____ book is on the desk.)\n빈칸에 알맞은 단어는?",
    options: ["I", "my", "me", "mine"],
    answer: 1
  },
  {
    id: "pq2",
    type: "multiple-choice",
    question: "이 가방은 그녀의 것이다. (This bag is ____.)\n빈칸에 알맞은 단어는?",
    options: ["she", "her", "hers", "herself"],
    answer: 2
  },
  {
    id: "pq3",
    type: "multiple-choice",
    question: "나는 그를 좋아한다. (I like ____.)\n빈칸에 알맞은 단어는?",
    options: ["he", "his", "him", "himself"],
    answer: 2
  },
  {
    id: "pq4",
    type: "multiple-choice",
    question: "그녀는 거울 속의 자신을 보았다. (She looked at ____ in the mirror.)\n빈칸에 알맞은 단어는?",
    options: ["her", "hers", "herself", "she"],
    answer: 2
  },
  {
    id: "pq5",
    type: "multiple-choice",
    question: "우리는 학교에 걸어간다. (____ walk to school.)\n빈칸에 알맞은 단어는?",
    options: ["we", "our", "us", "ours"],
    answer: 0
  },
  {
    id: "pq6",
    type: "short-answer",
    question: "우리는 우리 자신을 사랑해야 한다. (We should love ________.)\n빈칸에 들어갈 알맞은 단어를 영어로 쓰세요.",
    answer: "ourselves"
  },
  {
    id: "pq7",
    type: "short-answer",
    question: "그들은 그들의 방을 청소했다. (They cleaned ________ room.)\n빈칸에 들어갈 알맞은 단어를 영어로 쓰세요.",
    answer: "their"
  },
  {
    id: "pq8",
    type: "short-answer",
    question: "이 책들은 그들의 것이다. (These books are ________.)\n빈칸에 들어갈 알맞은 단어를 영어로 쓰세요.",
    answer: "theirs"
  },
  {
    id: "pq9",
    type: "short-answer",
    question: "하늘은 아름답고, 그것의 색은 파랗다.\n(The sky is beautiful, and ________ color is blue.)\n빈칸에 들어갈 알맞은 단어를 영어로 쓰세요.",
    answer: "its"
  },
  {
    id: "pq10",
    type: "short-answer",
    question: "스스로 해라! (Do it by ________!)\n빈칸에 들어갈 알맞은 단어를 영어로 쓰세요.",
    answer: "yourself"
  },
  {
    id: "pq11",
    type: "short-answer",
    question: "그는 혼자서 숙제를 끝마쳤다. (He finished the homework by ________.)\n빈칸에 들어갈 알맞은 단어를 영어로 쓰세요.",
    answer: "himself"
  },
  {
    id: "pq12",
    type: "multiple-choice",
    question: "너희들은 서로를 도와야 한다.\n(You should help each other.)\n여기서 주어인 'You'의 인칭과 수 및 격은 무엇인가요?",
    options: [
      "1인칭 복수 주격",
      "2인칭 단수 소유격",
      "2인칭 단수 또는 복수 주격",
      "3인칭 복수 목적격"
    ],
    answer: 2
  }
];
