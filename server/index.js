const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// config
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "https://learnic-live.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// verify jwt middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access!" });
  }
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Unauthorized Access!" });
      }
      req.user = decoded;
      next();
    });
  }
};

//--------------------- database connection-----------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@revive.2tkcldw.mongodb.net/?retryWrites=true&w=majority&appName=Revive`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("learnicDB");
    const sessionCollection = database.collection("sessions");
    const bookedSessionCollection = database.collection("bookedSessions");
    const userCollection = database.collection("users");
    const personalNoteCollection = database.collection("personalNotes");
    const materialsCollection = database.collection("materials");

    // verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await userCollection.findOne(query);
      if (!result || result?.role !== "admin") {
        return res.status(401).send({ message: "unauthorized access" });
      }
      next();
    };

    // verify tutor middleware
    const verifyTutor = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await userCollection.findOne(query);
      if (!result || result?.role !== "tutor") {
        return res.status(401).send({ message: "unauthorized access" });
      }
      next();
    };

    // JWT Generate - auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // clear token with logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        // console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //-------------- Users--------------

    // Todo: Nodemailer apply
    // save a user data
    app.put("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };

      // check if user already exists in db
      const isExist = await userCollection.findOne(query);

      if (isExist) {
        if (user?.status === "Requested") {
          // if existing user try to change his role
          const result = await userCollection.updateOne(query, {
            $set: { status: user?.status },
          });
          return res.send(result);
        } else {
          // if existing user login again
          return res.send(isExist);
        }
      }
      // if (isExist) return res.send(isExist);

      // save user for the first time
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now(),
        },
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // get all users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get a user info by email for role
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    // update a user role
    app.patch("/users/update/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email };
      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now(),
        },
      };
      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // get only tutor users
    app.get("/tutors", async (req, res) => {
      try {
        const result = await userCollection.find({ role: "tutor" }).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        res
          .status(500)
          .send({ error: "An error occurred while fetching tutors." });
      }
    });

    //-------------- Sessions------------

    // get all sessions
    app.get("/sessions", async (req, res) => {
      const result = await sessionCollection.find().toArray();
      res.send(result);
    });

    // get a session for details page
    app.get("/session/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const session = await sessionCollection.findOne(query);
      if (!session) {
        return res.status(404).send({ message: "Session not found" });
      }
      res.send(session);
    });

    // save a session by tutor
    app.post("/session", verifyToken, verifyTutor, async (req, res) => {
      const sessionData = req.body;
      const result = await sessionCollection.insertOne(sessionData);
      res.send(result);
    });

    // get all session for tutor
    app.get("/my-listing-sessions/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      let query = { "tutor.email": email };
      const result = await sessionCollection.find(query).toArray();
      res.send(result);
    });

    // Todo: Bug > update session by tutor
    // app.put("/session/update/:id", verifyToken, verifyTutor, async (req, res) => {
    //   const id = req.params.id;
    //   const sessionData = req.body;
    //   const query = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: sessionData,
    //   };
    //   const result = await sessionCollection.updateOne(query, updateDoc);
    //   res.send(result);
    // });

    // delete a session
    app.delete("/session/:id", verifyToken, verifyTutor, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sessionCollection.deleteOne(query);
      res.send(result);
    });

    //-------------- Booking APIs --------------

    //  Book a Session
    app.post("/booked-sessions", async (req, res) => {
      try {
        const bookingData = req.body;
        const result = await bookedSessionCollection.insertOne(bookingData);
        res.status(201).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to book session", error: error.message });
      }
    });

    // Get Booked Sessions for a User
    app.get("/booked-sessions/email", async (req, res) => {
      try {
        const { email } = req.query; // Get email from query params
        if (!email) {
          return res.status(400).send({ message: "Email is required" });
        }

        const bookedSessions = await bookedSessionCollection
          .find({ "student.email": email })
          .toArray();
        res.status(200).send(bookedSessions);
      } catch (error) {
        res.status(500).send({
          message: "Failed to fetch booked sessions",
          error: error.message,
        });
      }
    });

    // booking delete
    app.delete("/booked-sessions/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await bookedSessionCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.status(200).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to cancel booking", error: error.message });
      }
    });

    //-------------- personal note--------------

    // Create a personal Note
    app.post("/personal-notes", async (req, res) => {
      try {
        const note = req.body;
        const result = await personalNoteCollection.insertOne(note);
        res.status(201).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to create note", error: error.message });
      }
    });

    // Get All personal Notes for student
    app.get("/personal-notes", async (req, res) => {
      try {
        const { email } = req.query; // Get user email from query parameters
        const notes = await personalNoteCollection.find({ email }).toArray();
        res.status(200).send(notes);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to fetch notes", error: error.message });
      }
    });

    // Update a Note
    app.put("/personal-notes/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updatedNote = req.body;
        const result = await personalNoteCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedNote }
        );
        res.status(200).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to update note", error: error.message });
      }
    });

    // Delete a Note
    app.delete("/personal-notes/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await personalNoteCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.status(200).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to delete note", error: error.message });
      }
    });

    // --------------Meterials---------------

    // Upload materials
    app.post("/materials", async (req, res) => {
      try {
        const materialData = req.body;
        const result = await materialsCollection.insertOne(materialData);
        res.status(201).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to upload material", error: error.message });
      }
    });

    // Fetch all materials for a specific tutor
    app.get("/materials", async (req, res) => {
      try {
        const { email } = req.query;
        const materials = await materialsCollection
          .find({ tutorEmail: email })
          .toArray();
        res.status(200).send(materials);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to fetch materials", error: error.message });
      }
    });

    // Delete a specific material
    app.delete("/materials/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await materialsCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.status(200).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to delete material", error: error.message });
      }
    });

    // Update a specific material
    app.put("/materials/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await materialsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );
        res.status(200).send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to update material", error: error.message });
      }
    });

    // Todo: Bug > Admin can't see or manage material

    // Fetch all materials (Admin only)
    app.get(
      "/api/materials/all",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const materials = await materialsCollection.find({}).toArray();
          res.status(200).json(materials);
        } catch (error) {
          res.status(500).json({ message: "Failed to fetch materials", error });
        }
      }
    );

    // Delete a material by ID (Admin only)
    app.delete(
      "/api/materials/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;

        try {
          const result = await materialsCollection.deleteOne({
            _id: new ObjectId(id),
          });

          if (result.deletedCount === 1) {
            res.status(200).json({ message: "Material deleted successfully." });
          } else {
            res.status(404).json({ message: "Material not found." });
          }
        } catch (error) {
          res.status(500).json({ message: "Failed to delete material", error });
        }
      }
    );

    // Update a material by ID (Admin only)
    app.put(
      "/api/materials/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const updateData = req.body; // Expecting the updated fields in the request body

        try {
          const result = await materialsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
          );

          if (result.modifiedCount === 1) {
            res.status(200).json({ message: "Material updated successfully." });
          } else {
            res
              .status(404)
              .json({ message: "Material not found or no changes made." });
          }
        } catch (error) {
          res.status(500).json({ message: "Failed to update material", error });
        }
      }
    );

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Learnic server is running...");
});

app.listen(port, () => {
  console.log(`Learnic Server is running on port ${port}`);
});
