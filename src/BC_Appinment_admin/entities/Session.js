export class Session {
    constructor(id, appointmentDate, patient,asunto) {
        this.id = id;
        this.appointmentDate = appointmentDate;
        this.patient = patient;
        this.asunto = " Terapi" ;
    }

    static fromJson(json) {
        return new Session(
            json.id,
            json.appointmentDate,
            json.patient ? new Patient(json.patient.id, json.patient.name, json.patient.lastName) : null
        );
    }
}

class Patient {
    constructor(id, name, lastName) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
    }

    static fromJson(json) {
        return new Patient(json.id, json.name, json.lastName);
    }
}