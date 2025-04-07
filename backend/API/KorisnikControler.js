const {
  Razlika,
  IzmedjuDvaDAtuma,
  DatumFiltriran,
  DatumFiltriranObrnuto,
} = require("./Utility");
const { ObjectId } = require("mongodb");
const { dbName, Konekcija } = require("../index");
const express = require("express");
const routerKorisnik = express.Router();
routerKorisnik.post("/Korisnik", async (req, res) => {
  let client;
  try {
    client = await Konekcija();
    const db = client.db(dbName);
    console.log("############    " + req.body);
    await db.collection("Korisnici").insertOne(req.body);
    const dokumenti = await db.collection("Korisnik").find({}).toArray();
    res.json(dokumenti);
  } catch (err) {
    console.error("Greska prilikom pronalazenje Korisnika", err);
    res.status(500).send("Greska prilikom pronalazenje Korisnika");
  } finally {
    if (client) {
      client.close();
    }
  }
});
routerKorisnik.get("/Korisnik", async (req, res) => {
  let client;
  try {
    client = await Konekcija();
    const db = client.db(dbName);
    const dokumenti = await db.collection("Korisnici").find({}).toArray();
    res.json(dokumenti);
  } catch (err) {
    console.error("Greska prilikom pronalazenje Korisnika", err);
    res.status(500).send("Greska prilikom pronalazenje Korisnika");
  } finally {
    if (client) {
      client.close();
    }
  }
});

routerKorisnik.put("/Korisnik", async (req, res) => {
  let client;
  try {
    client = await Konekcija();
    const db = client.db(dbName);
    const dokumenti = await db.collection("Korisnici").find({}).toArray();
    res.json(dokumenti);
  } catch (err) {
    console.error("Greska prilikom pronalazenje Korisnika", err);
    res.status(500).send("Greska prilikom pronalazenje Korisnika");
  } finally {
    if (client) {
      client.close();
    }
  }
});
routerKorisnik.put("/Korisnik/:id", async (req, res) => {
  const id = req.params.id;
  let client;
  try {
    client = await Konekcija();
    const db = client.db(dbName);
    console.log(id);
    await db
      .collection("Korisnici")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    const dokumenti = await db.collection("Korisnici").find({}).toArray();
    res.json(dokumenti);
  } catch (error) {
    console.error("Greska prilikom updejtivanja korisnika:", error);
    res
      .status(500)
      .send({ message: "Greska prilikom updejtivanja korisnika:" });
  } finally {
    if (client) {
      await client.close();
    }
  }
});
routerKorisnik.get("/Korisnik/:id", async (req, res) => {
  const id = req.params.id;
  let client;
  try {
    client = await Konekcija();
    const db = client.db(dbName);
    const dokumenti = await db
      .collection("Korisnici")
      .find({ _id: new ObjectId(id) })
      .toArray();
    res.json(dokumenti);
  } catch (error) {
    console.error("Greska prilikom updejtivanja korisnika:", error);
    res
      .status(500)
      .send({ message: "Greska prilikom updejtivanja korisnika:" });
  } finally {
    if (client) {
      await client.close();
    }
  }
});
routerKorisnik.delete("/Korisnik/:id", async (req, res) => {
  const id = req.params.id;
  let client;
  try {
    client = await Konekcija();
    const db = client.db(dbName);
    console.log(id);
    let KorisnikPom = await db
      .collection("Korisnici")
      .find({ _id: new ObjectId(id) })
      .toArray();
    KorisnikPom = KorisnikPom[0];
    console.log("#####" + KorisnikPom.model);
    await db
      .collection("Korisnici_History")
      .insertOne({ KorisnikPom, datumBrisanja: new Date() });
    await db.collection("Korisnici").deleteOne({ _id: new ObjectId(id) });
    const dokumenti = await db.collection("Korisnici").find({}).toArray();
    res.json(dokumenti);
  } catch (error) {
    console.error("Greskae prilikom brisanja korisnika.", error);
    res.status(500).send({ message: " Greskae prilikom brisanja korisnika." });
  } finally {
    if (client) {
      await client.close();
    }
  }
});
module.exports = routerKorisnik;
