import { styled } from "styled-components";
import ToDo from "./components/to-do/ToDo";

const Wrapper = styled.section`
    width: 76rem;
    margin: 3rem auto;
    padding: 3rem 1rem;
    border: 1px solid black;
    background: white;
    border-radius: 0.5rem;

    @media (max-width: 900px) {
        width: 95%;
    }
`;

function App() {
    return (
        <Wrapper>
            <ToDo />
        </Wrapper>
    );
}

export default App;
