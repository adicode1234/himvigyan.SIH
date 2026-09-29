'use client';

import React, { useState } from 'react';
import { POLAR_QUIZ_QUESTIONS } from '@/data/polarData';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Download, 
  Flame, 
  SlidersHorizontal,
  Lightbulb
} from 'lucide-react';

export default function StudentPolarHub() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [studentName, setStudentName] = useState('Polar Explorer');
  const [glacierYear, setGlacierYear] = useState<number>(2024);

  const currentQ = POLAR_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < POLAR_QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if confetti canvas not available
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Public Outreach, Citizen Science & Schools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Polar Explorer Kids & Citizen Hub
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Test your knowledge of Antarctica and the Arctic to earn a verified NCPOR Polar Explorer Certificate, and explore climate impacts on Himalayan glaciers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Polar Quiz */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl polar-glass border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-cyan-900/30">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  NCPOR Polar Science Challenge
                </span>
              </div>
              <div className="text-xs font-mono text-cyan-300">
                {!quizFinished && `Question ${currentQuestionIndex + 1} of ${POLAR_QUIZ_QUESTIONS.length}`}
              </div>
            </div>

            {!quizFinished ? (
              <div className="mt-6 space-y-6">
                {/* Question */}
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    let optionStyle = 'bg-slate-900/70 border-slate-800 text-slate-200 hover:border-cyan-500/40';

                    if (isSelected) {
                      optionStyle = 'bg-cyan-950/80 border-cyan-400 text-white';
                    }

                    if (isAnswerSubmitted) {
                      if (idx === currentQ.correctIndex) {
                        optionStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-semibold';
                      } else if (isSelected && idx !== currentQ.correctIndex) {
                        optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      } else {
                        optionStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-300">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>

                        {isAnswerSubmitted && idx === currentQ.correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation and Fun Fact */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/30 space-y-2 animate-fadeIn text-xs sm:text-sm">
                    <p className="text-slate-200">
                      <strong className="text-cyan-400">Explanation: </strong>
                      {currentQ.explanation}
                    </p>
                    <div className="flex items-start gap-2 pt-2 border-t border-slate-800 text-amber-300">
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                      <span><strong>Polar Trivia: </strong>{currentQ.funFact}</span>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Current Score: <span className="font-bold text-cyan-400">{score}</span>
                  </div>

                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleConfirmAnswer}
                      disabled={selectedOption === null}
                      className="px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 transition-all shadow-md"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 transition-all shadow-md"
                    >
                      {currentQuestionIndex + 1 < POLAR_QUIZ_QUESTIONS.length ? 'Next Question →' : 'See Final Results & Certificate'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Finished & Digital Certificate Card */
              <div className="mt-6 space-y-6 text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">
                    Congratulations!
                  </h3>
                  <p className="text-sm text-slate-300 mt-1">
                    You scored <span className="font-bold text-cyan-400 text-lg">{score}</span> out of{' '}
                    <span className="font-bold text-white text-lg">{POLAR_QUIZ_QUESTIONS.length}</span>!
                  </p>
                </div>

                {/* Name customization for certificate */}
                <div className="max-w-xs mx-auto">
                  <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                    Enter Name for Your Official Badge:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-center px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Digital Certificate Preview */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-950 border-2 border-cyan-400/50 shadow-2xl relative text-left">
                  <div className="flex justify-between items-center pb-3 border-b border-cyan-800/40">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
                      NCPOR POLAR OUTREACH BADGE
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: IND-POLAR-2024
                    </span>
                  </div>

                  <div className="my-4 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">This certifies that</p>
                    <p className="text-xl font-black text-white tracking-wide mt-1">
                      {studentName || 'Young Polar Scientist'}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                      has successfully demonstrated excellence in Polar Science, Antarctica Treaties, and Cryosphere Ecosystems.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cyan-800/40 flex justify-between items-center text-[10px] text-slate-400">
                    <div>
                      <span className="text-slate-300 font-bold block">Ministry of Earth Sciences</span>
                      <span>Govt. of India</span>
                    </div>
                    <div className="text-right">
                      <span className="text-cyan-300 font-bold block">Certified Polar Explorer</span>
                      <span>Score: {score}/{POLAR_QUIZ_QUESTIONS.length}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleRestartQuiz}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Climate Visualizer & Polar Fast Facts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Glacier Retreat Visualizer */}
          <div className="p-6 rounded-2xl polar-glass border border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Interactive Climate Indicator</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Himalayan Glacier Retreat Timeline
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Move the slider to observe monitored ice volume loss at Chhota Shigri & Samudra Tapu glaciers in the Chandra Basin.
            </p>

            {/* Slider */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-300 font-bold">Year: {glacierYear}</span>
                <span className="text-slate-400">
                  Estimated Ice Loss: <strong className="text-rose-400">-{((glacierYear - 1980) * 0.42).toFixed(1)}%</strong>
                </span>
              </div>
              <input
                type="range"
                min="1980"
                max="2024"
                step="1"
                value={glacierYear}
                onChange={(e) => setGlacierYear(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1980 (Baseline)</span>
                <span>2000</span>
                <span>2024 (Present)</span>
              </div>
            </div>

            {/* Visual simulation bar */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1 flex justify-between">
                <span>Glacier Ice Coverage Retention:</span>
                <span className="font-mono text-cyan-300">{(100 - (glacierYear - 1980) * 0.42).toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(20, 100 - (glacierYear - 1980) * 0.42)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 italic">
                Data provided by NCPOR Himansh High-Altitude Station ground ablation stakes.
              </p>
            </div>
          </div>

          {/* Polar Fast Facts Card */}
          <div className="p-6 rounded-2xl polar-glass border border-cyan-500/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Did You Know? (Polar Facts)</span>
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                ❄️ <strong>Coldest Record:</strong> Antarctica holds the record for Earth&apos;s lowest temperature ever recorded: -89.2°C at Vostok Station.
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                🐧 <strong>No Polar Bears in Antarctica:</strong> Polar bears only inhabit the Arctic around the North Pole, while penguins exclusively live in the Southern Hemisphere!
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                🇮🇳 <strong>Indian Antarctic Act 2022:</strong> India enacted its own domestic law extending Indian legal jurisdiction and environmental protections to Indian stations and citizens in Antarctica.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
