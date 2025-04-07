import Uzimanja, { IzbrisiPOAutoId, getUzimanja } from "./Uzimanja";
import axios from "axios";

let Automobili = [
  {
    id: 1,
    model: "Toyota Supra",
    cena: "180",
    godiste: 1995,
    klima: false,
  },
  {
    id: 2,
    model: "Toyota Corolla",
    cena: "150",
    godiste: 2024,
    klima: true,
  },
  {
    id: 3,
    model: "McLaren",
    cena: "500",
    godiste: 2022,
    klima: true,
  },
];
export const izbaciAutomobil = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/Automobil/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom brisanja auta.", error);
  }
};

export const getAutomobili = async () => {
  try {
    const response = await axios.get("http://localhost:3000/");
    console.log(response.data);
    debugger;
    return response.data;
  } catch (error) {
    console.error("Greska prilikom pronalazenja auta.", error);
    throw error;
  }
};

export const dodajAutomobil = async (auto) => {
  console.log(auto);
  try {
    const response = await axios.post("http://localhost:3000/Automobil", {
      model: auto.model,
      cena: auto.cena,
      godiste: auto.godiste,
      klima: auto.klima,
      slobodan: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom dodavanja auta.", error);
  }
};

export const IzmeniAutomobilF = async (id, auto) => {
  console.log(id + "   " + auto);
  try {
    const response = await axios.put(
      `http://localhost:3000/AutomobilIzmena/${id}`,
      {
        model: auto.model,
        cena: auto.cena,
        godiste: auto.godiste,
        klima: auto.klima,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom izmene auta.", error);
  }
};

export const UzmiAuto = async (id) => {
  console.log("id je :" + id);
  try {
    const response = await axios.post(`http://localhost:3000/RezervacijeUzmi`, {
      AutoId: id,
    });
    console.log("Vracen auto: " + response.data);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom vracenja auta.", error);
  }
};

export const FIltirajDatum = async (Od, Do) => {
  try {
    let response = await axios.get(`http://localhost:3000/AutomobilDatum`, {
      params: {
        Od: Od,
        Do: Do,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom filtriranja datuma.", error);
    return [];
  }
};
export const FIltirajDatumObrnuto = async (Od, Do) => {
  try {
    let response = await axios.get(
      `http://localhost:3000/AutomobilDatumObrnuto`,
      {
        params: {
          Od: Od,
          Do: Do,
        },
      }
    );
    console.log("DATUM OCENA" + response.data);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom filtriranja datuma obrnuto.", error);
    return [];
  }
};
export const Pretraga = async (stringPretrage, Od, Do) => {
  console.log("Niz: ");
  try {
    let response = await axios.get(
      `http://localhost:3000/AutomobilDatumPretraga`,
      {
        params: {
          Od: Od,
          Do: Do,
          strPretrage: stringPretrage,
        },
      }
    );
    console.log(response.data);
    debugger;
    return response.data;
  } catch (error) {
    console.error("Greska prilikom pretrage datuma.", error);
    return [];
  }
};

export const Sortiraj = async (tip) => {
  console.log("Tip je: " + tip);
  try {
    let response = await axios.get(
      `http://localhost:3000/AutomobilSortiraj/${tip}`
    );
    console.log("Rezultat sortiranja je");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Greska prilikom sortiranja. ", error);
    return [];
  }
};
export const najpopularnijiFja = async () => {
  try {
    let response = await axios.get(
      `http://localhost:3000/AutomobilNajpopularnije`
    );
    console.log("Rezultat najpopularnijeg je");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Greska prilikom pretrazivanja. ", error);
    return [];
  }
};
export default Automobili;
