'use client';

import React from 'react';
import Link from 'next/link';

import { AbacusDisplay } from '@/components/AbacusDisplay';
import { Button } from '@/components/button/button';
import { Card } from '@/components/card/card';
import { Header } from '@/components/Header/Header';
import { trainerList } from '@/features/trainers/constants/trainer-list';
import { routes } from '@/shared/constants/routes';

import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Онлайн Школа
              <span className={styles.titleAccent}>Ментальной Арифметики</span>
            </h1>
            <p className={styles.subtitle}>
              Развивайте когнитивные способности и осваивайте ментальную арифметику с помощью современных интерактивных тренажеров
            </p>
            <div className={styles.heroActions}>
              <Link href={routes.auth.register}>
                <Button variant="primary">Начать обучение</Button>
              </Link>
              <Link href={routes.auth.login}>
                <Button variant="secondary">Войти</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Abacus Section */}
        <section className={styles.abacusSection}>
          <div className={styles.abacusContent}>
            <h2 className={styles.abacusTitle}>Интерактивный Абакус</h2>
            <p className={styles.abacusDescription}>
              Попробуйте японский соробан — древний инструмент для развития ментальной арифметики. Кликайте на бусины, чтобы познакомиться с
              принципом работы!
            </p>
          </div>
          <AbacusDisplay columns={13} />
          <div className={styles.abacusHint}>
            <p>Верхняя бусина = 5 • Нижние бусины = 1 каждая</p>
          </div>
          <div className={styles.trainersAction}>
            <Link href={routes.auth.register}>
              <Button variant="accent">Попробовать другие тренажеры →</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Почему выбирают нас?</h2>
          <div className={styles.featuresGrid}>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featureTitle}>Эффективная методика</h3>
              <p className={styles.featureDescription}>Проверенные методы обучения соробану (абакус) и ментальной арифметике</p>
            </Card>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Интерактивные тренажеры</h3>
              <p className={styles.featureDescription}>Разнообразные упражнения для развития скорости вычислений и концентрации внимания</p>
            </Card>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>Отслеживание прогресса</h3>
              <p className={styles.featureDescription}>Подробная статистика и анализ ваших результатов для постоянного улучшения</p>
            </Card>
          </div>
        </section>

        {/* Trainers Section */}
        <section className={styles.trainers}>
          <h2 className={styles.sectionTitle}>Доступные тренажеры</h2>
          <div className={styles.trainersGrid}>
            {trainerList.map((trainer) => (
              <Card key={trainer.id} className={styles.trainerCard}>
                <div className={styles.trainerIcon}>{trainer.icon}</div>
                <h3 className={styles.trainerTitle}>{trainer.title}</h3>
                <p className={styles.trainerDescription}>{trainer.description}</p>
              </Card>
            ))}
          </div>
          <div className={styles.trainersAction}>
            <Link href={routes.auth.register}>
              <Button variant="accent">Зарегистрироваться и попробовать</Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Готовы начать?</h2>
            <p className={styles.ctaDescription}>Присоединяйтесь к тысячам учеников, которые уже развивают свои когнитивные способности</p>
            <div className={styles.ctaAction}>
              <Link href={routes.auth.register}>
                <Button variant="primary">Создать аккаунт бесплатно</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
