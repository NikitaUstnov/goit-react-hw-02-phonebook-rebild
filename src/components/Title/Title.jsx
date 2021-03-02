import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import styles from "./Title.module.css";

const Title = ({ title }) => {
  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames={styles}>
      <h1 className={styles.title}>{title}</h1>
    </CSSTransition>
  );
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
