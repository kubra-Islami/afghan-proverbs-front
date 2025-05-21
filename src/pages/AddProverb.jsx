import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Container,
    Form,
    Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategorySelector from "../components/CategorySelector.jsx";

const AddProverb = () => {
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onAddProverb = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("/proverbs", data);
            reset();
            setAlert({ type: "success", message: "✅ Proverb added successfully!" });
            setShowAlert(true);
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            console.error("Error adding proverb:", err);
            setAlert({ type: "danger", message: "❌ Failed to add proverb. Please try again." });
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAlert({ type: "", message: "" });
        setShowAlert(false);
    }, []);

    return (
        <>
            {/* Alert Toast */}
            {showAlert && (
                <div
                    style={{
                        position: "fixed",
                        top: "30px",
                        right: "20px",
                        zIndex: 1050,
                        minWidth: "300px",
                    }}
                >
                    <Alert
                        variant={alert.type}
                        dismissible
                        onClose={() => setShowAlert(false)}
                    >
                        {alert.message}
                    </Alert>
                </div>
            )}

            {/* Form Layout */}
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <Container
                    className="shadow p-5 rounded bg-white"
                    style={{ maxWidth: "700px", width: "100%" }}
                >
                    <h2 className="text-center text-info mb-4">📜 Add New Afghan Proverb</h2>

                    <Form onSubmit={handleSubmit(onAddProverb)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Dari Text</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("textDari", { required: "Dari text is required" })}
                                isInvalid={!!errors.textDari}
                                placeholder="مثلاً: مرگ یک بار، شیون یک بار"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.textDari?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Pashto Text</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("textPashto", { required: "Pashto text is required" })}
                                isInvalid={!!errors.textPashto}
                                placeholder="مثلاً: مرګ یو ځل، ژړا یو ځل"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.textPashto?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>English Translation</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("translationEn", {
                                    required: "English translation is required",
                                })}
                                isInvalid={!!errors.translationEn}
                                placeholder="E.g. Death once, crying once."
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.translationEn?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Meaning</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                {...register("meaning", { required: "Meaning is required" })}
                                isInvalid={!!errors.meaning}
                                placeholder="Explain what this proverb means..."
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.meaning?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <CategorySelector register={register} />

                        <div className="d-flex justify-content-end gap-3 mt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={() => reset()}
                                disabled={loading}
                            >
                                Clear
                            </Button>
                            <Button variant="info" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Saving...
                                    </>
                                ) : (
                                    "Add Proverb"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default AddProverb;
