
import { RiAccountCircleFill } from "react-icons/ri";
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik,FormikHelpers } from "formik";
import { Link } from "react-router"

const ForgotPasswordPage = () => {


       interface ForgotPasswordFormProps{
            email: string;
        }

        const initialValues={
            email:''
        }
        const validationSchema = yup.object({
            email:yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        })
        const onSubmitHandler=(e:ForgotPasswordFormProps,helper:FormikHelpers<ForgotPasswordFormProps>)=> {
            try {
               console.log(e);
               helper.resetForm();
            } catch (error) {
                console.log(error);
            }
        }

  return (
    <>
        <div className='w-[96%] lg:w-1/2 mx-auto bg-white rounded-md shadow-lg py-10 my-5 px-10'>
        <div className="mb-3">
            <h2 className="text-gray-700 text-3xl text-center">Forgot Password</h2>
        </div>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
                <Form>
               <div className="mb-3">
                <div className='flex mb-4 items-center justify-between border'>
                        <button type="button" className="text-4xl p-2 border-r-2 text-primary">
                            <RiAccountCircleFill className=" " />
                        </button>
                        <Field name="email" type="text" placeholder='Enter Your Email*' className='w-full text-lg outline-none border-none px-3' />
                </div>
                <ErrorMessage className="text-red-500 text-sm" component={'p'} name="email" />
               </div>
               
               <div className="mb-3">
                    <button  type="submit" className="w-full rounded-md border-primary text-primary transition-all duration-300 hover:bg-primary hover:text-white border py-4 font-[PoppinSemibold]">Forgot Password</button>
               </div>
               
               <div className="mb-3">
                    
                    <p className="text-end text-primary font-[PoppinSemibold]">Already Know Password? <Link to={'/login'}>Login</Link> </p>
               </div>
                </Form>
            </Formik>
        </div>
    </>
    
  )
}

export default ForgotPasswordPage