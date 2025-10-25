"use client";

import { useState } from "react";

import { Card } from "@/components/Card/Card";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { FlashAnzanSettings } from "@/types";

import { useFlashAnzan } from "../../hooks/use-flash-anzan";

import styles from "./flash-anzan.module.scss";
import clsx from "clsx";

const FlashAnzanPage = () => {
  const [settings, setSettings] = useState<FlashAnzanSettings>({
    count: 5,
    speed: 1000,
    digits: 2,
  });
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showAnswerSection, setShowAnswerSection] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [resultType, setResultType] = useState<"success" | "error" | "">("");

  const { numbers, correctAnswer, isRunning, stats, start, stop, checkAnswer } =
    useFlashAnzan();

  const handleStart = () => {
    setUserAnswer("");
    setResultMessage("");
    setResultType("");
    setShowAnswerSection(false);

    start(
      settings,
      (num, index) => {
        setCurrentNumber(num);
        setCurrentProgress(`${index + 1} / ${settings.count}`);
      },
      () => {
        setCurrentNumber(null);
        setCurrentProgress("Введите ответ");
        setShowAnswerSection(true);
      }
    );
  };

  console.log('numbers', numbers);
  

  const handleStop = () => {
    stop();
    setCurrentNumber(null);
    setCurrentProgress("");
  };

  const handleCheckAnswer = () => {
    const answer = parseInt(userAnswer);

    if (isNaN(answer)) {
      setResultMessage("Пожалуйста, введите число");
      setResultType("error");
      return;
    }

    const isCorrect = checkAnswer(answer);

    if (isCorrect) {
      setResultMessage(
        `🎉 Правильно!\nЧисла: ${numbers.join(" + ")} = ${correctAnswer}`
      );
      setResultType("success");
    } else {
      setResultMessage(
        `❌ Неправильно\nВаш ответ: ${answer}\nПравильный ответ: ${correctAnswer}\nЧисла: ${numbers.join(
          " + "
        )}`
      );
      setResultType("error");
    }

    setTimeout(() => {
      setShowAnswerSection(false);
      setCurrentNumber(null);
      setCurrentProgress("");
      setResultMessage("");
      setResultType("");
      setUserAnswer("");
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold mb-3">Flash Anzan</h1>
        <h2 className="block text-lg font-light text-white/70 mt-3">
          Тренажер быстрых вычислений
        </h2>
      </header>

      <main>
        <section>
          <Card>
            <h2 className="text-3xl mb-5 bg-gradient-accent bg-clip-text text-transparent font-bold">
              Настройки
            </h2>
            <div className={styles.settings}>
              <Select
                label="Количество чисел:"
                value={settings.count}
                onChange={(e) =>
                  setSettings({ ...settings, count: Number(e.target.value) })
                }
              >
                <option value={3}>3 числа</option>
                <option value={5}>5 чисел</option>
                <option value={10}>10 чисел</option>
                <option value={15}>15 чисел</option>
                <option value={20}>20 чисел</option>
              </Select>

              <Select
                label="Скорость (мс):"
                value={settings.speed}
                onChange={(e) =>
                  setSettings({ ...settings, speed: Number(e.target.value) })
                }
              >
                <option value={1500}>1500 мс (легко)</option>
                <option value={1000}>1000 мс (средне)</option>
                <option value={700}>700 мс (сложно)</option>
                <option value={500}>500 мс (эксперт)</option>
                <option value={300}>300 мс (мастер)</option>
              </Select>

              <Select
                label="Количество цифр:"
                value={settings.digits}
                onChange={(e) =>
                  setSettings({ ...settings, digits: Number(e.target.value) })
                }
              >
                <option value={1}>1 цифра</option>
                <option value={2}>2 цифры</option>
                <option value={3}>3 цифры</option>
                <option value={4}>4 цифры</option>
              </Select>
            </div>

            <div className={styles.display}>
              {currentNumber !== null ? (
                <div className={styles.flashNumber}>{currentNumber}</div>
              ) : (
                currentProgress && <div className={styles.flashNumber}>?</div>
              )}
              <div className={styles.progress}>{currentProgress}</div>
            </div>

            <div className={styles.controls}>
              {!isRunning && !showAnswerSection && (
                <Button onClick={handleStart} variant="primary">
                  Начать
                </Button>
              )}
              {isRunning && (
                <Button onClick={handleStop} variant="secondary">
                  Остановить
                </Button>
              )}
            </div>

            {showAnswerSection && (
              <div className={styles.answer}>
                <h3>
                  Введите сумму всех чисел:
                </h3>
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCheckAnswer();
                    }
                  }}
                  placeholder="Ваш ответ"
                  autoFocus
                  className={styles.input}
                />
                <Button onClick={handleCheckAnswer} variant="accent">
                  Проверить
                </Button>
              </div>
            )}

            {resultMessage && (
              <div
                className={clsx(
                  styles.result,
                  resultType === "success" ? styles.success : styles.error
                )}
              >
                {resultMessage}
              </div>
            )}

            {(stats.correct > 0 || stats.wrong > 0) && (
              <div className={styles.stats}>
                <h3>Статистика:</h3>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Правильные ответы:</span>
                    <span className={styles.statValue}>{stats.correct}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Неправильные:</span>
                    <span className={styles.statValue}>{stats.wrong}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Точность:</span>
                    <span className={styles.statValue}>{stats.accuracy}%</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>
      </main>
    </div>
  );
};

export { FlashAnzanPage };
