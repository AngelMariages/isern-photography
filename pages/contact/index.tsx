import Head from 'next/head';
import Header from '../../components/Header';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { getSectionOrder, PostImage } from '../../lib/api';
import MainImage from '../../components/MainImage';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type FormValues = {
	name: string;
	email: string;
	message: string;
	'g-recaptcha-response': string;
};

const toFormData = (o: FormValues) => Object.entries(o).reduce((d, e) => (d.append(...e), d), new FormData());

const mainImage: PostImage = {
	src: '/contact-bg.jpg',
	width: 2048,
	height: 2048,
	blurDataURL: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABkAGQDASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAAAAECAwQFBgcI/8QAIhAAAgIDAQADAAMBAAAAAAAAAAECAwQRITEFIiMSMjNB/8QAGgEAAgMBAQAAAAAAAAAAAAAAAQQCAwUABv/EABsRAQEBAQEBAQEAAAAAAAAAAAABAhEDMRIh/9oADAMBAAIRAxEAPwD5WAAJABREKFwQ9DUh0QhU1Xpex/UUq/S7QCjlsYb6jofj560c1iy1o2sOzWhb0nTflrjsfj7POnR4Vi0jisG/WunRYGR50S9MtHz26iE/qgKVV30XQKeL+vl0AA23nAhyEFQXFQ5CIdEkjUtZco9Kta6XseG2gUcr+P8A8NLHlrRTx6y7CGinRnDUxLtNG/gZHnTlqXpmvg2dQvvJrz07Cm/80Bn0T/NAK/k5NPAQADWYJUKhEKgxxyJIIjRNWukkViiO2auJVtoo40eo28Kvwr3ri3zz1bx6eLhYdekTUwSQtqSQv+jczyII8Zo4L6jN300cD+yBr4lj66LH/wAkA/GX5IBanI8DAANNhhD0NQ+KC4qRNX6RpEkAotDF9Ru4T8OfxpaZsYlmtFWzHlW7XL6jL58K8LeDLbNlEhq3+FU/safx8/sjEi9yNb499QdfAx9dbjS/FAQ40vyQCtOz48KAANNhliSRI0PiwuSIfEYhUworVMvDRx7NaMmtlymZDUWYvGzXbwWU9lKuZPGWynhma6s1dZsYC6jIx/UbWCuohpb5z+t+h/kgG0/5oBc5I8QAANJhhDkxqFOckTHJkSY6LCCeDLNTKkGWK2CjF6uRYrkUYSJ65ELFua1saXUbWDLw53Gn02sOzwq1DnlXR1S+iAqVW/RAUcPR4+AAPsAAAHOKOiABclgWKwAFcmiTQ9AAJxcx31GviN8ACrZzxa1cn/AAApaEf//Z',
}

export const getStaticProps: GetStaticProps<{ sectionOrder: string[] }> = async () => {
	return {
		props: {
			sectionOrder: getSectionOrder()
		}
	}
}

const Contact = ({ sectionOrder }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const router = useRouter();

	useEffect(() => {
		router.prefetch('/contact/thanks');
	}, [router]);

	const submitForm = async (values: FormValues) => {
		const response = await fetch('https://formbold.com/s/3GZ09', {
			method: 'POST',
			body: toFormData(values),
		});

		if (response.status !== 200) {
			console.log('Error sending form', response.status);
			throw new Error('Error sending form, please try again.');
		}

		router.push('/contact/thanks');
	};

	return (
		<div className='bg-gray-300'>
			<Head>
				<title>Jordi Isern Photography - Contact</title>
			</Head>
			<Header variant='light' sectionOrder={sectionOrder} />
			<div className='h-screen text-gray-300'>
				<div className='absolute h-screen w-full'>
					<MainImage image={mainImage} />
				</div>
				<div className='pt-[8rem] relative z-[9] pl-20 '>
					<div className='text-4xl text-medium pt-20'>
						Contact
					</div>
					<Formik
						initialValues={{
							name: '',
							email: '',
							message: '',
							'g-recaptcha-response': '',
						}}
						validationSchema={object().shape({
							name: string().required('Name is required'),
							email: string().email('Invalid email').required('Email is required'),
							message: string().min(10).max(500).required('Message is required'),
							'g-recaptcha-response': string().required('Please verify you are not a robot'),
						})}
						onSubmit={submitForm}
					>
						{({
							values,
							touched,
							errors,
							handleChange,
							handleBlur: originalHandleBlur,
							handleSubmit,
							setFieldValue,
							setFieldError,
						}) => {
							const handleBlur = async (ev: any) => {
								if (!executeRecaptcha) {
									setFieldError('g-recaptcha-response', 'Please verify you are not a robot');
									return;
								}

								const token = await executeRecaptcha('contact');

								if (token) {
									setFieldValue('g-recaptcha-response', token);
								}

								originalHandleBlur(ev);
							};

							return (
								<form className='flex flex-col pt-20 w-1/2 min-w-[20rem] max-w-[50%]' onSubmit={handleSubmit}>
									<div className='flex flex-col mb-6'>
										<label className='text-xl font-medium' htmlFor='name'>Name</label>
										<input value={values.name} onBlur={handleBlur} onChange={handleChange} className='border border-gray-400 bg-transparent my-2 rounded-sm' type='text' name='name' id='name' />
										{errors.name && touched.name && <div className='text-red-500'>{errors.name}</div>}
									</div>
									<div className='flex flex-col mb-6'>
										<label className='text-xl font-medium' htmlFor='email'>Email</label>
										<input value={values.email} onBlur={handleBlur} onChange={handleChange} className='border border-gray-400 bg-transparent my-2 rounded-sm' type='text' name='email' id='email' />
										{errors.email && touched.email && <div className='text-red-500'>{errors.email}</div>}
									</div>
									<div className='flex flex-col mb-6'>
										<label className='text-xl font-medium' htmlFor='message'>Message</label>
										<textarea value={values.message} onBlur={handleBlur} onChange={handleChange} className='border border-gray-400 bg-transparent my-2 rounded-sm' name='message' id='message' cols={30} rows={10} />
										{errors.message && touched.message && <div className='text-red-500'>{errors.message}</div>}
									</div>
									<button className='bg-gray-400 w-32 font-semibold text-black text-xl uppercase rounded-sm' type='submit'>
										Send
									</button>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</div>
	)
};

const ContactWithCaptcha = ({
	sectionOrder
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<GoogleReCaptchaProvider reCaptchaKey='6LcgkT4iAAAAAEw_C2aUo0x4w8ub9tJtWlJ_52WD'>
			<Contact sectionOrder={sectionOrder} />
		</GoogleReCaptchaProvider>
	);
};

export default ContactWithCaptcha;