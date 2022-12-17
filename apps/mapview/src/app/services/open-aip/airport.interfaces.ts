import { ECountries } from './country.interface';

export enum EAirportType {
  AIRPORT = 0, // civil/military
  GLIDER_SITE = 1,
  AIRFIELD_CIVIL = 2,
  INTERNATIONAL_AIRPORT = 3,
  HELIPORT_MILITARY = 4,
  MILITARY_AERODROME = 5,
  ULTRA_LIGHT_FLYING_SITE = 6,
  HELIPORT_CIVIL = 7,
  AERODROME_CLOSED = 8,
  IFR = 9, // Airport resp. Airfield IFR
  AIRFIELD_WATER = 10,
  LANDING_STRIP = 11,
  AGRICULTURAL_LANDING_STRIP = 12,
  ALTIPORT = 13,
}

export enum EHeightUnit {
  METERS = 0,
  FEET = 1,
  FLIGHT_LEVEL = 6,
}

enum EFrequencyUnit {
  MHZ = 2,
}

enum EWeightUnit {
  TON = 9,
}

export enum EReferenceDatum {
  GND = 0,
  MSL = 1,
  STD = 2,
}

enum ETrafficType {
  VFR = 0,
  IFR = 1,
}

enum EFuelType {
  SUPER_PLUS = 0,
  AVGAS = 1,
  Jet_A = 2,
  Jet_A1 = 3,
  Jet_B = 4,
  DIESEL = 5,
  AVGAS_UL91 = 6,
}

enum EGliderTowing {
  SELF_LAUNCH = 0,
  WINCH = 1,
  TOE = 2,
  AUTO_TOW = 3,
  BUNGEE = 4,
  GRAVITY_POWERED = 5,
}

enum EHandlingFacilities {
  CARGO_HANDLING = 0,
  DE_ICING = 1,
  MAINTENANCE = 2,
  SECURITY = 3,
  SHELTER = 4,
}

enum EPassengerFacilities {
  BANK_OFFICE = 0,
  POST_OFFICE = 1,
  CUSTOMS = 2,
  LODGING = 3,
  MEDICAL_FACILITY = 4,
  RESTAURANT = 5,
  SANITATION = 6,
  TRANSPORTATION = 7,
  LAUNDRY_SERVICE = 8,
  CAMPING = 9,
}

enum EFrequencyType {
  APPROACH = 0,
  APRON = 1,
  ARRIVAL = 2,
  CENTER = 3,
  CTAF = 4,
  DELIVERY = 5,
  DEPARTURE = 6,
  FIS = 7,
  GLIDING = 8,
  GROUND = 9,
  INFO = 10,
  MULTICOM = 11,
  UNICOM = 12,
  RADAR = 13,
  TOWER = 14,
  ATIS = 15,
  RADIO = 16,
  OTHER = 17,
  AIRMET = 18,
  AWOS = 19,
  LIGHTS = 20,
  VOLMET = 21,
}

enum ERunwayOperations {
  ACTIVE = 0,
  TEMPORARY_CLOSE = 1,
  CLOSED = 2,
}

enum ETurnDirection {
  RIGHT = 0,
  LEFT = 1,
  BOTH = 2,
}

export enum ERunwayComposition {
  ASPHALT = 0, // Asphalt
  CONCRETE = 1, // Concrete
  GRASS = 2, // Grass
  SAND = 3, // Sand
  WATER = 4, // Water
  BITUMINOUS_TAR = 5, // Bituminous tar or asphalt ("earth cement")
  BRICK = 6, // Brick
  MACADAM = 7, // Macadam or tarmac surface consisting of water-bound crushed rock
  STONE = 8, // Stone
  CORAL = 9, // Coral
  CLAY = 10, // Clay
  LATERITE = 11, // Laterite - a high iron clay formed in tropical areas
  GRAVEL = 12, // Gravel
  EARTH = 13, // Earth
  ICE = 14, // Ice
  SNOW = 15, // Snow
  LAMINATE = 16, // Protective laminate usually made of rubber
  METAL = 17, // Metal
  PORTABLE = 18, // Landing mat portable system usually made of aluminum
  PIERCED_STEEL_PLANKING = 19, // Pierced steel planking
  WOOD = 20, // Wood
  NON_BITUMINOUS_MIX = 21, // Non Bituminous mix
  UNKNOWN = 22, // Unknown
}

