import React from "react";
import { userCredentials } from "./auth.models";
import Link from "../components/Link";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextField from "../components/Form/TextField";
import Button from "../components/Button";


interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>): void;
    buttonText: string;
}

const AuthForm: React.FC<authFormProps> = ({ model, onSubmit, buttonText }) => {
    return (
        <Formik
            initialValues={model}
            onSubmit={onSubmit}
            validationSchema={Yup.object({
                email: Yup.string()
                    .required("Email is required")
                    .email("You have to insert a valid email"),
                password: Yup.string()
                    .required("This field is required"),
            })}
        >
            {formikProps => (
                <Form className="grid gap-4">
                    <TextField field="email" displayName="Email"/>
                    <TextField field="password" displayName="Password" type="password"/>
                    <div className="grid grid-flow-col justify-end gap-4">
                        <Link to="/" color="secondary">Cancel</Link>
                        <Button disabled={formikProps.isSubmitting} type="submit">{buttonText}</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


export default AuthForm;