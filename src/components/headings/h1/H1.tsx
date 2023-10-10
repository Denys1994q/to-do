import { styled } from "styled-components";

interface H1Props {
    text: string;
}

const H1 = ({ text }: H1Props): JSX.Element => {
    const Title = styled.h1`
        margin-bottom: 3rem;
    `;
    return (
        <>
            <Title>{text}</Title>
        </>
    );
};

export default H1;
