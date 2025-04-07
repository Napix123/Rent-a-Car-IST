import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import "./index.css";
import napraviDatum from "./Datum";
import TabelaNaruci from "./TabelaZaNarucivanje";
import { Razlika } from "./Datum";
import Tema from "./Tema";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { getUzimanja, dodajUzimanja } from "./Uzimanja";
const steps = ["Unesite Podatke ", "Izaberite auto", "Ocenite"];

export default function Narucivanje() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [uzimanjeSve, setuzimanje] = useState(getUzimanja);

  const [ocena, setOcena] = useState(2);
  const [telefon, setTelefon] = useState("");
  const [datumOd, setDatumOd] = useState(napraviDatum(new Date()));
  const [datumDo, setDatumDo] = useState(napraviDatum(new Date()));
  const [auto, setAuto] = useState({});

  const PromeniAuto = (auto) => {
    setAuto(auto);
    setActiveStep(2);
  };
  const [snackBarOtovren, setSnackbarOtvoren] = useState(false);
  const [snackbarPoruka, setSnackbarPoruka] = useState("");

  const snackBarZatvori = () => {
    setSnackbarOtvoren(false);
  };

  const PromeniTelefon = (event) => {
    setTelefon(event.target.value);
  };

  const PromeniDatumOd = (event) => {
    setDatumOd(event.target.value);
  };

  const PromeniDatumDo = (event) => {
    setDatumDo(event.target.value);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      provera();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Paper elevation={5} style={{ padding: 20 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 5, mb: 1 }}>Uspesno ste narucili!</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Korak {activeStep + 1}
            </Typography>
            <Box>{Polja(activeStep)}</Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Nazad
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button
                onClick={handleNext}
                style={{
                  backgroundColor: Tema.palette.common.black,
                  color: Tema.palette.common.white,
                }}
              >
                {activeStep === steps.length - 1 ? "Naruci" : "Sledece"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarOtovren}
        onClose={snackBarZatvori}
        message={snackbarPoruka}
        autoHideDuration={1200}
      />
    </Box>
  );

  function Polja(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Box m={5}>
            <Box mb={10}>Unesite Podatke</Box>
            <Box mb={10}>
              <TextField
                id="datum-uzimanja"
                label="Unesite datum uzimanja"
                type="date"
                value={datumOd}
                onChange={PromeniDatumOd}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box mb={10}>
              <TextField
                id="datum-vracanja"
                label="Unesite datum vraćanja"
                type="date"
                value={datumDo}
                onChange={PromeniDatumDo}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box>
              <TextField
                id="datum-vracanja"
                label="Telefon"
                value={telefon}
                InputLabelProps={{ shrink: true }}
                onChange={PromeniTelefon}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <TabelaNaruci
            odabir={PromeniAuto}
            datumOd={datumOd}
            datumDo={datumDo}
          />
        );
      case 2:
        return (
          <Box m={5}>
            <Box>
              <div>
                <br />
                <br />
                Od : {datumOd}
                <br />
                <br />
                Do : {datumDo}
                <br />
                <br />
                Model : {auto.model}
                <br />
                <br />
                Telefon : {telefon}
                <br />
                <br />
                Cena po danu : {auto.cena}
                <br />
                <br />
                Ukupna Cena : {Razlika(datumOd, datumDo) * auto.cena}
                <br />
              </div>
            </Box>
          </Box>
        );
      default:
        return "Nepoznat korak";
    }
  }

  function provera() {
    const date1 = new Date(datumOd);
    const date2 = new Date(datumDo);
    if (telefon.trim().length < 2 || auto.cena == null || date1 - date2 > 0) {
      setActiveStep(0);
      setSnackbarPoruka("Niste uneli sve podatke!");
      setSnackbarOtvoren(true);
    } else {
      let id = 1;
      if (uzimanjeSve.length > 0)
        id = uzimanjeSve[uzimanjeSve.length - 1].id + 1;
      let uzimanjeTrenutni = {
        id: auto._id,
        model: auto.model,
        datumOd: datumOd,
        datumDo: datumDo,
        telefon: telefon,
        ukupnaCena: Razlika(datumOd, datumDo) * auto.cena,
        cenaPoDanu: auto.cena,
      };
      dodajUzimanja(uzimanjeTrenutni);
      debugger;
      setSnackbarPoruka("Uspesno ste narucili!");
      setSnackbarOtvoren(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }
}
