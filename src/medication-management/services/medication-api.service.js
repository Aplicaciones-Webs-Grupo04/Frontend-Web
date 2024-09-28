import http from "../../shared/services/http-common.js";


export class MedicationApiService {
  getAllMedications() {
    return http.get('/medications');
  }

  getByIdMedication(id) {
    return http.get(`/medications/${id}`);
  }

  create(medicationResource) {
    return http.post(`/medications`, medicationResource);
  }

  updateMedication(id, medicationResource) {
    return http.put(`/medications/${id}`, medicationResource);
  }

  deleteMedication(id) {
    return http.delete(`/medications/${id}`);
  }

  findByNameMedication(name){
    return http.get(`/medications?name=${name}`);
  }

}