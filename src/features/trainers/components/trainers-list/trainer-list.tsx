'use client';
import { usePathname } from 'next/navigation';

import { Card } from '@/components/card/card';

import { trainerList } from '../../constants/trainer-list';
import { TrainerCard } from '../trainer-card/trainer-card';

import styles from './trainer-list.module.scss';

const TrainerList = () => {
  const pathname = usePathname();

  return (
    <Card title="Выберите тренажер">
      <div className={styles.grid}>
        {trainerList.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} isActive={pathname === trainer.path} />
        ))}
      </div>
    </Card>
  );
};

export { TrainerList };
