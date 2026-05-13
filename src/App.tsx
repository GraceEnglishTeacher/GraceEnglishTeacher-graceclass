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
import { QuizQuestion } from './types';

type Tab = 'vocabulary' | 'listening' | 'grammar' | 'reading';
type SubTab = 'learn' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('learn');
  
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
    const state = quizStates[quizId];
    const question = questions[state.currentQuestionIndex];
    let isCorrect = false;

    if (question.type === 'multiple-choice') {
      isCorrect = answer === question.answer;
    } else {
      const userAnswer = String(answer).toLowerCase().trim();
      const correctAnswer = String(question.answer).toLowerCase().trim();
      isCorrect = userAnswer === correctAnswer;
    }
    
    setQuizStates(prev => ({
      ...prev,
      [quizId]: {
        ...prev[quizId],
        userAnswers: prev[quizId].userAnswers.map((a, i) => i === state.currentQuestionIndex ? answer : a),
        feedback: isCorrect,
        score: isCorrect ? prev[quizId].score + 1 : prev[quizId].score
      }
    }));

    setTimeout(() => {
      if (state.currentQuestionIndex < questions.length - 1) {
        setQuizStates(prev => ({
          ...prev,
          [quizId]: {
            ...prev[quizId],
            currentQuestionIndex: prev[quizId].currentQuestionIndex + 1,
            feedback: null
          }
        }));
      } else {
        setQuizStates(prev => ({
          ...prev,
          [quizId]: {
            ...prev[quizId],
            isFinished: true,
            feedback: null
          }
        }));
      }
    }, 1500);
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
      <header className="bg-white border-b border-[#E5E5E0] sticky top-0 z-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => selectTab(null)}
          >
            <div className="bg-[#5A5A40] text-white p-2 rounded-xl">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none">{worksheetData.title}</h1>
              <span className="text-xs text-[#5A5A40] font-bold tracking-wider uppercase opacity-80 block mt-1">
                {worksheetData.unit}
              </span>
            </div>
          </div>
          {activeTab && (
            <button 
              onClick={() => selectTab(null)}
              className="flex items-center gap-2 text-sm font-bold bg-[#F8F8F5] px-4 py-2 rounded-full hover:bg-[#E5E5E0] transition-colors"
            >
              <ArrowLeft size={16} />
              메뉴로
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-10">
        <AnimatePresence mode="wait">
          {!activeTab ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                  <TabSwitcher active={activeSubTab} onChange={setActiveSubTab} />
                  {activeSubTab === 'learn' ? (
                    <VocabularySection onSpeak={speak} />
                  ) : (
                    <QuizSection 
                      questions={worksheetData.vocabularyQuiz}
                      state={quizStates.vocabulary} 
                      handleAnswer={(ans: any) => handleAnswer('vocabulary', worksheetData.vocabularyQuiz, ans)} 
                      onReset={() => resetQuiz('vocabulary', worksheetData.vocabularyQuiz.length)}
                    />
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
                <TextSection 
                  title="Main Reading" 
                  english={worksheetData.reading.english} 
                  korean={worksheetData.reading.korean} 
                  onSpeak={speakDialog}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function MenuCard({ title, subtitle, description, icon, onClick, color }: any) {
  const colors = {
    blue: 'hover:border-blue-200 hover:bg-blue-50/30',
    amber: 'hover:border-amber-200 hover:bg-amber-50/30',
    emerald: 'hover:border-emerald-200 hover:bg-emerald-50/30',
    rose: 'hover:border-rose-200 hover:bg-rose-50/30',
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white p-8 rounded-3xl border border-[#E5E5E0] cursor-pointer transition-all duration-300 ${colors[color as keyof typeof colors]}`}
    >
      <div className="bg-[#F8F8F5] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <div className="mb-2">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">{subtitle}</span>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-[#6B6B6B] text-sm leading-relaxed">{description}</p>
      <div className="mt-8 flex items-center text-xs font-bold gap-1 opacity-40 group hover:opacity-100 transition-opacity">
        학습하기 <ChevronRight size={14} className="mt-0.5" />
      </div>
    </motion.div>
  );
}

function TabSwitcher({ active, onChange }: { active: SubTab, onChange: (t: SubTab) => void }) {
  return (
    <div className="flex bg-[#F8F8F5] p-1.5 rounded-2xl mb-8 w-fit mx-auto border border-[#E5E5E0]">
      <button 
        onClick={() => onChange('learn')}
        className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all ${active === 'learn' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
      >
        학습하기
      </button>
      <button 
        onClick={() => onChange('quiz')}
        className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all ${active === 'quiz' ? 'bg-[#5A5A40] text-white shadow-md' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
      >
        퀴즈풀기
      </button>
    </div>
  );
}

function SectionHeader({ tab }: { tab: Tab }) {
  const titles: Record<Tab, { main: string; sub: string }> = {
    'vocabulary': { main: 'Voca Master', sub: 'Vocabulary' },
    'listening': { main: 'Listening Master', sub: 'Listening & Speaking' },
    'grammar': { main: 'Grammar Master', sub: 'Grammar' },
    'reading': { main: 'Reading Master', sub: 'Reading' },
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
      <div className="bg-[#F8F8F5] p-5 md:px-8 flex items-center justify-between border-b border-[#E5E5E0]">
        <span className="text-sm font-black text-[#5A5A40] opacity-60 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
          {dialog.title}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSpeakDialog(dialog.english)}
            className="flex items-center gap-2 bg-white text-[#5A5A40] px-4 py-2 rounded-xl text-xs font-bold border border-[#E5E5E0] hover:bg-[#F0F0EB] transition-all shadow-sm active:scale-95"
          >
            <Volume2 size={14} />
            Listen
          </button>
          {viewMode === 'dialog' && (
            <button 
              onClick={() => setShowKorean(!showKorean)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all shadow-sm active:scale-95 ${showKorean ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'bg-white text-[#5A5A40] border-[#E5E5E0] hover:bg-[#F0F0EB]'}`}
            >
              <Languages size={14} />
              {showKorean ? 'Hide Translation' : 'Translate'}
            </button>
          )}
          <div className="bg-white p-1 rounded-2xl border border-[#E5E5E0] flex gap-1 ml-2">
            <button 
              onClick={() => setViewMode('dialog')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'dialog' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
            >
              Dialogue
            </button>
            <button 
              onClick={() => setViewMode('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'quiz' ? 'bg-[#5A5A40] text-white shadow-lg' : 'text-[#8A8A80] hover:text-[#5A5A40]'}`}
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
          <div className="bg-[#F8F8F5] px-6 py-4 flex items-center gap-3">
            <div className="bg-emerald-500 w-2 h-6 rounded-full" />
            <h4 className="text-lg font-bold">{item.title}</h4>
          </div>
          <div className="p-8">
            <p className="text-[#5A5A50] mb-8 leading-relaxed bg-[#F8F8F5] p-5 rounded-2xl text-base italic border-l-4 border-emerald-500/20">
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


