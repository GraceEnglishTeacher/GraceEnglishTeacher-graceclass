import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Languages, 
  Info, 
  HelpCircle, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle,
  Menu,
  ChevronRight,
  Volume2
} from 'lucide-react';
import { worksheetData } from './data';
import { QuizQuestion, VocabularyItem } from './types';
import { irregularVerbCategories } from './verbData';

type Tab = 'vocabulary' | 'listening' | 'grammar' | 'reading' | 'verbs';
type SubTab = 'learn' | 'quiz' | 'review';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('learn');
  const [missedWords, setMissedWords] = useState<VocabularyItem[]>([]);
  
  const getVoice = useCallback((speaker?: 'G' | 'B' | 'A') => {
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter(v => v.lang.startsWith('en'));
    
    if (speaker === 'G') {
      return enVoices.find(v => v.name.toLowerCase().includes('female') || v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Victoria')) || enVoices[0];
    } else if (speaker === 'B') {
      return enVoices.find(v => v.name.toLowerCase().includes('male') || v.name.includes('Alex') || v.name.includes('Daniel') || v.name.includes('Fred') || v.name.includes('Google UK English Male')) || enVoices[0];
    }
    return enVoices[0];
  }, []);

  const speak = useCallback((text: string, speaker?: 'G' | 'B' | 'A') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getVoice(speaker);
      if (voice) utterance.voice = voice;
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, [getVoice]);

  const speakDialog = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      let currentLine = 0;

      const playNext = () => {
        if (currentLine < lines.length) {
          const rawLine = lines[currentLine].trim();
          let speaker: 'G' | 'B' | 'A' = 'A';
          let speechText = rawLine;

          if (rawLine.startsWith('G:')) {
            speaker = 'G';
            speechText = rawLine.replace('G:', '').trim();
          } else if (rawLine.startsWith('B:')) {
            speaker = 'B';
            speechText = rawLine.replace('B:', '').trim();
          }

          const utterance = new SpeechSynthesisUtterance(speechText);
          const voice = getVoice(speaker);
          if (voice) utterance.voice = voice;
          utterance.lang = 'en-US';
          utterance.rate = 0.9;
          
          utterance.onend = () => {
            currentLine++;
            setTimeout(playNext, 600); // 짧은 휴지기 후 다음 화자 재생
          };

          window.speechSynthesis.speak(utterance);
        }
      };

      playNext();
    }
  }, [getVoice]);

  const [quizStates, setQuizStates] = useState<Record<string, {
    currentQuestionIndex: number;
    score: number;
    isFinished: boolean;
    userAnswers: (string | number | null)[];
    feedback: boolean | null;
  }>>({
    vocabulary: {
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: Array(worksheetData.vocabularyQuiz.length).fill(null),
      feedback: null
    },
    grammar0: {
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: Array(worksheetData.grammar[0].exercises.length).fill(null),
      feedback: null
    },
    grammar1: {
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: Array(worksheetData.grammar[1].exercises.length).fill(null),
      feedback: null
    }
  });

  const handleAnswer = (quizId: string, questions: QuizQuestion[], answer: string | number) => {
    const state = quizStates[quizId] || {
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: Array(questions.length).fill(null),
      feedback: null
    };
    const question = questions[state.currentQuestionIndex];
    let isCorrect = false;

    if (question.type === 'multiple-choice') {
      isCorrect = answer === question.answer;
    } else {
      const userAnswer = String(answer).toLowerCase().trim();
      const correctAnswer = String(question.answer).toLowerCase().trim();
      isCorrect = userAnswer === correctAnswer;
    }

    if (quizId === 'vocabulary' && !isCorrect) {
      const missedWord = worksheetData.vocabulary[state.currentQuestionIndex];
      setMissedWords(prev => {
        if (prev.find(w => w.word === missedWord.word)) return prev;
        return [...prev, missedWord];
      });
    }
    
    setQuizStates(prev => {
      const currentState = prev[quizId] || {
        currentQuestionIndex: 0,
        score: 0,
        isFinished: false,
        userAnswers: Array(questions.length).fill(null),
        feedback: null
      };
      return {
        ...prev,
        [quizId]: {
          ...currentState,
          userAnswers: currentState.userAnswers.map((a, i) => i === state.currentQuestionIndex ? answer : a),
          feedback: isCorrect,
          score: isCorrect ? currentState.score + 1 : currentState.score
        }
      };
    });

    setTimeout(() => {
      setQuizStates(prev => {
        const currentState = prev[quizId] || {
          currentQuestionIndex: 0,
          score: 0,
          isFinished: false,
          userAnswers: Array(questions.length).fill(null),
          feedback: null
        };
        if (currentState.currentQuestionIndex < questions.length - 1) {
          return {
            ...prev,
            [quizId]: {
              ...currentState,
              currentQuestionIndex: currentState.currentQuestionIndex + 1,
              feedback: null
            }
          };
        } else {
          return {
            ...prev,
            [quizId]: {
              ...currentState,
              isFinished: true,
              feedback: null
            }
          };
        }
      });
    }, 800);
  };

  const selectTab = (tab: Tab | null) => {
    setActiveTab(tab);
    setActiveSubTab('learn');
  };

  const resetQuiz = (quizId: string, length: number) => {
    setQuizStates(prev => ({
      ...prev,
      [quizId]: {
        currentQuestionIndex: 0,
        score: 0,
        isFinished: false,
        userAnswers: Array(length).fill(null),
        feedback: null
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1A1A1A] pb-10">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E0] sticky top-0 z-50 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => selectTab(null)}
          >
            <div className="bg-[#5A5A40] text-white p-3 rounded-2xl shadow-sm">
              <BookOpen size={30} />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#1A1A1A] leading-none mb-1.5">{worksheetData.title}</h1>
              <span className="text-lg sm:text-xl lg:text-2xl text-[#5A5A40] font-black tracking-wide block">
                {worksheetData.unit}
              </span>
            </div>
          </div>
          {activeTab && (
            <button 
              onClick={() => selectTab(null)}
              className="flex items-center gap-2.5 text-base sm:text-lg font-extrabold bg-[#F8F8F5] px-5 py-2.5 rounded-full hover:bg-[#E5E5E0] transition-colors shadow-sm"
            >
              <ArrowLeft size={20} />
              메뉴로
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        <AnimatePresence mode="wait">
          {!activeTab ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <MenuCard 
                title="Voca Master" 
                subtitle="Vocabulary"
                description="30개의 필수 단어 발음을 듣고 퀴즈로 확인합니다."
                icon={<Languages className="text-amber-500" />}
                onClick={() => selectTab('vocabulary')}
                color="amber"
              />
              <MenuCard 
                title="Listening Master" 
                subtitle="Listening & Speaking"
                description="확신 여부 묻고 답하기, 정보 묻기 등 의사소통 기능을 학습하고 대화문을 듣습니다."
                icon={<HelpCircle className="text-blue-500" />}
                onClick={() => selectTab('listening')}
                color="blue"
              />
              <MenuCard 
                title="Grammar Master" 
                subtitle="Grammar"
                description="수동태와 have to 용법을 정리하고 문제를 풉니다."
                icon={<Info className="text-emerald-500" />}
                onClick={() => selectTab('grammar')}
                color="emerald"
              />
              <MenuCard 
                title="Reading Master" 
                subtitle="Reading"
                description="교과서 본문을 읽고 한글 번역과 함께 학습합니다."
                icon={<BookOpen className="text-rose-500" />}
                onClick={() => selectTab('reading')}
                color="rose"
              />
              <MenuCard 
                title="Verbs Master" 
                subtitle="Irregular Verbs"
                description="불규칙 동사 60개의 3단 변화(원형-과거형-과거분사형)를 발음과 퀴즈로 완성합니다."
                icon={<Languages className="text-[#8B5CF6]" />}
                onClick={() => selectTab('verbs')}
                color="violet"
              />
            </motion.div>
          ) : (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-[#E5E5E0]"
            >
              <SectionHeader tab={activeTab} />
              
              {activeTab === 'vocabulary' && (
                <>
                  <TabSwitcher active={activeSubTab} onChange={setActiveSubTab} showReview={missedWords.length > 0} hideLearn={activeSubTab === 'quiz'} />
                  {activeSubTab === 'learn' ? (
                    <VocabularySection onSpeak={speak} />
                  ) : activeSubTab === 'quiz' ? (
                    <QuizSection 
                      questions={worksheetData.vocabularyQuiz}
                      state={quizStates.vocabulary} 
                      handleAnswer={(ans: any) => handleAnswer('vocabulary', worksheetData.vocabularyQuiz, ans)} 
                      onReset={() => resetQuiz('vocabulary', worksheetData.vocabularyQuiz.length)}
                    />
                  ) : (
                    <ReviewSection words={missedWords} />
                  )}
                </>
              )}

              {activeTab === 'listening' && (
                <ListeningSection onSpeak={speak} onSpeakDialog={speakDialog} />
              )}

              {activeTab === 'grammar' && (
                <div className="space-y-12">
                  <TabSwitcher active={activeSubTab} onChange={setActiveSubTab} />
                  {activeSubTab === 'learn' ? (
                    <GrammarSection />
                  ) : (
                    <div className="space-y-20">
                      {worksheetData.grammar.map((g, idx) => (
                        <div key={idx}>
                          <h3 className="text-xl font-bold mb-6 text-[#5A5A40]">[{g.title}] 연습 문제</h3>
                          <QuizSection 
                            questions={g.exercises}
                            state={quizStates[`grammar${idx}`]} 
                            handleAnswer={(ans: any) => handleAnswer(`grammar${idx}`, g.exercises, ans)} 
                            onReset={() => resetQuiz(`grammar${idx}`, g.exercises.length)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reading' && (
                <ReadingSection 
                  onSpeak={speak}
                  quizStates={quizStates}
                  handleAnswer={handleAnswer}
                  resetQuiz={resetQuiz}
                />
              )}

              {activeTab === 'verbs' && (
                <VerbsSection />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ReviewSection({ words }: { words: VocabularyItem[] }) {
  const [inputs, setInputs] = useState<Record<string, { english: string[], korean: string[] }>>({});

  const handleInputChange = (word: string, type: 'english' | 'korean', index: number, value: string) => {
    setInputs(prev => {
      const wordData = prev[word] || { english: ['', '', ''], korean: ['', '', ''] };
      const newList = [...wordData[type]];
      newList[index] = value;
      return {
        ...prev,
        [word]: {
          ...wordData,
          [type]: newList
        }
      };
    });
  };

  if (words.length === 0) {
    return (
      <div className="text-center py-20 bg-[#F8F8F5] rounded-3xl border-2 border-dashed border-[#E5E5E0]">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4 opacity-20" />
        <p className="text-xl font-bold text-[#8A8A80]">틀린 단어가 없습니다! 완벽해요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex items-start gap-4">
        <Info className="text-orange-500 shrink-0 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-orange-800">오답 복습하기</h4>
          <p className="text-sm text-orange-700 leading-relaxed">
            퀴즈에서 틀린 단어들입니다. 각 단어마다 영어 스펠링과 한글 뜻을 <span className="font-black text-orange-900 underline">3번씩</span> 써보며 익혀보세요.
          </p>
        </div>
      </div>

      <div className="space-y-16">
        {words.map((item, idx) => {
          const wordInputs = inputs[item.word] || { english: ['', '', ''], korean: ['', '', ''] };
          
          return (
            <motion.div 
              key={item.word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-black text-xs">
                  {idx + 1}
                </span>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">{item.word}</h3>
                <span className="text-lg font-bold text-[#8A8A80]">— {item.meaning}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* English Practice */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8A8A80] mb-2 block">English Spelling (3 times)</span>
                  {[0, 1, 2].map(i => {
                    const isCorrect = wordInputs.english[i].trim().toLowerCase() === item.word.toLowerCase();
                    return (
                      <div key={i} className="relative group">
                        <input 
                          type="text"
                          value={wordInputs.english[i]}
                          onChange={(e) => handleInputChange(item.word, 'english', i, e.target.value)}
                          placeholder={`${i + 1}. ${item.word}`}
                          className={`w-full p-4 rounded-xl border-2 font-bold focus:outline-none transition-all ${
                            isCorrect 
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                              : wordInputs.english[i] ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-[#F0F0EB] focus:border-[#1A1A1A]'
                          }`}
                        />
                        {isCorrect && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                            <CheckCircle2 size={18} />
                          </div>
                        )}
                        {!isCorrect && wordInputs.english[i] && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500">
                            <XCircle size={18} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Korean Practice */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8A8A80] mb-2 block">Korean Meaning (3 times)</span>
                  {[0, 1, 2].map(i => {
                    const isCorrect = wordInputs.korean[i].trim() === item.meaning;
                    return (
                      <div key={i} className="relative group">
                        <input 
                          type="text"
                          value={wordInputs.korean[i]}
                          onChange={(e) => handleInputChange(item.word, 'korean', i, e.target.value)}
                          placeholder={`${i + 1}. ${item.meaning}`}
                          className={`w-full p-4 rounded-xl border-2 font-bold focus:outline-none transition-all ${
                            isCorrect 
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                              : wordInputs.korean[i] ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-[#F0F0EB] focus:border-[#1A1A1A]'
                          }`}
                        />
                         {isCorrect && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                            <CheckCircle2 size={18} />
                          </div>
                        )}
                        {!isCorrect && wordInputs.korean[i] && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500">
                            <XCircle size={18} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="h-0.5 w-full bg-[#F0F0EB] mt-12 mb-4" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ReadingGrammarAnalysis({ story, onSpeak }: { story: any, onSpeak: (text: string) => void }) {
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number | null>(0);

  if (!story.analysis) {
    return (
      <div className="p-8 text-center bg-[#F8F8F5] border border-[#E5E5E0] rounded-2xl text-[#8A8A80] font-bold">
        어법 분석 데이터가 존재하지 않습니다.
      </div>
    );
  }

  // A helper to highlight / underline specific words inside the english sentence for display
  const highlightSentence = (sentence: any) => {
    let text = sentence.english;
    const highlights = sentence.highlights || [];
    const underlines = sentence.underlines || [];
    const connectors = sentence.connectors || [];

    // Combine all and sort by length descending to avoid partial matches on nested words
    const tokens = [
      ...highlights.map(h => ({ val: h, type: 'highlight' })),
      ...underlines.map(u => ({ val: u, type: 'underline' })),
      ...connectors.map(c => ({ val: c, type: 'connector' }))
    ].sort((a, b) => b.val.length - a.val.length);

    if (tokens.length === 0) return <span className="break-keep">{text}</span>;

    // Create a regex that matches any of the targets
    const escapedTerms = tokens.map(t => t.val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');

    const parts = text.split(regex);
    return (
      <span className="break-keep">
        {parts.map((part: string, idx: number) => {
          const matchToken = tokens.find(t => t.val.toLowerCase() === part.toLowerCase());
          if (matchToken) {
            if (matchToken.type === 'highlight') {
              return (
                <span 
                  key={idx} 
                  className="bg-sky-100/90 text-sky-900 border-b-2 border-sky-400 font-extrabold px-1.5 py-0.5 mx-0.5 rounded transition-all inline-block whitespace-nowrap break-keep"
                  title="서술어 동사 / 수동태 / 진행형"
                >
                  {part}
                </span>
              );
            }
            if (matchToken.type === 'underline') {
              return (
                <span 
                  key={idx} 
                  className="underline decoration-rose-500 decoration-2 underline-offset-4 font-black text-neutral-800 mx-0.5 inline-block whitespace-nowrap break-keep"
                  title="핵심 어휘"
                >
                  {part}
                </span>
              );
            }
            if (matchToken.type === 'connector') {
              return (
                <span 
                  key={idx} 
                  className="inline-block px-2.5 py-0.5 mx-1 border border-rose-400 bg-rose-50 text-rose-600 rounded-full font-black text-xs whitespace-nowrap break-keep"
                  title="접속사 / 연결어"
                >
                  {part}
                </span>
              );
            }
          }
          return <span key={idx}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50/50 border border-amber-200/60 p-5 rounded-2xl flex items-start gap-4">
        <Info className="text-[#5A5A40] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-extrabold text-[#1A1A1A] text-sm">구문 및 어법 상세 분석 모드</h4>
          <p className="text-xs text-[#6B6B60] leading-relaxed mt-1">
            본문의 문장을 선택하여 각 문장의 <strong>문법 구조, 수동태, to부정사 용법 및 핵심 어휘</strong> 설명을 상세하게 공부할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sentences list */}
        <div className="lg:col-span-7 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {story.analysis.map((sentence: any, idx: number) => {
            const isActive = activeSentenceIdx === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setActiveSentenceIdx(idx)}
                whileHover={{ x: 2 }}
                className={`p-4 rounded-2xl cursor-pointer border text-left transition-all ${
                  isActive
                    ? 'bg-white border-[#5A5A40] shadow-md ring-1 ring-[#5A5A40]'
                    : 'bg-[#F8F8F5] border-[#E5E5E0] hover:border-[#8A8A80] hover:bg-white'
                }`}
              >
                <div className="flex gap-2 items-start">
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 mt-1 ${
                    isActive ? 'bg-[#5A5A40] text-white' : 'bg-[#E5E5E0] text-[#5A5A40]'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="space-y-2 w-full">
                    <p className={`text-base md:text-lg font-bold leading-relaxed tracking-tight break-keep ${
                      isActive ? 'text-[#1A1A1A]' : 'text-neutral-500'
                    }`}>
                      {isActive ? highlightSentence(sentence) : sentence.english}
                    </p>
                    <p className={`text-xs sm:text-sm md:text-[15px] font-medium break-keep ${isActive ? 'text-[#8A8A80]' : 'text-[#A0A090]'}`}>
                      {sentence.korean}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right detailed explanation panel */}
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-8">
          <AnimatePresence mode="wait">
            {activeSentenceIdx !== null ? (
              <motion.div
                key={activeSentenceIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#F8F8F5] p-6 rounded-3xl border border-[#E5E5E0] space-y-6 shadow-sm"
              >
                {/* Panel Header */}
                <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E0]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#5A5A40] text-white text-xs font-bold flex items-center justify-center">
                      {activeSentenceIdx + 1}
                    </span>
                    <h5 className="font-extrabold text-[#1A1A1A] text-sm">구문 분석 상세 카드</h5>
                  </div>
                  <button 
                    onClick={() => onSpeak(story.analysis[activeSentenceIdx].english)}
                    className="p-1.5 rounded-lg bg-white border border-[#E5E5E0] text-[#5A5A40] hover:bg-[#F0F0EB] transition-colors"
                    title="문장 듣기"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>

                {/* Sentence review */}
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#8A8A80] uppercase tracking-widest text-[10px]">Sentence</p>
                  <p className="text-base md:text-lg font-extrabold text-[#1A1A1A] leading-relaxed break-keep">
                    {highlightSentence(story.analysis[activeSentenceIdx])}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#5A5A40] leading-relaxed bg-white/60 p-2.5 rounded-xl border border-[#E5E5E0]/40 break-keep">
                    {story.analysis[activeSentenceIdx].korean}
                  </p>
                </div>

                {/* Grammar explanations */}
                {story.analysis[activeSentenceIdx].grammar.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-black text-[#8A8A80] uppercase tracking-widest">구문 및 어법 분석</p>
                    <div className="space-y-3">
                       {story.analysis[activeSentenceIdx].grammar.map((g: any, gIdx: number) => (
                        <div key={gIdx} className="bg-amber-50/40 p-4 rounded-xl border border-amber-100 space-y-1.5 break-keep">
                          <span className="inline-block px-3 py-1 text-base sm:text-lg font-extrabold rounded-md bg-[#5A5A40] text-white mb-2 break-keep">
                            {g.phrase}
                          </span>
                          <p className="text-base sm:text-lg font-bold leading-relaxed text-[#5A5A40] whitespace-pre-line break-keep">
                            {g.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vocabulary breakdowns */}
                {story.analysis[activeSentenceIdx].vocabulary.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-black text-[#8A8A80] uppercase tracking-widest">어휘 및 단어 풀이</p>
                    <div className="grid grid-cols-1 gap-2 bg-white p-4 rounded-xl border border-[#E5E5E0]">
                      {story.analysis[activeSentenceIdx].vocabulary.map((v: any, vIdx: number) => (
                        <div key={vIdx} className="flex justify-between items-center text-base sm:text-lg py-3 border-b border-gray-100 last:border-0 gap-4 break-keep">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-neutral-800 break-keep whitespace-nowrap">{v.word}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 border text-neutral-500 font-extrabold break-keep whitespace-nowrap">
                              {v.pos}
                            </span>
                          </div>
                          <span className="font-extrabold text-[#5A5A40] text-right break-keep">{v.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {story.analysis[activeSentenceIdx].grammar.length === 0 && story.analysis[activeSentenceIdx].vocabulary.length === 0 && (
                  <div className="text-center py-6 text-xs font-bold text-gray-400">
                    추가적인 구문/어휘 분석이 필요 없는 간단한 구절입니다.
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="bg-[#F8F8F5] p-8 text-center border border-[#E5E5E0] rounded-3xl text-sm font-bold text-[#8A8A80] h-64 flex flex-col justify-center items-center">
                <BookOpen size={32} className="opacity-20 mb-3 text-[#5A5A40]" />
                왼쪽 목록에서 분석하고 싶은 문장을 선택해보세요.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ReadingSection({ onSpeak, quizStates, handleAnswer, resetQuiz }: {
  onSpeak: (text: string) => void,
  quizStates: any,
  handleAnswer: (quizId: string, questions: QuizQuestion[], answer: string | number) => void,
  resetQuiz: (quizId: string, length: number) => void
}) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [showKorean, setShowKorean] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [subTab, setSubTab] = useState<'learn' | 'quiz'>('learn');

  const story = worksheetData.reading[activeStoryIdx];
  const quizId = `reading_${story.id}`;

  const currentState = quizStates[quizId] || {
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
    userAnswers: Array(story.exercises.length).fill(null),
    feedback: null
  };

  return (
    <div className="space-y-8">
      {/* Story Select Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {worksheetData.reading.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveStoryIdx(idx);
              setSubTab('learn');
              setShowAnalysis(false); // Reset analysis tab on story change
            }}
            className={`p-6 rounded-2xl text-left border-2 transition-all flex items-center group h-28 ${
              activeStoryIdx === idx
                ? 'border-rose-500 bg-rose-50/20 shadow-md scale-[1.01]'
                : 'border-[#E5E5E0] bg-white hover:border-rose-200'
            }`}
          >
            <div className="flex items-center gap-4 w-full">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                activeStoryIdx === idx ? 'bg-rose-500 text-white' : 'bg-[#F0F0EB] text-[#8A8A80]'
              }`}>
                {idx + 1}
              </span>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-[#1A1A1A] break-keep group-hover:text-rose-600 transition-colors">
                  {item.title.replace(/\s+/g, '')}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Sub Tab Switcher */}
      <div className="flex bg-[#F8F8F5] p-1.5 rounded-2xl w-fit mx-auto border border-[#E5E5E0]">
        {subTab !== 'quiz' && (
          <button 
            onClick={() => setSubTab('learn')}
            className={`px-8 py-2.5 rounded-xl font-bold text-base transition-all ${
              subTab === 'learn' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'
            }`}
          >
            학습하기
          </button>
        )}
        <button 
          onClick={() => setSubTab('quiz')}
          className={`px-8 py-2.5 rounded-xl font-bold text-base transition-all ${
            subTab === 'quiz' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'
          }`}
        >
          퀴즈풀기
        </button>
      </div>

      {subTab === 'learn' ? (
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center bg-[#F8F8F5] p-3 rounded-2xl border border-[#E5E5E0]">
            <span className="text-lg sm:text-xl md:text-2xl font-black px-4 text-[#5A5A40] whitespace-nowrap">{story.title} 본문 학습</span>
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => onSpeak(story.english)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#E5E5E0] text-xs sm:text-sm font-bold text-[#5A5A40] hover:bg-[#F0F0EB] transition-colors shadow-sm"
                title="본문 전체 듣기"
              >
                <Volume2 size={16} />
                전체 듣기
              </button>
              
              <div className="w-px h-6 bg-[#E5E5E0]" />

              <button
                onClick={() => {
                  setShowAnalysis(!showAnalysis);
                  if (!showAnalysis) setShowKorean(false); // coordinate translated view off by default
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  showAnalysis 
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                    : 'bg-white border-[#E5E5E0] text-[#5A5A40] hover:bg-[#F0F0EB]'
                }`}
              >
                <BookOpen size={16} />
                구문 분석 보기
              </button>

              {!showAnalysis && (
                <>
                  <div className="w-px h-6 bg-[#E5E5E0]" />
                  <span className="text-xs font-bold text-[#8A8A80]">번역 보기</span>
                  <button 
                    onClick={() => setShowKorean(!showKorean)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                      showKorean ? 'bg-[#5A5A40]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      showKorean ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </>
              )}
            </div>
          </div>

          {showAnalysis ? (
            <ReadingGrammarAnalysis story={story} onSpeak={onSpeak} />
          ) : (
            <div className="grid grid-cols-1 gap-12">
              <div className="bg-[#F8F8F5] p-8 rounded-3xl relative border border-[#E5E5E0]">
                <div className="absolute -top-4 left-8 bg-[#5A5A40] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  English
                </div>
                <div className="space-y-1 md:space-y-2">
                  {story.english.split('\n\n').filter(p => p.trim() !== '').map((para, pIdx) => (
                    <p 
                      key={pIdx} 
                      className="text-xl md:text-2xl leading-relaxed md:leading-loose font-bold text-neutral-600 tracking-tight font-sans text-justify"
                      style={{ textIndent: '1.5em' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {showKorean && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-3xl border border-[#E5E5E0] relative"
                >
                  <div className="absolute -top-4 left-8 bg-[#E5E5E0] text-[#5A5A40] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Korean
                  </div>
                  <p className="text-lg sm:text-xl leading-[1.8] text-[#5A5A50] whitespace-pre-line">
                    {story.korean}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#F8F8F5] border border-[#E5E5E0] p-6 rounded-2xl flex items-start gap-4">
            <Info className="text-[#5A5A40] shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-[#1A1A1A]">이해력 확인 퀴즈 (5문항)</h4>
              <p className="text-sm text-[#6B6B60] leading-relaxed">
                본문의 내용을 바탕으로 질문에 답해보세요. 객관식과 단답식 형태의 문항으로 독해 실력을 확인할 수 있습니다.
              </p>
            </div>
          </div>
          
          <QuizSection 
            questions={story.exercises}
            state={currentState}
            handleAnswer={(ans: any) => handleAnswer(quizId, story.exercises, ans)}
            onReset={() => resetQuiz(quizId, story.exercises.length)}
          />
        </div>
      )}
    </div>
  );
}

function MenuCard({ title, subtitle, description, icon, onClick, color, className = "" }: any) {
  const colors = {
    blue: 'hover:border-blue-200 hover:bg-blue-50/30',
    amber: 'hover:border-amber-200 hover:bg-amber-50/30',
    emerald: 'hover:border-emerald-200 hover:bg-emerald-50/30',
    rose: 'hover:border-rose-200 hover:bg-rose-50/30',
    violet: 'hover:border-violet-200 hover:bg-violet-50/30',
  };

  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`bg-white p-10 rounded-[2rem] border border-[#E5E5E0] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between h-full ${colors[color as keyof typeof colors]} ${className}`}
    >
      <div>
        <div className="bg-[#F8F8F5] w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 [&_svg]:w-8 [&_svg]:h-8">
          {icon}
        </div>
        <div className="mb-4">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase opacity-40 block mb-1.5">{subtitle}</span>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">{title}</h3>
        </div>
        <p className={`text-[#6B6B6B] text-base sm:text-lg leading-relaxed break-keep ${typeof description === 'string' && description.length < 35 ? 'whitespace-nowrap' : ''}`}>{description}</p>
      </div>
      <div className="mt-8 flex items-center text-sm sm:text-base font-bold gap-1 text-[#5A5A40] group">
        학습 시작하기 <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}

function TabSwitcher({ active, onChange, showReview = false, hideLearn = false }: { active: SubTab, onChange: (t: SubTab) => void, showReview?: boolean, hideLearn?: boolean }) {
  return (
    <div className="flex bg-[#F8F8F5] p-1.5 rounded-2xl mb-8 w-fit mx-auto border border-[#E5E5E0]">
      {!hideLearn && (
        <button 
          onClick={() => onChange('learn')}
          className={`px-8 py-2.5 rounded-xl font-bold text-base sm:text-lg transition-all ${active === 'learn' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
        >
          학습하기
        </button>
      )}
      <button 
        onClick={() => onChange('quiz')}
        className={`px-8 py-2.5 rounded-xl font-bold text-base sm:text-lg transition-all ${active === 'quiz' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
      >
        퀴즈풀기
      </button>
      {showReview && (
        <button 
          onClick={() => onChange('review')}
          className={`px-8 py-2.5 rounded-xl font-bold text-base sm:text-lg transition-all ${active === 'review' ? 'bg-orange-600 text-white shadow-md' : 'text-[#8A8A80] hover:text-orange-600'}`}
        >
          오답 복습
        </button>
      )}
    </div>
  );
}

function SectionHeader({ tab }: { tab: Tab }) {
  const titles: Record<Tab, { main: string; sub: string }> = {
    'vocabulary': { main: 'Voca Master', sub: 'Vocabulary' },
    'listening': { main: 'Listening Master', sub: 'Listening & Speaking' },
    'grammar': { main: 'Grammar Master', sub: 'Grammar' },
    'reading': { main: 'Reading Master', sub: 'Reading' },
    'verbs': { main: 'Verbs Master', sub: 'Irregular Verbs (불규칙동사)' },
  };

  return (
    <div className="mb-8 pb-6 border-b border-[#F0F0EB]">
      <span className="text-xs font-bold tracking-widest uppercase text-[#5A5A40] opacity-60">
        {titles[tab].sub}
      </span>
      <h2 className="text-3xl font-bold mt-1 text-[#1A1A1A]">{titles[tab].main}</h2>
    </div>
  );
}

function TextSection({ title, english, korean, onSpeak }: { title: string, english: string, korean: string, onSpeak?: (text: string) => void }) {
  const [showKorean, setShowKorean] = useState(true);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center bg-[#F8F8F5] p-2 rounded-xl">
        <span className="text-sm font-bold px-4 text-[#5A5A40]">{title}</span>
        <div className="flex items-center gap-3">
          {onSpeak && (
            <button 
              onClick={() => onSpeak(english)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#E5E5E0] text-sm font-bold text-[#5A5A40] hover:bg-[#F0F0EB] transition-colors shadow-sm"
              title="전체 듣기"
            >
              <Volume2 size={16} />
              전체 듣기
            </button>
          )}
          <div className="w-px h-6 bg-[#E5E5E0] mx-1" />
          <span className="text-xs font-bold text-[#8A8A80]">번역 보기</span>
          <button 
            onClick={() => setShowKorean(!showKorean)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${showKorean ? 'bg-[#5A5A40]' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${showKorean ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <div className="bg-[#F8F8F5] p-8 rounded-3xl relative border border-[#E5E5E0]">
          <div className="absolute -top-4 left-8 bg-[#5A5A40] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            English
          </div>
          <p className="text-xl leading-[2] font-medium text-[#2A2A2A] whitespace-pre-line font-serif italic">
            {english}
          </p>
        </div>

        {showKorean && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-[#E5E5E0] relative"
          >
            <div className="absolute -top-4 left-8 bg-[#E5E5E0] text-[#5A5A40] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Korean
            </div>
            <p className="text-lg leading-[1.8] text-[#5A5A50] whitespace-pre-line">
              {korean}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function VocabularySection({ onSpeak }: { onSpeak: (text: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {worksheetData.vocabulary.map((item, id) => (
        <motion.div 
          key={item.word}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: id * 0.02 }}
          className="p-6 bg-[#F8F8F5] rounded-2xl border border-transparent hover:border-[#E5E5E0] transition-colors group relative"
        >
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="text-2xl font-bold text-[#5A5A40] underline decoration-[#CED4DA] underline-offset-4">{item.word}</h4>
              <button 
                onClick={() => onSpeak(item.word)}
                className="p-1.5 rounded-full bg-white text-[#8A8A80] hover:text-[#5A5A40] hover:bg-[#E5E5E0] transition-all shadow-sm"
                title="발음 듣기"
              >
                <Volume2 size={18} />
              </button>
            </div>
            <span className="text-lg font-bold text-[#1A1A1A]">{item.meaning}</span>
          </div>
          {item.example && (
            <div className="mt-4 border-l-4 border-amber-500/20 pl-4 py-2 flex items-start gap-3 bg-white/50 rounded-r-xl">
              <p className="text-base italic text-[#4A4A40] font-medium leading-relaxed flex-1">
                {item.example}
              </p>
              <button 
                onClick={() => onSpeak(item.example!)}
                className="p-1.5 rounded-full bg-white text-[#8A8A80] hover:text-[#5A5A40] transition-all shadow-sm flex-shrink-0"
              >
                <Volume2 size={16} />
              </button>
            </div>
          )}
          <div className="absolute top-2 right-4 text-[10px] font-bold opacity-10">{id + 1}</div>
        </motion.div>
      ))}
    </div>
  );
}

function ListeningSection({ onSpeak, onSpeakDialog }: { onSpeak: (text: string, speaker?: 'G' | 'B' | 'A') => void, onSpeakDialog: (text: string) => void }) {
  return (
    <div className="space-y-16">
      {/* Communication Functions */}
      <div className="space-y-10">
        {worksheetData.listening.functions.map((fn, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#F8F8F5] rounded-[2rem] overflow-hidden border border-[#E5E5E0] shadow-sm"
          >
            <div className="bg-[#1A1A1A] text-white p-6 md:p-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-[#5A5A40] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest text-[#F5F5F0]">Lesson 3</span>
                <span className="text-sm font-bold opacity-60">의사소통 기능 {idx + 1}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{fn.title}</h3>
            </div>
            
            <div className="p-8 md:p-10 space-y-8">
              <p className="text-[#5A5A50] text-lg font-medium leading-relaxed italic border-b border-[#E5E5E0] pb-6">
                {fn.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fn.details.map((detail, dIdx) => (
                  <div key={dIdx} className="bg-white p-6 rounded-2xl border border-[#F0F0EB] shadow-sm">
                    <span className="block text-emerald-600 font-black text-sm mb-2 uppercase tracking-tighter">{detail.label}</span>
                    <p className="font-bold text-[#1A1A1A] text-lg leading-snug">{detail.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-white p-8 rounded-3xl border-2 border-dashed border-[#E5E5E0]">
                <div className="bg-rose-500 text-white w-fit px-4 py-1 rounded-full text-xs font-bold mb-6 italic">Example Dialogue</div>
                <div className="space-y-6">
                  {fn.examples.map((ex, eIdx) => (
                    <div key={eIdx} className="flex gap-6 items-start">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black shrink-0 shadow-sm ${ex.speaker === 'A' ? 'bg-[#1A1A1A] text-white' : 'bg-[#5A5A40] text-[#F5F5F0]'}`}>
                        {ex.speaker}
                      </div>
                      <div className="flex items-center gap-3 group">
                        <p className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{ex.text}</p>
                        <button 
                          onClick={() => onSpeak(ex.text, ex.speaker as 'G' | 'B' | 'A')}
                          className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-[#8A8A80] hover:text-[#5A5A40] hover:bg-[#F8F8F5]"
                        >
                          <Volume2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Dialogs */}
      <div className="pt-10 border-t-2 border-[#F0F0EB] space-y-10">
        <h3 className="text-2xl font-black text-[#1A1A1A] px-2 flex items-center gap-3">
          <Languages className="text-[#5A5A40]" />
          Listening Dialogs
        </h3>
        <div className="space-y-6">
          {worksheetData.listening.dialogs.map((dialog, idx) => (
            <DialogBlock 
              key={idx} 
              dialog={dialog} 
              onSpeakDialog={onSpeakDialog} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface DialogBlockProps {
  dialog: {
    title: string;
    english: string;
    korean: string;
    exercises: QuizQuestion[];
  };
  onSpeakDialog: (text: string) => void;
}

const DialogBlock: React.FC<DialogBlockProps> = ({ dialog, onSpeakDialog }) => {
  const [viewMode, setViewMode] = useState<'dialog' | 'quiz'>('dialog');
  const [showKorean, setShowKorean] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] border border-[#E5E5E0] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="bg-[#F8F8F5] p-5 md:px-8 flex items-center justify-between border-b border-[#E5E5E0] flex-wrap gap-4">
        <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A1A1A] opacity-90 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#5A5A40] shrink-0" />
          {dialog.title}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSpeakDialog(dialog.english)}
            className="flex items-center gap-2 bg-white text-[#5A5A40] px-5 py-2.5 rounded-xl text-sm sm:text-base font-extrabold border border-[#E5E5E0] hover:bg-[#F0F0EB] transition-all shadow-sm active:scale-95"
          >
            <Volume2 size={18} />
            Listen
          </button>
          {viewMode === 'dialog' && (
            <button 
              onClick={() => setShowKorean(!showKorean)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-extrabold border transition-all shadow-sm active:scale-95 ${showKorean ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'bg-white text-[#5A5A40] border-[#E5E5E0] hover:bg-[#F0F0EB]'}`}
            >
              <Languages size={18} />
              {showKorean ? 'Hide Translation' : 'Translate'}
            </button>
          )}
          <div className="bg-white p-1 rounded-2xl border border-[#E5E5E0] flex gap-1 ml-2">
            <button 
              onClick={() => setViewMode('dialog')}
              className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-black transition-all ${viewMode === 'dialog' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
            >
              Dialogue
            </button>
            <button 
              onClick={() => setViewMode('quiz')}
              className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-black transition-all ${viewMode === 'quiz' ? 'bg-[#5A5A40] text-white shadow-lg' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
            >
              Quiz
            </button>
          </div>
        </div>
      </div>
      <div className="p-8 md:p-10">
        {viewMode === 'dialog' ? (
          <div className="space-y-8">
            <div className="space-y-4">
              {dialog.english.split('\n').map((line: string, lIdx: number) => {
                const isG = line.startsWith('G:');
                const isB = line.startsWith('B:');
                const text = line.replace(/^[GB]:\s*/, '');
                return (
                  <div key={lIdx} className="flex gap-4 md:gap-6 items-start">
                    {(isG || isB) && (
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black shrink-0 text-sm shadow-sm ${isG ? 'bg-[#1A1A1A] text-white' : 'bg-[#5A5A40] text-[#F5F5F0]'}`}>
                        {isG ? 'G' : 'B'}
                      </div>
                    )}
                    <p className="text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tight leading-relaxed pt-1 flex-1">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {showKorean && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-8 border-t border-dashed border-[#E5E5E0] space-y-4"
              >
                {dialog.korean.split('\n').map((line: string, lIdx: number) => {
                  const text = line.replace(/^[여남]:\s*/, '');
                  const isGirl = line.startsWith('여:');
                  return (
                    <div key={lIdx} className="flex gap-4 md:gap-6 items-start">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 text-[10px] opacity-40 border border-[#1A1A1A]/10`}>
                        {isGirl ? '여' : '남'}
                      </div>
                      <p className="text-base md:text-lg font-bold text-[#6B6B60] leading-relaxed pt-1">
                        {text}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {dialog.exercises.map((q: any, qIdx: number) => (
              <div key={q.id} className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs shrink-0">
                    Q{qIdx + 1}
                  </div>
                  <p className="text-xl font-bold text-[#1A1A1A]">{q.question}</p>
                </div>

                {q.type === 'multiple-choice' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                    {q.options.map((option: string, oIdx: number) => {
                      const isSelected = answers[q.id] === oIdx;
                      const isCorrect = oIdx === q.answer;
                      const showResult = showResults[q.id];
                      
                      return (
                        <button
                          key={oIdx}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                          disabled={showResult}
                          className={`p-4 rounded-2xl text-left font-bold border-2 transition-all ${
                            showResult
                              ? isCorrect 
                                ? 'bg-green-50 border-green-500 text-green-700'
                                : isSelected 
                                  ? 'bg-red-50 border-red-500 text-red-700'
                                  : 'bg-white border-[#E5E5E0] text-[#8A8A80]'
                              : isSelected
                                ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-lg'
                                : 'bg-white border-[#E5E5E0] text-[#5A5A40] hover:border-[#1A1A1A]'
                          }`}
                        >
                          <span className="opacity-40 mr-3">{oIdx + 1}.</span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pl-12 space-y-3">
                    <input 
                      type="text"
                      placeholder="답변 입력..."
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      disabled={showResults[q.id]}
                      className={`w-full max-w-md p-4 rounded-2xl border-2 font-bold focus:outline-none transition-all ${
                        showResults[q.id]
                          ? answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'bg-red-50 border-red-500 text-red-700'
                          : 'bg-white border-[#E5E5E0] focus:border-[#1A1A1A] text-[#1A1A1A]'
                      }`}
                    />
                    {showResults[q.id] && answers[q.id]?.toLowerCase().trim() !== q.answer.toLowerCase().trim() && (
                      <p className="text-sm font-bold text-green-600">정답: {q.answer}</p>
                    )}
                  </div>
                )}
                
                <div className="pl-12 flex items-center gap-4">
                   <button 
                    onClick={() => setShowResults(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="flex items-center gap-2 text-xs font-black text-[#8A8A80] hover:text-[#1A1A1A] transition-colors"
                  >
                    <CheckCircle2 size={14} />
                    {showResults[q.id] ? '수정하기' : '정답확인'}
                  </button>
                  {showResults[q.id] && (
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      (q.type === 'multiple-choice' ? answers[q.id] === q.answer : answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim())
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {(q.type === 'multiple-choice' ? answers[q.id] === q.answer : answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) ? 'Correct' : 'Try Again'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function GrammarSection() {
  return (
    <div className="space-y-8">
      {worksheetData.grammar.map((item, id) => (
        <motion.div 
          key={item.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: id * 0.1 }}
          className="bg-white rounded-3xl border border-[#E5E5E0] overflow-hidden shadow-sm"
        >
          <div className="bg-[#F8F8F5] px-8 py-6 flex items-center gap-4">
            <div className="bg-emerald-500 w-2.5 h-8 rounded-full" />
            <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1A]">{item.title}</h4>
          </div>
          <div className="p-8 pb-10">
            <p className="text-[#3A3A30] mb-8 leading-relaxed bg-[#F8F8F5] p-6 rounded-2xl text-xl sm:text-2xl font-bold border-l-[6px] border-emerald-500 whitespace-pre-line">
              {item.explanation}
            </p>
            <div className="space-y-4">
              {item.examples.map((ex, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="mt-2.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 shadow-sm shadow-emerald-200" />
                  <p className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{ex}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function QuizSection({ questions, state, handleAnswer, onReset }: any) {
  const [inputValue, setInputValue] = useState('');

  if (state.isFinished) {
    const correctCount = state.score;
    const totalCount = questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    return (
      <div className="space-y-8">
        <div className="text-center py-10 bg-[#F8F8F5] rounded-3xl p-10 border-2 border-dashed border-[#E5E5E0]">
          <div className="w-24 h-24 bg-white text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-emerald-50">
            <CheckCircle2 size={56} />
          </div>
          <h3 className="text-3xl font-black mb-2 text-[#1A1A1A]">학습 완료!</h3>
          <div className="flex justify-center gap-8 my-8">
            <div className="text-center">
              <p className="text-xs font-bold text-[#8A8A80] uppercase tracking-widest mb-1">Score</p>
              <p className="text-4xl font-black text-[#1A1A1A]">{percentage}<span className="text-lg opacity-40 ml-1">%</span></p>
            </div>
            <div className="w-px h-12 bg-[#E5E5E0] self-center"></div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#8A8A80] uppercase tracking-widest mb-1">Correct</p>
              <p className="text-4xl font-black text-emerald-500">{correctCount}<span className="text-lg text-[#1A1A1A] opacity-40 ml-1">/ {totalCount}</span></p>
            </div>
          </div>
          
          <button 
            onClick={() => { onReset(); setInputValue(''); }}
            className="w-full max-w-xs bg-[#1A1A1A] text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-black transition-all active:scale-[0.98] mb-4"
          >
            다시 도전하기
          </button>
        </div>

        {/* Detailed Results Table */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-[#1A1A1A] px-2 flex items-center gap-2">
            <Info size={20} className="text-[#5A5A40]" />
            오답 노트 및 결과 상세
          </h4>
          <div className="bg-white rounded-3xl border border-[#E5E5E0] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-[#F0F0EB]">
              {questions.map((q: QuizQuestion, idx: number) => {
                const userAnswer = state.userAnswers[idx];
                let isCorrect = false;
                if (q.type === 'multiple-choice') {
                  isCorrect = userAnswer === q.answer;
                } else {
                  isCorrect = String(userAnswer).toLowerCase().trim() === String(q.answer).toLowerCase().trim();
                }

                return (
                  <div key={idx} className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${isCorrect ? 'bg-emerald-50/20' : 'bg-rose-50/30'}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                          Q{idx + 1}
                        </span>
                        <p className="font-bold text-[#1A1A1A]">{q.question}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-sm font-medium text-[#6B6B6B]">
                          내 답변: <span className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600 underline'}`}>{q.type === 'multiple-choice' ? q.options![userAnswer as number] : userAnswer}</span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm font-medium text-emerald-600">
                             정답: <span className="font-bold">{q.type === 'multiple-choice' ? q.options![q.answer as number] : q.answer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      {isCorrect ? (
                        <CheckCircle2 size={24} className="text-emerald-500" />
                      ) : (
                        <XCircle size={24} className="text-rose-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[state.currentQuestionIndex];

  return (
    <div className="space-y-8 mt-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-[#5A5A40]">문제 {state.currentQuestionIndex + 1} / {questions.length}</span>
        <div className="h-2 w-48 bg-[#F0F0EB] rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-500 transition-all duration-500" 
            style={{ width: `${((state.currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-10 bg-[#F8F8F5] p-10 rounded-3xl border-l-[6px] border-rose-500 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <HelpCircle size={80} />
        </div>
        <h4 className="text-2xl font-bold text-[#1A1A1A] leading-relaxed relative z-10">
          {currentQuestion.question}
        </h4>
      </div>

      <div className="space-y-4">
        {currentQuestion.type === 'multiple-choice' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options?.map((option: string, idx: number) => (
              <button
                key={idx}
                disabled={state.feedback !== null}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group h-full shadow-sm ${
                  state.feedback !== null && idx === currentQuestion.answer
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : state.feedback === false && state.userAnswers[state.currentQuestionIndex] === idx
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-[#F0F0EB] hover:border-[#5A5A40] hover:bg-[#F8F8F5]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#F0F0EB] flex items-center justify-center text-xs font-bold group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-lg">{option}</span>
                </div>
                {state.feedback !== null && idx === currentQuestion.answer && <CheckCircle2 size={24} className="text-emerald-500" />}
                {state.feedback === false && state.userAnswers[state.currentQuestionIndex] === idx && <XCircle size={24} className="text-rose-500" />}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6 max-w-xl mx-auto">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              className="w-full p-6 rounded-2xl border-2 border-[#F0F0EB] focus:border-[#5A5A40] focus:outline-none font-bold h-20 text-2xl text-center shadow-sm placeholder:opacity-30"
              placeholder="정답을 입력하세요"
              disabled={state.feedback !== null}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleAnswer(inputValue.trim());
                  setInputValue('');
                }
              }}
            />
            {state.feedback !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center gap-4 p-6 rounded-2xl border-2 shadow-md ${state.feedback ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700'}`}
              >
                {state.feedback ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                <div>
                   <p className="font-black text-xl">{state.feedback ? '정답입니다!' : '오답입니다'}</p>
                   {!state.feedback && <p className="font-bold">정답: <span className="underline decoration-2">{currentQuestion.answer}</span></p>}
                </div>
              </motion.div>
            )}
            <button 
              onClick={() => { handleAnswer(inputValue.trim()); setInputValue(''); }}
              disabled={state.feedback !== null || !inputValue.trim()}
              className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-black disabled:opacity-30 transition-all active:scale-[0.98]"
            >
              정답 확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function VerbsSection() {
  const [subTab, setSubTab] = useState<'learn' | 'quiz'>('learn');

  // Filter and search
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // TTS helper functions
  const speakConjugation = (base: string, past: string, pp: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${base}... ${past}... ${pp}`);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakSingle = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Quiz States
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizMode, setQuizMode] = useState<'choice' | 'write'>('choice');
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedbackState, setFeedbackState] = useState<boolean | null>(null);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [tempInput, setTempInput] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Custom configurations for quiz coverage
  const [quizRange, setQuizRange] = useState<string>('all');
  const [quizLength, setQuizLength] = useState<number | 'all'>(10);

  // Initialize Quiz
  const startQuiz = (mode: 'choice' | 'write') => {
    setQuizMode(mode);
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setFeedbackState(null);
    setTempInput('');

    // Fetch verbs based on quizRange
    let verbsToPool: any[] = [];
    if (quizRange === 'all') {
      verbsToPool = irregularVerbCategories.flatMap(c => 
        c.verbs.map(v => ({ ...v, categoryTitle: c.title }))
      );
    } else {
      const selectedCat = irregularVerbCategories.find(c => c.type === quizRange);
      if (selectedCat) {
        verbsToPool = selectedCat.verbs.map(v => ({ ...v, categoryTitle: selectedCat.title }));
      } else {
        verbsToPool = irregularVerbCategories.flatMap(c => 
          c.verbs.map(v => ({ ...v, categoryTitle: c.title }))
        );
      }
    }
    
    // Robust Fisher-Yates shuffle algorithm to ensure uniform selection of all 60 verbs
    const shuffleArray = (arr: any[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const shuffledVerbs = shuffleArray(verbsToPool);
    const limit = quizLength === 'all' ? shuffledVerbs.length : Math.min(quizLength, shuffledVerbs.length);
    const selectedVerbs = shuffledVerbs.slice(0, limit);

    const questions = selectedVerbs.map((v, index) => {
      // Choose to hide Past or Past Participle
      const target = Math.random() > 0.5 ? 'past' : 'pastParticiple';
      const correctAnswer = target === 'past' ? v.past : v.pastParticiple;
      const hiddenLabel = target === 'past' ? '과거형(Past)' : '과거분사형(Past Participle)';

      // Distractor generator for MCQ options
      const allForms = verbsToPool.flatMap(verbObj => [verbObj.past, verbObj.pastParticiple]);
      const uniqueForms = Array.from(new Set(allForms)).filter(f => f.toLowerCase() !== correctAnswer.toLowerCase());
      const shuffledOptions = shuffleArray(uniqueForms);
      const distractors = shuffledOptions.slice(0, 3);
      const options = shuffleArray([...distractors, correctAnswer]);

      return {
        id: index,
        verb: v,
        target,
        correctAnswer,
        hiddenLabel,
        options,
      };
    });

    setQuizQuestions(questions);
    setUserAnswers(Array(limit).fill(null));
  };

  const handleAnswerSubmit = (ans: string) => {
    if (feedbackState !== null) return;

    const currentQ = quizQuestions[currentIdx];
    const isCorrect = ans.trim().toLowerCase() === currentQ.correctAnswer.toLowerCase();

    setFeedbackState(isCorrect);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIdx] = ans;
    setUserAnswers(updatedAnswers);

    // MCQ automatically advances after a small delay
    if (quizMode === 'choice') {
      setTimeout(() => {
        advanceQuestion();
      }, 1200);
    }
  };

  const advanceQuestion = () => {
    setFeedbackState(null);
    setTempInput('');
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Filter verbs
  const filteredCategories = irregularVerbCategories
    .map(category => {
      if (categoryFilter !== 'all' && category.type !== categoryFilter) {
        return null;
      }
      
      const filteredVerbs = category.verbs.filter(v => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
          v.base.toLowerCase().includes(query) ||
          v.past.toLowerCase().includes(query) ||
          v.pastParticiple.toLowerCase().includes(query) ||
          v.meaning.includes(query)
        );
      });

      if (filteredVerbs.length === 0) return null;

      return {
        ...category,
        verbs: filteredVerbs
      };
    })
    .filter((cat): cat is any => cat !== null);

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex bg-[#F8F8F5] p-1.5 rounded-2xl mb-8 w-fit mx-auto border border-[#E5E5E0]">
        <button 
          onClick={() => { setSubTab('learn'); setQuizStarted(false); }}
          className={`px-8 py-2.5 rounded-xl font-bold text-base sm:text-lg transition-all ${subTab === 'learn' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
        >
          학습하기
        </button>
        <button 
          onClick={() => { setSubTab('quiz'); setQuizStarted(false); }}
          className={`px-8 py-2.5 rounded-xl font-bold text-base sm:text-lg transition-all ${subTab === 'quiz' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
        >
          퀴즈풀기
        </button>
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'learn' ? (
          <motion.div 
            key="learn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Learn Onboarding Header */}
            <div className="bg-[#F8F8F5] border border-[#E5E5E0] p-6 rounded-2xl flex items-start gap-4">
              <Info className="text-[#5A5A40] shrink-0 mt-1.5" size={24} />
              <div>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#1A1A1A] mb-1">불규칙 동사 3단 변화 학습</h4>
                <p className="text-base sm:text-lg text-[#5A5A50] leading-relaxed font-medium">
                  동사 모양에 따른 4가지 유형 구분을 공부하고, 🔊 버튼을 눌러 정확한 원형-과거형-과거분사형 발음 훈련을 해보세요.
                </p>
              </div>
            </div>

            {/* Filter control */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {['all', 'A-B-C', 'A-B-A', 'A-B-B', 'A-A-A'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setCategoryFilter(t)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base border transition-all ${
                      categoryFilter === t
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                        : 'bg-[#F8F8F5] text-[#8A8A80] border-[#E5E5E0] hover:border-[#8A8A80] hover:text-[#5A5A40]'
                    }`}
                  >
                    {t === 'all' ? '전체 동사 (60개)' : `${t} 형태`}
                  </button>
                ))}
              </div>

              {/* Instant Search Bar */}
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="🔍 동사 스펠링 또는 뜻으로 즉시 찾기 (예: break, 달리다)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 pr-10 rounded-2xl border-2 border-[#E5E5E0] focus:border-[#5A5A40] focus:outline-none font-bold text-sm transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-[#5A5A40] opacity-60 hover:opacity-100"
                  >
                    지우기
                  </button>
                )}
              </div>
            </div>

            {/* Tables listings */}
            <div className="space-y-10 pt-4">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat: any) => (
                  <div key={cat.title} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-6 rounded-full bg-[#5A5A40]" />
                      <h4 className="text-lg font-black text-[#1A1A1A]">{cat.title}</h4>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-[#E5E5E0] overflow-hidden shadow-sm">
                      {/* Desktop Headings */}
                      <div className="hidden md:grid grid-cols-12 gap-2 bg-[#F8F8F5] p-5 text-sm sm:text-base font-black text-[#5A5A40] border-b border-[#E5E5E0] uppercase tracking-wider text-center">
                        <div className="col-span-1">#</div>
                        <div className="col-span-2 text-left">원형 (Base)</div>
                        <div className="col-span-2 text-left">과거형 (Past)</div>
                        <div className="col-span-2 text-left">과거분사형 (P.P.)</div>
                        <div className="col-span-4 text-left">의미 (Meaning)</div>
                        <div className="col-span-1">발음</div>
                      </div>

                      <div className="divide-y divide-[#F0F0EB]">
                        {cat.verbs.map((verb: any) => (
                          <div key={verb.id} className="hover:bg-amber-50/10 transition-colors">
                            {/* Desktop row */}
                            <div className="hidden md:grid grid-cols-12 gap-2 items-center p-4 text-center text-sm font-medium">
                              <div className="col-span-1 font-mono text-[#8A8A80] text-xs font-bold">{verb.id}</div>
                              <div className="col-span-2 text-left font-black text-neutral-800 text-lg">{verb.base}</div>
                              <div className="col-span-2 text-left font-extrabold text-[#5A5A40] text-lg">{verb.past}</div>
                              <div className="col-span-2 text-left font-extrabold text-indigo-600 text-lg">{verb.pastParticiple}</div>
                              <div className="col-span-4 text-left font-semibold text-[#8A8A80]">{verb.meaning}</div>
                              <div className="col-span-1 flex justify-center">
                                <button 
                                  onClick={() => speakConjugation(verb.base, verb.past, verb.pastParticiple)}
                                  className="p-1.5 rounded-lg border border-[#E5E5E0] bg-white text-[#5A5A40] hover:bg-[#F0F0EB] transition-colors"
                                  title="3단 변화 연속 듣기"
                                >
                                  <Volume2 size={14} />
                                </button>
                              </div>
                            </div>

                            {/* Mobile visual card layout */}
                            <div className="md:hidden p-5 flex flex-col gap-3">
                              <div className="flex justify-between items-center">
                                <span className="font-mono text-[10px] font-black bg-[#E5E5E0] px-2 py-0.5 rounded text-[#5A5A40]">
                                  No. {verb.id}
                                </span>
                                <button 
                                  onClick={() => speakConjugation(verb.base, verb.past, verb.pastParticiple)}
                                  className="p-2 rounded-full border border-[#E5E5E0] bg-white text-[#5A5A40] hover:bg-[#F0F0EB] transition-colors"
                                >
                                  <Volume2 size={14} />
                                </button>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 text-base font-black">
                                <button
                                  onClick={() => speakSingle(verb.base)}
                                  className="bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-lg text-sm hover:bg-neutral-200 transition-colors"
                                >
                                  {verb.base}
                                </button>
                                <span className="text-[#8A8A80] text-xs">→</span>
                                <button
                                  onClick={() => speakSingle(verb.past)}
                                  className="bg-amber-50 text-[#5A5A40] border border-amber-200/50 px-2.5 py-1 rounded-lg text-sm hover:bg-amber-100 transition-colors"
                                >
                                  {verb.past}
                                </button>
                                <span className="text-[#8A8A80] text-xs">→</span>
                                <button
                                  onClick={() => speakSingle(verb.pastParticiple)}
                                  className="bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-2.5 py-1 rounded-lg text-sm hover:bg-indigo-100 transition-colors"
                                >
                                  {verb.pastParticiple}
                                </button>
                              </div>
                              <p className="text-xs font-bold text-[#6B6B60] mt-1">{verb.meaning}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-[#F8F8F5] p-10 rounded-3xl border border-dashed border-[#E5E5E0]">
                  <HelpCircle size={48} className="mx-auto text-[#8A8A80] mb-4 opacity-25" />
                  <p className="text-base font-bold text-[#8A8A80]">일치하는 불규칙 동사 검색 결과가 없습니다.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : !quizStarted ? (
          // Quiz Landing Page
          <motion.div 
            key="quiz-landing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-[#F8F8F5] border-2 border-dashed border-[#E5E5E0] p-8 md:p-12 rounded-[2.5rem] space-y-8"
          >
            <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center mx-auto text-[#8B5CF6] border-4 border-violet-50">
              <Languages size={40} />
            </div>
            
            <div className="max-w-xl mx-auto space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">불규칙 동사 3단 변화 퀴즈</h3>
              <p className="text-[#6B6B61] text-base sm:text-lg font-medium leading-relaxed break-keep">
                <span className="block">불규칙 동사 60개의 원형-과거형-과거분사형 변형을 테스트합니다.</span>
                <span className="block mt-1">아래에서 원하는 출제 방식과 범위를 맞춤 설정해 보세요.</span>
              </p>
            </div>

            {/* Range and Length settings */}
            <div className="max-w-2xl mx-auto rounded-3xl border border-[#E5E5E0] bg-white p-6 space-y-6 text-left shadow-sm">
              <div className="space-y-3">
                <label className="text-base sm:text-lg font-black text-[#5A5A40] flex items-center gap-1.5">
                  <span className="w-1.5 h-3 rounded bg-indigo-500" />
                  출제 범위 설정 (Category Range)
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setQuizRange('all');
                      setQuizLength(10);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold border transition-all ${
                      quizRange === 'all'
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                        : 'bg-[#F8F8F5] text-[#8A8A80] border-[#E5E5E0] hover:border-[#8A8A80] hover:text-[#5A5A40]'
                    }`}
                  >
                    전체 동사 (60개)
                  </button>
                  {[
                    { type: 'A-B-C', label: '① A-B-C 형태 (25개)' },
                    { type: 'A-B-A', label: '② A-B-A 형태 (3개)' },
                    { type: 'A-B-B', label: '③ A-B-B 형태 (26개)' },
                    { type: 'A-A-A', label: '④ A-A-A 형태 (6개)' }
                  ].map((cfg) => (
                    <button
                      key={cfg.type}
                      onClick={() => {
                        setQuizRange(cfg.type);
                        if (cfg.type === 'A-B-A' || cfg.type === 'A-A-A') {
                          setQuizLength('all');
                        } else {
                          setQuizLength(10);
                        }
                      }}
                      className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold border transition-all ${
                        quizRange === cfg.type
                          ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                          : 'bg-[#F8F8F5] text-[#8A8A80] border-[#E5E5E0] hover:border-[#8A8A80] hover:text-[#5A5A40]'
                      }`}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-base sm:text-lg font-black text-[#5A5A40] flex items-center gap-1.5">
                  <span className="w-1.5 h-3 rounded bg-indigo-500" />
                  출제 문항 수 설정 (Quiz Length)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[10, 20, 30, 'all'].map((val) => {
                    // Calculate dynamic maximum possible questions
                    const maxCount = quizRange === 'all' 
                      ? 60 
                      : (quizRange === 'A-B-C' ? 25 : (quizRange === 'A-B-A' ? 3 : (quizRange === 'A-B-B' ? 26 : 6)));
                    
                    if (typeof val === 'number' && val > maxCount) return null;

                    return (
                      <button
                        key={val}
                        onClick={() => setQuizLength(val as any)}
                        className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold border transition-all ${
                          quizLength === val
                            ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                            : 'bg-[#F8F8F5] text-[#8A8A80] border-[#E5E5E0] hover:border-[#8A8A80] hover:text-[#5A5A40]'
                        }`}
                      >
                        {val === 'all' ? `범위 내 전체 (${maxCount}문항)` : `${val}문항`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4">
              {/* Option A: MCQ */}
              <button 
                onClick={() => startQuiz('choice')}
                className="bg-white p-6 rounded-3xl border-2 border-[#E5E5E0] hover:border-[#8B5CF6] text-left transition-all hover:shadow-lg active:scale-95 group/btn"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#8B5CF6] flex items-center justify-center font-bold mb-4 group-hover/btn:bg-[#8B5CF6] group-hover/btn:text-white transition-colors">
                  A
                </div>
                <h4 className="font-black text-[#1A1A1A] text-xl sm:text-2xl">객관식 퀴즈풀기</h4>
                <p className="text-sm sm:text-base font-bold text-[#8A8A80] mt-2 leading-relaxed break-keep">
                  4개의 변형 형태 중 알맞은 과거형/과거분사형을 찾아 클릭합니다.
                </p>
              </button>

              {/* Option B: Write */}
              <button 
                onClick={() => startQuiz('write')}
                className="bg-white p-6 rounded-3xl border-2 border-[#E5E5E0] hover:border-[#8B5CF6] text-left transition-all hover:shadow-lg active:scale-95 group/btn"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#8B5CF6] flex items-center justify-center font-bold mb-4 group-hover/btn:bg-[#8B5CF6] group-hover/btn:text-white transition-colors">
                  B
                </div>
                <h4 className="font-black text-[#1A1A1A] text-xl sm:text-2xl">주관식 직접 타이핑</h4>
                <p className="text-sm sm:text-base font-bold text-[#8A8A80] mt-2 leading-relaxed break-keep">
                  빈칸에 들어갈 과거형 또는 과거분사형 스펠링을 직접 타이핑하여 정확히 익힙니다.
                </p>
              </button>
            </div>
          </motion.div>
        ) : quizFinished ? (
          // Quiz Results View
          <motion.div 
            key="quiz-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center py-10 bg-[#F8F8F5] p-10 border-2 border-dashed border-[#E5E5E0] rounded-[2.5rem]">
              <div className="w-20 h-20 bg-white text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-emerald-50">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-black mb-2 text-[#1A1A1A]">퀴즈가 완료되었습니다!</h3>
              
              <div className="flex justify-center gap-8 my-8">
                <div className="text-center">
                  <p className="text-xs font-bold text-[#8A8A80] uppercase tracking-widest mb-1">Score</p>
                  <p className="text-4xl font-black text-[#1A1A1A]">
                    {quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0}
                    <span className="text-lg opacity-40 ml-1">%</span>
                  </p>
                </div>
                <div className="w-px h-12 bg-[#E5E5E0] self-center" />
                <div className="text-center">
                  <p className="text-xs font-bold text-[#8A8A80] uppercase tracking-widest mb-1">Correct</p>
                  <p className="text-4xl font-black text-emerald-500">
                    {score}
                    <span className="text-lg text-[#1A1A1A] opacity-40 ml-1">/ {quizQuestions.length}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button 
                  onClick={() => startQuiz(quizMode)}
                  className="flex-1 bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold text-base shadow-md hover:bg-black transition-all active:scale-[0.98]"
                >
                  같은 모집단 재도전
                </button>
                <button 
                  onClick={() => setQuizStarted(false)}
                  className="flex-1 bg-white border border-[#E5E5E0] text-[#5A5A40] py-4 rounded-2xl font-bold text-base shadow-sm hover:bg-[#F8F8F5] transition-all"
                >
                  모드 바 가기
                </button>
              </div>
            </div>

            {/* Detailed Questions Review */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#1A1A1A] px-2 flex items-center gap-2">
                <Info size={20} className="text-[#5A5A40]" />
                오답 상세 피드백 노란 분석표
              </h4>
              <div className="bg-white rounded-3xl border border-[#E5E5E0] overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 divide-y divide-[#F0F0EB]">
                  {quizQuestions.map((q: any, idx: number) => {
                    const ans = userAnswers[idx];
                    const isCorrect = String(ans).toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim();

                    return (
                      <div key={idx} className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${isCorrect ? 'bg-emerald-50/20' : 'bg-rose-50/30'}`}>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                              Q{idx + 1}
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-extrabold text-neutral-800 text-base">{q.verb.base}</span>
                              <span className="text-[#8A8A80] text-xs">({q.verb.meaning})의</span>
                              <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md text-xs">{q.hiddenLabel}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 pt-1 flex-wrap">
                            <p className="text-xs sm:text-sm font-medium text-[#6B6B6B]">
                              내 입력: <span className={`font-black ${isCorrect ? 'text-emerald-600' : 'text-rose-600 underline'}`}>{ans || '(빈칸)'}</span>
                            </p>
                            {!isCorrect && (
                              <p className="text-xs sm:text-sm font-medium text-emerald-600">
                                정답: <span className="font-black underline">{q.correctAnswer}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <button 
                            onClick={() => speakConjugation(q.verb.base, q.verb.past, q.verb.pastParticiple)}
                            className="p-1.5 rounded-lg border border-[#E5E5E0] bg-white text-[#5A5A40] hover:bg-[#F0F0EB] transition-colors"
                            title="3단 변화 듣기"
                          >
                            <Volume2 size={14} />
                          </button>
                          {isCorrect ? (
                            <CheckCircle2 size={24} className="text-emerald-500" />
                          ) : (
                            <XCircle size={24} className="text-rose-500" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Active Question Screen
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6"
          >
            {/* Header / progress bar */}
            <div className="flex justify-between items-center bg-[#F8F8F5] p-3 rounded-2xl border border-[#E5E5E0]">
              <span className="text-xs font-black text-[#5A5A40]">문제 {currentIdx + 1} / {quizQuestions.length} </span>
              <div className="h-2 w-32 sm:w-48 bg-[#E5E5E0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500 animate-pulse" 
                  style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
              <button 
                onClick={() => setQuizStarted(false)}
                className="text-xs font-black text-rose-500 hover:text-rose-700"
              >
                중단하기
              </button>
            </div>

            {/* Large Card displaying base and Korean */}
            <div className="bg-[#F8F8F5] p-8 rounded-[2rem] border-l-8 border-[#8B5CF6] relative overflow-hidden shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8A8A80] mb-3 block">
                {quizQuestions[currentIdx]?.verb.categoryTitle || 'Irregular Verb'}
              </span>

              {/* Large formula preview with hidden blanks */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-3 text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1A]">
                  <span className="underline decoration-[#E5E5E0] underline-offset-4">{quizQuestions[currentIdx]?.verb.base}</span>
                  <span className="text-neutral-400 text-lg">→</span>
                  
                  {quizQuestions[currentIdx]?.target === 'past' ? (
                    <span className="bg-violet-100 text-[#8B5CF6] ring-2 ring-[#8B5CF6]/50 rounded-xl px-3 py-1 text-xl sm:text-2xl animate-pulse">
                      ?
                    </span>
                  ) : (
                    <span className="font-extrabold text-[#5A5A40] text-xl sm:text-2xl">{quizQuestions[currentIdx]?.verb.past}</span>
                  )}
                  
                  <span className="text-neutral-400 text-lg">→</span>

                  {quizQuestions[currentIdx]?.target === 'pastParticiple' ? (
                    <span className="bg-violet-100 text-[#8B5CF6] ring-2 ring-[#8B5CF6]/50 rounded-xl px-3 py-1 text-xl sm:text-2xl animate-pulse">
                      ?
                    </span>
                  ) : (
                    <span className="font-extrabold text-[#5A5A40] text-xl sm:text-2xl">{quizQuestions[currentIdx]?.verb.pastParticiple}</span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-extrabold text-[#6B6B5F]">
                  뜻: {quizQuestions[currentIdx]?.verb.meaning}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E5E0]/60">
                <p className="text-[#1A1A1A] text-sm font-black flex items-center gap-1.5">
                  <span className="w-1.5 h-3 rounded bg-indigo-500" />
                  동사 원형 <span className="underline font-sans">{quizQuestions[currentIdx]?.verb.base}</span>의 <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-sans text-xs">{quizQuestions[currentIdx]?.hiddenLabel}</span> 형태를 알려주세요.
                </p>
              </div>
            </div>

            {/* Answer selector modes */}
            <div className="pt-2">
              {quizMode === 'choice' ? (
                // Choice layout
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizQuestions[currentIdx]?.options.map((option: string, oIdx: number) => {
                    const isAnswered = feedbackState !== null;
                    const isCorrectOption = option.toLowerCase() === quizQuestions[currentIdx]?.correctAnswer.toLowerCase();
                    const isSelected = userAnswers[currentIdx]?.toLowerCase() === option.toLowerCase();

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerSubmit(option)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group h-full shadow-sm hover:-translate-y-0.5 ${
                          isAnswered
                            ? isCorrectOption
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-extrabold'
                              : isSelected
                                ? 'border-rose-500 bg-rose-50 text-rose-700 font-extrabold'
                                : 'border-[#F0F0EB] text-[#8A8A80]'
                            : 'border-[#F0F0EB] bg-white text-neutral-800 hover:border-[#8B5CF6] hover:bg-[#F8F5FF]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-[#F0F0EB] flex items-center justify-center text-[10px] font-bold group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                            {oIdx + 1}
                          </span>
                          <span className="font-bold text-lg">{option}</span>
                        </div>
                        {isAnswered && isCorrectOption && <CheckCircle2 size={20} className="text-emerald-500" />}
                        {isAnswered && !isCorrectOption && isSelected && <XCircle size={20} className="text-rose-500" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Write Input typing layout
                <div className="space-y-4 max-w-xl mx-auto">
                  <input 
                    type="text"
                    value={tempInput}
                    onChange={(e) => setTempInput(e.target.value)}
                    disabled={feedbackState !== null}
                    autoFocus
                    placeholder="원형의 변형된 변이형을 입력하세요"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && tempInput.trim() && feedbackState === null) {
                        handleAnswerSubmit(tempInput.trim());
                      }
                    }}
                    className={`w-full p-5 rounded-2xl border-2 text-center text-xl font-bold focus:outline-none transition-all h-16 ${
                      feedbackState !== null
                        ? feedbackState
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-rose-500 bg-rose-50 text-rose-700 font-black'
                        : 'border-[#F0F0EB] focus:border-[#8B5CF6] bg-white text-neutral-800'
                    }`}
                  />

                  {/* Typing mode feedback card */}
                  {feedbackState !== null && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`flex items-center gap-3.5 p-4 rounded-xl border ${
                        feedbackState ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700'
                      }`}
                    >
                      {feedbackState ? <CheckCircle2 size={26} /> : <XCircle size={26} />}
                      <div className="text-sm">
                        <p className="font-extrabold text-base">{feedbackState ? '정답입니다! 참 잘하셨어요.' : '오답입니다.'}</p>
                        {!feedbackState && (
                          <p className="font-bold mt-0.5">
                            정답 철자: <span className="underline decoration-2 font-black tracking-wide bg-white px-2 py-0.5 rounded text-neutral-800 font-sans">{quizQuestions[currentIdx]?.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Submission control */}
                  {feedbackState === null ? (
                    <button 
                      onClick={() => { if (tempInput.trim()) handleAnswerSubmit(tempInput.trim()); }}
                      disabled={!tempInput.trim()}
                      className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-black text-lg shadow hover:bg-black transition-all active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
                    >
                      정답 입증하기
                    </button>
                  ) : (
                    <button 
                      onClick={advanceQuestion}
                      className="w-full bg-indigo-600 font-black text-lg text-white py-4 rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      다음 문제로 가기
                      <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



