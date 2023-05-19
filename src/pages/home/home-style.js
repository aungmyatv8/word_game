import { createStyles } from "@mantine/core";
import Background from '../../background.jpg'

export const useStyles = createStyles(() => ({
   background: {
    width: "100vw",
    minHeight: "100vh",
    background: `url(${Background})`,
    backgroundSize: "cover",
   },
   form: {
    marginTop: "15%",
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0px 2px 8px black"
   },
   title: {
    color: "black",
    margin: "5px 10px 14px 10px",
   }
  }));
  