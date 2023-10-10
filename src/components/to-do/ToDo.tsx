import H1 from "../headings/h1/H1";
import { styled } from "styled-components";

const ToDo = () => {
    const ListItem = styled.li`
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:not(:last-child) {
            margin-bottom: 2rem;
        }
    `;
    const ItemMain = styled.div`
        width: 70%;
    `;
    const ItemStatus = styled.p``;
    const ItemHeading = styled.h2`
        font-size: 2.2rem;
    `;
    const Header = styled.header`
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;

    return (
        <>
            <Header>
                <H1 text='To Do List' />
                <button>Додати завдання</button>
            </Header>
            <ul>
                <ListItem>
                    <ItemMain>
                        <ItemHeading>Зробити справу 1</ItemHeading>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, quisquam temporibus.
                        </p>
                    </ItemMain>
                    <ItemStatus>Не виконано</ItemStatus>
                </ListItem>
                <ListItem>
                    <ItemMain>
                        <ItemHeading>Зробити справу 2</ItemHeading>
                        <p>Lorem ipsum dolor sit</p>
                    </ItemMain>
                    <ItemStatus>Не виконано</ItemStatus>
                </ListItem>
            </ul>
        </>
    );
};

export default ToDo;
