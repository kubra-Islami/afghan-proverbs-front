import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Card, Form, Modal} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import CustomSpinner from "../components/CustomSpinner.jsx";
import CategorySelector from "../components/CategorySelector.jsx";
import {useForm} from "react-hook-form";

const ViewProverb = () => {
    const {id} = useParams();
    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);

    const [proverb, setProverb] = useState({});
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleDeleteClose = () => setDeleteShow(false);

    const [alert, setAlert] = useState({ type: '', message: '' });
    const [showAlert, setShowAlert] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onEdit = async (data) => {
        setLoading(true);
        await axios.put(`/proverbs/${id}`, data).then((response) => {
            setProverb(response.data);
            setShow(false);
            setAlert({ type: 'success', message: 'Proverb edited successfully!' });
            setShowAlert(true);
            setTimeout(() => {
                navigate(`/view-proverb/${id}`);
            }, 2000);
        })
        .catch((err) => {
            console.error("Error editing proverb:", err);
            setAlert({ type: 'danger', message: 'Failed to edit proverb. Please try again.' });
            setShowAlert(true);
        })
        .finally(() => {
            setLoading(false); // end loading
        });
    };

    const onDelete = async () => {
        try {
            await axios.delete(`/proverbs/${id}`);
            reset();
            setAlert({ type: 'success', message: 'Proverb deleted successfully!' });
            setShowAlert(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            console.error("Error deleting proverb:", err);
            setAlert({ type: 'danger', message: 'Failed to delete proverb. Please try again.' });
            setShowAlert(true);
        }    finally {
            setLoading(false);
        }
    };

    const getProverb = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/proverbs/${id}`);
            setProverb(response.data);
        } catch (err) {
            console.error("Error fetching proverbs:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleShow = () => {
        reset(proverb);
        setShow(true);
    }

    useEffect(() => {
        setAlert({ type: '', message: '' });
        setShowAlert(false);
        getProverb();
    }, []);

    useEffect(() => {
        if (show) reset(proverb);
    }, [proverb, show]);

    return (
        <>
            {showAlert && (
                <div style={{
                    position: 'fixed',
                    top: '2rem',
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

            <Container className='mt-5 text-center d-flex justify-content-center'>

                {loading ? <CustomSpinner/> :
                    <Card className="shadow border-0 p-4 w-100" style={{maxWidth: "600px"}}>
                        <Card.Body>
                            <h3 className="mb-3 text-center text-primary">{proverb?.textDari}</h3>

                            <div className="mb-3">
                                <strong>Translation (English):</strong>
                                <p className="mb-0 text-muted">{proverb?.translationEn}</p>
                            </div>

                            <div className="mb-3">
                                <strong>Pashto:</strong>
                                <p className="mb-0 text-muted">{proverb?.textPashto}</p>
                            </div>

                            <div className="mb-3">
                                <strong>Meaning:</strong>
                                <p className="mb-0">{proverb?.meaning}</p>
                            </div>

                            <div className="mb-4">
                                <strong>Category:</strong>
                                <span className="badge bg-secondary ms-2">{proverb?.category}</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <Link to="/">
                                    <Button variant="primary">← Back</Button>
                                </Link>
                                <Button variant="outline-warning" onClick={handleShow}>Edit</Button>
                                <Button variant="outline-danger" onClick={()=>setDeleteShow(true)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                }
                <Modal show={show} onHide={handleClose}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Proverb</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(onEdit)}>
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

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type='submit'>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>

                </Modal>

                <Modal
                    show={deleteShow}
                    onHide={handleDeleteClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Proverb</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure deleting this Proverb?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onDelete} >
                            Yes
                        </Button>
                        <Button variant="primary" onClick={handleDeleteClose}>No</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>

    )
}

export default ViewProverb;