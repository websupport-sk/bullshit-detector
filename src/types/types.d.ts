export type Domain = string;
export type Score = string;
export type ReportURL = string;
export type HideType = 'page' | 'site';
export type HideDuration = 'day' | 'week' | 'indefinitely';
export type HiddenResource = string;
export type HideExpirationDate = number; // the type of Date.now()

export interface DomainDetail {
  score: Score;
  reportUrl: ReportURL
}

export interface Message {
  messageType: 'hideRequest' | 'deleteHideSettingsRequest';
}

export interface HideRequest extends Message {
  hideType: HideType
  hideDuration: HideDuration
  hiddenResource: string // hostname or hostname + pathname
}

export interface DeleteHideSettingsRequest extends Message {}

export type PermanentlyHiddenResources = HiddenResource[]

export interface TemporarilyHiddenResources {
  [hiddenResource: HiddenResource]: HideExpirationDate
}

export type DomainScores = Record<Domain, DomainDetail>
