import React from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
    const [keyword, setKeyword] = React.useState("");
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim() === "") {
            history.push("/");
        } else {
            history.push(`/search/${keyword}`);
        }
    };

    return (
        <Form className="d-flex" onSubmit={(e) => submitHandler(e)}>
            <FormControl
                type="search"
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
                className="me-2"
                aria-label="Search"
            />
            <Button type="submit" variant="outline-success">
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;
