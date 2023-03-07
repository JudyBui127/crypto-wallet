import React, { FC } from 'react';
import styles from './Market.module.scss';

interface MarketProps {}

const Market: FC<MarketProps> = () => (
  <div className={styles.Market}>
    Market Component
  </div>
);

export default Market;
