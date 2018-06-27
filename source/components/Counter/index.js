import React from "react";

// Instruments
import Styles from "./style.m.css";

const Counter = ({ count }) => (
    <section className = { Styles.counter }>Posts: {count}</section>
);

export default Counter;
