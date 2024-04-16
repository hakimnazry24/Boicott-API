const app = require("./app");
const sqlite3 = require("sqlite3");
const db = require("../db");
const express = require("express");

app.get("/", (req, res) => {
    if(err) {
        res.status(500).send({error: `Error cannot get to /`});
        return;
    }
    res.status(200).sendFile("index.html");
});

app.get("/retailers", (req, res) => {
  const sql = "SELECT * FROM Retailer";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Cannot read retailers" });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get("/products", (req, res) => {
  const sql = "SELECT Product.*, Company.status, Company.image FROM Product JOIN Company ON Product.company_id = Company.id";
  db.all(sql,[], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Cannot read products" });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get("/retailer/:retailer_id/products", (req, res) => {
  const params = req.params.retailer_id;
  const sql = "SELECT Product.* FROM Product JOIN Retailer ON Product.retailer_id = ?";
  db.all(sql, [params], (err, rows) => {
    if (err) {
      res.status(500).send({error: `Cannot read retailer with id ${params} products`});
      return;
    }
    res.status(200).send(rows);
  });

});

app.get("/companies", (req, res) => {
  const sql = "SELECT * FROM Company";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Cannot read companies" });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get("/retailer/:id", (req, res) => {
  const params = req.params.id;
  const sql = "SELECT * FROM Retailer WHERE id = ?";

  db.get(sql, [params], (err, row) => {
    if (err) {
      res.status(500).send({ error: `Cannot read retailer/${id}` });
      return;
    }
    res.status(200).send(row);
  });
});

app.get("/product/:id", (req, res) => {
  const params = req.params.id;
  const sql = "SELECT * FROM Product WHERE id = ?";

  db.get(sql, [params], (err, row) => {
    if (err) {
      res.status(500).send({ error: `Cannot read product/${id}` });
      return;
    }
    res.status(200).send(row);
  });
});

app.get("/company/:id", (req, res) => {
  const params = req.params.id;
  const sql = "SELECT * FROM Company WHERE id = ?";

  db.get(sql, [params], (err, row) => {
    if (err) {
      res.status(500).send({ error: `Cannot read retailer/${id}` });
      return;
    }
    res.status(200).send(row);
  });
});

app.get("/neutral-products", (req, res) => {
  const sql =
    "SELECT Product.* FROM Product JOIN Company ON Product.company_id = Company.id WHERE Company.status = 0";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: `Cannot read neutral products. ${err}` });
      return;
    }
    res.status(200).send(rows);
  });
});

app.get("/support-products", (req, res) => {
  const sql =
    "SELECT Product.* FROM Product JOIN Company ON Product.company_id = Company.id WHERE Company.status = 1";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: `Cannot read support products. ${err}` });
      return;
    }
    res.status(200).send(rows);
  });
});

app.get("/boycott-products", (req, res) => {
  const sql =
    "SELECT Product.* FROM Product JOIN Company ON Product.company_id = Company.id WHERE Company.status = 2";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: `Cannot read boycott products. ${err}` });
      return;
    }
    res.status(200).send(rows);
  });
});


app.get("/neutral-companies", (req, res) => {
  const sql = "SELECT * FROM Company WHERE status = 0";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: `Cannot read neutral companies. ${err}` });
      return;
    }
    res.status(200).send(rows);
  });
});

app.get("/support-companies", (req, res) => {
  const sql = "SELECT * FROM Company WHERE status = 1";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: `Cannot read suport companies. ${err}` });
      return;
    }
    res.status(200).send(rows);
  });
});

app.get("/boycott-companies", (req, res) => {
  const sql = "SELECT * FROM Company WHERE status = 2";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: `Cannot read boycott companies. ${err}` });
      return;
    }
    res.status(200).send(rows);
  });
});

app.get


app.post("/retailer", (req, res) => {
  const { name, country } = req.body;

  const sql = "INSERT INTO Retailer(name, country) VALUES(?, ?)";
  db.run(sql, [name, country], (err) => {
    if (err) {
      res
        .status(500)
        .send({ error: `Cannot create ${name}, ${country} ${err}` });
      return;
    }
    res.status(200).send({
      message: `Successfully  creating new retailer: ${JSON.stringify(
        req.body
      )}`,
    });
  });
});

