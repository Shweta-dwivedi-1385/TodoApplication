import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListOfTodo from "./ListOfTodo";
import Todo from "./Todo";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route exact path="/" component={ListOfTodo}></Route>
        <Route path="/update-todo/:id" component={Todo}></Route>
        <Route path="/add-todo" component={Todo}></Route>
      </Switch>
      <Footer/>
    </BrowserRouter>

  );
}

export default App;
