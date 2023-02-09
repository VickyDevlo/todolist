import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Counter from "../Counter/Counter";
import Card from "../Card/Card";
import styled from "styled-components";

const Todo = () => {
  const [dataList, setDataList] = useState([]);
  const [item, setItem] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const AddItemHandler = () => {
    if (item.length < 1 || item.trim().length < 1) {
      alert("Add some Items...");
    } else {
      const newItem = {
        itemName: item,
        quantity: 1,
        isDeleted: false,
      };
      const newItems = [...dataList, newItem];
      setDataList(newItems);
      setItem("");
      inputRef.current.focus();
      setTotalItemCount(totalItemCount + 1);
    }
  };

  const incrementCounter = (index) => {
    const newItems = [...dataList];
    newItems[index].quantity++;
    setDataList(newItems);
    TotalCountHandler();
  };

  const decrementCounter = (index) => {
    const newItems = [...dataList];
    newItems[index].quantity--;
    setDataList(newItems);
    TotalCountHandler();
  };

  const deleteHandler = (index) => {
    const newItems = [...dataList];
    newItems[index].isDeleted = !newItems[index].isDeleted;
    setDataList(newItems);
    setTotalItemCount(totalItemCount - newItems[index].quantity);
  };

  const TotalCountHandler = () => {
    const totalItemCount = dataList.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
  };

  return (
    <Card>
      <InputWrapper>
        <Input
          value={item}
          onChange={(event) => setItem(event.target.value)}
          placeholder="Add an item..."
          ref={inputRef}
        />
        <Button onClick={() => AddItemHandler()}>
          <FontAwesomeIcon
            icon={faPlus}
            style={{ fontSize: "28px", cursor: "pointer" }}
          />
        </Button>
      </InputWrapper>
      <List>
        {dataList.map((item, index) => (
          <ItemContainer key={index}>
            <Itmes onClick={() => deleteHandler(index)}>
              {item.isDeleted ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <ListItem isDeleted>{item.itemName}</ListItem>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCircle} />
                  <ListItem>{item.itemName}</ListItem>
                </>
              )}
            </Itmes>

            <Counter
              decrementCounter={decrementCounter}
              incrementCounter={incrementCounter}
              item={item}
              index={index}
            />
          </ItemContainer>
        ))}
      </List>
      {dataList.length > 0 && <TotalCount>Total: {totalItemCount}</TotalCount>}
    </Card>
  );
};

const InputWrapper = styled.div`
  background: #fbc1bb;
  color: #ec645b;
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  font-size: 30px;
  color: #ff2c0091;
  font-weight: bold;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  border: none;
  background: transparent;
  color: #ec645b;
  width: 100%;
  height: 30px;
  font-size: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #ec645b;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 20px 0;
  border-bottom: 1px #fbc1bb solid;
`;
const Itmes = styled.div`
  cursor: pointer;
  color: white;
  font-size: 20px;
`;
const ListItem = styled.span`
  text-decoration: ${({ isDeleted }) => (isDeleted ? "line-through" : "none")};
  margin: 5px;
`;
const TotalCount = styled.div`
  text-align: end;
  font-size: 18px;
  margin: 13px 10px;
  font-weight: 700;
  color: white;
`;
export default Todo;
