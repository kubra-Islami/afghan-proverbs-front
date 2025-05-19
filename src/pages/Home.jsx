import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import axios from "axios";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import CustomSpinner from "../components/CustomSpinner.jsx";

const Home = () => {
    const [proverbs, setProverbs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllProverbs = () => {
        try {
            axios.get("/proverbs").then((response) => {
                const proverbs = response.data;
                setProverbs(proverbs);
                console.log(loading);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching proverbs:", err);
                setLoading(true);
            });
        } catch (err) {
            console.error("Error fetching proverbs:", err);
            console.log(loading);
            setLoading(true);
        }
    }

    useEffect(() => {
        getAllProverbs();
    },[]);


    let num = 0;

    return (
        <Container className="mt-5">
            {
                loading ? <CustomSpinner/> :
                    <Table striped bordered responsive="sm md">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>textDari</th>
                            <th>textPashto</th>
                            <th>translationEn</th>
                            <th>meaning</th>
                            <th>category</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            proverbs.map((proverb) => (
                                <tr key={proverb.id}>
                                    <td>{num + 1}</td>
                                    <td>{proverb.textDari}</td>
                                    <td>{proverb.textPashto}</td>
                                    <td>{proverb.translationEn}</td>
                                    <td>{proverb.meaning}</td>
                                    <td>{proverb.category}</td>
                                    <td>
                                        <Link to={`/view-proverb/${proverb.id}`}>
                                            <Button variant="outline-primary">View</Button>
                                        </Link>

                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
            }

        </Container>
    )
}

export default Home;