import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Navbar,
} from "react-bootstrap";
import { addTodoApi } from "../../services/addTodoApi";
import { getTodo } from "../../services/getTodo";
import { deleteTodoApi } from "../../services/deleteTodo";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const fetchTodo = async () => {
    try {
      const response = await getTodo();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todoText.trim() === "") return;
    try {
      const response = await addTodoApi(todoText, false);
      if (response) {
        setTodos([...todos, response.data]);
        setTodoText("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await deleteTodoApi(id);
      console.log(response);
      await fetchTodo();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">My Todo</Navbar.Brand>
          <Button variant="primary">Log out</Button>
        </Container>
      </Navbar>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center mb-4">Todo List</h2>
            <Form>
              <Form.Group controlId="todoForm" className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter Todo"
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddTodo}>
                Add Todo
              </Button>
            </Form>
            <ListGroup className="mt-4">
              {todos.map((todo, index) => (
                <ListGroup.Item key={index} className="d-flex">
                  <span>{todo.todo}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Todo;
