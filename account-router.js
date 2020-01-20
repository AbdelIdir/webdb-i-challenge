const express = require("express");

const Accounts = require("./account-models");

const router = express.Router();

router.get("/", (req, res) => {
  ///stretch part for sorting and limiting
  const { limit = 10, sortby = "id", sortdir = "asc" } = req.query;

  Accounts.getAllPosts()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "could not retrieve accounts" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Accounts.getPostById(id)
    .then(acc => {
      console.log(acc);
      // we must check the length to find our if our account exists,here I removed the .length so that we dont need to json(acc[0]) in order to get the object.Since we already use .first(). Here if (acc) comes back undefined,the catch will throw the error message.
      if (acc) {
        res.json(acc);
      } else {
        res
          .status(404)
          .json({ message: "Could not find account with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get account" });
      console.log(err);
    });
});

// router.get("/", (req, res) => {
//   const { page = 1, limit = 2, sortby = "id", sortdir = "asc" } = req.query;

//   Accounts.select("*")
//     .from(req.query)
//     .orderBy(sortby, sortdir)
//     .limit(limit)
//   .then((result) => {
//     res.json(200).json(result)
//   }).catch((err) => {
//     console.log(err)
//   });

// });

///// using the .find() feature

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   Accounts.select("*")
//     .from("accounts")
//     .where({ id })
//     .first()
//     .then(acc => {
//       res.json(acc);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to get account" });
//       console.log(err);
//     });
// });

// router.post("/", (req, res) => {
//   const { name, budget } = req.body;

//   if (!(name && budget)) {
//     res
//       .status(400)
//       .json({ message: "Type in a name and a budget for this account" });
//     return;
//   }

//   Accounts.insertNewPost({ name, budget })

//     // another way of doing it,here up above
//     // Accounts.insert(data)
//     //   .into("accounts")
//     .then(ids => {
//       console.log(ids)
//       const id = ids[0];
//       return Accounts("accounts")
//         .where({ id })
//         .first()
//         .then(accounts => {
//           res.status(201).json(accounts);
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res
//         .status(500)
//         .json({ message: "there was a problem adding an account" });
//     });
// });

router.post("/", (req, res) => {
  const { name, budget } = req.body;

  if (!(name && budget)) {
    res
      .status(400)
      .json({ message: "Type in a name and a budget for this account" });
    return;
  }

  Accounts.insertNewPost({ name, budget })

    // another way of doing it,here up above
    // Accounts.insert(data)
    //   .into("accounts")
    .then(ids => {
      res.status(201).json(ids);
    })

    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "there was a problem adding an account" });
    });
});

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   Accounts("accounts")
//     .where({ id })
//     .update(id, changes)
//     .then(count => {
//       //count because we get back a count of how many records have been updated
//       res.status(200).json({ message: `${count} record(s) updated` });
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ message: "Error adding the account" });
//     });
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;

  // if (!(changes.name  && changes.budget)) {
  //   res
  //     .status(400)
  //     .json({ message: "Type in a name and a budget for this account" });
  //   return;
  // }

  Accounts.replacePostById({ id, name, budget })
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated   ` });
      } else {
        res.status(404).json({ message: "account not found" });
      }
      //count because we get back a count of how many records have been updated
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error updating the account" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Accounts.deletePostById(id)
    .then(count => {
      //count because we get back a count of how many records have been updated
      res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error removing the account" });
    });
});

// Add a query string option to your GET /api/accounts endpoint. The query string may contain limit, sortby and sortdir keys. If these keys are provided, use these values to limit and sort the accounts which are selected from the database. Reference the docs for sorting and limiting in knex.

module.exports = router;
