import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

interface SelectProps {
    handleChange?: (filter: string) => void;
    activeFilter?: string;
    options: { value: string; label: string }[];
}

const Select = ({ handleChange, activeFilter, options }: SelectProps): JSX.Element => {
    const [filter, setFilter] = useState("");

    const onChange = (e: any) => {
        setFilter(e);
        if (handleChange) {
            handleChange(e);
        }
    };

    useEffect(() => {
        if (activeFilter) {
            setFilter(activeFilter);
        }
    }, [activeFilter]);

    return (
        <Form.Select
            aria-label='Default select example'
            value={filter}
            onChange={e => onChange(e.target.value)}
            style={{ fontSize: "16px" }}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Form.Select>
    );
};

export default Select;
