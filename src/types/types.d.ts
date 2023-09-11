export type Domain = string;
export type Score = string;
export type ReportURL = string;
export type HideType = 'page' | 'site';
export type HideDuration = 'day' | 'week' | 'kim_nesmazu';
export type HiddenResource = string;
export type HideExpirationDate = number; // the type of Date.now()

export interface DomainDetail {
  score: Score;
  reportUrl: ReportURL
}

export interface Message {
  messageType:
    'hideRequest' |
    'deleteHideSettingsRequest' |
    'getLastDatabaseUpdateRequest' |
    'updateDatabaseRequest'
}

export interface HideRequest extends Message {
  hideType: HideType
  hideDuration: HideDuration
  hiddenResource: string // hostname or hostname + pathname
}

export interface DeleteHideSettingsRequest extends Message {}

export interface hiddenResources {
  [hiddenResource: HiddenResource]: HideExpirationDate
}

export type DomainScores = Record<Domain, DomainDetail>

export interface FormattedDatabaseUpdateDateTimes {
  lastUpdate: string
  nextUpdate: string
}

export interface FormattedDatabaseUpdateDateTimesResponse extends FormattedDatabaseUpdateDateTimes {
  success: true
}
