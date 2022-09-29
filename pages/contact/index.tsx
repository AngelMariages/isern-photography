import Head from 'next/head';
import Header from '../../components/Header';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Contact = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const form = ev.currentTarget;
		const formData = new FormData(form);

		if (!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
			return;
		}

		const token = await executeRecaptcha('contact');

		formData.append('g-recaptcha-response', token);

		const response = await fetch('https://formbold.com/s/3GZ09', {
			method: 'POST',
			body: formData,
		});

		if (response.status !== 200) {
			console.log('Error sending form', response.status);
			alert('Error sending form, please try again.');
			return;
		} else {
			// Redirecto to thanks page
			window.location.href = '/contact/thanks';
		}
	};


	return (
		<div className='bg-gray-300'>
			<Head>
				<title>Jordi Isern Photography - Contact</title>
			</Head>
			<Header variant='light' />
			<div className='pt-[8rem] h-screen bg-cover pl-20 text-gray-300' style={{
				backgroundImage: 'url(/contact-bg.jpg)',
			}}>
				<div className='text-4xl text-medium pt-20'>
					Contact
				</div>
				<form className='flex flex-col pt-20 w-1/2 min-w-[20rem] max-w-[50%]' onSubmit={handleOnSubmit}>
					<div className='flex flex-col'>
						<label className='text-xl font-medium' htmlFor='name'>Name</label>
						<input required className='border border-gray-400 bg-transparent mt-2 mb-6 rounded-sm' type='text' name='name' id='name' />
					</div>
					<div className='flex flex-col'>
						<label className='text-xl font-medium' htmlFor='email'>Email</label>
						<input required className='border border-gray-400 bg-transparent mt-2 mb-6 rounded-sm' type='email' name='email' id='email' />
					</div>
					<div className='flex flex-col'>
						<label className='text-xl font-medium' htmlFor='message'>Message</label>
						<textarea required className='border border-gray-400 bg-transparent mt-2 mb-6 rounded-sm' name='message' id='message' cols={30} rows={10} />
					</div>
					<button className='bg-gray-400 w-32 font-semibold text-black text-xl uppercase rounded-sm' type='submit'>
						Send
					</button>
				</form>
			</div>
		</div>
	)
};

export default function ContactWithCaptcha() {
	return (
		<GoogleReCaptchaProvider reCaptchaKey='6LcgkT4iAAAAAEw_C2aUo0x4w8ub9tJtWlJ_52WD'>
			<Contact />
		</GoogleReCaptchaProvider>
	);
};