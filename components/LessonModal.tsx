import React from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Lesson } from '../types';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const LessonModal: React.FC<LessonModalProps> = ({ 
  lesson, 
  onClose, 
  onNext, 
  onPrev,
  hasNext,
  hasPrev
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${lesson.color} p-6 flex justify-between items-center shrink-0`}>
          <div className="flex items-center gap-3">
             <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
               <lesson.icon className="text-white w-6 h-6" />
             </div>
             <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{lesson.title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto grow custom-scrollbar bg-gray-50/50">
          <div className="max-w-3xl mx-auto">
             {lesson.content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 md:p-6 border-t border-gray-100 flex justify-between shrink-0 bg-white">
          <button 
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center px-6 py-3 rounded-full border border-gray-200 font-medium transition-all duration-200 ${
              hasPrev 
                ? 'hover:bg-gray-50 hover:border-gray-300 text-gray-700' 
                : 'opacity-50 cursor-not-allowed text-gray-400'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Trước
          </button>
          
          <button 
            onClick={hasNext ? onNext : onClose}
            className={`flex items-center px-8 py-3 rounded-full text-white font-medium shadow-lg shadow-indigo-200 transition-all duration-200 transform hover:-translate-y-0.5 ${
                hasNext 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            <span className="mr-2">{hasNext ? 'Tiếp theo' : 'Hoàn thành'}</span>
            {hasNext ? <ArrowRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LessonModal;
