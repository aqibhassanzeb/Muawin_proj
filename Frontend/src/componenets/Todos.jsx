import React, { useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../api/api";
import Loader from "./Loader";
import moment from "moment";
import { useSelector } from "react-redux";

const Todos = () => {
  const [todoId, setTodoId] = useState("");
  const [updateTodoId, setUpdateTodoId] = useState("");
  const [deleteTodoId, setDeleteTodoId] = useState("");
  const [todoText, setTodoText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetTodosQuery(currentPage);
  const [addTodo, todoResponse] = useAddTodoMutation();
  const [updateTodo, updateResponse] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  function handleAddTodo(e) {
    e.preventDefault();
    if (todoText.length > 0) {
      addTodo({ text: todoText }).then(() => setTodoText(""));
    }
  }

  const toggleComplete = (id, value) => {
    updateTodo({ id, data: { isCompleted: value } });
  };

  const handleUpdate = (id) => {
    updateTodo({ id, data: { text: updateText } });
    setUpdateTodoId("");
  };

  const handleDelete = (id) => {
    deleteTodo(id);
    setDeleteTodoId("");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="ion ion-clipboard mr-1" />
          To Do List
        </h3>
        <div className="card-tools">
          <ul className="pagination pagination-sm " style={{ gap: 4 }}>
            <li className="page-item">
              <button
                disabled={currentPage === 1}
                className="page-link btn"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                «
              </button>
            </li>
            {Array.from({ length: data?.pages }, (_, index) => index + 1).map(
              (page) => (
                <li key={page}>
                  <button
                    className="page-link btn"
                    onClick={() => setCurrentPage(page)}
                    style={{
                      backgroundColor: currentPage === page ? "#0069d9" : null,
                      color: currentPage === page ? "white" : null,
                      border: currentPage === page && "none",
                      height: currentPage === page && "100%",
                    }}
                  >
                    {page}
                  </button>
                </li>
              )
            )}

            <li className="page-item">
              <button
                className="page-link btn"
                disabled={currentPage === data?.pages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                »
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body">
        <ul className="todo-list" data-widget="todo-list">
          {data?.todos?.map((todo) => (
            <li key={todo._id}>
              {/* drag handle */}
              <span className="">
                <i className="fas fa-ellipsis-v" />
                <i className="fas fa-ellipsis-v" />
              </span>
              {updateTodoId === todo._id ? (
                <>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      display: "inline",
                      width: "75%",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUpdate(todo._id)}
                  >
                    Update
                  </button>
                  <i
                    onClick={() => setUpdateTodoId("")}
                    className="fa fa-times-circle"
                    style={{ marginLeft: 7, cursor: "pointer" }}
                  />
                </>
              ) : deleteTodoId === todo._id ? (
                <div className=" d-inline ml-2 ">
                  <span
                    className="bg-red"
                    style={{ padding: "5px 30px", borderRadius: 4 }}
                  >
                    Are you sure want to delete ?
                  </span>
                  <div style={{ display: "inline", marginLeft: 30 }}>
                    <i
                      onClick={() => handleDelete(todo._id)}
                      className="fas fa-check"
                      style={{
                        color: "red",
                        marginRight: 15,
                        cursor: "pointer",
                      }}
                    />
                    <i
                      onClick={() => {
                        setDeleteTodoId("");
                      }}
                      className="fa fa-times-circle"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className=" d-inline ml-2">
                    {updateResponse.isLoading && todoId === todo._id ? (
                      <Loader display="inline" size={15} />
                    ) : (
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={(e) => {
                          setTodoId(todo._id);
                          toggleComplete(todo._id, e.target.checked);
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="text"
                    style={{
                      textDecoration: todo.isCompleted && "line-through",
                    }}
                  >
                    {todo.text}
                  </span>
                  <small className="badge badge-info">
                    <i className="far fa-clock" />{" "}
                    {moment(todo.createdAt).fromNow()}
                  </small>
                  <div className="tools">
                    <i
                      onClick={() => {
                        setUpdateText(todo.text);
                        setUpdateTodoId(todo._id);
                      }}
                      className="fas fa-edit"
                      style={{ color: "blue" }}
                    />
                    <i
                      onClick={() => {
                        setDeleteTodoId(todo._id);
                      }}
                      className="fas fa-trash"
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* /.card-body */}
      <div style={{ padding: "0px 20px 40px 20px" }}>
        <div className="d-flex" style={{ gap: 10 }}>
          <form
            onSubmit={handleAddTodo}
            style={{ display: "flex", width: "100%", gap: 10 }}
          >
            <input
              type="text"
              placeholder="Write Something ..."
              className="form-control"
              style={{ width: "77%" }}
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />

            {todoResponse.isLoading ? (
              <div className="ml-3 mt-1">
                <Loader size={25} />
              </div>
            ) : (
              <button type="submit" className="btn btn-primary float-right ">
                <i className="fas fa-plus" /> Add Todo
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Todos;
