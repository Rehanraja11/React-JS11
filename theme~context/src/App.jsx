import { useContext } from "react";
import NameContext from "./NameContext";

function App() {
  const name = useContext(NameContext);

  return <h1>Hello {name}</h1>;
}

export default App;
