export interface IrregularVerb {
  id: number;
  base: string;
  past: string;
  pastParticiple: string;
  meaning: string;
}

export interface VerbCategory {
  title: string;
  type: 'A-B-C' | 'A-B-A' | 'A-B-B' | 'A-A-A';
  verbs: IrregularVerb[];
}

export const irregularVerbCategories: VerbCategory[] = [
  {
    title: "① A-B-C 형태 (완전불규칙)",
    type: "A-B-C",
    verbs: [
      { id: 1, base: "begin", past: "began", pastParticiple: "begun", meaning: "시작하다" },
      { id: 2, base: "break", past: "broke", pastParticiple: "broken", meaning: "부수다" },
      { id: 3, base: "choose", past: "chose", pastParticiple: "chosen", meaning: "고르다" },
      { id: 4, base: "do", past: "did", pastParticiple: "done", meaning: "하다" },
      { id: 5, base: "drink", past: "drank", pastParticiple: "drunk", meaning: "마시다" },
      { id: 6, base: "drive", past: "drove", pastParticiple: "driven", meaning: "운전하다" },
      { id: 7, base: "eat", past: "ate", pastParticiple: "eaten", meaning: "먹다" },
      { id: 8, base: "fly", past: "flew", pastParticiple: "flown", meaning: "날다" },
      { id: 9, base: "forget", past: "forgot", pastParticiple: "forgotten", meaning: "잊다" },
      { id: 10, base: "give", past: "gave", pastParticiple: "given", meaning: "주다" },
      { id: 11, base: "go", past: "went", pastParticiple: "gone", meaning: "가다" },
      { id: 12, base: "grow", past: "grew", pastParticiple: "grown", meaning: "자라다" },
      { id: 13, base: "hide", past: "hid", pastParticiple: "hidden", meaning: "숨기다" },
      { id: 14, base: "know", past: "knew", pastParticiple: "known", meaning: "알다" },
      { id: 15, base: "ride", past: "rode", pastParticiple: "ridden", meaning: "타다" },
      { id: 16, base: "see", past: "saw", pastParticiple: "seen", meaning: "보다" },
      { id: 17, base: "show", past: "showed", pastParticiple: "shown", meaning: "보여주다" },
      { id: 18, base: "sing", past: "sang", pastParticiple: "sung", meaning: "노래하다" },
      { id: 19, base: "speak", past: "spoke", pastParticiple: "spoken", meaning: "말하다" },
      { id: 20, base: "steal", past: "stole", pastParticiple: "stolen", meaning: "훔치다" },
      { id: 21, base: "swim", past: "swam", pastParticiple: "swum", meaning: "수영하다" },
      { id: 22, base: "take", past: "took", pastParticiple: "taken", meaning: "가지고 가다" },
      { id: 23, base: "throw", past: "threw", pastParticiple: "thrown", meaning: "던지다" },
      { id: 24, base: "wear", past: "wore", pastParticiple: "worn", meaning: "입다" },
      { id: 25, base: "write", past: "wrote", pastParticiple: "written", meaning: "쓰다" }
    ]
  },
  {
    title: "② A-B-A 형태 (원형 = 과거분사)",
    type: "A-B-A",
    verbs: [
      { id: 26, base: "become", past: "became", pastParticiple: "become", meaning: "되다" },
      { id: 27, base: "come", past: "came", pastParticiple: "come", meaning: "오다" },
      { id: 28, base: "run", past: "ran", pastParticiple: "run", meaning: "달리다" }
    ]
  },
  {
    title: "③ A-B-B 형태 (과거형 = 과거분사형)",
    type: "A-B-B",
    verbs: [
      { id: 29, base: "bring", past: "brought", pastParticiple: "brought", meaning: "가져오다" },
      { id: 30, base: "build", past: "built", pastParticiple: "built", meaning: "짓다" },
      { id: 31, base: "buy", past: "bought", pastParticiple: "bought", meaning: "사다" },
      { id: 32, base: "catch", past: "caught", pastParticiple: "caught", meaning: "잡다" },
      { id: 33, base: "feed", past: "fed", pastParticiple: "fed", meaning: "먹이다" },
      { id: 34, base: "feel", past: "felt", pastParticiple: "felt", meaning: "느끼다" },
      { id: 35, base: "fight", past: "fought", pastParticiple: "fought", meaning: "싸우다" },
      { id: 36, base: "have", past: "had", pastParticiple: "had", meaning: "가지다" },
      { id: 37, base: "hear", past: "heard", pastParticiple: "heard", meaning: "듣다" },
      { id: 38, base: "hold", past: "held", pastParticiple: "held", meaning: "잡다" },
      { id: 39, base: "keep", past: "kept", pastParticiple: "kept", meaning: "지키다" },
      { id: 40, base: "leave", past: "left", pastParticiple: "left", meaning: "떠나다" },
      { id: 41, base: "lose", past: "lost", pastParticiple: "lost", meaning: "잃다" },
      { id: 42, base: "make", past: "made", pastParticiple: "made", meaning: "만들다" },
      { id: 43, base: "meet", past: "met", pastParticiple: "met", meaning: "만나다" },
      { id: 44, base: "pay", past: "paid", pastParticiple: "paid", meaning: "지불하다" },
      { id: 45, base: "say", past: "said", pastParticiple: "said", meaning: "말하다" },
      { id: 46, base: "sell", past: "sold", pastParticiple: "sold", meaning: "팔다" },
      { id: 47, base: "sit", past: "sat", pastParticiple: "sat", meaning: "앉다" },
      { id: 48, base: "sleep", past: "slept", pastParticiple: "slept", meaning: "잠자다" },
      { id: 49, base: "spend", past: "spent", pastParticiple: "spent", meaning: "소비하다" },
      { id: 50, base: "stand", past: "stood", pastParticiple: "stood", meaning: "서다" },
      { id: 51, base: "teach", past: "taught", pastParticiple: "taught", meaning: "가르치다" },
      { id: 52, base: "tell", past: "told", pastParticiple: "told", meaning: "말하다" },
      { id: 53, base: "think", past: "thought", pastParticiple: "thought", meaning: "생각하다" },
      { id: 54, base: "win", past: "won", pastParticiple: "won", meaning: "이기다" }
    ]
  },
  {
    title: "④ A-A-A 형태 (3단계 동일)",
    type: "A-A-A",
    verbs: [
      { id: 55, base: "cut", past: "cut", pastParticiple: "cut", meaning: "자르다" },
      { id: 56, base: "hit", past: "hit", pastParticiple: "hit", meaning: "치다" },
      { id: 57, base: "hurt", past: "hurt", pastParticiple: "hurt", meaning: "다치게 하다" },
      { id: 58, base: "read", past: "read", pastParticiple: "read", meaning: "읽다" },
      { id: 59, base: "let", past: "let", pastParticiple: "let", meaning: "시키다" },
      { id: 60, base: "put", past: "put", pastParticiple: "put", meaning: "놓다" }
    ]
  }
];
