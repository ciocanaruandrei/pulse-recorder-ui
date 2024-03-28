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

export type RecoringQuery = {
  page: number;
  perPage: number;
  start?: number;
  end?: number;
};

export type ShareLink = {
  url: string;
  expires: Date;
};

export type AuthStateResponse = {
  isAuthenticated: boolean;
  user: {
    email: string;
    [key: string]: string;
  };
};

export type AuthCapabilitiesResponse = {
  samlSso: {
    enabled: boolean;
    loginUrl: string;
  };
  credentials: {
    enabled: boolean;
  };
};
