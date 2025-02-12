export interface ApplicationInterface {
  Active: boolean;
  Address: string;
  Address2: string | null;
  AmountFinanced: number;
  ApplicationGUID: string;
  ApplicationID: number;
  ApprovalCode:string;
  CellPhone: string;
  City: string;
  Consent: boolean;
  Country: string;
  DLNumber: string;
  DLState: string;
  DOB: Date;
  SSN: string;
  DateAdded: string;
  DealerID: number;
  Deleted: boolean;
  ContractTypeID: number;
  DepositFloat: number;
  EmailAddress: string;
  EmployerName: string;
  FirstName: string;
  Flagged: boolean;
  HomePhone: string;
  HousingStatus: string;
  HowLong: string;
  ID: number;
  LastName: string;
  LastUpdated: string;
  MiddleName: string;
  MonthlyHousingPayment: number;
  MonthlyIncome: number;
  Password: string;
  NotesCount: number;
  NotesStatusID: string;
  Position: string;
  PositionType: string;
  PostalCode: string;
  ProfileGUID: string;
  ProfileTypeID: number;
  PurchasePrice: number;
  State: string;
  Status: string;
  StatusID: number;
  Term:string;
  TAXID: string;
  VIN: string;
  VehicleColor: string;
  VehicleEngine: string;
  VehicleHorsePower: string;
  VehicleMake: string;
  VehicleMileage: number;
  VehicleModel: string;
  VehicleTransmission: string;
  VehicleYear: number;
  WorkPhone: string;
  YearsAtCurrentJob: number;
  isShown: boolean;
  Dealership: string;
  CreditScore:number;
}

export const emptyApplication = {
  Active: true,
  Address: '',
  Address2: '',
  AmountFinanced: 0,
  CellPhone: '',
  City: '',
  Consent: false,
  Country: '',
  DLNumber: '',
  DLState: '',
  DOB: new Date(2004, 4, 4, 4, 4),
  SSN: '',
  DateAdded: '',
  Deleted: false,
  DepositFloat: 0,
  EmailAddress: '',
  EmployerName: '',
  FirstName: '',
  Flagged: false,
  HomePhone: '',
  HousingStatus: '',
  HowLong: '',
  LastName: '',
  LastUpdated: '',
  MiddleName: '',
  MonthlyHousingPayment: 0,
  MonthlyIncome: 0,
  NotesCount: 0,
  NotesStatusID: 1,
  Position: '',
  PositionType: '',
  PostalCode: '',
  PurchasePrice: 0,
  State: '',
  Status: '',
  StatusID: 1,
  TAXID: 1,
  VIN: '',
  VehicleColor: '',
  VehicleEngine: '',
  VehicleHorsePower: '',
  VehicleMake: '',
  VehicleMileage: 0,
  VehicleModel: '',
  VehicleTransmission: '',
  VehicleYear: 2020,
  WorkPhone: '',
  YearsAtCurrentJob: 0,
  isShown: true,
  Dealership: '',
  CreditScore:0
};
