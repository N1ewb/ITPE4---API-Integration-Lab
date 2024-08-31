export interface Role {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role;
  recruitmentData: any;
  abilities: Ability[];
}

export interface GenshinCharacter {
  _costumeData: JsonObject[];
  _data: JsonObject;
  _nameId: string;
  _releaseData: any;
  _skillData: JsonObject;
  arkhe: Arkhe | null;
  bodyType: BodyType;
  cardIcon: ImageAssets;
  constellations: Constellation[];
  costumes: Costume[];
  description: TextAssets;
  details: CharacterDetails;
  element: Element | null;
  elementalBurst: ElementalBurst | null;
  elementalSkill: ElementalSkill | null;
  gachaSlice: ImageAssets;
  gender: Gender;
  icon: ImageAssets;
  id: string;
  isArchon: boolean;
  isTraveler: boolean;
  name: TextAssets;
  nameCard: NameCard | null;
  normalAttack: NormalAttack;
  passiveTalents: PassiveTalent[];
  rarity: CharacterRarity;
  releasedAt: Date | null;
  sideIcon: ImageAssets;
  skillDepotId: number;
  skills: Skill[];
  splashImage: SplashImage;
  stars: number;
  weaponType: WeaponType;
}

export interface CharacterDetails {
  birthday: {
    month: number;
    day: number;
  };
  characterId: number;
  constellation: Constellation;
  constellationIcon: ConstellationIcon;
  cv: Cv;
  description: Description;
  enka: string;
  id: number;
  location: Location;
  title: Title;
  vision: Vision;
  _data: {
    infoBirthMonth: number;
    infoBirthDay: number;
    avatarNativeTextMapHash: number;
    avatarVisionBeforTextMapHash: number;
    avatarConstellationBeforTextMapHash: number;
    // Add other fields if needed
  };
  _nameId: string;
}
// Define sub-interfaces for nested objects

export interface Constellation {
  id: number;
  enka: string;
  convertToHtmlFormat: boolean;
  directory: string | null;
}

export interface ConstellationIcon {
  enka: string;
  name: string;
  imageBaseUrl: string;
  url: string;
  imageType: string | null;
}

export interface Cv {
  chinese: string;
  japanese: string;
  english: string;
  korean: string;
}

export interface Description {
  id: number;
  enka: string;
  convertToHtmlFormat: boolean;
  directory: string | null;
}

export interface Location {
  id: number;
  enka: string;
  convertToHtmlFormat: boolean;
  directory: string | null;
}

export interface Title {
  id: number;
  enka: string;
  convertToHtmlFormat: boolean;
  directory: string | null;
}

export interface Vision {
  id: number;
  enka: string;
  convertToHtmlFormat: boolean;
  directory: string | null;
}

export interface SplashImage {
  enka: string;
  imageBaseUrl: string;
  imageType: string | null;
  isAvailable: boolean;
  mihoyoUrl: string;
  name: string;
  url: string;
}

export type JsonObject = { [key: string]: any };

export type Arkhe = any; // Replace with actual structure
export type BodyType = any; // Replace with actual structure
export interface ImageAssets {
  enka: string;
  imageBaseUrl: string;
  imageType: string | null;
  isAvailable: boolean;
  mihoyoUrl: string;
  name: string;
  url: string;
}

export type Costume = any; // Replace with actual structure
export type TextAssets = any; // Replace with actual structure
export type Element = any; // Replace with actual structure
export type ElementalBurst = any; // Replace with actual structure
export type ElementalSkill = any; // Replace with actual structure
export type Gender = any; // Replace with actual structure
export type NormalAttack = any; // Replace with actual structure
export type PassiveTalent = any; // Replace with actual structure
export type CharacterRarity = any; // Replace with actual structure
export type Skill = any; // Replace with actual structure
export type WeaponType = any; // Replace with actual structure
export type NameCard = any; // Replace with actual structure

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface RestAPIUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
