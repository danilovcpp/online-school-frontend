import { Card } from "@/components/Card/Card";
import { TrainerCard } from "@/components/TrainerCard/TrainerCard";
import { trainers } from "@/data/trainers";

import styles from "./page.module.scss";
import { TutorialCard } from "@/components/TutorialCard/TutorialCard";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.gradientText}>Абакус</span>
          <span className={styles.subtitle}>
            Древнее искусство быстрого счета
          </span>
        </h1>
      </header>

      <main>
        <section
          className="animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <Card title="Выберите тренажер">
            <div className={styles.grid}>
              {trainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </div>
          </Card>
        </section>

        <section
          className="animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <Card title="Как использовать абакус">
            <div className={styles.grid}>
              {[
                {
                  step: 1,
                  title: "Структура",
                  description:
                    "Каждый столбец представляет разряд числа (единицы, десятки, сотни и т.д.)",
                },
                {
                  step: 2,
                  title: "Верхние бусины",
                  description:
                    "Каждая верхняя бусина равна 5. Опускайте её вниз, чтобы активировать",
                },
                {
                  step: 3,
                  title: "Нижние бусины",
                  description:
                    "Каждая нижняя бусина равна 1. Поднимайте их вверх, чтобы активировать",
                },
                {
                  step: 4,
                  title: "Считывание",
                  description:
                    "Складывайте активные бусины в каждом столбце для получения цифры",
                },
              ].map((item) => (
                <TutorialCard key={item.step} {...item} />
              ))}
            </div>
          </Card>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Создано для изучения древнего искусства счета на абакусе</p>
      </footer>
    </div>
  );
}