enum ERunwayCondition {
  GOOD = 0,
  FAIR = 1,
  POOR = 2,
  UNSAFE = 3,
  DEFORMED = 4,
  UNKNOWN = 5,
}

enum EExclusiveAircraftType {
  SINGLE_ENGINE_PISTON = 0,
  SINGLE_ENGINE_TURBINE = 1,
  MULTI_ENGINE_PISTON = 2,
  MULTI_ENGINE = 3,
  HIGH_PERFORMANCE_AIRCRAFT = 4,
  TOURING_MOTOR_GLIDER = 5,
  EXPERIMENTAL = 6,
  VERY_LIGHT_AIRCRAFT = 7,
  GLIDER = 8,
  LIGHT_SPORT_AIRCRAFT = 9,
  ULTRA_LIGHT_AIRCRAFT = 10,
  HANG_GLIDER = 11,
  PARAGLIDER = 12,
  BALLOON = 13,
}

interface IAirportFrequency {
  _id: string;
  value: string; // pattern: ^\d{3}\.\d{3}$
  unit: EFrequencyUnit;
  type: EFrequencyType;
  primary: boolean;
  name: string;
  publicUse: boolean;
  remarks: string;
}

export interface IRunway {
  _id: string;
  designator: string; // ^(0[1-9]|[1-2]\d|3[0-6])[LCR]?$
  trueHeading: number; // 0 - 360
  alignedTrueNorth: boolean;
  operations: ERunwayOperations;
  mainRunway: boolean;
  turnDirection: ETurnDirection;
  landingOnly: boolean;
  takeOffOnly: boolean;
  surface: {
    composition: ERunwayComposition[];
    mainComposite: ERunwayComposition;
    ERunwayComposition: ERunwayCondition;
    mtow: {
      value: number;
      unit: EWeightUnit.TON;
    };
    pcn: string; //^([1-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0][0])/([fF,rR]{1})/([aA,bB,cC,dD]{1})/([wW,xX,yY,zZ]{1})/([tT,uU]{1})$
  };
  dimension: {
    length: { value: number; unit: EHeightUnit.METERS };
    width: { value: number; unit: EHeightUnit.METERS };
  };
  exclusiveAircraftType: EExclusiveAircraftType[];
  pilotCtrlLighting: boolean;
  remarks: string;
}

export interface IAirportResponse {
  _id: string;
  approved: boolean;
  name: string;
  icaoCode: string; // pattern: ^[A-Z]{4}$
  iataCode: string; // pattern: ^[A-Z]{3}$
  altIdentifier: string;
  type: EAirportType;
  country: ECountries;
  elevation: {
    value: number;
    unit: EHeightUnit.METERS;
    referenceDatum: EReferenceDatum.MSL;
  };
  elevationGeoid: {
    hae: number; // Height above ellipsoid in meters.
    geoidHeight: number; // Height of geoid in meters.
  };
  trafficType: ETrafficType[];
  magneticDeclination: number;
  ppr: boolean;
  private: boolean;
  skydiveActivity: boolean;
  winchOnly: boolean;
  services: {
    fuelTypes: EFuelType[];
    gliderTowing: EGliderTowing[];
    handlingFacilities: EHandlingFacilities[];
    passengerFacilities: EPassengerFacilities[];
  };
  frequencies: IAirportFrequency[];

  runways: IRunway[];

  contact: string;
  remarks: string;
  images: { _id: string; filename: string; description: string }[];
}

export interface IAirport extends IAirportResponse {
  mainRunway: (IRunway & { paved: boolean }) | Record<string, never>;
  mainFrequency: IAirportFrequency | Record<string, never>;
}
