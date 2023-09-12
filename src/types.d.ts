export type Domain = string;
export type Score = string;
export type ReportURL = string;
export type WhitelistType = 'page' | 'site';
export type WhitelistDuration = 'day' | 'week' | 'kim_nesmazu';
export type WhitelistedResource = string;
export type WhitelistingExpirationDate = number; // the type of Date.now()

export interface DomainDetail {
  score: Score;
  reportUrl: ReportURL
}

export interface Message {
  messageType:
    'whitelistRequest' |
    'deleteWhitelistRequest' |
    'getLastDatabaseUpdateRequest' |
    'updateDatabaseRequest'
}

export interface WhitelistRequest extends Message {
  whitelistType: WhitelistType
  whitelistDuration: WhitelistDuration
  whitelistedResource: string // hostname or hostname + pathname
}

export interface DeleteWhitelistsRequest extends Message {}

export interface whitelistedResources {
  [whitelistedResource: WhitelistedResource]: WhitelistingExpirationDate
}

export type DomainScores = Record<Domain, DomainDetail>

export interface FormattedDatabaseUpdateDateTimes {
  lastUpdate: string
  nextUpdate: string
}

export interface FormattedDatabaseUpdateDateTimesResponse extends FormattedDatabaseUpdateDateTimes {
  success: true
}
