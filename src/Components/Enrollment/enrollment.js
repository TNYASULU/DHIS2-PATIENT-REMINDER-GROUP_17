function createEnrollmentForm() {
    // Create form container
    const container = document.createElement('div');
    container.classList.add('container', 'mt-5');

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Enroll Patient';
    container.appendChild(title);

    // Create form element
    const form = document.createElement('form');
    form.id = 'enrollmentForm';

    // Organization Unit select
    const orgUnitDiv = document.createElement('div');
    orgUnitDiv.classList.add('form-group');
    const orgUnitLabel = document.createElement('label');
    orgUnitLabel.setAttribute('for', 'orgUnit');
    orgUnitLabel.textContent = 'Select Organization Unit';
    const orgUnitSelect = document.createElement('select');
    orgUnitSelect.classList.add('form-control');
    orgUnitSelect.id = 'orgUnit';
    orgUnitSelect.required = true;
    const orgUnitPlaceholder = document.createElement('option');
    orgUnitPlaceholder.value = '';
    orgUnitPlaceholder.textContent = 'Select Organization Unit';
    orgUnitSelect.appendChild(orgUnitPlaceholder);
    orgUnitDiv.appendChild(orgUnitLabel);
    orgUnitDiv.appendChild(orgUnitSelect);
    form.appendChild(orgUnitDiv);

    // Program select
    const programDiv = document.createElement('div');
    programDiv.classList.add('form-group');
    const programLabel = document.createElement('label');
    programLabel.setAttribute('for', 'program');
    programLabel.textContent = 'Select Program';
    const programSelect = document.createElement('select');
    programSelect.classList.add('form-control');
    programSelect.id = 'program';
    programSelect.required = true;
    const programPlaceholder = document.createElement('option');
    programPlaceholder.value = '';
    programPlaceholder.textContent = 'Select Program';
    programSelect.appendChild(programPlaceholder);
    programDiv.appendChild(programLabel);
    programDiv.appendChild(programSelect);
    form.appendChild(programDiv);

    // Patient select
    const patientDiv = document.createElement('div');
    patientDiv.classList.add('form-group');
    const patientLabel = document.createElement('label');
    patientLabel.setAttribute('for', 'patient');
    patientLabel.textContent = 'Select Patient';
    const patientSelect = document.createElement('select');
    patientSelect.classList.add('form-control');
    patientSelect.id = 'patient';
    patientSelect.required = true;
    const patientPlaceholder = document.createElement('option');
    patientPlaceholder.value = '';
    patientPlaceholder.textContent = 'Select Patient';
    patientSelect.appendChild(patientPlaceholder);
    patientDiv.appendChild(patientLabel);
    patientDiv.appendChild(patientSelect);
    form.appendChild(patientDiv);

    // Date input
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('form-group');
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'enrollmentDate');
    dateLabel.textContent = 'Select Enrollment Date';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.classList.add('form-control');
    dateInput.id = 'enrollmentDate';
    dateInput.required = true;
    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);
    form.appendChild(dateDiv);

    // Enroll Button
    const enrollButton = document.createElement('button');
    enrollButton.type = 'submit';
    enrollButton.classList.add('btn', 'btn-primary');
    enrollButton.textContent = 'Enroll Patient';
    form.appendChild(enrollButton);

    // Response message div
    const responseMessage = document.createElement('div');
    responseMessage.id = 'responseMessage';
    responseMessage.classList.add('mt-3');
    container.appendChild(responseMessage);

    // Append form to the container
    container.appendChild(form);
    document.body.appendChild(container);

    // Call functions to fetch data
    fetchOrgUnits();
    fetchPrograms();
    fetchPatients();

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const orgUnit = document.getElementById('orgUnit').value;
        const program = document.getElementById('program').value;
        const patient = document.getElementById('patient').value;
        const enrollmentDate = document.getElementById('enrollmentDate').value;

        if (!orgUnit || !program || !patient || !enrollmentDate) {
            alert('All fields are required!');
            return;
        }

        enrollPatient(orgUnit, program, patient, enrollmentDate);
    });
}

