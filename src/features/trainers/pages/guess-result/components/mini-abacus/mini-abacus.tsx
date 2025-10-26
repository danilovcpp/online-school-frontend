'use client';

import React, { useEffect } from 'react';

import { useAbacus } from '../../../../hooks/use-abacus';

import styles from './mini-abacus.module.scss';

interface MiniAbacusProps {
  value: number;
  show: boolean;
}

export const MiniAbacus: React.FC<MiniAbacusProps> = ({ value, show }) => {
  const { columns, setValue, getColumnValue } = useAbacus(4);

  useEffect(() => {
    if (show) {
      // Animate value change
      setValue(value);
    }
  }, [value, show, setValue]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.abacus}>
        <div className={styles.frame}>
          {Array.from({ length: columns }, (_, i) => columns - 1 - i).map((col, index) => {
            const columnIndex = columns - 1 - index;
            const colValue = getColumnValue(columnIndex);
            const hasTopBead = colValue >= 5;
            const bottomBeadsCount = colValue % 5;

            return (
              <div key={columnIndex} className={styles.column}>
                {/* Top section - 1 bead worth 5 */}
                <div className={styles.topSection}>
                  <div className={`${styles.bead} ${hasTopBead ? styles.active : ''}`} />
                </div>

                <div className={styles.divider} />

                {/* Bottom section - 4 beads worth 1 each */}
                <div className={styles.bottomSection}>
                  {[0, 1, 2, 3].map((beadIndex) => (
                    <div key={beadIndex} className={`${styles.bead} ${beadIndex < bottomBeadsCount ? styles.active : ''}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
