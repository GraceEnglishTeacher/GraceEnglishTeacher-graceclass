import { useState, useCallback } from 'react';
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

type Tab = 'main-text' | 'vocabulary' | 'grammar' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const [quizState, setQuizState] = useState<{
    currentQuestionIndex: number;
    score: number;
    isFinished: boolean;
    userAnswers: (string | number | null)[];
    feedback: boolean | null;
  }>({
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
    userAnswers: Array(worksheetData.quiz.length).fill(null),
    feedback: null
  });

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: Array(worksheetData.quiz.length).fill(null),
      feedback: null
    });
  };

  const handleAnswer = (answer: string | number) => {
    const question = worksheetData.quiz[quizState.currentQuestionIndex];
    let isCorrect = false;

    if (question.type === 'multiple-choice') {
      isCorrect = answer === question.answer;
    } else {
      // For short answer, ignore case and trim whitespace
      const userAnswer = String(answer).toLowerCase().trim();
      const correctAnswer = String(question.answer).toLowerCase().trim();
      isCorrect = userAnswer === correctAnswer;
    }
    
    setQuizState(prev => {
      const newUserAnswers = [...prev.userAnswers];
      newUserAnswers[prev.currentQuestionIndex] = answer;
      
      return {
        ...prev,
        userAnswers: newUserAnswers,
        feedback: isCorrect,
        score: isCorrect ? prev.score + 1 : prev.score
      };
    });

    setTimeout(() => {
      if (quizState.currentQuestionIndex < worksheetData.quiz.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          feedback: null
        }));
      } else {
        setQuizState(prev => ({
          ...prev,
          isFinished: true,
          feedback: null
        }));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1A1A1A] pb-10">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E0] sticky top-0 z-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => { setActiveTab(null); resetQuiz(); }}
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
              onClick={() => { setActiveTab(null); resetQuiz(); }}
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
                title="본문 학습" 
                subtitle="Main Text"
                description="교과서 본문을 읽고 한글 번역과 함께 학습합니다."
                icon={<BookOpen className="text-blue-500" />}
                onClick={() => setActiveTab('main-text')}
                color="blue"
              />
              <MenuCard 
                title="핵심 어휘" 
                subtitle="Vocabulary"
                description="30개의 필수 단어 발음을 듣고 예문을 익힙니다."
                icon={<Languages className="text-amber-500" />}
                onClick={() => setActiveTab('vocabulary')}
                color="amber"
              />
              <MenuCard 
                title="주요 어법" 
                subtitle="Grammar"
                description="수동태와 have to 용법을 정리합니다."
                icon={<Info className="text-emerald-500" />}
                onClick={() => setActiveTab('grammar')}
                color="emerald"
              />
              <MenuCard 
                title="실력 퀴즈" 
                subtitle="Quiz"
                description="단어와 문법 30문제를 모두 풀어보세요."
                icon={<HelpCircle className="text-rose-500" />}
                onClick={() => setActiveTab('quiz')}
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
              
              {activeTab === 'main-text' && <MainTextSection />}
              {activeTab === 'vocabulary' && <VocabularySection onSpeak={speak} />}
              {activeTab === 'grammar' && <GrammarSection />}
              {activeTab === 'quiz' && (
                <QuizSection 
                  state={quizState} 
                  handleAnswer={handleAnswer} 
                  onReset={resetQuiz}
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

function SectionHeader({ tab }: { tab: Tab }) {
  const titles: Record<Tab, { main: string; sub: string }> = {
    'main-text': { main: '본문 학습', sub: 'Main Text' },
    'vocabulary': { main: '핵심 어휘', sub: 'Vocabulary' },
    'grammar': { main: '주요 어법', sub: 'Grammar' },
    'quiz': { main: '실력 퀴즈', sub: 'Quiz' },
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

function MainTextSection() {
  const [showKorean, setShowKorean] = useState(true);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center bg-[#F8F8F5] p-2 rounded-xl">
        <span className="text-sm font-medium px-4 text-[#5A5A40]">번역 보기</span>
        <button 
          onClick={() => setShowKorean(!showKorean)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${showKorean ? 'bg-[#5A5A40]' : 'bg-gray-300'}`}
        >
          <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${showKorean ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <div className="bg-[#F8F8F5] p-8 rounded-3xl relative">
          <div className="absolute -top-4 left-8 bg-[#5A5A40] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            English
          </div>
          <p className="text-xl leading-[1.8] font-medium text-[#2A2A2A] whitespace-pre-line">
            {worksheetData.mainText.english}
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
              {worksheetData.mainText.korean}
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
              <h4 className="text-xl font-bold text-[#5A5A40] underline decoration-[#CED4DA] underline-offset-4">{item.word}</h4>
              <button 
                onClick={() => onSpeak(item.word)}
                className="p-1.5 rounded-full bg-white text-[#8A8A80] hover:text-[#5A5A40] hover:bg-[#E5E5E0] transition-all shadow-sm"
                title="발음 듣기"
              >
                <Volume2 size={16} />
              </button>
            </div>
            <span className="text-sm font-bold text-[#1A1A1A]">{item.meaning}</span>
          </div>
          {item.example && (
            <div className="mt-3 border-l-2 border-[#E5E5E0] pl-3 py-1 flex items-start gap-2">
              <p className="text-sm italic text-[#6B6B6B] flex-1">
                {item.example}
              </p>
              <button 
                onClick={() => onSpeak(item.example!)}
                className="p-1 rounded-full text-[#8A8A80] hover:text-[#5A5A40] transition-colors flex-shrink-0"
              >
                <Volume2 size={14} />
              </button>
            </div>
          )}
          <div className="absolute top-2 right-4 text-[10px] font-bold opacity-10">{id + 1}</div>
        </motion.div>
      ))}
    </div>
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
          className="bg-white rounded-3xl border border-[#E5E5E0] overflow-hidden"
        >
          <div className="bg-[#F8F8F5] px-6 py-4 flex items-center gap-3">
            <div className="bg-emerald-500 w-2 h-6 rounded-full" />
            <h4 className="text-lg font-bold">{item.title}</h4>
          </div>
          <div className="p-6">
            <p className="text-[#5A5A50] mb-6 leading-relaxed bg-[#F8F8F5] p-4 rounded-xl text-sm italic">
              {item.explanation}
            </p>
            <div className="space-y-3">
              {item.examples.map((ex, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 flex-shrink-0" />
                  <p className="text-sm font-medium text-[#2A2A2A]">{ex}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function QuizSection({ state, handleAnswer, onReset }: any) {
  const [inputValue, setInputValue] = useState('');

  if (state.isFinished) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-2xl font-bold mb-2">퀴즈 완료!</h3>
        <p className="text-[#6B6B6B] mb-8">
          수고하셨습니다. 총 {worksheetData.quiz.length}문제 중 {state.score}문제를 맞히셨습니다.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => { onReset(); setInputValue(''); }}
            className="bg-[#5A5A40] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-[#5A5A40]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            다시 풀어보기
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = worksheetData.quiz[state.currentQuestionIndex];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-[#5A5A40]">문제 {state.currentQuestionIndex + 1} / {worksheetData.quiz.length}</span>
        <div className="h-2 w-48 bg-[#F0F0EB] rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-500 transition-all duration-500" 
            style={{ width: `${((state.currentQuestionIndex + 1) / worksheetData.quiz.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-10 bg-[#F8F8F5] p-8 rounded-3xl border-l-4 border-rose-500">
        <h4 className="text-xl font-bold text-[#1A1A1A] leading-relaxed">
          {currentQuestion.question}
        </h4>
      </div>

      <div className="space-y-4">
        {currentQuestion.type === 'multiple-choice' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options?.map((option, idx) => (
              <button
                key={idx}
                disabled={state.feedback !== null}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group h-full ${
                  state.feedback !== null && idx === currentQuestion.answer
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : state.feedback === false && state.userAnswers[state.currentQuestionIndex] === idx
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-[#F0F0EB] hover:border-[#5A5A40] hover:bg-[#F8F8F5]'
                }`}
              >
                <span className="font-bold">{option}</span>
                {state.feedback !== null && idx === currentQuestion.answer && <CheckCircle2 size={20} className="text-emerald-500" />}
                {state.feedback === false && state.userAnswers[state.currentQuestionIndex] === idx && <XCircle size={20} className="text-rose-500" />}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              className="w-full p-5 rounded-2xl border-2 border-[#F0F0EB] focus:border-[#5A5A40] focus:outline-none font-bold h-16 text-lg text-center"
              placeholder="정답을 입력하세요"
              disabled={state.feedback !== null}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleAnswer(inputValue.trim());
                  // No need to clear here as setAnswer moves to next question after timeout
                }
              }}
            />
            {state.feedback !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 p-5 rounded-2xl border-2 ${state.feedback ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700'}`}
              >
                {state.feedback ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                <span className="font-bold text-lg">{state.feedback ? '정답입니다!' : `오답입니다. 정답: ${currentQuestion.answer}`}</span>
              </motion.div>
            )}
            <button 
              onClick={() => handleAnswer(inputValue.trim())}
              disabled={state.feedback !== null || !inputValue.trim()}
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold disabled:opacity-30 transition-opacity"
            >
              정답 확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


