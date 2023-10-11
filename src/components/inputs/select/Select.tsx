import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const Select = ({handleChange, activeFilter}: any): JSX.Element => {
    const [filter, setFilter] = useState("all");

    const onChange = (e: any) => {
        setFilter(e)
        handleChange(e)
    }

    useEffect(() => {
        setFilter(activeFilter)
    }, [activeFilter])

    return (
        <Form.Select
            aria-label='Default select example'
            value={filter}
            onChange={e => onChange(e.target.value)}
            style={{ fontSize: "16px" }}
        >
            <option value='all'>Всі завдання</option>
            <option value='1'>Виконані</option>
            <option value='0'>Не виконані</option>
        </Form.Select>
    );
};

export default Select;
