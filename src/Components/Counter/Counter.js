import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Counter = ({ incrementCounter, decrementCounter, item, index }) => {
  return (
    <Wrapper>
      <CounterButton>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={() => decrementCounter(index)}
        />
      </CounterButton>
      <span> {item.quantity} </span>
      <CounterButton>
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => incrementCounter(index)}
        />
      </CounterButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  color: #ff2c0091;
  align-items: center;
  height: 28px;
  border-radius: 13px;
  padding: 0 10px;
  font-weight: bold;
`;
const CounterButton = styled.button`
  border-radius: 25px;
  font-size: 20px;
  color: #ff2c0091;
  cursor: pointer;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
export default Counter;
