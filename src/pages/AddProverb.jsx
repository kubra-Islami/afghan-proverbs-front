import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import CategorySelector from "../components/CategorySelector.jsx";
import axios from "axios";


const AddProverb = () => {
    const [proverb, setProverb] = useState({});
    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState({ type: '', message: '' });
    const [showAlert, setShowAlert] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();


    const navigate = useNavigate();

    const onAddProverb = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`/proverbs/`, data);
            setProverb(response.data);
            reset();
            setAlert({ type: 'success', message: 'Proverb added successfully!' });
            setShowAlert(true);
            setTimeout(() => {
                navigate('/');
            }, 2000); // wait 2 seconds before redirecting
        } catch (err) {
            console.error("Error adding proverb:", err);
            setAlert({ type: 'danger', message: 'Failed to add proverb. Please try again.' });
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setAlert({ type: '', message: '' });
        setShowAlert(false);
    }, []);

    return (
        <>
            {showAlert && (
                <div style={{
                    position: 'fixed',
                    top: '30px',
                    right: '20px',
                    zIndex: 1050, // higher than modal
                    minWidth: '300px'
                }}>
                    {showAlert && (
                        <Alert
                            variant={alert.type}
                            dismissible
                            onClose={() => setShowAlert(false)}
                        >
                            {alert.message}
                        </Alert>
                    )}
                </div>

            )}
            <Container className="mt-5 shadow-lg p-4 bg-body-tertiary">
                <h3 className='text-center mb-5 mt-3 text-info-emphasis'>Add New Proverb</h3>
                <Form onSubmit={handleSubmit(onAddProverb)}>
                    <Form.Group className="mb-3">
                        <Form.Label>textDari</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("textDari", {required: "textDari is required"})}
                            isInvalid={!!errors.textDari}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.textDari?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>translationEn</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("translationEn", {required: "translationEn is required"})}
                            isInvalid={!!errors.translationEn}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.translationEn?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>textPashto</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("textPashto", {required: "textPashto is required"})}
                            isInvalid={!!errors.textPashto}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.textPashto?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>meaning</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("meaning", {required: "meaning is required"})}
                            isInvalid={!!errors.meaning}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.meaning?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <CategorySelector register={register} />

                    <div className="d-flex">
                        <Button variant="outline-danger me-3">
                            Cancel
                        </Button>
                        <Button variant="outline-success" type='submit'>
                            Add proverb
                        </Button>
                    </div>
                </Form>
            </Container>

        </>


    )
}

export default AddProverb;