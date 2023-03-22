import ListGroup from "./components/ListGroup";
import { MDBContainer } from "mdb-react-ui-kit";
import { ThemeProvider } from "styled-components";
import "./style.css";

const theme = {
  primary: {
    background: "#3b71ca",
    text: "#fff",
  },
  success: {
    background: "#14A44D",
    text: "#fff",
    hoverBackground: "#118d42",
  },
  light: {
    background: "#fff",
    text: "#000",
    hoverBackground: "#f5f5f5",
  },
  error: {
    background: "#d32f2f",
    text: "#fff",
    hoverBackground: "#c62828",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="text-center py-5">
        <div className="fs-1 mb-4 text-uppercase">Things to do</div>
        <MDBContainer breakpoint="md" style={{ maxWidth: "50rem" }}>
          <ListGroup />
        </MDBContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
