import { FormEvent, useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { createTodo, getTodoById, updateTodo } from "./services/TodoService";

interface RouteParams {
  id: string;
}

interface TodoType {
  title: string;
  description: string;
  completed: boolean;
}

const Todo = () => {
  let [title, setTitle] = useState<string>("");
  let [description, setDescription] = useState<string>("");
  let [completed, setCompleted] = useState<boolean | null>(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    completed: ""
  });

  let { id } = useParams<RouteParams>();
  let navigator = useHistory();

  useEffect(() => {
    if (id) getTodo(Number(id));
  }, [id]);

  function validateForm() {
    let flag = true;
    const errorsCopy = { ...errors };

    if (title.trim()) {
      errorsCopy.title = "";
    } else {
      errorsCopy.title = "Title is required.";
      flag = false;
    }

    if (description.trim()) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "Description is required.";
      flag = false;
    }

    if (completed !== null) {
      errorsCopy.completed = "";
    } else {
      errorsCopy.completed = "Select an option.";
      flag = false;
    }

    setErrors(errorsCopy);
    return flag;
  }

  function getTodo(id: number) {
    getTodoById(id)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      })
      .catch((error) => console.log(error));
  }

  function saveOrUpdateData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      let todo: TodoType = { title, description, completed: completed! };
      if (id) {
        updateTodo(Number(id), todo)
          .then((response) => {
            console.log(response.data)
            navigator.push("/");
          })
          .catch((error) => console.log(error));
      } else {
        createTodo(todo)
          .then((response) => {
            console.log(response.data)
            navigator.push("/");
          })
          .catch((error) => console.log(error));
      }
    }
  }

  function changeHeading() {
    return (
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        {id ? "Update Todo" : "Create Todo"}
      </h3>
    );
  }

  return (
    <>
      {changeHeading()}
      <Card
        style={{
          width: "50%",
          margin: "20px auto",
          border: "1px solid black"
        }}
      >
        <Form onSubmit={saveOrUpdateData}>
          <Container style={{ marginTop: "20px" }}>
            <Form.Group className="mb-2">
              <Form.Label>Enter Todo Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Todo title"
                value={title}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Enter Todo Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Todo Description"
                value={description}
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Completed:</Form.Label>
              <select
                className={`form-control ${
                  errors.completed ? "is-invalid" : ""
                }`}
                value={completed !== null ? completed.toString() : ""}
                onChange={(e) =>
                  setCompleted(e.target.value === "true" ? true : false)
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.completed && (
                <div className="invalid-feedback">{errors.completed}</div>
              )}
            </Form.Group>
            <Button
              className="mb-2 square border border-dark btn btn-primary"
              type="submit"
            >
              Submit
            </Button>
          </Container>
        </Form>
      </Card>
    </>
  );
};

export default Todo;
