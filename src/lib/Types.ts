export type RecordingsResponse = {
  total: number;
  page: number;
  perPage: number;
  pages: number;
  recordings: Recording[];
};

export type Recording = {
  id: number;
  file: string;
  start: Date;
  end: Date;
  expires: Date;
};

export type ShareLink = {
  url: string;
  expires: Date;
};
