import { authenticateAndGetAccessToken, scheduleReminder } from
'../api/Dhis2Api'; // Adjust import paths
const Enroll = () => {
 const [formData, setFormData] = useState({ fullName: '', phone: '', email: 
'', programId: '' });
 const handleEnrollPatient = async (event) => {
 event.preventDefault();
 const accessToken = await authenticateAndGetAccessToken(); // Fetch 
token
 try {
 const enrollmentDetails = {
 program: formData.programId,
 trackedEntityInstance: formData.fullName, // Assume unique patient 
name
 orgUnit: 'DiszpKrYNg8', // DHIS2 organization unit
 };
 // After enrolling patient, schedule a reminder
 const reminderDetails = {
 message: `Hello ${formData.fullName}, this is your reminder.`,
 date: '2024-10-21T12:00:00', // Example date, should come from form
 };
 await scheduleReminder(formData.programId, reminderDetails, 
accessToken);
 console.log('Patient enrolled and reminder scheduled.');
 } catch (error) {
 console.error('Error enrolling patient or scheduling reminder:', 
error);
 }
 };
 return (
 <div className="enroll-form">
 <h1>Enroll Patient</h1>
 
 </div>
 