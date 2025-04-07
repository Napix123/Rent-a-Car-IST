const napraviDatum = (date) => {
  const datum = new Date(date);
  let mesec = `${datum.getMonth() + 1}`;
  let dan = `${datum.getDate()}`;
  const godina = datum.getFullYear();

  if (mesec.length < 2) mesec = "0" + mesec;
  if (dan.length < 2) dan = "0" + dan;

  return [godina, mesec, dan].join("-");
};
export const Razlika = (datumOd, datumDo) => {
  const datum1 = new Date(datumOd);
  const datum2 = new Date(datumDo);
  const razlikaUMilisekundama = datum2 - datum1;
  const razlikaUDanima = Math.round(
    razlikaUMilisekundama / (1000 * 60 * 60 * 24)
  );
  console.log(datumDo + " " + datumOd + "  " + razlikaUDanima);
  return razlikaUDanima;
};
export default napraviDatum;
