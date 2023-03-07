import React, { Component } from "react";
import styles from "./loadingDot.module.scss";
export default class LoadingDot extends Component {
  render() {
    return <span className={styles.loading}></span>;
  }
}
