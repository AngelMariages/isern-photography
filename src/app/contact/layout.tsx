import ContactBody from '../../components/ContactBody';
import { getSectionOrder } from '../../../lib/api';

const ContactLayout: React.FC = ({ children }) => {
	const sectionOrder = getSectionOrder();

	return (
		<ContactBody sectionOrder={sectionOrder}>
			{ children }
		</ContactBody>
	)
};

export default ContactLayout;