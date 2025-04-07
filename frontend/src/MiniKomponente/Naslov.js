import "../index.css";
import { motion } from "framer-motion";

function Naslov({ klasa, tekst }) {
  const text = tekst.split("");

  return (
    <div className={klasa}>
      {text.map((el, i) => {
        return el === "?" ? (
          <br key={i} />
        ) : (
          <motion.span
            initial={{ opacity: 0.5 }}
            whileInView={{
              opacity: 1,
            }}
            key={i}
          >
            {el}
          </motion.span>
        );
      })}
    </div>
  );
}

export default Naslov;
