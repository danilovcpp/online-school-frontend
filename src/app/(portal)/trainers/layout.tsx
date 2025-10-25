import { PropsWithChildren } from "react";

import { trainers } from "@/data/trainers";
import { Card } from "@/components/Card/Card";
import { TrainerCard } from "@/components/TrainerCard/TrainerCard";

import styles from "./layout.module.scss";

const Layout = ({ children }: PropsWithChildren) => {
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

        {children}

        
      </main>

      <footer className={styles.footer}>
        <p>Создано для изучения древнего искусства счета на абакусе</p>
      </footer>
    </div>
  );
}

export default Layout;
