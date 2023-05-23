import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
   background: {
    width: "100vw",
    margin: "5px",
    minHeight: "90vh",
    // display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
   },

   chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    // background: "green",
    position: "relative"
   },
   chat: {
    height: "82vh",
    // height: "100vh",
    overscrollBehavior: "auto",
    overflow: "auto",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    // backgroundColor: "green",
   },
   input: {
    flexGrow: "2",
    // alignItems: "flex-end"
    // alignSelf: "flex-e"
    position: "absolute",
    width: "100%",
    bottom: "0px",
    marginBottom: "10px",
   },
   leftChat: {
    display: "flex",
    // color: "black",
    margin: "10px",
    // backgroundColor: "#70d6ff"
   },
   rightChat: {
    display: "flex",
    margin: "0 10px",
    flexDirection: "row-reverse", 
   },
   leftWord: {
    backgroundColor: "#6d8afd",
    position: "relative",
    top: "-17px",
    marginLeft: "10px",
    borderRadius: "10px",
    padding: "10px",
    color:"black"
   },

   rightWord: {
    backgroundColor: "#9381ff",
    position: "relative",
    top: "-17px",
    marginRight: "10px",
    borderRadius: "10px",
    padding: "10px",
    color:"black"
   },

   ask: {
      margin: "10px",
   },
   icon: {
      width: "15px",
      color: "rgba(255, 255, 255, 0.5)"
   }
 
  }));
  