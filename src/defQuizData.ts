export interface DefinitionQuestion {
  id: string;
  definition: string;
  options: string[];
  answer: number; // Index of the correct option
  word: string;
}

export const definitionQuizzes: Record<3 | 4, DefinitionQuestion[]> = {
  3: [
    {
      id: "dq3_1",
      definition: "a mountain with a large hole at the top, out of which lava, hot rocks, and ash sometimes explode",
      options: ["volcano", "pot", "lab", "wheel"],
      answer: 0,
      word: "volcano"
    },
    {
      id: "dq3_2",
      definition: "to burst or blow up with a loud noise",
      options: ["invent", "notice", "explode", "correct"],
      answer: 2,
      word: "explode"
    },
    {
      id: "dq3_3",
      definition: "extremely large in size or amount",
      options: ["empty", "huge", "disappointing", "present-day"],
      answer: 1,
      word: "huge"
    },
    {
      id: "dq3_4",
      definition: "the soft grey powder that remains after something has been burned",
      options: ["ash", "crop", "pot", "pedal"],
      answer: 0,
      word: "ash"
    },
    {
      id: "dq3_5",
      definition: "a plant such as wheat, rice, or fruit that is grown by farmers and used as food",
      options: ["century", "crop", "network", "volcano"],
      answer: 1,
      word: "crop"
    },
    {
      id: "dq3_6",
      definition: "something that happens because of something else",
      options: ["solution", "necessity", "result", "invention"],
      answer: 2,
      word: "result"
    },
    {
      id: "dq3_7",
      definition: "a period of 100 years",
      options: ["century", "trip", "present-day", "forward"],
      answer: 0,
      word: "century"
    },
    {
      id: "dq3_8",
      definition: "one of the round objects under a car, bicycle, etc. that turns when it moves",
      options: ["pedal", "pot", "wheel", "lab"],
      answer: 2,
      word: "wheel"
    },
    {
      id: "dq3_9",
      definition: "a lever that you push with your foot to make a bicycle or machine move",
      options: ["wheel", "pedal", "network", "trip"],
      answer: 1,
      word: "pedal"
    },
    {
      id: "dq3_10",
      definition: "towards the front or in the direction that you are facing",
      options: ["without", "empty", "forward", "present-day"],
      answer: 2,
      word: "forward"
    },
    {
      id: "dq3_11",
      definition: "existing or happening now, rather than in the past or the future",
      options: ["present-day", "century", "huge", "wooden"],
      answer: 0,
      word: "present-day"
    },
    {
      id: "dq3_12",
      definition: "to design or create something that has never been made before",
      options: ["notice", "invent", "explode", "correct"],
      answer: 1,
      word: "invent"
    },
    {
      id: "dq3_13",
      definition: "a useful new device or process that has been created",
      options: ["invention", "necessity", "solution", "network"],
      answer: 0,
      word: "invention"
    },
    {
      id: "dq3_14",
      definition: "something that you must have or do in a particular situation",
      options: ["result", "necessity", "invention", "solution"],
      answer: 1,
      word: "necessity"
    },
    {
      id: "dq3_15",
      definition: "to see, hear, or feel something and become aware of it",
      options: ["notice", "explode", "invent", "correct"],
      answer: 0,
      word: "notice"
    },
    {
      id: "dq3_16",
      definition: "a way of solving a problem or dealing with a difficult situation",
      options: ["necessity", "result", "solution", "network"],
      answer: 2,
      word: "solution"
    },
    {
      id: "dq3_17",
      definition: "not as good, successful, or clever as you hoped or expected",
      options: ["huge", "disappointing", "empty", "wooden"],
      answer: 1,
      word: "disappointing"
    },
    {
      id: "dq3_18",
      definition: "containing nothing inside",
      options: ["empty", "huge", "disappointing", "present-day"],
      answer: 0,
      word: "empty"
    },
    {
      id: "dq3_19",
      definition: "a person who studies something carefully to discover new information",
      options: ["researcher", "inventor", "typist", "painter"],
      answer: 0,
      word: "researcher"
    },
    {
      id: "dq3_20",
      definition: "a system of interconnected computers, phones, or people",
      options: ["network", "pot", "lab", "wheel"],
      answer: 0,
      word: "network"
    }
  ],
  4: [
    {
      id: "dq4_1",
      definition: "n. a suggestion that someone gives you about what you should do in a particular situation",
      options: ["budget", "advice", "decision", "strategy"],
      answer: 1,
      word: "advice"
    },
    {
      id: "dq4_2",
      definition: "n. money that you are given regularly",
      options: ["discount", "price", "allowance", "budget"],
      answer: 2,
      word: "allowance"
    },
    {
      id: "dq4_3",
      definition: "v. to drop a heavy object to keep a ship in one place / n. a heavy metal object dropped into the water to stop a ship from moving",
      options: ["treadmill", "virus", "anchor", "receipt"],
      answer: 2,
      word: "anchor"
    },
    {
      id: "dq4_4",
      definition: "n. the amount of money you have available to spend",
      options: ["budget", "price", "discount", "total"],
      answer: 0,
      word: "budget"
    },
    {
      id: "dq4_5",
      definition: "n. a lower price than usual",
      options: ["allowance", "price", "budget", "discount"],
      answer: 3,
      word: "discount"
    },
    {
      id: "dq4_6",
      definition: "to be tricked into believing something that is not true",
      options: ["hold on", "rely on", "fall for", "influence"],
      answer: 2,
      word: "fall for"
    },
    {
      id: "dq4_7",
      definition: "to wait or stop briefly",
      options: ["fall for", "rely on", "hold on", "spread"],
      answer: 2,
      word: "hold on"
    },
    {
      id: "dq4_8",
      definition: "n. the feeling that you need to eat",
      options: ["hunger", "viral", "virus", "similar"],
      answer: 0,
      word: "hunger"
    },
    {
      id: "dq4_9",
      definition: "v. to change someone's mind or have an effect on them",
      options: ["rely on", "influence", "spread", "fall for"],
      answer: 1,
      word: "influence"
    },
    {
      id: "dq4_10",
      definition: "a. kept within a particular size, range, time, etc.",
      options: ["popular", "similar", "limited", "viral"],
      answer: 2,
      word: "limited"
    },
    {
      id: "dq4_11",
      definition: "a. liked by a lot of people",
      options: ["limited", "popular", "similar", "viral"],
      answer: 1,
      word: "popular"
    },
    {
      id: "dq4_12",
      definition: "n. the amount of money you have to pay for something",
      options: ["discount", "budget", "allowance", "price"],
      answer: 3,
      word: "price"
    },
    {
      id: "dq4_13",
      definition: "n. something that is made to be sold",
      options: ["product", "receipt", "strategy", "treadmill"],
      answer: 0,
      word: "product"
    },
    {
      id: "dq4_14",
      definition: "n. a piece of paper that shows that you have paid for something",
      options: ["treadmill", "receipt", "product", "anchor"],
      answer: 1,
      word: "receipt"
    },
    {
      id: "dq4_15",
      definition: "to depend on or trust someone or something",
      options: ["hold on", "fall for", "rely on", "influence"],
      answer: 2,
      word: "rely on"
    },
    {
      id: "dq4_16",
      definition: "a. looking or being almost the same",
      options: ["limited", "similar", "popular", "viral"],
      answer: 1,
      word: "similar"
    },
    {
      id: "dq4_17",
      definition: "v. to cover or reach a wider or increasing area",
      options: ["anchor", "influence", "spread", "rely on"],
      answer: 2,
      word: "spread"
    },
    {
      id: "dq4_18",
      definition: "n. a detailed plan for achieving something or reaching a goal",
      options: ["strategy", "budget", "product", "total"],
      answer: 0,
      word: "strategy"
    },
    {
      id: "dq4_19",
      definition: "n. the number that you get when you add everything together",
      options: ["total", "budget", "discount", "allowance"],
      answer: 0,
      word: "total"
    },
    {
      id: "dq4_20",
      definition: "n. an exercise machine that allows the user to walk or run in place",
      options: ["treadmill", "anchor", "product", "receipt"],
      answer: 0,
      word: "treadmill"
    },
    {
      id: "dq4_21",
      definition: "a. spreading very quickly to many people, especially through the Internet",
      options: ["similar", "limited", "popular", "viral"],
      answer: 3,
      word: "viral"
    }
  ]
};
