import { ErrorMessage, Field, Form, Formik } from 'formik';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvas({ open, handleOffCanvas, fetchlistData }) {
    return (
        <>
            <Offcanvas show={open} onHide={handleOffCanvas} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Formik
                        initialValues={{
                            user_id: "",
                            ip_address: "",
                            date: ""
                        }}
                        onSubmit={(values) => {
                            fetchlistData(values?.user_id, values?.ip_address, values?.date, 1);
                            handleOffCanvas();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="rounded px-4 pt-4 pb-8 w-full">
                                <div className="mb-2">
                                    <label
                                        className="block text-black-300 text-sm font-bold mb-1"
                                        htmlFor="user_id"
                                    >
                                        User ID
                                    </label>
                                    <Field
                                        type="text"
                                        name="user_id"
                                        placeholder="Enter IP"
                                        className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                    />
                                    <ErrorMessage
                                        name="user_id"
                                        component="div"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        className="block text-black-300 text-sm font-bold mb-1"
                                        htmlFor="ip_address"
                                    >
                                        IP
                                    </label>
                                    <Field
                                        type="text"
                                        name="ip_address"
                                        placeholder="Enter IP"
                                        className="appearance-none border rounded w-full py-2 px-1 mb-1 text-black"
                                    />
                                    <ErrorMessage
                                        name="ip_address"
                                        component="div"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        className="block text-black-300 text-sm font-bold mb-1"
                                        htmlFor="date"
                                    >
                                        Date
                                    </label>
                                    <Field
                                        type="date"
                                        name="date"
                                        className="appearance-none border rounded w-full py-2 px-1 text-black"
                                    />
                                    <ErrorMessage
                                        name="date"
                                        component="div"
                                        className="text-red-500 text-xs italic"
                                    />
                                </div>
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
                                        onClick={() => { fetchlistData("", "", "", 1); handleOffCanvas() }}
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

export default OffCanvas;
