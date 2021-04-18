import "./App.css";
import styled from "styled-components";

function App() {
  // buttonStyle.fontSize = "30px";
  // const buttonStyle = { backgroundColor: "red" };
  return (
    <div className="App">
      <Button type="danger" style={{ backgroundColor: "red" }}>
        Click!!
      </Button>
      <Button type="primary" style={{ backgroundColor: "blue" }}>
        Click!!
      </Button>
      <Button>Click!!</Button>
      <StyledButton>Push me as well</StyledButton>
      <DangerButton>WARNING!!</DangerButton>
    </div>
  );
}

const StyledButton = styled.button`
  --normal-background: green;
  --hover-background: darkgreen;
  --active-background: lightgreen;
  --active-color: black;
  font-size: 50px;
  color: white;
  background-color: var(--normal-background);
  border: none;
  border-radius: ${(props) => props.borderRadius || 10}px;
  padding: 20px;
  outline: none;
  margin: 20px;
  cursor: pointer;
  transition: 0.5s;

  &:button:hover {
    background-color: var(--hover-background);
  }

  &:button:active {
    background-color: var(--active-background);
    color: var(--active-color);
  }
`;

const DangerButton = styled(StyledButton)`
  --normal-background: red;
  --hover-background: darkred;
  --active-background: pink;
`;

function Button(props) {
  const buttonStyle = {};
  if (props.type === "primary") {
    buttonStyle["--normal-background"] = "blue";
    buttonStyle["--hover-background"] = "darkblue";
    buttonStyle["--active-background"] = "lightblue";
  } else if (props.type === "danger") {
    buttonStyle["--normal-background"] = "red";
    buttonStyle["--hover-background"] = "darkred";
    buttonStyle["--active-background"] = "pink";
  }
  buttonStyle["--border-radius"] = `20px`;

  return (
    <StyledButton borderRadius={50} className="Button" style={buttonStyle}>
      {props.children}
    </StyledButton>
  );
}

export default App;
