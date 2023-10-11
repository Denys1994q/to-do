import { styled } from "styled-components";
import ToDo from "./components/to-do/ToDo";

function App() {
    const Wrapper = styled.section`
        width: 76rem;
        margin: 0 auto;
        padding: 3rem 1rem;
        border: 1px solid black;
        background: white;
        border-radius: 5px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;

    return (
        <Wrapper>
            <ToDo />
        </Wrapper>
    );
}

export default App;
