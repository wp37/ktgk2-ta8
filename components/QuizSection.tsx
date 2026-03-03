import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, XCircle, Clock, Trophy, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizSectionProps {
    questions: QuizQuestion[];
}

type QuizState = 'idle' | 'active' | 'result';

const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
    const [state, setState] = useState<QuizState>('idle');
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [showExplanations, setShowExplanations] = useState(false);

    const totalQ = questions.length;
    const QUIZ_TIME = 30 * 60;

    useEffect(() => {
        if (state !== 'active') return;
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(timer); setState('result'); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [state]);

    const startQuiz = () => {
        setAnswers({});
        setCurrent(0);
        setTimeLeft(QUIZ_TIME);
        setShowExplanations(false);
        setState('active');
    };

    const selectAnswer = (qIdx: number, optIdx: number) => {
        if (state !== 'active') return;
        setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    };

    const submit = useCallback(() => {
        setState('result');
    }, []);

    const correctCount = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
    const score = (correctCount / totalQ * 10).toFixed(1);
    const percent = Math.round(correctCount / totalQ * 100);

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timerColor = timeLeft <= 60 ? 'text-red-600' : timeLeft <= 180 ? 'text-amber-600' : 'text-indigo-600';

    // IDLE
    if (state === 'idle') return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur">
                        <span className="text-4xl">📝</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Kiểm tra Giữa kỳ 2</h2>
                    <p className="text-indigo-100">{totalQ} câu hỏi • 30 phút</p>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-indigo-50 rounded-2xl">
                            <div className="text-2xl mb-1">📝</div>
                            <div className="text-2xl font-bold text-indigo-600">{totalQ}</div>
                            <div className="text-xs text-gray-500">Câu hỏi</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-2xl">
                            <div className="text-2xl mb-1">⏱️</div>
                            <div className="text-2xl font-bold text-purple-600">30</div>
                            <div className="text-xs text-gray-500">Phút</div>
                        </div>
                        <div className="text-center p-4 bg-pink-50 rounded-2xl">
                            <div className="text-2xl mb-1">🎯</div>
                            <div className="text-2xl font-bold text-pink-600">10</div>
                            <div className="text-xs text-gray-500">Điểm tối đa</div>
                        </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                        <p className="text-amber-800 text-sm">
                            <span className="font-bold">⚠️ Lưu ý:</span> Bài kiểm tra sẽ tự động nộp khi hết thời gian. Bạn có thể xem giải thích chi tiết sau khi nộp bài.
                        </p>
                    </div>
                    <button
                        onClick={startQuiz}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        🚀 Bắt đầu làm bài
                    </button>
                </div>
            </div>
        </div>
    );

    // RESULT
    if (state === 'result') {
        const isExcellent = parseFloat(score) >= 9;
        const isGood = parseFloat(score) >= 7;
        const isOk = parseFloat(score) >= 5;
        const gradient = isExcellent ? 'from-amber-400 to-orange-500' : isGood ? 'from-emerald-400 to-teal-500' : isOk ? 'from-blue-400 to-indigo-500' : 'from-pink-400 to-rose-500';
        const title = isExcellent ? '🏆 Xuất sắc!' : isGood ? '🌟 Giỏi lắm!' : isOk ? '👍 Khá tốt!' : '💪 Cần cố gắng!';

        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className={`bg-gradient-to-br ${gradient} p-8 text-center`}>
                        <div className="text-5xl mb-4 font-extrabold text-white">{score}</div>
                        <div className="text-white/80 text-sm mb-2">/10 điểm</div>
                        <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                                <div className="text-2xl mb-1">✅</div>
                                <div className="text-2xl font-bold text-emerald-600">{correctCount}</div>
                                <div className="text-xs text-gray-500">Đúng</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-2xl border-2 border-red-100">
                                <div className="text-2xl mb-1">❌</div>
                                <div className="text-2xl font-bold text-red-500">{totalQ - correctCount}</div>
                                <div className="text-xs text-gray-500">Sai</div>
                            </div>
                            <div className="text-center p-4 bg-indigo-50 rounded-2xl border-2 border-indigo-100">
                                <div className="text-2xl mb-1">📊</div>
                                <div className="text-2xl font-bold text-indigo-600">{percent}%</div>
                                <div className="text-xs text-gray-500">Tỷ lệ</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={startQuiz} className="flex-1 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                <RotateCcw className="w-4 h-4" /> Làm lại
                            </button>
                            <button onClick={() => setShowExplanations(!showExplanations)} className="flex-1 py-3 px-6 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all">
                                {showExplanations ? 'Ẩn giải thích' : '📖 Xem giải thích'}
                            </button>
                        </div>
                    </div>
                </div>

                {showExplanations && (
                    <div className="space-y-4">
                        {questions.map((q, i) => {
                            const isCorrect = answers[i] === q.correct;
                            const letters = ['A', 'B', 'C', 'D'];
                            return (
                                <div key={q.id} className={`bg-white rounded-2xl border-2 p-5 ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}>
                                    <div className="flex items-start gap-3 mb-3">
                                        {isCorrect ? <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />}
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase">Câu {i + 1} {q.unit > 0 ? `• Unit ${q.unit}` : '• Review 3'}</span>
                                            <p className="font-medium text-gray-800">{q.question}</p>
                                        </div>
                                    </div>
                                    <div className="ml-9 space-y-1 text-sm">
                                        {q.options.map((opt, oi) => (
                                            <div key={oi} className={`px-3 py-1.5 rounded-lg ${oi === q.correct ? 'bg-emerald-50 text-emerald-800 font-bold' : oi === answers[i] && oi !== q.correct ? 'bg-red-50 text-red-800 line-through' : 'text-gray-600'}`}>
                                                {letters[oi]}. {opt}
                                            </div>
                                        ))}
                                        <div className="mt-2 bg-blue-50 p-3 rounded-lg text-blue-800 text-xs">
                                            💡 {q.explanation}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    // ACTIVE
    const q = questions[current];
    const letters = ['A', 'B', 'C', 'D'];
    const answeredCount = Object.keys(answers).length;

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            {/* Timer */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 font-medium text-sm">Thời gian còn lại:</span>
                    </div>
                    <div className={`text-2xl font-bold ${timerColor}`}>
                        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                    </div>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 60 ? 'bg-red-500' : timeLeft <= 180 ? 'bg-amber-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                        style={{ width: `${timeLeft / QUIZ_TIME * 100}%` }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>Đã trả lời: {answeredCount}/{totalQ}</span>
                    <span>Câu {current + 1}/{totalQ}</span>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {current + 1}
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase mb-1 block">
                                {q.unit > 0 ? `Unit ${q.unit}` : 'Review 3'}
                            </span>
                            <p className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">{q.question}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => selectAnswer(current, i)}
                                className={`w-full p-4 text-left rounded-xl border-2 flex items-center gap-4 transition-all duration-200 ${answers[current] === i
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent shadow-lg'
                                        : 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 hover:translate-x-2'
                                    }`}
                            >
                                <span className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold ${answers[current] === i ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}>{letters[i]}</span>
                                <span className="font-medium">{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCurrent(Math.max(0, current - 1))}
                            disabled={current === 0}
                            className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                        >
                            <ChevronLeft className="w-4 h-4" /> Trước
                        </button>
                        {current < totalQ - 1 ? (
                            <button
                                onClick={() => setCurrent(current + 1)}
                                className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1"
                            >
                                Tiếp <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={submit}
                                className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                                ✓ Nộp bài
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Question Nav */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="text-sm text-gray-500 mb-3 font-medium">Điều hướng câu hỏi:</div>
                <div className="flex flex-wrap gap-2">
                    {questions.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-9 h-9 rounded-lg font-semibold text-sm border-2 transition-all ${i === current ? 'bg-indigo-600 text-white border-indigo-600'
                                    : answers[i] !== undefined ? 'bg-emerald-500 text-white border-emerald-500'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizSection;
