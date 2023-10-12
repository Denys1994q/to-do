import { styled } from "styled-components";
import Badge from "react-bootstrap/Badge";

interface H1Props {
    text: string;
    withBadge?: boolean;
    withBadgeValue?: number;
}

const H1 = ({ text, withBadge, withBadgeValue }: H1Props): JSX.Element => {
    const Title = styled.h1`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    `;
    return (
        <>
            <Title>
                {text}
                {withBadge && (
                    <Badge bg='warning' style={{ fontSize: "1.2rem" }} pill>
                        {withBadgeValue}
                    </Badge>
                )}
            </Title>
        </>
    );
};

export default H1;
