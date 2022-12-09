import { EHeightUnit, EReferenceDatum } from './airport.interfaces';
import { ECountries } from './country.interface';

export enum EAirSpaceType {
  OTHER = 0, // Other
  RESTRICTED = 1, // Restricted
  DANGER = 2, // Danger
  PROHIBITED = 3, // Prohibited
  CTR = 4, // Controlled Tower Region (CTR)
  TMZ = 5, // Transponder Mandatory Zone (TMZ)
  RMZ = 6, // Radio Mandatory Zone (RMZ)
  TMA = 7, // Terminal Maneuvering Area (TMA)
  TRA = 8, // Temporary Reserved Area (TRA)
  TSA = 9, // Temporary Segregated Area (TSA)
  FIR = 10, // Flight Information Region (FIR)
  UIR = 11, // Upper Flight Information Region (UIR)
  ADIZ = 12, // Air Defense Identification Zone (ADIZ)
  ATZ = 13, // Airport Traffic Zone (ATZ)
  MATZ = 14, // Military Airport Traffic Zone (MATZ)
  AIRWAY = 15, // Airway
  MTR = 16, // Military Training Route (MTR)
  ALERT_AREA = 17, // Alert Area
  WARNING_AREA = 18, // Warning Area
  PROTECTED_AREA = 19, // Protected Area
  HTZ = 20, // Helicopter Traffic Zone (HTZ)
  GLIDER_SECTOR = 21, // Gliding Sector
  TRP = 22, // Transponder Setting (TRP)
  TIZ = 23, // Traffic Information Zone (TIZ)
  TIA = 24, // Traffic Information Area (TIA)
  MTA = 25, // Military Training Area (MTA)
  CTA = 26, // Controlled Area (CTA)
  ACC = 27, // ACC Sector (ACC)
  SPORT = 28, // Aerial Sporting Or Recreational Activity
  LOW_OVERFLIGHT_RESTRICTION = 29, // Low Altitude Overflight Restriction
}

enum EAirSpaceIcaoClass {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
  E = 4,
  F = 5,
  G = 6,
  OTHER = 8, // Unclassified / Special Use Airspace (SUA)
}

enum EAirSpaceActivity {
  NONE = 0, // None - No specific activity (default)
  PARACHUTING = 1, // Parachuting Activity
  AEROBATICS = 2, // Aerobatics Activity
  AEROCLUB = 3, // Aeroclub And Arial Work Area
  ULTRALIGHT = 4, // Ultra Light Machine (ULM) Activity
  HANG_PARA_GLIDER = 5, // Hang Gliding/Paragliding
}
export interface IAirspaceResponse {
  approved: boolean;
  name: string;
  type: EAirSpaceType;
  icaoClass: EAirSpaceIcaoClass;
  activity: EAirSpaceActivity;
  onDemand: boolean;
  onRequest: boolean;
  byNotam: boolean;
  specialAgreement: boolean;
  requestCompliance: boolean;
  country: ECountries;
  upperLimit: {
    value: number;
    unit: EHeightUnit;
    referenceDatum: EReferenceDatum;
  };
  lowerLimit: {
    value: number;
    unit: EHeightUnit;
    referenceDatum: EReferenceDatum;
  };
}

export interface IAirspace extends IAirspaceResponse {
  lowerLimitMetersMsl: number;
  upperLimitMetersMsl: number;
}
