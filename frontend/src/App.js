import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GuestHome from './GuestHome';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import OwnerPage from './OwnerPage';
import ManagerPage from './ManagerPage';
import FinancePage from './FinancePage';
import HrPage from './HrPage';
import VetPage from './VetPage';
import VettechPage from './VettechPage';
import StationCreationPage from './StationCreationPage';
import AddEquipmentPage from './AddEquipmentPage'
import AddMedicinePage from './AddMedicinePage';
import AddEmployeePage from './AddEmployeePage';
import AddEmployeeHRPage from './AddEmployeeHRPage';
import AddReportPage from './AddReportPage';
import AddMedicineManagerPage from './AddMedicineManagerPage';
import AddEquipmentManagerPage from './AddEquipmentManagerPage';
import AddMedicalRecordPage from './AddMedicalRecordPage';
import UpdateMedicalRecordPage from './UpdateMedicalRecordPage';
import CreateRequestPage from './CreateRequestPage';
import CreateRequestVetTechPage from './CreateRequestVetTechPage';
import SetArrivalDatePage from './SetArrivalDatePage';
import FinishRequestPage from './FinishRequestPage';
import AddReceiptPage from './AddReceiptPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestHome/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/owner-page" element={<OwnerPage/>}></Route>
        <Route path="/manager-page" element={<ManagerPage/>}></Route>
        <Route path="/finance-page" element={<FinancePage/>}></Route>
        <Route path="/hr-page" element={<HrPage/>}></Route>
        <Route path="/vet-page" element={<VetPage/>}></Route>
        <Route path="/vettech-page" element={<VettechPage/>}></Route>
        <Route path="/create-station" element={<StationCreationPage/>}></Route>
        <Route path="/add-equipment" element={<AddEquipmentPage/>}></Route>
        <Route path="/add-medicine" element={<AddMedicinePage/>}></Route>
        <Route path="/add-employee" element={<AddEmployeePage/>}></Route>
        <Route path="/add-employee-hr" element={<AddEmployeeHRPage/>}></Route>
        <Route path="/add-report" element={<AddReportPage/>}></Route>
        <Route path="/add-medicine-manager" element={<AddMedicineManagerPage/>}></Route>
        <Route path="/add-equipment-manager" element={<AddEquipmentManagerPage/>}></Route>
        <Route path="/add-medical-record" element={<AddMedicalRecordPage/>}></Route>
        <Route path="/update-medical-record/:recordId" element={<UpdateMedicalRecordPage/>}></Route>
        <Route path="/create-request" element={<CreateRequestPage/>}></Route>
        <Route path="/create-request-vettech" element={<CreateRequestVetTechPage/>}></Route>
        <Route path="/set-arrival-date/:requestId" element={<SetArrivalDatePage/>}></Route>
        <Route path="/finish-request/:requestId" element={<FinishRequestPage/>}></Route>
        <Route path="/add-receipt" element={<AddReceiptPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
