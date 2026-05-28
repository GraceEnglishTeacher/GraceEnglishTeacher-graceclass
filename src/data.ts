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
    { word: "set up", meaning: "설치하다, 준비하다", example: "We need to set up the tent." },
    { word: "explosion", meaning: "폭발", example: "The sound of the explosion was very loud." },
    { word: "fail", meaning: "실패하다; (수확이) 흉작이 들다", example: "Crops failed around the world because of the cold weather." },
    { word: "surprisingly", meaning: "놀랍게도", example: "Surprisingly, this made traveling difficult." },
    { word: "travel", meaning: "이동하다, 여행하다", example: "People needed a new way to travel." },
    { word: "ride", meaning: "(자전거, 말 등을) 타다", example: "In those days, people rode horses." },
    { word: "push", meaning: "밀다, 밀치다", example: "Riders simply pushed the bicycle forward." },
    { word: "inventor", meaning: "발명가", example: "The bicycle is the result of work by many inventors." },
    { word: "typist", meaning: "타자수, 타이피스트", example: "Graham was a bad typist, so she made many mistakes." },
    { word: "painter", meaning: "페인트공, 화가, 도장공", example: "One day, Graham saw some window painters." },
    { word: "simply", meaning: "단순히, 그냥", example: "They corrected it by simply painting over it." },
    { word: "paint over", meaning: "위에 페인트를 칠하다, 덧칠하다", example: "She decided to paint over the typing mistakes." },
    { word: "own", meaning: "자신만의, 독자적인", example: "The next day, she made her own white paint." },
    { word: "coffee pot", meaning: "커피 포트, 커피 단지", example: "They made many trips to check the empty coffee pot." },
    { word: "building", meaning: "건물, 빌딩", example: "There was only one coffee machine in the building." },
    { word: "software", meaning: "소프트웨어", example: "They used special software to watch the coffee pot." },
    { word: "local", meaning: "지역의, 국부적인", example: "The pictures were shared on their local network." },
    { word: "in front of", meaning: "~의 앞에", example: "They set up a camera in front of the coffee machine." }
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
  reading: [
    {
      id: "rd1",
      title: "Bicycle (자전거)",
      english: "Mt. Tambora, a volcano in Indonesia, exploded in 1815. The explosion created a huge cloud of ash, so crops failed around the world. As a result, people didn’t have enough food to eat. Surprisingly, this made traveling difficult. Why? In those days, people rode horses, but many horses were killed for food.\n\nPeople needed a new way to travel, and Karl von Drais invented the first bicycle in Germany in 1817. Drais’s bicycle had two wooden wheels but no pedals. How did it move without pedals? Well, riders simply pushed the bicycle forward with their feet. The present-day bicycle is the result of many inventors’ work in the 19th century.",
      korean: "1815년에 인도네시아의 화산인 탐보라 산이 폭발했습니다. 그 폭발은 거대한 재 구름을 만들어 냈고, 그래서 전 세계적으로 농작물이 흉작이었습니다. 결과적으로, 사람들은 먹을 충분한 음식을 갖지 못했습니다. 놀랍게도, 이것은 이동하는 것을 어렵게 만들었습니다. 왜일까요? 그 당시에 사람들은 말을 탔지만, 많은 말들이 식용으로 죽임을 당했습니다. 사람들은 이동할 새로운 방법이 필요했고, Karl von Drais가 1817년에 독일에서 최초의 자전거를 발명했습니다. Drais의 자전거는 두 개의 나무 바퀴가 있었지만 페달은 없었습니다. 페달 없이 그것은 어떻게 움직였을까요? 글쎄요, 타는 사람들이 단순히 그들의 발로 자전거를 앞으로 밀었습니다. 오늘날의 자전거는 19세기 많은 발명가들의 노력의 결과입니다.",
      analysis: [
        {
          english: "Mt. Tambora, a volcano in Indonesia, exploded in 1815.",
          korean: "1815년에 인도네시아의 화산인 탐보라 산이 폭발했습니다.",
          highlights: ["exploded"],
          underlines: ["volcano"],
          vocabulary: [
            { word: "volcano", pos: "명", meaning: "화산" },
            { word: "exploded", pos: "동", meaning: "폭발하다 (explode의 과거형)" }
          ],
          grammar: [
            { phrase: "a volcano in Indonesia", explanation: "주어인 Mt. Tambora와 동격 관계(=)를 나타내는 삽입구입니다." }
          ]
        },
        {
          english: "The explosion created a huge cloud of ash, so crops failed around the world.",
          korean: "그 폭발은 거대한 재 구름을 만들어 냈고, 그래서 전 세계적으로 농작물이 흉작이었습니다.",
          highlights: ["created", "failed"],
          underlines: ["explosion", "huge", "ash", "crops"],
          connectors: ["so"],
          vocabulary: [
            { word: "explosion", pos: "명", meaning: "폭발" },
            { word: "huge", pos: "형", meaning: "거대한" },
            { word: "ash", pos: "명", meaning: "재, 잿더미" },
            { word: "crops", pos: "명", meaning: "(농)작물" },
            { word: "failed", pos: "동", meaning: "실패하다 (수확이 실패하다, 흉작이다)" }
          ],
          grammar: [
            { phrase: "so", explanation: "결과를 이끄는 인과관계의 등위접속사 (그래서 ~하다)입니다." }
          ]
        },
        {
          english: "As a result, people didn’t have enough food to eat.",
          korean: "결과적으로, 사람들은 먹을 충분한 음식을 갖지 못했습니다.",
          highlights: ["didn’t have"],
          underlines: ["As a result", "enough"],
          vocabulary: [
            { word: "As a result", pos: "연결어", meaning: "결과적으로, 그 결과" },
            { word: "enough", pos: "형", meaning: "충분한" }
          ],
          grammar: [
            { phrase: "to eat", explanation: "to부정사의 형용사적 용법으로, 앞의 명사구 'enough food'를 수식합니다. (먹을 음식)" }
          ]
        },
        {
          english: "Surprisingly, this made traveling difficult.",
          korean: "놀랍게도, 이것은 이동하는 것을 어렵게 만들었습니다.",
          highlights: ["made"],
          underlines: ["Surprisingly"],
          vocabulary: [
            { word: "Surprisingly", pos: "부", meaning: "놀랍게도" }
          ],
          grammar: [
            { phrase: "made traveling difficult", explanation: "「make + 목적어(traveling, 동명사) + 형용사 목적보어(difficult)」 구문입니다. 목적보어 자리에 부사(difficultly)를 쓰지 않도록 주의합니다." }
          ]
        },
        {
          english: "Why?",
          korean: "왜일까요?",
          vocabulary: [],
          grammar: []
        },
        {
          english: "In those days, people rode horses, but many horses were killed for food.",
          korean: "그 당시에 사람들은 말을 탔지만, 많은 말들이 식용으로 죽임을 당했습니다.",
          highlights: ["rode", "were killed"],
          underlines: ["In those days"],
          connectors: ["but"],
          vocabulary: [
            { word: "In those days", pos: "구", meaning: "그 때, 그 당시에" },
            { word: "rode", pos: "동", meaning: "타다 (ride의 과거형)" }
          ],
          grammar: [
            { phrase: "were killed", explanation: "수동태(be동사 과거형 were + 과거분사 killed) 구문으로, 말들이 '식용으로 죽임을 당했다'는 의미를 나타냅니다." }
          ]
        },
        {
          english: "People needed a new way to travel, and Karl von Drais invented the first bicycle in Germany in 1817.",
          korean: "사람들은 이동할 새로운 방법이 필요했고, Karl von Drais가 1817년에 독일에서 최초의 자전거를 발명했습니다.",
          highlights: ["needed", "invented"],
          connectors: ["and"],
          vocabulary: [
            { word: "invented", pos: "동", meaning: "발명하다" }
          ],
          grammar: [
            { phrase: "to travel", explanation: "to부정사의 형용사적 용법으로, 앞의 명사 a new way를 수식합니다. (이동할 방법)" },
            { phrase: "in Germany / in 1817", explanation: "나라 이름이나 구체적인 연도 앞에는 전치사 in을 사용합니다." }
          ]
        },
        {
          english: "Drais’s bicycle had two wooden wheels but no pedals.",
          korean: "Drais의 자전거는 두 개의 나무 바퀴가 있었지만 페달은 없었습니다.",
          highlights: ["had"],
          underlines: ["wooden", "wheels", "pedals"],
          connectors: ["but"],
          vocabulary: [
            { word: "wooden", pos: "형", meaning: "나무로 된, 목재의" },
            { word: "wheels", pos: "명", meaning: "바퀴" },
            { word: "pedals", pos: "명", meaning: "페달" }
          ],
          grammar: []
        },
        {
          english: "How did it move without pedals?",
          korean: "페달 없이 그것은 어떻게 움직였을까요?",
          highlights: ["move"],
          underlines: ["without"],
          vocabulary: [
            { word: "without", pos: "전", meaning: "~ 없이" }
          ],
          grammar: [
            { phrase: "it", explanation: "Karl von Drais가 만든 최초의 자전거(Drais’s bicycle)를 가리킵니다." }
          ]
        },
        {
          english: "Well, riders simply pushed the bicycle forward with their feet.",
          korean: "글쎄요, 타는 사람들이 단순히 그들의 발로 자전거를 앞으로 밀었습니다.",
          highlights: ["pushed"],
          underlines: ["forward"],
          vocabulary: [
            { word: "pushed", pos: "동", meaning: "밀었다 (push의 과거형)" },
            { word: "forward", pos: "부", meaning: "앞으로" }
          ],
          grammar: [
            { phrase: "with their feet", explanation: "수단이나 도구를 나타내는 전치사 with(그들의 발을 사용하여)이며, 주어 riders가 복수이므로 foot의 복수형인 feet가 쓰였습니다." }
          ]
        },
        {
          english: "The present-day bicycle is the result of many inventors’ work in the 19th century.",
          korean: "오늘날의 자전거는 19세기 많은 발명가들의 노력의 결과입니다.",
          highlights: ["is"],
          underlines: ["present-day", "result", "inventors", "century"],
          vocabulary: [
            { word: "present-day", pos: "형", meaning: "오늘날의, 현대의" },
            { word: "result", pos: "명", meaning: "결과" },
            { word: "century", pos: "명", meaning: "세기, 100년" }
          ],
          grammar: [
            { phrase: "inventors’ work", explanation: "복수명사의 소유격 표현입니다. s로 끝나는 복수명사의 소유격은 뒤에 어포스트로피(’)만 붙입니다. (발명가들의 노력)" }
          ]
        }
      ],
      exercises: [
        {
          id: "rd1_q1",
          type: "multiple-choice",
          question: "When did Mt. Tambora, a volcano in Indonesia, explode?",
          options: ["In 1815", "In 1817", "In 1956", "In 1991"],
          answer: 0
        },
        {
          id: "rd1_q2",
          type: "short-answer",
          question: "The explosion created a huge cloud of ____, so crops failed around the world. (어울리는 영단어 한 단어 입력)",
          answer: "ash"
        },
        {
          id: "rd1_q3",
          type: "multiple-choice",
          question: "Why did traveling become difficult after the explosion?",
          options: [
            "Because roads were damaged and blocked by snow.",
            "Because many horses were killed for food.",
            "Because people had to walk everywhere.",
            "Because bicycles were too heavy to ride."
          ],
          answer: 1
        },
        {
          id: "rd1_q4",
          type: "short-answer",
          question: "Who invented the first bicycle in Germany in 1817? (발명가 이름 입력)",
          answer: "Karl von Drais"
        },
        {
          id: "rd1_q5",
          type: "multiple-choice",
          question: "How did Karl von Drais's bicycle move without pedals?",
          options: [
            "It was pulled by horses.",
            "Riders simply pushed the bicycle forward with their feet.",
            "It moved automatically using steam power.",
            "Riders used hand cranks to turn the wheels."
          ],
          answer: 1
        }
      ]
    },
    {
      id: "rd2",
      title: "Whiteout (수정액)",
      english: "Whiteout was invented by Bette Graham. In 1956, Graham was working at a bank in Texas, USA. At that time, people had to retype the whole page when they made even a small mistake. Graham was a bad typist, so she needed a solution. One day, Graham saw some window painters. When they made a mistake, they corrected it by simply painting over it. The next day, she made her own white paint and used it to correct her typing mistakes. Surprisingly, nobody noticed! Soon, everybody at the bank began using it.",
      korean: "수정액(화이트아웃)은 Bette Graham에 의해 발명되었습니다. 1956년에 Graham은 미국 텍사스의 한 은행에서 일하고 있었습니다. 그 당시에 사람들은 아주 작은 실수만 해도 페이지 전체를 다시 타자 쳐야 했습니다. Graham은 서툰 타이피스트였고, 그래서 그녀는 해결책이 필요했습니다. 어느 날, Graham은 몇몇 창문 페인트공들을 보았습니다. 그들이 실수를 했을 때, 그들은 단순히 그 위에 페인트를 칠함으로써 그것을 바로잡았습니다. 다음 날, 그녀는 자신만의 하얀 페인트를 만들었고 그것을 자신의 타자 실수를 바로잡기 위해 사용했습니다. 놀랍게도, 아무도 알아차리지 못했습니다! 곧, 은행의 모든 사람들이 그것을 사용하기 시작했습니다.",
      analysis: [
        {
          english: "Whiteout was invented by Bette Graham.",
          korean: "수정액(화이트아웃)은 Bette Graham에 의해 발명되었습니다.",
          highlights: ["was invented"],
          vocabulary: [
            { word: "invented", pos: "동", meaning: "발명하다 (invent의 과거형/과거분사)" }
          ],
          grammar: [
            { phrase: "was invented by", explanation: "수동태(be동사 과거형 was + 과거분사 invented + by 행위자) 구문으로, 주어인 Whiteout이 Bette Graham에 의해 '발명되었다'를 뜻합니다." }
          ]
        },
        {
          english: "In 1956, Graham was working at a bank in Texas, USA.",
          korean: "1956년에 Graham은 미국 텍사스의 한 은행에서 일하고 있었습니다.",
          highlights: ["was working"],
          vocabulary: [],
          grammar: [
            { phrase: "was working", explanation: "과거진행형(was + 동사원형-ing)으로, 과거 특정 시점에 일어나는 진행 동작(~하는 중이었다)을 표현합니다." }
          ]
        },
        {
          english: "At that time, people had to retype the whole page when they made even a small mistake.",
          korean: "그 당시에 사람들은 아주 작은 실수만 해도 페이지 전체를 다시 타자 쳐야 했습니다.",
          highlights: ["had to retype", "made"],
          underlines: ["At that time", "whole"],
          connectors: ["when"],
          vocabulary: [
            { word: "At that time", pos: "구", meaning: "그 때, 당시에" },
            { word: "retype", pos: "동", meaning: "다시 입력하다, 다시 타자리치다" },
            { word: "whole", pos: "형", meaning: "전체의" }
          ],
          grammar: [
            { phrase: "had to retype", explanation: "의무를 지닌 have to(~해야 한다)의 과거형인 had to에 동사원형 retype이 결합하여 '~해야 했다'를 나타냅니다." },
            { phrase: "when they made even a small mistake", explanation: "시간의 부사절을 이끄는 접속사 when(~할 때)입니다. make a mistake는 '실수하다'라는 표현이며, even(~조차도)이 결합되었습니다." }
          ]
        },
        {
          english: "Graham was a bad typist, so she needed a solution.",
          korean: "Graham은 서툰 타이피스트였고, 그래서 그녀는 해결책이 필요했습니다.",
          highlights: ["was", "needed"],
          underlines: ["typist", "solution"],
          connectors: ["so"],
          vocabulary: [
            { word: "typist", pos: "명", meaning: "타이피스트, 타자수" },
            { word: "solution", pos: "명", meaning: "해결책, 해법" }
          ],
          grammar: [
            { phrase: "so", explanation: "앞 문장과 뒤 문장을 원인과 결과로 연결하는 등위접속사 (그래서)입니다." }
          ]
        },
        {
          english: "One day, Graham saw some window painters.",
          korean: "어느 날, Graham은 몇몇 창문 페인트공들을 보았습니다.",
          highlights: ["saw"],
          underlines: ["One day", "painters"],
          vocabulary: [
            { word: "One day", pos: "구", meaning: "어느 날" },
            { word: "painters", pos: "명", meaning: "페인트공(칠장이), 도장공" }
          ],
          grammar: [
            { phrase: "saw", explanation: "지각동사 see의 과거형으로, 창문 페인트공이라는 인물을 보게 된 시점을 지칭합니다." }
          ]
        },
        {
          english: "When they made a mistake, they corrected it by simply painting over it.",
          korean: "그들이 실수를 했을 때, 그들은 단순히 그 위에 페인트를 칠함으로써 그것을 바로잡았습니다.",
          highlights: ["made", "corrected", "painting"],
          connectors: ["When"],
          vocabulary: [
            { word: "corrected", pos: "동", meaning: "바로잡다, 정정하다" }
          ],
          grammar: [
            { phrase: "by simply painting over it", explanation: "by + -ing(동명사) 구문은 '~함으로써'라는 방법/수단을 나타냅니다. paint over는 '위에 덧칠하다'를 뜻하며, 대명사 it은 앞에서 저지른 실수(a mistake)를 가리킵니다." }
          ]
        },
        {
          english: "The next day, she made her own white paint and used it to correct her typing mistakes.",
          korean: "다음 날, 그녀는 자신만의 하얀 페인트를 만들었고 그것을 자신의 타자 실수를 바로잡기 위해 사용했습니다.",
          highlights: ["made", "used", "correct"],
          underlines: ["The next day"],
          connectors: ["and"],
          vocabulary: [
            { word: "The next day", pos: "구", meaning: "다음 날" }
          ],
          grammar: [
            { phrase: "her own", explanation: "소유격을 더욱 강조하여 '그녀 자신의'라는 뜻을 전합니다." },
            { phrase: "it", explanation: "앞부분에 직접 제조한 흰색 페인트(her own white paint)를 지칭하는 대명사입니다." },
            { phrase: "to correct", explanation: "to부정사의 부사적 용법 중 '목적'(~하기 위해서)을 나타냅니다. 그녀의 타자 오류를 바로잡기 위해 사용했다는 사실을 뒷받침합니다." }
          ]
        },
        {
          english: "Surprisingly, nobody noticed!",
          korean: "놀랍게도, 아무도 알아차리지 못했습니다!",
          highlights: ["noticed"],
          underlines: ["Surprisingly", "nobody"],
          vocabulary: [
            { word: "Surprisingly", pos: "부", meaning: "놀랍게도" },
            { word: "nobody", pos: "대명사", meaning: "아무도 ~않다" },
            { word: "noticed", pos: "동", meaning: "알아차리다 (notice의 과거형)" }
          ],
          grammar: []
        },
        {
          english: "Soon, everybody at the bank began using it.",
          korean: "곧, 은행의 모든 사람들이 그것을 사용하기 시작했습니다.",
          highlights: ["began", "using"],
          vocabulary: [],
          grammar: [
            { phrase: "began using", explanation: "begin은 목적어로 동명사(-ing)와 to부정사 둘 다 취할 수 있는 동사입니다. 따라서 began using은 began to use로 바꾸어 쓸 수도 있습니다." }
          ]
        }
      ],
      exercises: [
        {
          id: "rd2_q1",
          type: "short-answer",
          question: "Who is the inventor of Whiteout? (발명가 이름 입력)",
          answer: "Bette Graham"
        },
        {
          id: "rd2_q2",
          type: "multiple-choice",
          question: "Where was Bette Graham working in 1956?",
          options: ["At a school in England", "At a bank in Texas, USA", "At a paint shop", "At a computer lab"],
          answer: 1
        },
        {
          id: "rd2_q3",
          type: "multiple-choice",
          question: "What was the main problem when typists made a small mistake?",
          options: [
            "They had to buy a new typewriter.",
            "They had to pay a fine to the bank.",
            "They had to retype the whole page.",
            "They had to erase it with sand."
          ],
          answer: 2
        },
        {
          id: "rd2_q4",
          type: "short-answer",
          question: "Bette Graham got her idea from seeing some window _______. (어울리는 영단어 한 단어 입력)",
          answer: "painters"
        },
        {
          id: "rd2_q5",
          type: "multiple-choice",
          question: "What happened when she first used her own white paint?",
          options: [
            "Her boss got angry at her immediately.",
            "Surprisingly, nobody noticed!",
            "The paint damaged the paper.",
            "Everybody laughed at her secret recipe."
          ],
          answer: 1
        }
      ]
    },
    {
      id: "rd3",
      title: "Webcam (웹캠)",
      english: "The first webcam was invented to watch a coffee pot. In 1991, Dr. Quentin Stafford-Fraser and Dr. Paul Jardetzky were working at a computer lab in England. To work better, they needed lots of coffee. However, there was only one coffee machine in the building. So, they had to make many disappointing trips to the empty coffee pot.\n\nAs a solution, the two researchers set up a camera in front of the coffee machine. The camera took pictures of the coffee pot three times a minute. With special software, all the researchers in the building could see the pictures on their local network. No more disappointing trips!",
      korean: "최초의 웹캠은 커피 포트를 지켜보기 위해 발명되었습니다. 1991년에 Quentin Stafford-Fraser 박사와 Paul Jardetzky 박사는 영국의 한 컴퓨터 연구소에서 일하고 있었습니다. 일을 더 잘하기 위해 그들은 많은 커피가 필요했습니다. 하지만 건물에는 단 한 대의 커피 머신만 있었습니다. 그래서 그들은 비어 있는 커피 포트로 실망스러운 걸음을 여러 번 해야만 했습니다. 해결책으로, 두 연구원은 커피 머신 앞에 카메라를 설치했습니다. 카메라는 1분에 세 번씩 커피 포트 사진을 찍었습니다. 전용 소프트웨어를 통해 건물 내 모든 연구원들이 로컬 네트워크에서 사진을 볼 수 있었습니다. 더 이상 실망스러운 걸음을 하지 않아도 되었습니다!",
      analysis: [
        {
          english: "The first webcam was invented to watch a coffee pot.",
          korean: "최초의 웹캠은 커피 포트를 지켜보기 위해 발명되었습니다.",
          highlights: ["was invented"],
          underlines: ["pot"],
          vocabulary: [
            { word: "pot", pos: "명", meaning: "항아리, 단지, 포트" }
          ],
          grammar: [
            { phrase: "was invented", explanation: "수동태(be동사 과거형 was + 과거분사 invented)로 '발명되었다'를 의미합니다." },
            { phrase: "to watch", explanation: "to부정사의 부사적 용법 중 '목적'(~하기 위해서)을 뜻하며, '지켜보기 위해서'로 해석됩니다." }
          ]
        },
        {
          english: "In 1991, Dr. Quentin Stafford-Fraser and Dr. Paul Jardetzky were working at a computer lab in England.",
          korean: "1991년에 Quentin Stafford-Fraser 박사와 Paul Jardetzky 박사는 영국의 한 컴퓨터 연구소에서 일하고 있었습니다.",
          highlights: ["were working"],
          underlines: ["lab"],
          vocabulary: [
            { word: "lab", pos: "명", meaning: "실험실, 연구실 (laboratory의 축약형)" }
          ],
          grammar: [
            { phrase: "were working", explanation: "과거진행형(주어가 여러 명이므로 were + -ing)으로, 과거 한 시점에 연구원들이 일하고 있었음을 나타냅니다." }
          ]
        },
        {
          english: "To work better, they needed lots of coffee.",
          korean: "일을 더 잘하기 위해 그들은 많은 커피가 필요했습니다.",
          highlights: ["needed"],
          underlines: ["lots of"],
          vocabulary: [],
          grammar: [
            { phrase: "To work better", explanation: "to부정사의 부사적 용법 중 '목적'(~하기 위해)으로 쓰여, '일을 더 유능하게 정진해서 더 잘하기 위해'라는 의미를 더해줍니다." },
            { phrase: "lots of", explanation: "많은 양을 일컫는 수식어로, 가산/불가산 명사에 모두 사용 가능합니다. 여기서는 불가산 명사인 coffee를 수식하며 'a lot of' 또는 'much'와 동의어입니다." }
          ]
        },
        {
          english: "However, there was only one coffee machine in the building.",
          korean: "하지만 건물에는 단 한 대의 커피 머신만 있었습니다.",
          highlights: ["was"],
          underlines: ["However"],
          vocabulary: [
            { word: "However", pos: "연결어", meaning: "하지만, 그러나 (역접의 접속부사)" }
          ],
          grammar: [
            { phrase: "there was only one", explanation: "「there was + 단수 명사」 구문으로 '~이 있었다'라는 존재를 나타내며, only가 붙어 오직 하나 있었음을 상세히 강조합니다." }
          ]
        },
        {
          english: "So, they had to make many disappointing trips to the empty coffee pot.",
          korean: "그래서 그들은 비어 있는 커피 포트로 실망스러운 걸음을 여러 번 해야만 했습니다.",
          highlights: ["had to make"],
          underlines: ["disappointing", "empty"],
          connectors: ["So"],
          vocabulary: [
            { word: "disappointing", pos: "형", meaning: "실망스러운" },
            { word: "empty", pos: "형", meaning: "비어 있는, 빈" }
          ],
          grammar: [
            { phrase: "had to make", explanation: "have to(~해야 한다)의 과거형인 had to에 동사를 결합하여 '강제로 ~하러 가야만 했다'는 불가피성을 강조합니다." },
            { phrase: "disappointing trips", explanation: "trips는 여기서 단순한 여행이 아닌 '어떤 목적을 품은 헛걸음 또는 이동'을 의미합니다. 감정을 느끼게 유발하는 형태이므로 현재분사인 -ing 형태로 수식합니다." }
          ]
        },
        {
          english: "As a solution, the two researchers set up a camera in front of the coffee machine.",
          korean: "해결책으로, 두 연구원은 커피 머신 앞에 카메라를 설치했습니다.",
          highlights: ["set up"],
          underlines: ["As", "researchers", "in front of"],
          vocabulary: [
            { word: "As", pos: "전", meaning: "~로서, ~로(써)" },
            { word: "researchers", pos: "명", meaning: "연구원" },
            { word: "set up", pos: "동", meaning: "설치하다 (과거형도 동일하게 set)" },
            { word: "in front of", pos: "전", meaning: "~의 앞에" }
          ],
          grammar: []
        },
        {
          english: "The camera took pictures of the coffee pot three times a minute.",
          korean: "카메라는 1분에 세 번씩 커피 포트 사진을 찍었습니다.",
          highlights: ["took"],
          underlines: ["three times"],
          vocabulary: [
            { word: "three times", pos: "구", meaning: "세 번" }
          ],
          grammar: [
            { phrase: "took pictures of", explanation: "take pictures of(~의 사진을 찍다)의 과거 시제 표현입니다." },
            { phrase: "a minute", explanation: "여기서 부정관사 a/an은 '~마다(per)'의 빈도/비율을 나타내는 의미로 쓰였습니다. (즉, 1분당 세 번)" }
          ]
        },
        {
          english: "With special software, all the researchers in the building could see the pictures on their local network.",
          korean: "전용 소프트웨어를 통해 건물 내 모든 연구원들이 로컬 네트워크에서 사진을 볼 수 있었습니다.",
          highlights: ["could see"],
          underlines: ["special", "network"],
          vocabulary: [
            { word: "special", pos: "형", meaning: "특수한, 특별한" },
            { word: "network", pos: "명", meaning: "통신망 (local network: 로컬 네트워크)" }
          ],
          grammar: [
            { phrase: "could see", explanation: "조동사 can의 과거형인 could와 조동사 뒤 동사원형 see를 병렬하여 과거에 볼 능력을 소지했음을 표명합니다." }
          ]
        },
        {
          english: "No more disappointing trips!",
          korean: "더 이상 실망스러운 걸음을 하지 않아도 되었습니다!",
          underlines: ["No more"],
          vocabulary: [
            { word: "No more", pos: "구", meaning: "더 이상 ~ 않는" }
          ],
          grammar: []
        }
      ],
      exercises: [
        {
          id: "rd3_q1",
          type: "multiple-choice",
          question: "Why was the first webcam invented?",
          options: ["To watch a coffee pot", "To record video lectures", "To guard the entrance of the lab", "To talk with family members"],
          answer: 0
        },
        {
          id: "rd3_q2",
          type: "short-answer",
          question: "In what year did Dr. Quentin and Dr. Paul set up the webcam system?",
          answer: "1991"
        },
        {
          id: "rd3_q3",
          type: "multiple-choice",
          question: "What went wrong when researchers went to get coffee before the webcam was invented?",
          options: [
            "The computer lab was closed.",
            "The coffee pot was often empty.",
            "The coffee was too hot to drink.",
            "The coffee machine only accepted coins."
          ],
          answer: 1
        },
        {
          id: "rd3_q4",
          type: "short-answer",
          question: "The camera took pictures of the coffee pot _______ times a minute. (영어 단어로 입력)",
          answer: "three"
        },
        {
          id: "rd3_q5",
          type: "multiple-choice",
          question: "How did researchers view the pictures taken by the camera?",
          options: [
            "On their mobile phone screen",
            "On their local network",
            "On a television in the lobby",
            "In printed daily reports"
          ],
          answer: 1
        }
      ]
    }
  ],
  grammar: [
    {
      title: "수동태 (Passive Voice)",
      explanation: "주어가 어떤 동작을 하는 것이 아니라 받는 것을 나타낼 때 사용합니다.\n형태: be동사 + 과거분사 (p.p.) + by+행위자",
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
      explanation: "강한 의무를 나타낼 때 사용하며, 주어와 시제에 따라 have to / has to / had to로 변합니다.\n부정형 'don't have to'는 '~할 필요가 없다'는 뜻입니다.",
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
    { id: "vq30", type: "short-answer", question: "'설치하다'의 뜻을 가진 영어 표현을 쓰세요.", answer: "set up" },
    { id: "vq31", type: "multiple-choice", question: "'explosion'의 한국어 뜻은?", options: ["폭발", "화재", "진동", "충돌"], answer: 0 },
    { id: "vq32", type: "multiple-choice", question: "'fail'의 한국어 뜻은?", options: ["성공하다", "실패하다", "도전하다", "포기하다"], answer: 1 },
    { id: "vq33", type: "multiple-choice", question: "'surprisingly'의 한국어 뜻은?", options: ["지루하게도", "일반적으로", "안타깝게도", "놀랍게도"], answer: 3 },
    { id: "vq34", type: "short-answer", question: "'이동하다, 여행하다'의 뜻을 가진 영단어를 쓰세요.", answer: "travel" },
    { id: "vq35", type: "short-answer", question: "'타다(말, 자전거 등)'의 뜻을 가진 영단어를 쓰세요.", answer: "ride" },
    { id: "vq36", type: "short-answer", question: "'밀다'의 뜻을 가진 영단어를 쓰세요.", answer: "push" },
    { id: "vq37", type: "short-answer", question: "'발명가'의 뜻을 가진 영단어를 쓰세요.", answer: "inventor" },
    { id: "vq38", type: "multiple-choice", question: "'typist'의 한국어 뜻은?", options: ["기자", "소설가", "타자수", "개발자"], answer: 2 },
    { id: "vq39", type: "multiple-choice", question: "'painter'의 한국어 뜻은?", options: ["페인트공, 화가", "목수", "요리사", "건축가"], answer: 0 },
    { id: "vq40", type: "multiple-choice", question: "'simply'의 한국어 뜻은?", options: ["복잡하게", "단순히, 그저", "특별하게", "완벽하게"], answer: 1 },
    { id: "vq41", type: "short-answer", question: "'위에 덧칠하다' 뜻을 가진 영어 표현을 쓰세요.", answer: "paint over" },
    { id: "vq42", type: "short-answer", question: "'자신만의'의 뜻을 가진 영단어를 쓰세요.", answer: "own" },
    { id: "vq43", type: "multiple-choice", question: "'coffee pot'의 한국어 뜻은?", options: ["커피 포트", "티백", "커피 잔", "커피 콩"], answer: 0 },
    { id: "vq44", type: "multiple-choice", question: "'building'의 한국어 뜻은?", options: ["운동장", "공원", "도로", "건물"], answer: 3 },
    { id: "vq45", type: "multiple-choice", question: "'software'의 한국어 뜻은?", options: ["하드웨어", "부품", "소프트웨어, 프로그램", "연결장치"], answer: 2 },
    { id: "vq46", type: "short-answer", question: "'지역의, 로컬의'의 뜻을 가진 영단어를 쓰세요.", answer: "local" },
    { id: "vq47", type: "short-answer", question: "'~의 앞에' 뜻을 가진 영어 표현을 쓰세요.", answer: "in front of" }
  ]
};

