const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.send(todos);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server error");
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (todo) {
      res.send(todo);
    } else {
      res.status(500).send({ message: "Todo not found" });
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "Todo not found" });
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      done: req.body.done,
    });

    res.send(newTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const [updatedTodo] = await Todo.update(
      {
        done: req.body.done,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const todo = await Todo.findOne({
      where: { id: req.params.id },
    });
    if (updatedTodo > 0) {
      res.send({
        todo,
      });
    } else {
      res.send({
        message: "Todo not found",
      });
    }
    // res.send(updatedTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "Todo not found" });
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const del = await Todo.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (Boolean(del)) {
      res.send({
        message: "Todo deleted successfully",
        deletedId: req.params.id,
      });
    } else res.send({ message: "Todo not found" });
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server error");
  }
};
