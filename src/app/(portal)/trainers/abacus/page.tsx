import { Card } from "@/components/Card/Card";
import { TutorialCard } from "@/components/TutorialCard/TutorialCard";

import styles from './page.module.scss';

const AbacusPage = () => {
  return (
    <section className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
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
  );
};

export default AbacusPage;
