import React, { useState } from 'react';
import {
  Shield,
  ShoppingCart,
  CloudLightning,
  Zap,
  Info,
  AlertTriangle,
  CheckCircle2,
  Mic,
  ClipboardCheck,
  RotateCcw,
  Star,
  Leaf,
  Store,
  Wind
} from 'lucide-react';
import { Lesson, VocabItem, ExerciseItem, QuizQuestion } from './types';

// --- COMPONENTS FOR CONTENT ---

const VocabTable: React.FC<{ items: VocabItem[], colorTheme: string }> = ({ items, colorTheme }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className={`${colorTheme} text-white`}>
          <tr>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Từ vựng (Word)</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">IPA & Loại từ</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Phân tích & Ngữ cảnh</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <span className="font-bold text-gray-900 text-base block">{item.word}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-md border border-gray-200">{item.ipa}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: item.meaning }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GrammarBox: React.FC<{
  title: string;
  rule: React.ReactNode;
  examples: { correct: string; incorrect?: string; explain?: string }[];
  color: string
}> = ({ title, rule, examples, color }) => (
  <div className="mb-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
    <div className={`${color} px-6 py-4 border-b border-white/10`}>
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <Zap className="w-5 h-5 fill-current" /> {title}
      </h3>
    </div>
    <div className="p-6">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 font-medium text-gray-800">
        {rule}
      </div>
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="relative pl-4 border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all">
            <div className="flex items-start gap-3 mb-1">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-green-800 font-medium bg-green-50 px-2 py-1 rounded inline-block">{ex.correct}</p>
            </div>
            {ex.incorrect && (
              <div className="flex items-start gap-3 mb-1">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-800 line-through decoration-red-500/50 bg-red-50 px-2 py-1 rounded inline-block">{ex.incorrect}</p>
              </div>
            )}
            {ex.explain && (
              <p className="text-sm text-gray-500 italic ml-8 mt-1 border-t border-dashed border-gray-200 pt-1">💡 {ex.explain}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExerciseCard: React.FC<{ item: ExerciseItem, idx: number }> = ({ item, idx }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm shrink-0">
          {idx + 1}
        </span>
        <div className="grow">
          <p className="font-medium text-gray-800 text-lg mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.question }}></p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
            </button>
          </div>
          {showAnswer && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-green-800 font-bold block mb-1">Giải thích chi tiết:</span>
                <span className="text-green-900" dangerouslySetInnerHTML={{ __html: item.answer }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhoneticCard: React.FC<{ pair: string, words: string[], tip: string }> = ({ pair, words, tip }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-indigo-200 transition-colors h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">{pair}</span>
      <Mic className="text-gray-400 w-6 h-6" />
    </div>
    <div className="flex flex-wrap gap-2 mb-4 grow content-start">
      {words.map((w, i) => (
        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">
          {w}
        </span>
      ))}
    </div>
    <p className="text-sm text-gray-600 italic bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-auto">
      <span className="font-bold text-yellow-700 not-italic">Quy tắc:</span> {tip}
    </p>
  </div>
);

// --- UNIT 7: ENVIRONMENTAL PROTECTION ---

const unit7Vocab: VocabItem[] = [
  { word: "Ecosystem", ipa: "/ˈiːkəʊsɪstəm/ (n)", meaning: "<strong>Hệ sinh thái</strong>. Hệ thống các sinh vật sống và môi trường tương tác.<br/><em class='text-xs text-gray-500'>Ví dụ: protect the ecosystem.</em>" },
  { word: "Endangered species", ipa: "/ɪnˈdeɪndʒəd ˈspiːʃiːz/ (n)", meaning: "<strong>Loài có nguy cơ tuyệt chủng</strong>. Động thực vật sắp tuyệt chủng.<br/><em class='text-xs text-gray-500'>Collocation: protect endangered species.</em>" },
  { word: "Habitat", ipa: "/ˈhæbɪtæt/ (n)", meaning: "<strong>Môi trường sống</strong>. Nơi sinh sống tự nhiên của động thực vật.<br/><em class='text-xs text-gray-500'>Ví dụ: natural habitat.</em>" },
  { word: "Extinction", ipa: "/ɪkˈstɪŋkʃn/ (n)", meaning: "<strong>Sự tuyệt chủng</strong>. Tình trạng không còn tồn tại.<br/><em class='text-xs text-gray-500'>Family: extinct (adj).</em>" },
  { word: "Carbon dioxide", ipa: "/ˌkɑːbən daɪˈɒksaɪd/ (n)", meaning: "<strong>Khí CO₂</strong>. Khí nhà kính gây nóng lên toàn cầu.<br/><em class='text-xs text-gray-500'>Collocation: release carbon dioxide.</em>" },
  { word: "Carbon footprint", ipa: "/ˌkɑːbən ˈfʊtprɪnt/ (n)", meaning: "<strong>Dấu chân cacbon</strong>. Lượng CO₂ thải ra từ hoạt động con người.<br/><em class='text-xs text-gray-500'>Ví dụ: reduce your carbon footprint.</em>" },
  { word: "Toxic", ipa: "/ˈtɒksɪk/ (adj)", meaning: "<strong>Độc hại</strong>. Có chất gây hại cho sức khỏe.<br/><em class='text-xs text-gray-500'>Ví dụ: toxic substances.</em>" },
  { word: "Single-use", ipa: "/ˌsɪŋɡl ˈjuːs/ (adj)", meaning: "<strong>Sử dụng một lần</strong>. Dùng xong bỏ đi.<br/><em class='text-xs text-gray-500'>Ví dụ: single-use plastic bags.</em>" },
  { word: "Protect", ipa: "/prəˈtekt/ (v)", meaning: "<strong>Bảo vệ</strong>. Giữ gìn, che chở.<br/><em class='text-xs text-gray-500'>Family: protection (n), protective (adj).</em>" },
  { word: "Participate", ipa: "/pɑːˈtɪsɪpeɪt/ (v)", meaning: "<strong>Tham gia</strong>. Góp phần vào hoạt động.<br/><em class='text-xs text-gray-500'>Collocation: participate in activities.</em>" },
  { word: "Coral", ipa: "/ˈkɒrəl/ (n)", meaning: "<strong>San hô</strong>. Sinh vật biển tạo rạn san hô.<br/><em class='text-xs text-gray-500'>Ví dụ: coral reef.</em>" },
  { word: "Dugong", ipa: "/ˈduːɡɒŋ/ (n)", meaning: "<strong>Bò biển (cá cúi)</strong>. Động vật biển có vú quý hiếm.<br/><em class='text-xs text-gray-500'>Ví dụ: Côn Đảo dugong conservation.</em>" },
];

const unit7Exercises: ExerciseItem[] = [
  { id: 1, question: "The roads were slippery _______ it rained.<br/>A. when B. until C. as soon as D. while", answer: "<strong>A. when</strong>.<br/>(When + quá khứ đơn: diễn tả thời điểm xảy ra sự việc)." },
  { id: 2, question: "_______ they arrive, we'll have lunch.", answer: "<strong>As soon as</strong>.<br/>(As soon as = ngay khi. Mệnh đề chính ở tương lai, mệnh đề phụ dùng hiện tại đơn)." },
  { id: 3, question: "We should stop using single-use products _______ we can protect the environment.", answer: "<strong>so that</strong>.<br/>(So that + mệnh đề chỉ mục đích)." },
  { id: 4, question: "Phonetics: Choose the word with /bl/ sound:<br/>A. <strong>Cl</strong>ean B. <strong>Bl</strong>ack C. <strong>Cl</strong>ub D. <strong>Cl</strong>ear", answer: "<strong>B. Black</strong>. Các từ còn lại chứa âm /kl/." },
];

// --- UNIT 8: SHOPPING ---

const unit8Vocab: VocabItem[] = [
  { word: "Bargain", ipa: "/ˈbɑːɡən/ (v)", meaning: "<strong>Mặc cả</strong>. Thương lượng giá khi mua hàng.<br/><em class='text-xs text-gray-500'>Ví dụ: bargain at the market.</em>" },
  { word: "Customer", ipa: "/ˈkʌstəmə/ (n)", meaning: "<strong>Khách hàng</strong>. Người mua hàng hoặc dịch vụ.<br/><em class='text-xs text-gray-500'>Collocation: loyal customer.</em>" },
  { word: "Shopaholic", ipa: "/ˌʃɒpəˈhɒlɪk/ (n)", meaning: "<strong>Người nghiện mua sắm</strong>. Người thích mua sắm quá mức.<br/><em class='text-xs text-gray-500'>Family: -aholic = nghiện cái gì.</em>" },
  { word: "Advertisement", ipa: "/ədˈvɜːtɪsmənt/ (n)", meaning: "<strong>Quảng cáo</strong>. Thông tin giới thiệu sản phẩm.<br/><em class='text-xs text-gray-500'>Viết tắt: ad / advert.</em>" },
  { word: "Complaint", ipa: "/kəmˈpleɪnt/ (n)", meaning: "<strong>Lời phàn nàn / khiếu nại</strong>.<br/><em class='text-xs text-gray-500'>Family: complain (v).</em>" },
  { word: "Goods", ipa: "/ɡʊdz/ (n)", meaning: "<strong>Hàng hoá</strong>. Sản phẩm được bán.<br/><em class='text-xs text-gray-500'>Luôn ở dạng số nhiều.</em>" },
  { word: "On sale", ipa: "/ɒn seɪl/", meaning: "<strong>Đang hạ giá</strong>. Đang được bán giảm giá.<br/><em class='text-xs text-gray-500'>Ví dụ: These shoes are on sale.</em>" },
  { word: "Open-air market", ipa: "/ˌəʊpən ˈeə ˈmɑːkɪt/ (n)", meaning: "<strong>Chợ ngoài trời</strong>. Chợ họp ở không gian mở.<br/><em class='text-xs text-gray-500'>Đồng nghĩa: outdoor market.</em>" },
  { word: "Price tag", ipa: "/ˈpraɪs tæɡ/ (n)", meaning: "<strong>Nhãn giá</strong>. Thẻ ghi giá sản phẩm.<br/><em class='text-xs text-gray-500'>Ví dụ: check the price tag.</em>" },
  { word: "Shopping centre", ipa: "/ˈʃɒpɪŋ sentə/ (n)", meaning: "<strong>Trung tâm mua sắm</strong>. Tòa nhà lớn chứa nhiều cửa hàng.<br/><em class='text-xs text-gray-500'>= Shopping mall (AmE).</em>" },
  { word: "Convenience store", ipa: "/kənˈviːniəns stɔː/ (n)", meaning: "<strong>Cửa hàng tiện lợi</strong>. Cửa hàng nhỏ mở muộn.<br/><em class='text-xs text-gray-500'>Ví dụ: 7-Eleven, Circle K.</em>" },
  { word: "Home-made", ipa: "/ˌhəʊm ˈmeɪd/ (adj)", meaning: "<strong>Tự làm tại nhà</strong>. Không phải hàng công nghiệp.<br/><em class='text-xs text-gray-500'>Ví dụ: home-made cake.</em>" },
];

const unit8Exercises: ExerciseItem[] = [
  { id: 1, question: "My mother _______ shops at the supermarket. She goes there every weekend.", answer: "<strong>always / often</strong>.<br/>(Trạng từ tần suất: always = luôn luôn, often = thường xuyên, đứng trước động từ thường)." },
  { id: 2, question: "The train _______ (leave) at 4:30, so we still have time.<br/>(Chia động từ)", answer: "<strong>leaves</strong>.<br/>(Thì hiện tại đơn mang ý nghĩa tương lai: dùng cho lịch trình/thời gian biểu cố định)." },
  { id: 3, question: "She _______ buys things online. She prefers going to the shop.<br/>A. always B. often C. rarely D. sometimes", answer: "<strong>C. rarely</strong>.<br/>(Rarely = hiếm khi. Phù hợp vì cô ấy thích đi cửa hàng hơn)." },
  { id: 4, question: "Phonetics: Choose the word with /sp/ sound:<br/>A. <strong>St</strong>all B. <strong>Sp</strong>end C. <strong>St</strong>aff D. <strong>St</strong>ore", answer: "<strong>B. Spend</strong>. Các từ còn lại chứa âm /st/." },
];

// --- UNIT 9: NATURAL DISASTERS ---

const unit9Vocab: VocabItem[] = [
  { word: "Earthquake", ipa: "/ˈɜːθkweɪk/ (n)", meaning: "<strong>Trận động đất</strong>. Hiện tượng mặt đất rung lắc mạnh.<br/><em class='text-xs text-gray-500'>Collocation: a massive earthquake.</em>" },
  { word: "Tornado", ipa: "/tɔːˈneɪdəʊ/ (n)", meaning: "<strong>Lốc xoáy</strong>. Cột gió xoáy cực mạnh.<br/><em class='text-xs text-gray-500'>Số nhiều: tornadoes.</em>" },
  { word: "Tsunami", ipa: "/tsuːˈnɑːmi/ (n)", meaning: "<strong>Sóng thần</strong>. Sóng biển khổng lồ do động đất.<br/><em class='text-xs text-gray-500'>Từ gốc tiếng Nhật.</em>" },
  { word: "Volcanic", ipa: "/vɒlˈkænɪk/ (adj)", meaning: "<strong>Thuộc núi lửa</strong>. Liên quan đến núi lửa.<br/><em class='text-xs text-gray-500'>Family: volcano (n), erupt (v), eruption (n).</em>" },
  { word: "Landslide", ipa: "/ˈlændslaɪd/ (n)", meaning: "<strong>Sạt lở đất</strong>. Đất đá trượt xuống từ sườn núi.<br/><em class='text-xs text-gray-500'>Ví dụ: heavy rain caused landslides.</em>" },
  { word: "Destroy", ipa: "/dɪˈstrɔɪ/ (v)", meaning: "<strong>Phá hủy</strong>. Làm hỏng hoàn toàn.<br/><em class='text-xs text-gray-500'>Family: destruction (n), destructive (adj).</em>" },
  { word: "Damage", ipa: "/ˈdæmɪdʒ/ (n, v)", meaning: "<strong>Thiệt hại / gây tổn hại</strong>.<br/><em class='text-xs text-gray-500'>Collocation: cause serious damage.</em>" },
  { word: "Victim", ipa: "/ˈvɪktɪm/ (n)", meaning: "<strong>Nạn nhân</strong>. Người bị ảnh hưởng bởi thảm họa.<br/><em class='text-xs text-gray-500'>Ví dụ: flood victims.</em>" },
  { word: "Rescue worker", ipa: "/ˈreskjuː ˈwɜːkə/ (n)", meaning: "<strong>Nhân viên cứu hộ</strong>. Người tham gia cứu nạn.<br/><em class='text-xs text-gray-500'>= rescuer.</em>" },
  { word: "Predict", ipa: "/prɪˈdɪkt/ (v)", meaning: "<strong>Dự đoán</strong>. Nói trước điều sẽ xảy ra.<br/><em class='text-xs text-gray-500'>Family: prediction (n), predictable (adj).</em>" },
  { word: "Emergency kit", ipa: "/ɪˈmɜːdʒənsi kɪt/ (n)", meaning: "<strong>Bộ dụng cụ khẩn cấp</strong>. Đồ dùng cần thiết khi thảm họa xảy ra.<br/><em class='text-xs text-gray-500'>Gồm: đèn pin, nước, thuốc...</em>" },
  { word: "Warn", ipa: "/wɔːn/ (v)", meaning: "<strong>Cảnh báo</strong>. Báo trước về nguy hiểm.<br/><em class='text-xs text-gray-500'>Family: warning (n).</em>" },
];

const unit9Exercises: ExerciseItem[] = [
  { id: 1, question: "When we _______ (watch) TV, we felt the earthquake.", answer: "<strong>were watching</strong>.<br/>(Quá khứ tiếp diễn cho hành động đang xảy ra, quá khứ đơn cho hành động xen vào: When + QKTD, QKĐ)." },
  { id: 2, question: "I _______ (have) dinner at 6 p.m. yesterday.", answer: "<strong>was having</strong>.<br/>(Quá khứ tiếp diễn: diễn tả hành động đang xảy ra tại thời điểm xác định trong quá khứ)." },
  { id: 3, question: "_______ they were sleeping, the storm hit the town.", answer: "<strong>While</strong>.<br/>(While + quá khứ tiếp diễn: trong khi đang... thì...)." },
  { id: 4, question: "Stress Pattern: Choose the word with different stress:<br/>A. <strong>mu</strong>sical B. <strong>na</strong>tional C. am<strong>bi</strong>tious D. <strong>per</strong>sonal", answer: "<strong>C. ambitious</strong> (nhấn âm 2: am-BI-tious).<br/>Các từ khác nhấn âm 1. Quy tắc: đuôi -ous/-al thường nhấn âm 3 từ cuối." },
];

const review3Exercises: ExerciseItem[] = [
  { id: 1, question: "We should reduce _______ products to protect the environment.<br/>A. single-use B. home-made C. on sale D. addicted", answer: "<strong>A. single-use</strong>.<br/>(Single-use products = sản phẩm dùng một lần. Unit 7)." },
  { id: 2, question: "The _______ at the shopping centre were very happy with the discounts.<br/>A. victims B. residents C. customers D. species", answer: "<strong>C. customers</strong>.<br/>(Customers = khách hàng. Unit 8)." },
  { id: 3, question: "The earthquake caused serious _______ to many buildings.<br/>A. habitat B. damage C. bargain D. complaint", answer: "<strong>B. damage</strong>.<br/>(Cause damage = gây thiệt hại. Unit 9)." },
  { id: 4, question: "When the flood _______ (come), people _______ (sleep).<br/>(Chia động từ)", answer: "<strong>came / were sleeping</strong>.<br/>(Quá khứ đơn cho hành động xen vào + Quá khứ tiếp diễn cho hành động đang diễn ra)." },
  { id: 5, question: "She _______ goes shopping online because she prefers real shops.<br/>A. always B. often C. rarely D. never", answer: "<strong>C. rarely</strong>.<br/>(Rarely = hiếm khi, phù hợp với ngữ cảnh thích cửa hàng thật)." },
  { id: 6, question: "_______ the rain stops, we will go to the market.", answer: "<strong>As soon as / When</strong>.<br/>(Mệnh đề trạng ngữ chỉ thời gian. Mệnh đề chính: tương lai. Mệnh đề phụ: hiện tại đơn)." },
];

export const quizQuestions: QuizQuestion[] = [
  // Unit 7 - Vocabulary
  { id: 1, question: "Many _______ are in danger because of pollution.", options: ["ecosystems", "advertisements", "customers", "tornadoes"], correct: 0, explanation: "Ecosystem = hệ sinh thái.", unit: 7 },
  { id: 2, question: "The factory releases _______ substances into the river.", options: ["home-made", "single-use", "toxic", "affordable"], correct: 2, explanation: "Toxic = độc hại.", unit: 7 },
  { id: 3, question: "We should reduce our _______ by using less energy.", options: ["carbon footprint", "price tag", "emergency kit", "coral"], correct: 0, explanation: "Carbon footprint = dấu chân cacbon.", unit: 7 },
  { id: 4, question: "The dugong is an _______ in Vietnam.", options: ["ecosystem", "endangered species", "extinction", "habitat"], correct: 1, explanation: "Endangered species = loài có nguy cơ tuyệt chủng.", unit: 7 },
  { id: 5, question: "Everyone should _______ in environmental protection activities.", options: ["participate", "predict", "destroy", "bargain"], correct: 0, explanation: "Participate = tham gia.", unit: 7 },
  // Unit 7 - Grammar
  { id: 6, question: "I'll call you _______ I arrive at the airport.", options: ["as soon as", "until", "while", "before"], correct: 0, explanation: "As soon as = ngay khi. Mệnh đề chính tương lai, mệnh đề phụ hiện tại.", unit: 7 },
  { id: 7, question: "_______ it started raining, we went inside.", options: ["While", "When", "Until", "As soon as"], correct: 1, explanation: "When + quá khứ đơn: khi trời bắt đầu mưa.", unit: 7 },
  { id: 8, question: "We waited _______ the rain stopped.", options: ["when", "while", "until", "as soon as"], correct: 2, explanation: "Until = cho đến khi. Chờ cho đến khi mưa tạnh.", unit: 7 },
  // Unit 7 - Phonetics
  { id: 9, question: "Which word contains the /bl/ sound?", options: ["clean", "blanket", "club", "class"], correct: 1, explanation: "Blanket /ˈblæŋkɪt/ - các từ còn lại chứa /kl/.", unit: 7 },
  { id: 10, question: "Which word contains the /kl/ sound?", options: ["block", "blast", "black", "clear"], correct: 3, explanation: "Clear /klɪə/ - các từ còn lại chứa /bl/.", unit: 7 },
  // Unit 8 - Vocabulary
  { id: 11, question: "She loves shopping so much. She's a real _______.", options: ["customer", "shopaholic", "resident", "victim"], correct: 1, explanation: "Shopaholic = người nghiện mua sắm.", unit: 8 },
  { id: 12, question: "You can _______ at the open-air market to get a lower price.", options: ["complain", "bargain", "predict", "participate"], correct: 1, explanation: "Bargain = mặc cả.", unit: 8 },
  { id: 13, question: "All _______ in the store are 50% off this week.", options: ["goods", "habitats", "species", "substances"], correct: 0, explanation: "Goods = hàng hoá.", unit: 8 },
  { id: 14, question: "Check the _______ before you buy that shirt.", options: ["carbon footprint", "emergency kit", "price tag", "coral reef"], correct: 2, explanation: "Price tag = nhãn giá.", unit: 8 },
  { id: 15, question: "My grandmother makes _______ cakes for the family.", options: ["single-use", "home-made", "toxic", "volcanic"], correct: 1, explanation: "Home-made = tự làm tại nhà.", unit: 8 },
  // Unit 8 - Grammar
  { id: 16, question: "She _______ goes to bed late. She's always in bed by 10 p.m.", options: ["always", "often", "sometimes", "never"], correct: 3, explanation: "Never = không bao giờ. Phù hợp: luôn đi ngủ trước 10h.", unit: 8 },
  { id: 17, question: "The bus _______ at 8:15 every morning. (leave)", options: ["leaves", "is leaving", "will leave", "left"], correct: 0, explanation: "Hiện tại đơn cho lịch trình cố định.", unit: 8 },
  { id: 18, question: "My art class _______ at 2 p.m. tomorrow. (start)", options: ["starts", "is starting", "will start", "started"], correct: 0, explanation: "Present simple for timetable/schedule.", unit: 8 },
  // Unit 8 - Phonetics
  { id: 19, question: "Which word contains the /sp/ sound?", options: ["stall", "staff", "special", "store"], correct: 2, explanation: "Special /ˈspeʃl/ - các từ còn lại chứa /st/.", unit: 8 },
  { id: 20, question: "Which word contains the /st/ sound?", options: ["spend", "space", "honest", "sport"], correct: 2, explanation: "Honest /ˈɒnɪst/ - chứa âm /st/ ở cuối.", unit: 8 },
  // Unit 9 - Vocabulary
  { id: 21, question: "The _______ measured 7.0 on the Richter scale.", options: ["tornado", "earthquake", "tsunami", "landslide"], correct: 1, explanation: "Earthquake = động đất. Richter scale đo độ mạnh động đất.", unit: 9 },
  { id: 22, question: "The volcano _______ violently last night.", options: ["predicted", "damaged", "erupted", "warned"], correct: 2, explanation: "Erupted = phun trào.", unit: 9 },
  { id: 23, question: "Many _______ lost their homes after the flood.", options: ["customers", "victims", "residents", "species"], correct: 1, explanation: "Victims = nạn nhân.", unit: 9 },
  { id: 24, question: "Scientists can _______ when a storm will come.", options: ["protect", "predict", "participate", "release"], correct: 1, explanation: "Predict = dự đoán.", unit: 9 },
  { id: 25, question: "You should prepare an _______ for emergencies.", options: ["ecosystem", "emergency kit", "advertisement", "extinction"], correct: 1, explanation: "Emergency kit = bộ dụng cụ khẩn cấp.", unit: 9 },
  // Unit 9 - Grammar
  { id: 26, question: "While I _______ to school, it started to rain.", options: ["walk", "walked", "was walking", "am walking"], correct: 2, explanation: "While + quá khứ tiếp diễn: đang đi thì trời mưa.", unit: 9 },
  { id: 27, question: "They _______ dinner when the earthquake happened.", options: ["have", "had", "were having", "are having"], correct: 2, explanation: "Quá khứ tiếp diễn: đang ăn tối thì động đất.", unit: 9 },
  { id: 28, question: "When the alarm _______ (ring), everyone ran outside.", options: ["rang", "was ringing", "rings", "is ringing"], correct: 0, explanation: "When + quá khứ đơn cho hành động xen vào.", unit: 9 },
  // Unit 9 - Phonetics
  { id: 29, question: "Which word has stress on the FIRST syllable?", options: ["ambitious", "dangerous", "volcanic", "disaster"], correct: 1, explanation: "DAN-ge-rous nhấn âm 1. Quy tắc -ous: trọng âm trước 2 âm tiết.", unit: 9 },
  { id: 30, question: "Which word has stress on the SECOND syllable?", options: ["personal", "national", "arrival", "musical"], correct: 2, explanation: "a-RRI-val nhấn âm 2. Các từ khác nhấn âm 1.", unit: 9 },
  // Review 3
  { id: 31, question: "_______ the storm passed, the villagers came out.", options: ["While", "Until", "After", "During"], correct: 2, explanation: "After = sau khi. Mệnh đề trạng ngữ chỉ thời gian.", unit: 0 },
  { id: 32, question: "He was sleeping _______ the tornado hit the town.", options: ["when", "until", "as soon as", "before"], correct: 0, explanation: "When + quá khứ đơn: hành động xen vào.", unit: 0 },
  { id: 33, question: "The shop _______ at 9 a.m. every day.", options: ["opens", "is opening", "will open", "opened"], correct: 0, explanation: "Hiện tại đơn cho lịch trình cố định.", unit: 0 },
  { id: 34, question: "Many animals face _______ because of deforestation.", options: ["complaint", "extinction", "discount", "bargain"], correct: 1, explanation: "Extinction = sự tuyệt chủng.", unit: 0 },
  { id: 35, question: "The _______ helped save people from the flood.", options: ["shopaholic", "customer", "rescue workers", "dugong"], correct: 2, explanation: "Rescue workers = nhân viên cứu hộ.", unit: 0 },
  { id: 36, question: "I _______ buy things at the convenience store because it's near my house.", options: ["never", "rarely", "often", "before"], correct: 2, explanation: "Often = thường xuyên.", unit: 0 },
  { id: 37, question: "While we _______ (play) outside, it started to rain.", options: ["play", "played", "were playing", "are playing"], correct: 2, explanation: "While + quá khứ tiếp diễn.", unit: 0 },
  { id: 38, question: "The heavy rain caused _______ in many areas.", options: ["bargains", "landslides", "advertisements", "price tags"], correct: 1, explanation: "Landslides = sạt lở đất.", unit: 0 },
  { id: 39, question: "We will wait here _______ the bus comes.", options: ["while", "as soon as", "until", "after"], correct: 2, explanation: "Until = cho đến khi.", unit: 0 },
  { id: 40, question: "She _______ shops at the open-air market on Sundays.", options: ["always", "never", "rarely", "until"], correct: 0, explanation: "Always = luôn luôn.", unit: 0 },
];

// --- LESSONS ---

export const lessons: Lesson[] = [
  // UNIT 7
  {
    id: 0, title: "Unit 7: Từ vựng Bảo vệ Môi trường", unit: 7, icon: Leaf,
    color: "from-emerald-600 to-green-600",
    content: (
      <div>
        <div className="bg-emerald-50 p-6 rounded-2xl mb-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">Environmental Protection</h2>
          <p className="text-emerald-700">Từ vựng về hệ sinh thái, ô nhiễm, loài có nguy cơ tuyệt chủng và các hoạt động bảo vệ môi trường.</p>
        </div>
        <VocabTable items={unit7Vocab} colorTheme="bg-gradient-to-r from-emerald-600 to-green-600" />
      </div>
    )
  },
  {
    id: 1, title: "Unit 7: Ngữ pháp Mệnh đề trạng ngữ chỉ thời gian", unit: 7, icon: Shield,
    color: "from-green-500 to-teal-600",
    content: (
      <div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-800 font-bold">Trọng tâm: Complex Sentences with Adverb Clauses of Time</p>
          <p className="text-yellow-700 text-sm mt-1">Từ nối: <strong>before, after, when, while, till/until, as soon as</strong></p>
        </div>
        <GrammarBox
          title="Câu phức với Mệnh đề trạng ngữ chỉ thời gian"
          color="bg-teal-600"
          rule={
            <div className="space-y-2 text-sm md:text-base">
              <p><strong>Cấu trúc:</strong> Main clause + time connector + dependent clause</p>
              <div className="grid grid-cols-2 gap-2 border-b pb-2 mt-3">
                <span className="font-semibold text-gray-600">Từ nối (Connector)</span>
                <span className="font-semibold text-teal-600">Ý nghĩa</span>
              </div>
              <div className="grid grid-cols-2 gap-2"><span>when</span><span>khi</span></div>
              <div className="grid grid-cols-2 gap-2"><span>while</span><span>trong khi (+ V-ing/QKTD)</span></div>
              <div className="grid grid-cols-2 gap-2"><span>before</span><span>trước khi</span></div>
              <div className="grid grid-cols-2 gap-2"><span>after</span><span>sau khi</span></div>
              <div className="grid grid-cols-2 gap-2"><span>until / till</span><span>cho đến khi</span></div>
              <div className="grid grid-cols-2 gap-2"><span>as soon as</span><span>ngay khi</span></div>
            </div>
          }
          examples={[
            { correct: "The roads were slippery when it rained.", explain: "Mệnh đề phụ (when it rained) bổ sung thời gian cho mệnh đề chính." },
            { correct: "As soon as they arrive, we'll have lunch.", explain: "As soon as + hiện tại đơn, mệnh đề chính dùng tương lai." },
            { correct: "I'll wait until you get back.", incorrect: "I'll wait until you will get back.", explain: "Sau until/when/as soon as dùng hiện tại đơn, KHÔNG dùng will." }
          ]}
        />
        <div className="space-y-4">
          {unit7Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 2, title: "Unit 7: Ngữ âm /bl/ & /kl/", unit: 7, icon: Mic,
    color: "from-teal-500 to-cyan-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-teal-800 mb-6">Cụm phụ âm (Consonant Clusters)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/bl/" words={["block", "blast", "blanket", "black", "problem"]} tip="Âm /b/ kết hợp /l/. Môi đóng rồi mở nhanh, lưỡi chạm vòm miệng." />
          <PhoneticCard pair="/kl/" words={["clean", "clown", "club", "class", "clear"]} tip="Âm /k/ kết hợp /l/. Lưỡi gần vòm miệng rồi hạ xuống hai bên." />
        </div>
        <div className="mt-8 bg-cyan-50 p-6 rounded-xl border border-cyan-100 text-center">
          <p className="font-bold text-cyan-900 text-lg mb-2">Tongue Twister (Xoắn lưỡi)</p>
          <p className="text-xl font-medium text-cyan-600 italic">"Look! There are <strong className="text-cyan-800">bl</strong>ack <strong className="text-cyan-800">cl</strong>ouds all over!"</p>
        </div>
      </div>
    )
  },
  // UNIT 8
  {
    id: 3, title: "Unit 8: Từ vựng Mua sắm", unit: 8, icon: ShoppingCart,
    color: "from-amber-500 to-orange-500",
    content: (
      <div>
        <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Shopping</h2>
          <p className="text-amber-700">Từ vựng về mua sắm, các loại cửa hàng, chợ ngoài trời, mua sắm trực tuyến và khiếu nại.</p>
        </div>
        <VocabTable items={unit8Vocab} colorTheme="bg-gradient-to-r from-amber-500 to-orange-500" />
      </div>
    )
  },
  {
    id: 4, title: "Unit 8: Ngữ pháp Trạng từ tần suất & HTĐ chỉ tương lai", unit: 8, icon: Store,
    color: "from-orange-500 to-red-500",
    content: (
      <div>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8">
          <p className="text-orange-800 font-bold">2 chủ điểm: Adverbs of Frequency & Present Simple for Future</p>
        </div>
        <GrammarBox
          title="1. Trạng từ chỉ tần suất (Adverbs of Frequency)"
          color="bg-orange-600"
          rule={
            <div className="text-sm md:text-base">
              <p className="mb-3">Dùng để diễn tả mức độ thường xuyên. <strong>Vị trí:</strong> Trước động từ thường, sau động từ to be.</p>
              <div className="flex flex-wrap gap-2">
                {["always (100%)", "usually (80%)", "often (60%)", "sometimes (40%)", "rarely (10%)", "never (0%)"].map(w => (
                  <span key={w} className="px-3 py-1 bg-white rounded-full text-sm border border-gray-200 font-medium">{w}</span>
                ))}
              </div>
            </div>
          }
          examples={[
            { correct: "She always shops at the supermarket.", explain: "Always đứng trước động từ thường 'shops'." },
            { correct: "He is never late for class.", explain: "Never đứng sau động từ to be 'is'." },
          ]}
        />
        <GrammarBox
          title="2. Hiện tại đơn mang ý nghĩa tương lai"
          color="bg-red-600"
          rule={
            <div className="text-sm md:text-base">
              <p>Dùng thì <strong>hiện tại đơn</strong> để nói về <strong>lịch trình / thời gian biểu</strong> (timetables, schedules) đã cố định.</p>
            </div>
          }
          examples={[
            { correct: "The train leaves at 4:30.", explain: "Lịch trình tàu cố định → dùng hiện tại đơn." },
            { correct: "My art class starts at 2 p.m. tomorrow.", incorrect: "My art class will start at 2 p.m. tomorrow.", explain: "Thời gian biểu cố định: dùng HTĐ, không dùng will." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-orange-600" /> Luyện tập</h3>
          {unit8Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 5, title: "Unit 8: Ngữ âm /sp/ & /st/", unit: 8, icon: Mic,
    color: "from-red-500 to-rose-600",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-rose-800 mb-6">Cụm phụ âm /sp/ và /st/</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="/sp/" words={["spend", "speciality", "space", "respect", "clasp"]} tip="Âm /s/ kết hợp /p/. Hơi thoát qua khe hẹp rồi bật môi." />
          <PhoneticCard pair="/st/" words={["stall", "staff", "outstand", "honest", "waste"]} tip="Âm /s/ kết hợp /t/. Lưỡi chạm chân răng trên rồi bật ra." />
        </div>
        <div className="mt-8 bg-rose-50 p-6 rounded-xl border border-rose-100 text-center">
          <p className="font-bold text-rose-900 text-lg mb-2">Luyện câu</p>
          <p className="text-xl font-medium text-rose-600 italic">"The a<strong className="text-rose-800">ss</strong>i<strong className="text-rose-800">st</strong>ant at her shop always gives us <strong className="text-rose-800">sp</strong>ecial attention."</p>
        </div>
      </div>
    )
  },
  // UNIT 9
  {
    id: 6, title: "Unit 9: Từ vựng Thiên tai", unit: 9, icon: CloudLightning,
    color: "from-violet-500 to-purple-600",
    content: (
      <div>
        <div className="bg-violet-50 p-6 rounded-2xl mb-8 border border-violet-100">
          <h2 className="text-2xl font-bold text-violet-800 mb-2">Natural Disasters</h2>
          <p className="text-violet-700">Từ vựng về các loại thảm họa thiên nhiên, sự tàn phá và biện pháp phòng chống, ứng phó.</p>
        </div>
        <VocabTable items={unit9Vocab} colorTheme="bg-gradient-to-r from-violet-500 to-purple-600" />
      </div>
    )
  },
  {
    id: 7, title: "Unit 9: Ngữ pháp Quá khứ tiếp diễn", unit: 9, icon: Wind,
    color: "from-purple-500 to-fuchsia-600",
    content: (
      <div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
          <p className="text-purple-800 font-bold">Past Continuous (Thì Quá khứ tiếp diễn)</p>
          <p className="text-purple-700 text-sm mt-1">Cấu trúc: <strong>S + was/were + V-ing</strong></p>
        </div>
        <GrammarBox
          title="Thì Quá khứ tiếp diễn"
          color="bg-purple-600"
          rule={
            <div className="space-y-3 text-sm md:text-base">
              <p><strong>1.</strong> Hành động <strong>đang xảy ra</strong> tại một thời điểm xác định trong quá khứ.</p>
              <p className="bg-white p-2 rounded border border-gray-200">Ví dụ: I <strong>was having</strong> dinner at 6 p.m. yesterday.</p>
              <p><strong>2.</strong> Hành động <strong>đang xảy ra</strong> thì bị <strong>xen vào</strong> bởi hành động khác.</p>
              <p className="bg-white p-2 rounded border border-gray-200">Ví dụ: When we <strong>were watching</strong> TV, we <strong>felt</strong> the earthquake.</p>
              <div className="bg-amber-50 p-3 rounded-lg mt-3 border border-amber-200">
                <p className="text-amber-800 text-sm"><strong>⚠️ Lưu ý:</strong> <code>While</code> + QKTD | <code>When</code> + QKĐ hoặc QKTD</p>
              </div>
            </div>
          }
          examples={[
            { correct: "While I was walking to school, it started to rain.", explain: "While + QKTD (đang đi), QKĐ (trời bắt đầu mưa)." },
            { correct: "When the alarm rang, everyone was sleeping.", incorrect: "When the alarm was ringing, everyone slept.", explain: "When + QKĐ cho hành động ngắn xen vào." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-purple-600" /> Luyện tập</h3>
          {unit9Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 8, title: "Unit 9: Trọng âm đuôi -al & -ous", unit: 9, icon: Mic,
    color: "from-fuchsia-500 to-pink-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-fuchsia-800 mb-6">Trọng âm từ có đuôi -al và -ous</h2>
        <div className="bg-fuchsia-50 p-4 rounded-xl mb-6 text-fuchsia-800">
          Quy tắc: Từ kết thúc bằng <strong>-al</strong> hoặc <strong>-ous</strong> thường nhấn trọng âm vào âm tiết <strong>thứ 3 từ cuối</strong> lên.
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard pair="Suffix -AL" words={["MU-si-cal", "NA-tio-nal", "PER-so-nal", "TY-pi-cal", "a-RRI-val"]} tip="Nhấn âm tiết thứ 3 từ cuối. Ngoại lệ: arrival nhấn âm 2." />
          <PhoneticCard pair="Suffix -OUS" words={["DAN-ge-rous", "HU-mo-rous", "POI-so-nous", "NU-me-rous", "am-BI-tious"]} tip="Nhấn âm tiết thứ 3 từ cuối. Ngoại lệ: ambitious nhấn âm 2." />
        </div>
      </div>
    )
  },
  // REVIEW 3
  {
    id: 9, title: "Review 3: Ôn tập từ vựng tổng hợp", unit: 0, icon: RotateCcw,
    color: "from-sky-500 to-blue-600",
    content: (
      <div>
        <div className="bg-sky-50 p-6 rounded-2xl mb-8 border border-sky-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-2">🔄 Review 3: Tổng hợp Unit 7-9</h2>
          <p className="text-sky-700">Ôn tập tổng hợp từ vựng, ngữ pháp, và ngữ âm từ cả 3 unit.</p>
        </div>
        <div className="space-y-4">
          {review3Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 10, title: "Review 3: Ngữ pháp tổng hợp", unit: 0, icon: Star,
    color: "from-blue-500 to-indigo-600",
    content: (
      <div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-blue-800 font-bold">Tổng hợp: Adverb Clauses of Time + Adverbs of Frequency + Past Continuous</p>
        </div>
        <GrammarBox
          title="1. Mệnh đề trạng ngữ chỉ thời gian"
          color="bg-teal-600"
          rule={<p>Từ nối: <strong>when, while, before, after, until, as soon as</strong>. Mệnh đề phụ dùng hiện tại đơn khi mệnh đề chính ở tương lai.</p>}
          examples={[{ correct: "As soon as the storm passes, we'll go outside.", explain: "As soon as + HTĐ, mệnh đề chính + will." }]}
        />
        <GrammarBox
          title="2. Trạng từ tần suất & HTĐ chỉ tương lai"
          color="bg-orange-600"
          rule={<p><strong>Adverbs of frequency</strong>: always, often, sometimes, rarely, never. <strong>HTĐ cho lịch trình</strong>: The bus leaves at 8.</p>}
          examples={[
            { correct: "She always goes to the market on Sundays.", explain: "Always đứng trước động từ thường." },
            { correct: "The flight departs at 10 a.m.", explain: "HTĐ cho lịch trình cố định." },
          ]}
        />
        <GrammarBox
          title="3. Quá khứ tiếp diễn (Past Continuous)"
          color="bg-purple-600"
          rule={<p><strong>S + was/were + V-ing</strong>. Dùng diễn tả hành động đang xảy ra trong quá khứ, thường kết hợp với quá khứ đơn.</p>}
          examples={[
            { correct: "While they were playing, it started to rain.", explain: "While + QKTD, QKĐ." },
            { correct: "When the flood came, people were sleeping.", explain: "When + QKĐ, QKTD." },
          ]}
        />
      </div>
    )
  }
];
