import React, { FC } from 'react';
import styles from './Setting.module.scss';

interface SettingProps {}

const Setting: FC<SettingProps> = () => (
  <div className={styles.Setting}>
    Setting Component
  </div>
);

export default Setting;