app.post("/product", (req, res) => {
  const { name, serial_number, retailer_id, company_id } = req.body;
  const sql =
    "INSERT INTO Product(name, serial_number, retailer_id, company_id) VALUES(?, ?, ?, ?)";
  db.run(sql, [name, serial_number, retailer_id, company_id], (err) => {
    if (err) {
      res
        .status(500)
        .send({ error: `Cannot create ${JSON.stringify(req.body)}` });
      return;
    }
    res.status(200).send({
      message: `Successfully creating new product: ${JSON.stringify(
        req.body
      )} `,
    });
  });
});

app.post("/company", (req, res) => {
  const {
    name,
    status,
    status_reason,
    evidence_link,
    image,
    about,
    more_info,
  } = req.body;
  const sql = "INSERT INTO Retailer(name, country) VALUES(?, ?)";
  db.run(
    sql,
    [name, status, status_reason, evidence_link, image, about, more_info],
    (err) => {
      if (err) {
        res
          .status(500)
          .send({ error: `Cannot create ${JSON.stringify(req.body)}` });
        return;
      }
      res.status(200).send({
        message: `Successfully creating new company: ${JSON.stringify(
          req.body
        )}`,
      });
    }
  );
});

app.delete("/retailer/:id", (req, res) => {
  const params = req.params.id;
  let isRowExist = true;
  let isSomethingWrong = false;
  const deleteSql = "DELETE FROM Retailer WHERE id = ?";
  const selectSql = "SELECT * FROM Retailer WHERE id = ?";

  if (params === undefined || params === null) {
    res.status(404).send({ error: "Something wrong with the POST request." });
    return;
  }

  db.get(selectSql, [params], (err, row) => {
    if (err) {
      res.status(500).send({ error: `Cannot read retailer/${id}` });
      isSomethingWrong = true;
      return;
    } else if (!row) {
      res
        .status(404)
        .send({ error: `Retailer with id ${params} does not exists` });
    } else {
      db.run(deleteSql, [params], (err) => {
        if (err) {
          res.status(500).send({ error: `Cannot delete /retailer/${params}` });
          return;
        }

        res.status(200).send({
          message: `Retailer with id ${params} was deleted successfully`,
        });
      });
    }
  });
});

app.delete("/product/:id", (req, res) => {
  const params = req.params.id;
  const deleteSql = "DELETE FROM Product WHERE id = ?";
  const selectSql = "SELECT * FROM Product WHERE id = ?";

  if (params === undefined || params === null) {
    res.status(404).send({ error: "Something wrong with the POST request." });
    return;
  }

  db.get(selectSql, [params], (err, row) => {
    if (err) {
      res.status(500).send({ error: `Cannot read product/${id}` });
      return;
    } else if (!row) {
      res
        .status(404)
        .send({ error: `Product with id ${params} does not exists` });
    } else {
      db.run(deleteSql, [params], (err) => {
        if (err) {
          res.status(500).send({ error: `Cannot delete /product/${params}` });
          return;
        }
        res.status(200).send({
          message: `Product with id ${params} was deleted successfully`,
        });
      });
    }
  });
});

app.delete("/company/:id", (req, res) => {
  const params = req.params.id;
  const deleteSql = "DELETE FROM Company WHERE id = ?";
  const selectSql = "SELECT * FROM Company WHERE id = ?";

  if (params === undefined || params === null) {
    res.status(404).send({ error: "Something wrong with the POST request." });
    return;
  }

  db.get(selectSql, [params], (err, row) => {
    if (err) {
      res.status(500).send({ error: `Cannot read company/${id}` });
      return;
    } else if (!row) {
      res
        .status(404)
        .send({ error: `Company with id ${params} does not exists` });
    } else {
      db.run(deleteSql, [params], (err) => {
        if (err) {
          res.status(500).send({ error: `Cannot delete /company/${params}` });
          return;
        }

        res.status(200).send({
          message: `Company with id ${params} was deleted successfully`,
        });
      });
    }
  });
});
