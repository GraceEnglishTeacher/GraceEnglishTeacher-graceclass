import { WorksheetData } from './types';

export const worksheetData: WorksheetData = {
  title: "Grace's English Class",
  unit: "Lesson 3. What a Great Idea!",
  mainText: {
    english: "G: What will the weather be like tomorrow?\nB: It's going to rain a lot. \nG: Are you sure? It's quite sunny now.\nB: Yes. Check the weather forecast here. It says it's going to rain on Monday.\n\nG: Look at this program, Liam. This Saturday is Science Day, and there are lots of interesting activities.\nB: You mean April 21st?\nG: Yes. All the activities look fun, and they're all free.",
    korean: "여: 내일 날씨가 어떨까?\n남: 비가 많이 올 거야.\n여: 정말이니? 지금은 아주 화창한데.\n남: 응. 여기 일기예보를 확인해 봐. 월요일에 비가 올 거라고 나와 있어.\n\n여: 리암, 이 프로그램을 봐. 이번 주 토요일은 '과학의 날'이고 재미있는 활동이 아주 많아.\n남: 4월 21일 말하는 거니?\n여: 응. 모든 활동이 재미있어 보이고 전부 무료야."
  },
  vocabulary: [
    { word: "ash", meaning: "재, 잿더미", example: "The volcano sent ash into the air." },
    { word: "century", meaning: "세기, 100년", example: "It was built in the 19th century." },
    { word: "correct", meaning: "바로잡다, 정정하다", example: "Please correct your mistakes." },
    { word: "crop", meaning: "(농)작물", example: "Farmers grow crops like rice and corn." },
    { word: "disappointing", meaning: "실망스러운", example: "The test result was disappointing." },
    { word: "empty", meaning: "비어 있는", example: "The bottle is empty." },
    { word: "explode", meaning: "폭발하다", example: "The bomb exploded in the building." },
    { word: "forward", meaning: "앞으로", example: "He took a step forward." },
    { word: "huge", meaning: "거대한", example: "There is a huge tree in the park." },
    { word: "invent", meaning: "발명하다", example: "He invented a new machine." },
    { word: "invention", meaning: "발명(품)", example: "The light bulb is a great invention." },
    { word: "lab", meaning: "실험실, 연구실", example: "We are doing experiments in the lab." },
    { word: "necessity", meaning: "필요(성)", example: "Water is a necessity of life." },
    { word: "network", meaning: "통신망", example: "Social network is important today." },
    { word: "notice", meaning: "알아차리다", example: "I didn't notice the change." },
    { word: "pedal", meaning: "페달", example: "Push the bicycle pedal." },
    { word: "pot", meaning: "항아리, 단지", example: "She put flowers in the pot." },
    { word: "present-day", meaning: "오늘날의, 현대의", example: "It is a story of present-day Korea." },
    { word: "researcher", meaning: "연구원", example: "He is a medical researcher." },
    { word: "result", meaning: "결과", example: "What was the result of the game?" },
    { word: "solution", meaning: "해결책, 해법", example: "We found a solution to the problem." },
    { word: "trip", meaning: "이동; 여행", example: "Have a nice trip to Seoul!" },
    { word: "volcano", meaning: "화산", example: "Mt. Paektu is a famous volcano." },
    { word: "wheel", meaning: "바퀴", example: "A bicycle has two wheels." },
    { word: "whiteout", meaning: "수정액", example: "Can I borrow your whiteout?" },
    { word: "whole", meaning: "전체의", example: "The whole family went out." },
    { word: "without", meaning: "~ 없이", example: "I can't live without water." },
    { word: "wooden", meaning: "나무로 된, 목재의", example: "I have a small wooden box." },
    { word: "make a mistake", meaning: "실수하다", example: "Don't be afraid to make a mistake." },
    { word: "set up", meaning: "설치하다, 준비하다", example: "We need to set up the tent." }
  ],
  grammar: [
    {
      title: "수동태 (Passive Voice)",
      explanation: "주어가 어떤 동작을 하는 것이 아니라 받는 것을 나타낼 때 사용합니다. 형태: be동사 + 과거분사 (p.p.) + by+행위자",
      examples: [
        "Hangeul was invented by King Sejong.",
        "The cookies were baked by her.",
        "English is spoken in many countries."
      ]
    },
    {
      title: "have to (~해야 한다)",
      explanation: "강한 의무를 나타낼 때 사용하며, 주어와 시제에 따라 have to / has to / had to로 변합니다. 부정형 'don't have to'는 '~할 필요가 없다'는 뜻입니다.",
      examples: [
        "You have to get up early.",
        "She has to work now.",
        "I don't have to pick up the phone. (받을 필요가 없다)"
      ]
    }
  ],
  quiz: [
    { id: "v1", type: "multiple-choice", question: "'재, 잿더미'는 영어로?", options: ["ash", "pot", "crop", "trip"], answer: 0 },
    { id: "v2", type: "multiple-choice", question: "'century'의 뜻은?", options: ["10년", "100년", "천년", "일주일"], answer: 1 },
    { id: "v3", type: "multiple-choice", question: "정정하다, 바로잡다는 영어로?", options: ["notice", "correct", "invent", "setup"], answer: 1 },
    { id: "v4", type: "multiple-choice", question: "농작물을 뜻하는 영어 단어는?", options: ["crop", "ash", "pot", "wheel"], answer: 0 },
    { id: "v5", type: "multiple-choice", question: "'실망스러운'의 뜻을 가진 영어 단어는?", options: ["exciting", "disappointing", "huge", "whole"], answer: 1 },
    { id: "v6", type: "short-answer", question: "'비어 있는'을 영어로 쓰세요.", answer: "empty" },
    { id: "v7", type: "multiple-choice", question: "'explode'의 뜻은?", options: ["발명하다", "설치하다", "폭발하다", "여행하다"], answer: 2 },
    { id: "v8", type: "multiple-choice", question: "'앞으로'를 뜻하는 단어는?", options: ["forward", "backward", "beside", "without"], answer: 0 },
    { id: "v9", type: "short-answer", question: "'거대한'을 영어로 쓰세요.", answer: "huge" },
    { id: "v10", type: "multiple-choice", question: "'invent'의 뜻은?", options: ["발명하다", "발견하다", "연구하다", "기억하다"], answer: 0 },
    { id: "v11", type: "short-answer", question: "'발명(품)'을 영어로 쓰세요.", answer: "invention" },
    { id: "v12", type: "short-answer", question: "'실험실'의 약자를 영어로 쓰세요.", answer: "lab" },
    { id: "v13", type: "multiple-choice", question: "'necessity'의 뜻은?", options: ["필요성", "가능성", "호기심", "창의성"], answer: 0 },
    { id: "v14", type: "short-answer", question: "'통신망'을 영어로 쓰세요.", answer: "network" },
    { id: "v15", type: "multiple-choice", question: "'알아차리다'는 영어로?", options: ["notice", "solve", "trip", "result"], answer: 0 },
    { id: "v16", type: "multiple-choice", question: "'pedal'은 무엇의 부품인가요?", options: ["Bicycle", "Book", "Tree", "Cloud"], answer: 0 },
    { id: "v17", type: "short-answer", question: "'항아리'를 영어로 쓰세요.", answer: "pot" },
    { id: "v18", type: "multiple-choice", question: "'오늘날의, 현대의'는 영어로?", options: ["old-day", "present-day", "future-day", "last-day"], answer: 1 },
    { id: "v19", type: "short-answer", question: "'연구원'을 영어로 쓰세요.", answer: "researcher" },
    { id: "v20", type: "multiple-choice", question: "'result'의 뜻은?", options: ["과정", "결과", "원인", "목적"], answer: 1 },
    { id: "v21", type: "multiple-choice", question: "'해결책'은 영어로?", options: ["solution", "problem", "question", "secret"], answer: 0 },
    { id: "v22", type: "short-answer", question: "'이동; 여행'을 영어로 쓰세요.", answer: "trip" },
    { id: "v23", type: "multiple-choice", question: "Mt. Paektu is a famous ______.", options: ["river", "volcano", "forest", "desert"], answer: 1 },
    { id: "v24", type: "short-answer", question: "'바퀴'를 영어로 쓰세요.", answer: "wheel" },
    { id: "v25", type: "multiple-choice", question: "'whiteout'은 무엇을 고칠 때 쓰나요?", options: ["Food", "Bicycle", "Writing", "Shoe"], answer: 2 },
    { id: "v26", type: "multiple-choice", question: "'whole'의 뜻은?", options: ["부분의", "전체의", "구멍의", "절반의"], answer: 1 },
    { id: "v27", type: "multiple-choice", question: "'~ 없이'는 영어로?", options: ["within", "without", "with", "besides"], answer: 1 },
    { id: "v28", type: "short-answer", question: "'나무로 된'을 영어로 쓰세요.", answer: "wooden" },
    { id: "v29", type: "multiple-choice", question: "'실수하다'는 영어로?", options: ["do a mistake", "take a mistake", "make a mistake", "get a mistake"], answer: 2 },
    { id: "v30", type: "short-answer", question: "'설치하다'는 영어로? (두 단어)", answer: "set up" }
  ]
};

