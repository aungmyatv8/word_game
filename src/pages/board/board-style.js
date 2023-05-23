import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
    container: {
        // background: "green",
        minHeight: "90vh",
        width: "100%"
    },
    firstWinner: {
        position: "relative",
    },
    crown: {
        position: "absolute",
        top: "-48px",
        left: "5px"
    },
    boardContainer: {
        marginTop: "30px",
        // backgroundColor:"green",
        // width: "50%"
        minWidth: "300px",
    },
    cardDesign: {
        margin: "3px",
        background: "#514663",
        padding: "20px 15px",
        borderRadius: "10px",
        boxShadow: "0px 2px 6px black"
    }
  }));
  