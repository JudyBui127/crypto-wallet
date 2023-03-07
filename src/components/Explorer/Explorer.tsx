import React, { FC } from 'react';
import styles from './Explorer.module.scss';

interface ExplorerProps {}

const Explorer: FC<ExplorerProps> = () => (
  <div className={styles.Explorer}>
    Explorer Component
  </div>
);

export default Explorer;
