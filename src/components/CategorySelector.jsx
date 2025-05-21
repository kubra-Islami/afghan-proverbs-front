import React from "react";
import { Form } from "react-bootstrap";

const CategorySelector = ({ register, defaultValue = "" }) => {

    const categories = [
        "Wisdom", "Patience", "Family", "Hard Work",
        "Pride", "Humility", "Cleverness", "Foolishness", "Life Lessons", "Love & Loyalty"
    ];

    return (
        <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
                defaultValue={defaultValue}
                {...register("category", { required: "Category is required" })}
                isInvalid={!!register("category")?.error}
            >
                <option value="">Select category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}

export default CategorySelector;
