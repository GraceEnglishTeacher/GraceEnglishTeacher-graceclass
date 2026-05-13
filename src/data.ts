import { WorksheetData } from './types';

export const worksheetData: WorksheetData = {
  title: "Grace's English Class",
  unit: "Lesson 3. What a Great Idea!",
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
  listening: {
    functions: [
      {
        title: "확신 여부 묻고 답하기 (Expressing Certainty / Uncertainty)",
        description: "상대방이 말한 정보나 사실이 맞는지 확신 여부를 물을 때 사용합니다.",
        details: [
          { label: "묻기", content: '"Are you sure?(확실해?)"라고 해요.' },
          { label: "비슷한 표현", content: '"Really?(정말?)", "Is that true?(사실이니?)"' },
          { label: "답하기", content: '확신할 때는 "Yes, I\'m (quite) sure.", 확신하지 못 할 때는 "No, I\'m not sure."' }
        ],
        examples: [
          { speaker: "A", text: "Are you sure?" },
          { speaker: "B", text: "Yes, I'm quite sure. / No, I'm not sure." }
        ]
      },
      {
        title: "정보 묻기 (Asking for Information)",
        description: "상대방에게 구체적인 정보를 물어볼 때는 의문사(Who, What, When, Where, Why, How)를 사용해요.",
        details: [
          { label: "시간/날짜?", content: "When is the science festival?" },
          { label: "날씨?", content: "What will the weather be like tomorrow?" },
          { label: "장소?", content: "Where do you usually go in the morning?" }
        ],
        examples: [
          { speaker: "A", text: "When is the science festival?" },
          { speaker: "B", text: "It's on April 21st." }
        ]
      }
    ],
    english: "[Section A - Dialog 1]\nG: What will the weather be like tomorrow?\nB: It’s going to rain a lot.\nG: Are you sure? It’s quite sunny now.\nB: Yes. Check the weather forecast here. It says it’s going to rain on Monday.\n\n[Section A - Dialog 2]\nG: What’s your favorite pizza place, Tim?\nB: Little Italy. I think they have the best pizza in Seoul.\nG: Are you sure? You said the same thing about Joe’s Pizza last week. Remember?\nB: Did I? Well, then, I’m not sure. Let’s just say that they both have great pizza.\n\n[Section A - Dialog 3]\nG: Which team will win today, the Reds or the Blues?\nB: The Reds. They’re the better team.\nG: Are you sure? Yun Jihun, their star player, is not playing today.\nB: I didn’t know that. Then, I’m not sure.\n\n[Section A - Dialog 4]\nG: I want to see a movie. What movie is playing at the Star Cinema?\nB: The Hero. The next show starts at 6:30. Let’s leave right away. Then, we can catch it.\nG: Are you sure? It’s already 6.\nB: Yes, I’m quite sure. The Star Cinema is only 1 km from here.\n\n[Section B]\nG: Look at this program, Liam. This Saturday is Science Day, and there are lots of interesting activities.\nB: You mean April 21?\nG: Yes. All the activities look fun, and they're all free.\nB: All of them? Are you sure?\nG: Yes, I’m quite sure. I saw it on the poster. Anyway, which ones are you interested in?\nB: I want to go to the drone-flying class the most. How about you, Somi?\nG: Well, I want to go to Dr. Lee’s lecture on AI.\nB: Oh, I like that, too. Let’s go to both classes.\nG: Let’s see. The drone-flying class is on Saturday afternoon, and Dr. Lee’s lecture is on Sunday morning.\nB: Perfect. I can’t wait.",
    korean: "[A구역 - 대화 1]\n여: 내일 날씨가 어떨까?\n남: 비가 많이 올 거야.\n여: 확실하니? 지금은 꽤 화창한데.\n남: 응. 여기 일기예보를 확인해 봐. 월요일에 비가 올 거라고 나와 있어.\n\n[A구역 - 대화 2]\n여: Tim, 네가 가장 좋아하는 피자 가게가 어디니?\n남: Little Italy야. 서울에서 가장 맛있는 피자가 있는 것 같아.\n여: 확실하니? 지난주에 Joe's Pizza에 대해서도 똑같이 말했잖아. 기억나니?\n남: 내가 그랬나? 음, 그러면 그냥 둘 다 맛있는 피자가 있다고 하자.\n\n[A구역 - 대화 3]\n여: 오늘 어느 팀이 이길까, Reds 팀 아니면 Blues 팀?\n남: Reds 팀. 그들이 더 나은 팀이야.\n여: 확실하니? 그들의 스타 플레이어인 윤지훈이 오늘 경기를 안 하거든.\n남: 그건 몰랐네. 그럼 확신이 안 서네.\n\n[A구역 - 대화 4]\n여: 영화를 보고 싶어. Star Cinema에서 무슨 영화가 상영 중이니?\n남: The Hero야. 다음 상영이 6시 30분에 시작해. 바로 떠나자. 그러면 볼 수 있을 거야.\n여: 확실하니? 이미 6시야.\n남: 응, 아주 확실해. Star Cinema는 여기서 겨우 1km 떨어져 있어.\n\n[B구역 - 대화]\n여: 리암, 이 프로그램을 봐. 이번 주 토요일은 '과학의 날'이고 재미있는 활동이 아주 많아.\n남: 4월 21일 말하는 거니?\n여: 응. 모든 활동이 재미있어 보이고 전부 무료야.\n남: 전부 다? 확실하니?\n여: 응, 아주 확실해. 포스터에서 봤어. 어쨌든, 넌 어떤 활동에 관심이 있니?\n남: 난 드론 비행 수업이 제일 가고 싶어. 너는 어떠니, 소미야?\n여: 글쎄, 난 이 박사님의 AI 강의에 가고 싶어.\n남: 오, 나도 그것도 좋아. 두 수업 다 가자.\n여: 보자. 드론 비행 수업은 토요일 오후고, 이 박사님의 강의는 일요일 아침이야.\n남: 완벽해. 빨리 하고 싶다.",
    dialogs: [
      {
        title: "Section A - Dialog 1 (내일 공원 날씨)",
        english: "G: What will the weather be like tomorrow?\nB: It’s going to rain a lot.\nG: Are you sure? It’s quite sunny now.\nB: Yes. Check the weather forecast here. It says it’s going to rain on Monday.",
        korean: "여: 내일 날씨가 어떨까?\n남: 비가 많이 올 거야.\n여: 확실하니? 지금은 꽤 화창한데.\n남: 응. 여기 일기예보를 확인해 봐. 월요일에 비가 올 거라고 나와 있어.",
        exercises: [
          { id: "lq1_1", type: "short-answer", question: "G: What ____ the weather ____ like tomorrow? (내일 날씨가 어떨까?)", answer: "will be" },
          { id: "lq1_2", type: "multiple-choice", options: ["going to", "goes to", "gone to", "go to"], question: "B: It's _______ rain a lot. (비가 많이 올 거야.)", answer: 0 },
          { id: "lq1_3", type: "short-answer", question: "Check the _______ _______ here. (여기 일기예보를 확인해 봐.)", answer: "weather forecast" }
        ]
      },
      {
        title: "Section A - Dialog 2 (좋아하는 피자 가게)",
        english: "G: What’s your favorite pizza place, Tim?\nB: Little Italy. I think they have the best pizza in Seoul.\nG: Are you sure? You said the same thing about Joe’s Pizza last week. Remember?\nB: Did I? Well, then, I’m not sure. Let’s just say that they both have great pizza.",
        korean: "여: Tim, 네가 가장 좋아하는 피자 가게가 어디니?\n남: Little Italy야. 서울에서 가장 맛있는 피자가 있는 것 같아.\n여: 확실하니? 지난주에 Joe's Pizza에 대해서도 똑같이 말했잖아. 기억나니?\n남: 내가 그랬나? 음, 그러면 그냥 둘 다 맛있는 피자가 있다고 하자.",
        exercises: [
          { id: "lq2_1", type: "short-answer", question: "G: Are you ____? (확실하니?)", answer: "sure" },
          { id: "lq2_2", type: "multiple-choice", options: ["next week", "last week", "today", "tomorrow"], question: "You said the same thing about Joe's Pizza ________. (지난주에 똑같은 말을 했어.)", answer: 1 },
          { id: "lq2_3", type: "short-answer", question: "B: Well, then, I'm _____ _____. (그러면, 확신이 안 서네.)", answer: "not sure" }
        ]
      },
      {
        title: "Section A - Dialog 3 (경기팀 응원하기)",
        english: "G: Which team will win today, the Reds or the Blues?\nB: The Reds. They’re the better team.\nG: Are you sure? Yun Jihun, their star player, is not playing today.\nB: I didn’t know that. Then, I’m not sure.",
        korean: "여: 오늘 어느 팀이 이길까, Reds 팀 아니면 Blues 팀?\n남: Reds 팀. 그들이 더 나은 팀이야.\n여: 확실하니? 그들의 스타 플레이어인 윤지훈이 오늘 경기를 안 하거든.\n남: 그건 몰랐네. 그럼 확신이 안 서네.",
        exercises: [
          { id: "lq3_1", type: "multiple-choice", options: ["win", "lose", "play", "watch"], question: "G: Which team will ____ today? (오늘 어느 팀이 이길까?)", answer: 0 },
          { id: "lq3_2", type: "short-answer", question: "Yun Jihun, their _____ _____ , is not playing today. (그들의 스타 플레이어가 오늘 경기를 안해.)", answer: "star player" },
          { id: "lq3_3", type: "short-answer", question: "B: I ______ know that. (그건 몰랐어.)", answer: "didn't" }
        ]
      },
      {
        title: "Section A - Dialog 4 (영화관 상영 정보)",
        english: "G: I want to see a movie. What movie is playing at the Star Cinema?\nB: The Hero. The next show starts at 6:30. Let’s leave right away. Then, we can catch it.\nG: Are you sure? It’s already 6.\nB: Yes, I’m quite sure. The Star Cinema is only 1 km from here.",
        korean: "여: 영화를 보고 싶어. Star Cinema에서 무슨 영화가 상영 중이니?\n남: The Hero야. 다음 상영이 6시 30분에 시작해. 바로 떠나자. 그러면 볼 수 있을 거야.\n여: 확실하니? 이미 6시야.\n남: 응, 아주 확실해. Star Cinema는 여기서 겨우 1km 떨어져 있어.",
        exercises: [
          { id: "lq4_1", type: "short-answer", question: "G: What movie ____ ____ at the Star Cinema? (영화관에서 무슨 영화가 상영 중이니?)", answer: "is playing" },
          { id: "lq4_2", type: "multiple-choice", options: ["Let's stay", "Let's leave", "Let's win", "Let's watch"], question: "B: ________ right away. (바로 떠나자.)", answer: 1 },
          { id: "lq4_3", type: "short-answer", question: "The Star Cinema is ____ ____ 1 km from here. (영화관은 여기서 겨우 1km 떨어져 있어.)", answer: "only" }
        ]
      },
      {
        title: "Section B (과학의 날 활동 계획)",
        english: "G: Look at this program, Liam. This Saturday is Science Day, and there are lots of interesting activities.\nB: You mean April 21?\nG: Yes. All the activities look fun, and they're all free.\nB: All of them? Are you sure?\nG: Yes, I’m quite sure. I saw it on the poster. Anyway, which ones are you interested in?\nB: I want to go to the drone-flying class the most. How about you, Somi?\nG: Well, I want to go to Dr. Lee’s lecture on AI.\nB: Oh, I like that, too. Let’s go to both classes.\nG: Let’s see. The drone-flying class is on Saturday afternoon, and Dr. Lee’s lecture is on Sunday morning.\nB: Perfect. I can’t wait.",
        korean: "여: 리암, 이 프로그램을 봐. 이번 주 토요일은 '과학의 날'이고 재미있는 활동이 아주 많아.\n남: 4월 21일 말하는 거니?\n여: 응. 모든 활동이 재미있어 보이고 전부 무료야.\n남: 전부 다? 확실하니?\n여: 응, 아주 확실해. 포스터에서 봤어. 어쨌든, 넌 어떤 활동에 관심이 있니?\n남: 난 드론 비행 수업이 제일 가고 싶어. 너는 어떠니, 소미야?\n여: 글쎄, 난 이 박사님의 AI 강의에 가고 싶어.\n남: 오, 나도 그것도 좋아. 두 수업 다 가자.\n여: 보자. 드론 비행 수업은 토요일 오후고, 이 박사님의 강의는 일요일 아침이야.\n남: 완벽해. 빨리 하고 싶다.",
        exercises: [
          { id: "lq5_1", type: "short-answer", question: "This Saturday is _______ _______. (이번 주 토요일은 과학의 날이야.)", answer: "Science Day" },
          { id: "lq5_2", type: "multiple-choice", options: ["expensive", "cheap", "free", "interesting"], question: "All the activities look fun, and they're all ____. (전부 무료야.)", answer: 2 },
          { id: "lq5_3", type: "short-answer", question: "Which ones are you _______ ____? (너는 어디에 관심이 있니?)", answer: "interested in" },
          { id: "lq5_4", type: "short-answer", question: "B: I want to go to the ________-________ class the most. (나는 드론 비행 수업에 제일 가고 싶어.)", answer: "drone-flying" }
        ]
      }
    ]
  },
  reading: {
    english: "Inventions often come from solving small problems in our daily lives. For example, Bette Graham invented whiteout because she made many mistakes when typing. She noticed that painters covered their mistakes with more paint, and she thought she could do the same. This simple idea became a great necessity for many people. Today, even in the present-day digital world, we sometimes still need such creative solutions.",
    korean: "발명품들은 종종 우리 일상생활의 작은 문제들을 해결하는 것에서 나옵니다. 예를 들어, 베티 그레이엄은 타자를 칠 때 실수를 많이 해서 수정액을 발명했습니다. 그녀는 화가들이 그림 위에 물감을 더 칠해 실수를 덮는 것을 알아차렸고, 자신도 똑같이 할 수 있을 것이라 생각했습니다. 이 간단한 아이디어는 많은 사람들에게 큰 필수품이 되었습니다. 오늘날, 현대의 디지털 세상에서도 우리는 때때로 그런 창의적인 해결책이 여전히 필요합니다."
  },
  grammar: [
    {
      title: "수동태 (Passive Voice)",
      explanation: "주어가 어떤 동작을 하는 것이 아니라 받는 것을 나타낼 때 사용합니다. 형태: be동사 + 과거분사 (p.p.) + by+행위자",
      examples: [
        "Bette Graham invented whiteout. (능동태)",
        "Whiteout was invented by Bette Graham. (수동태)",
        "English is spoken in many countries.",
        "She baked the cookies. (능동태)",
        "The cookies were baked by her. (수동태)"
      ],
      exercises: [
        { id: "g_pv1", type: "short-answer", question: "어법상 틀린 부분을 찾아 바르게 고쳐 쓰세요: 'Hangeul was invent by King Sejong.'", answer: "invented" },
        { id: "g_pv2", type: "short-answer", question: "어법상 틀린 부분을 찾아 바르게 고쳐 쓰세요: 'The Mona Lisa painted by Leonardo da Vinci.'", answer: "was painted" },
        { id: "g_pv3", type: "short-answer", question: "어법상 틀린 부분을 찾아 바르게 고쳐 쓰세요: 'This bridge were built in 1985.'", answer: "was" },
        { id: "g_pv4", type: "short-answer", question: "수동태로 바꾸기: 'Mr. Smith built the house last year.' -> The house ____ ____ ____ Mr. Smith last year.", answer: "was built by" },
        { id: "g_pv5", type: "short-answer", question: "수동태로 바꾸기: 'The gardener waters the plants every day.' -> The plants ____ ____ ____ the gardener every day.", answer: "are watered by" }
      ]
    },
    {
      title: "have to (~해야 한다)",
      explanation: "강한 의무를 나타낼 때 사용하며, 주어와 시제에 따라 have to / has to / had to로 변합니다. 부정형 'don't have to'는 '~할 필요가 없다'는 뜻입니다.",
      examples: [
        "You have to get up early. (너는 일찍 일어나야 한다.)",
        "She has to work now. (3인칭 단수, 현재)",
        "I had to work yesterday. (과거시제)",
        "I will have to work tomorrow. (미래시제)",
        "I don't have to pick up the phone. (나는 전화를 받을 필요가 없다.)",
        "Does he have to stop the project? (그는 그 프로젝트를 멈춰야 하는가?)"
      ],
      exercises: [
        { id: "g_ht1", type: "multiple-choice", options: ["have to", "don't have to"], question: "A: I have a toothache. It really hurts. B: Then you ______ see a dentist.", answer: 0 },
        { id: "g_ht2", type: "multiple-choice", options: ["have to", "don't have to"], question: "A: Do we need to buy milk? B: No, there's still a lot in the fridge. We ______ buy it today.", answer: 1 },
        { id: "g_ht3", type: "short-answer", question: "주어진 표현을 활용하여 완성하세요(get up early): 'It's Saturday. I ______ ______ ______ ______ ______ tomorrow.'", answer: "don't have to get up early" },
        { id: "g_ht4", type: "short-answer", question: "주어진 표현을 활용하여 완성하세요(take an umbrella): 'Look at the sky. It's so cloudy. You ______ ______ ______ ______ ______ with you.'", answer: "have to take an umbrella" }
      ]
    }
  ],
  vocabularyQuiz: [
    { id: "vq1", type: "multiple-choice", question: "'ash'의 한국어 뜻은?", options: ["재, 잿더미", "흙", "먼지", "모래"], answer: 0 },
    { id: "vq2", type: "multiple-choice", question: "'century'의 한국어 뜻은?", options: ["10년", "100년", "천년", "일주일"], answer: 1 },
    { id: "vq3", type: "multiple-choice", question: "'correct'의 한국어 뜻은?", options: ["틀리다", "바로잡다", "숨기다", "버리다"], answer: 1 },
    { id: "vq4", type: "multiple-choice", question: "'crop'의 한국어 뜻은?", options: ["농작물", "가축", "농기구", "토지"], answer: 0 },
    { id: "vq5", type: "multiple-choice", question: "'disappointing'의 한국어 뜻은?", options: ["신나는", "실망스러운", "지루한", "놀라운"], answer: 1 },
    { id: "vq6", type: "multiple-choice", question: "'empty'의 한국어 뜻은?", options: ["가득 찬", "비어 있는", "깨끗한", "더러운"], answer: 1 },
    { id: "vq7", type: "multiple-choice", question: "'explode'의 한국어 뜻은?", options: ["폭발하다", "발명하다", "연구하다", "이동하다"], answer: 0 },
    { id: "vq8", type: "multiple-choice", question: "'forward'의 한국어 뜻은?", options: ["뒤로", "옆으로", "앞으로", "위로"], answer: 2 },
    { id: "vq9", type: "multiple-choice", question: "'huge'의 한국어 뜻은?", options: ["작은", "거대한", "가벼운", "무거운"], answer: 1 },
    { id: "vq10", type: "multiple-choice", question: "'invent'의 한국어 뜻은?", options: ["발명하다", "발견하다", "창조하다", "기억하다"], answer: 0 },
    { id: "vq11", type: "multiple-choice", question: "'invention'의 한국어 뜻은?", options: ["발명(품)", "발견(물)", "연구(원)", "실험(실)"], answer: 0 },
    { id: "vq12", type: "multiple-choice", question: "'lab'의 한국어 뜻은?", options: ["사무실", "교실", "실험실", "도서관"], answer: 2 },
    { id: "vq13", type: "multiple-choice", question: "'necessity'의 한국어 뜻은?", options: ["필요(성)", "중요성", "창의성", "호기심"], answer: 0 },
    { id: "vq14", type: "multiple-choice", question: "'network'의 한국어 뜻은?", options: ["통신망", "도로망", "전력망", "수도망"], answer: 0 },
    { id: "vq15", type: "multiple-choice", question: "'notice'의 한국어 뜻은?", options: ["말하다", "알아차리다", "듣다", "쓰다"], answer: 1 },
    { id: "vq16", type: "multiple-choice", question: "'pedal'의 한국어 뜻은?", options: ["바퀴", "안장", "핸들", "페달"], answer: 3 },
    { id: "vq17", type: "multiple-choice", question: "'pot'의 한국어 뜻은?", options: ["접시", "항아리", "수저", "포크"], answer: 1 },
    { id: "vq18", type: "multiple-choice", question: "'present-day'의 한국어 뜻은?", options: ["과거의", "오늘날의", "미래의", "옛날의"], answer: 1 },
    { id: "vq19", type: "multiple-choice", question: "'researcher'의 한국어 뜻은?", options: ["학생", "교사", "연구원", "의사"], answer: 2 },
    { id: "vq20", type: "multiple-choice", question: "'result'의 한국어 뜻은?", options: ["원인", "결과", "과정", "목적"], answer: 1 },
    { id: "vq21", type: "multiple-choice", question: "'solution'의 한국어 뜻은?", options: ["문제", "질문", "해결책", "비밀"], answer: 2 },
    { id: "vq22", type: "short-answer", question: "'이동; 여행'의 뜻을 가진 영단어를 쓰세요.", answer: "trip" },
    { id: "vq23", type: "short-answer", question: "'화산'의 뜻을 가진 영단어를 쓰세요.", answer: "volcano" },
    { id: "vq24", type: "short-answer", question: "'바퀴'의 뜻을 가진 영단어를 쓰세요.", answer: "wheel" },
    { id: "vq25", type: "short-answer", question: "'수정액'의 뜻을 가진 영단어를 쓰세요.", answer: "whiteout" },
    { id: "vq26", type: "short-answer", question: "'전체의'의 뜻을 가진 영단어를 쓰세요.", answer: "whole" },
    { id: "vq27", type: "short-answer", question: "'~ 없이'의 뜻을 가진 영단어를 쓰세요.", answer: "without" },
    { id: "vq28", type: "short-answer", question: "'나무로 된'의 뜻을 가진 영단어를 쓰세요.", answer: "wooden" },
    { id: "vq29", type: "short-answer", question: "'실수하다'의 뜻을 가진 영어 표현을 쓰세요.", answer: "make a mistake" },
    { id: "vq30", type: "short-answer", question: "'설치하다'의 뜻을 가진 영어 표현을 쓰세요.", answer: "set up" }
  ]
};

