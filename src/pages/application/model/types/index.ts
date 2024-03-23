export type ReportsMakePlateSchema = {
  plate: string;
  uid: string;
  submitted_at: string;
  is_new: boolean;
  eta: string;
};

export type ReportsRetrieveSchema = {
  uid?: string;
  make: {
    id?: number;
    name: string;
  };
  model: {
    id?: number;
    make_on_read?: {
      id: number;
      name: string;
    };
    name: string;
  };
  manufacture_year: number;
  body: string;
  vin: string;
};

export type ModelObjectRequest = {
  owner?: number;
  model: number;
  body?: string;
  vin?: string;
  manufacture_year: string;
  plate: string;
};

export type ModelObjectResponse = {
  id: number;
};
