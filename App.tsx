import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  Phone,
  Shield,
  ShoppingCart,
  CloudLightning,
  MessageCircle,
  BookOpen,
  Leaf,
  Store,
  Wind,
  PenTool
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { lessons, quizQuestions } from './data';
import LessonModal from './components/LessonModal';
import QuizSection from './components/QuizSection';

type TabMode = 'lessons' | 'quiz';

const App: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [tab, setTab] = useState<TabMode>('lessons');

  const handleOpenLesson = (id: number) => {
    setActiveLessonId(id);
  };

  const handleCloseModal = () => {
    setActiveLessonId(null);
  };

  const handleNext = () => {
    if (activeLessonId !== null && activeLessonId < lessons.length - 1) {
      setActiveLessonId(activeLessonId + 1);
    }
  };

  const handlePrev = () => {
    if (activeLessonId !== null && activeLessonId > 0) {
      setActiveLessonId(activeLessonId - 1);
    }
  };

  const activeLesson = activeLessonId !== null ? lessons.find(l => l.id === activeLessonId) : null;

  const unitColors: Record<number, string> = {
    7: 'bg-emerald-100 text-emerald-700',
    8: 'bg-amber-100 text-amber-700',
    9: 'bg-violet-100 text-violet-700',
    0: 'bg-sky-100 text-sky-700',
  };

  const unitLabels: Record<number, string> = {
    7: 'Unit 7',
    8: 'Unit 8',
    9: 'Unit 9',
    0: 'Review 3',
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* HERO SECTION */}
      <header className="hero-gradient-8 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6 backdrop-blur border border-white/20 shadow-lg">
                <GraduationCap className="w-4 h-4 mr-2" />
                Ôn tập Kiểm tra Giữa kỳ 2
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md tracking-tight">
                Unit 7, 8, 9 <br />
                <span className="text-amber-300">& Review 3</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Hệ thống ôn tập toàn diện: Bảo vệ Môi trường, Mua sắm, Thiên tai. Ngữ pháp: Mệnh đề thời gian, Trạng từ tần suất & Quá khứ tiếp diễn.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#content"
                  className="pulse-btn bg-white text-cyan-800 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center border border-white/50"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Bắt đầu ôn tập
                </a>
                <a
                  href="#content"
                  onClick={(e) => { e.preventDefault(); setTab('quiz'); document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="bg-black/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur hover:bg-black/30 transition border border-white/20 flex items-center"
                >
                  <PenTool className="w-5 h-5 mr-2" />
                  Làm bài Quiz
                </a>
              </div>
            </div>

            {/* Floating Card */}
            <div className="flex-1 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-500 rounded-3xl blur opacity-30 animate-pulse"></div>
                <div className="relative w-80 h-auto bg-white/10 rounded-3xl backdrop-blur-xl p-8 animate-float mx-auto border border-white/40 shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-5xl bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-2xl shadow-lg">🌿</div>
                    <div className="text-5xl bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-2xl shadow-lg">🛒</div>
                    <div className="text-5xl bg-gradient-to-br from-violet-400 to-purple-600 p-4 rounded-2xl shadow-lg">🌪️</div>
                  </div>
                  <div className="text-white font-bold text-2xl mb-4">Giữa kỳ 2</div>
                  <div className="space-y-3 text-white/90 font-medium text-sm">
                    <div className="flex items-center p-2 bg-white/10 rounded-lg"><Leaf className="w-4 h-4 mr-3 text-yellow-300" /> Adverb Clauses of Time</div>
                    <div className="flex items-center p-2 bg-white/10 rounded-lg"><Store className="w-4 h-4 mr-3 text-yellow-300" /> Adverbs of Frequency</div>
                    <div className="flex items-center p-2 bg-white/10 rounded-lg"><Shield className="w-4 h-4 mr-3 text-yellow-300" /> Present Simple for Future</div>
                    <div className="flex items-center p-2 bg-white/10 rounded-lg"><Wind className="w-4 h-4 mr-3 text-yellow-300" /> Past Continuous</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TEACHER INFO */}
      <section className="py-12 bg-white border-b border-slate-200 shadow-sm relative z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-cyan-50">
                  VT
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[10px] text-white">✓</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Thầy Võ Ngọc Tùng</h3>
                <p className="text-slate-500 text-sm">Chuyên gia luyện thi & Phân tích ngữ pháp</p>
              </div>
            </div>
            <a
              href="https://zalo.me/0814666040"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-full font-medium hover:border-cyan-600 hover:text-cyan-700 transition shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Zalo: 0814 666 040</span>
            </a>
          </div>
        </div>
      </section>

      {/* TAB NAVIGATION */}
      <section id="content" className="py-8 bg-slate-50 sticky top-0 z-30 border-b border-slate-200 backdrop-blur-lg bg-slate-50/95">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setTab('lessons')}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${tab === 'lessons'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              📚 Ôn tập bài học
            </button>
            <button
              onClick={() => setTab('quiz')}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${tab === 'quiz'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              📝 Quiz 40 câu
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      {tab === 'lessons' ? (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-700 uppercase bg-cyan-100 rounded-full">
                Lộ trình Giữa kỳ 2
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Nội dung <span className="gradient-text">chuyên sâu</span>
              </h2>
              <p className="text-slate-500 text-lg mt-2 max-w-2xl mx-auto">
                Hệ thống hóa kiến thức 3 unit + Review 3. Từ vựng, ngữ pháp, ngữ âm chi tiết.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson.id)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-100 flex flex-col h-full"
                >
                  <div className={`h-32 bg-gradient-to-br ${lesson.color} flex items-center justify-center relative overflow-hidden shrink-0`}>
                    <lesson.icon className="text-white w-12 h-12 relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-overlay"></div>
                    <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${unitColors[lesson.unit] || 'bg-gray-100 text-gray-600'}`}>
                        {unitLabels[lesson.unit] || `Unit ${lesson.unit}`}
                      </span>
                      <BookOpen className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 transition-colors" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2 leading-tight group-hover:text-cyan-700 transition-colors">
                      {lesson.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-auto pt-4 border-t border-slate-100 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                      Xem chi tiết
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-100 rounded-full">
                Kiểm tra trắc nghiệm
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                Quiz <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">40 câu</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Bao phủ Unit 7, 8, 9 và Review 3. Có giải thích chi tiết sau khi nộp bài.
              </p>
            </div>
            <QuizSection questions={quizQuestions} />
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-16 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-10">
            <h4 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-violet-400 to-amber-400 inline-block">
              Global Success 8 - Ôn tập Giữa kỳ 2
            </h4>
            <p className="text-slate-400 max-w-lg mx-auto">
              Unit 7, 8, 9 & Review 3. Bảo vệ Môi trường, Mua sắm, Thiên tai. Ngữ pháp chuyên sâu kết hợp ngữ âm.
            </p>
          </div>
          <div className="flex justify-center gap-6 mb-10">
            <a href="https://zalo.me/0814666040" className="w-12 h-12 bg-white/5 text-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:text-white hover:scale-110 transition-all duration-300 ring-1 ring-white/10">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="tel:0814666040" className="w-12 h-12 bg-white/5 text-green-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white hover:scale-110 transition-all duration-300 ring-1 ring-white/10">
              <Phone className="w-5 h-5" />
            </a>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
            <p>© 2026 THCS Nguyễn Văn Bánh - Vĩnh Long</p>
            <p>Designed with ❤️ by Teacher Tung</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {activeLessonId !== null && activeLesson && (
          <LessonModal
            lesson={activeLesson}
            onClose={handleCloseModal}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={activeLessonId < lessons.length - 1}
            hasPrev={activeLessonId > 0}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;