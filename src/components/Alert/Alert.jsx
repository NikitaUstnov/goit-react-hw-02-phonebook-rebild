import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./Alert.module.css";

const Alert = ({ title }) => {
  return (
    <CSSTransition in={true} appear={true} timeout={250} classNames={styles}>
      <div className={styles.Alert}>
        <span>{title}</span>
      </div>
    </CSSTransition>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
};

export default Alert;
