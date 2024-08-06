import { ErrorMessage, Field, Form, Formik } from 'formik';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { OffCanvaFiled } from './Filed';
import * as Yup from 'yup';

function Index({ open, handleOffCanvas, fetchlistData, type,page }) {
    // dynamic initial value 
    const initialValues = OffCanvaFiled[type]?.fileds.reduce((values, field) => {
        values[field.name] = '';
        return values;
    }, {});

    // dynamic valiadtion schema
    const validationSchema = OffCanvaFiled[type]?.fileds.reduce((schema, field) => {
        if (field.name === 'email') {
            schema[field.name] = Yup.string().email('Invalid email format');
        }
        return schema;
    }, {});
    const formValidationSchema = Yup.object().shape(validationSchema);

    return (
        <>
            <Offcanvas show={open} onHide={handleOffCanvas} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={formValidationSchema}
                        onSubmit={(values) => {
                            fetchlistData(values?.user_id, values?.email, values?.PID, values?.date, values?.status, 1);
                            handleOffCanvas();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {
                                    OffCanvaFiled[type]?.fileds?.map((value, index) => {
                                        return (
                                            <>
                                                <div className="mb-2">
                                                    <label
                                                        className="block text-black-300 text-sm font-bold mb-1"
                                                        htmlFor="date"
                                                    >{value?.label}</label>
                                                    <Field
                                                        key={index}
                                                        type={value?.type}
                                                        id={value?.name}
                                                        name={value?.name}
                                                        placeholder={value?.Placeholder}
                                                        className="appearance-none border rounded w-full py-2 px-1 text-black"
                                                    />
                                                    <ErrorMessage name={value?.name} component="div" className="text-red-500 text-xs" />
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                <div className="flex justify-between items-center p-2 rounded-b">
                                    <button
                                        type="submit"
                                        className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                                        disabled={isSubmitting}
                                    >
                                        Apply
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-[#f19357] active:bg-brand-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                                        onClick={() => { fetchlistData("", "", "", "", "", page); handleOffCanvas() }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Index;
