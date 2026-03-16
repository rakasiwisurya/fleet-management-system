export type TResponseList<T extends { [key: string]: any }> = {
  current_page: number;
  total_record: number;
  has_next: boolean;
  has_prev: boolean;
  records: T[];
};

export type TResponseError = {
  errors: {
    code: string;
    status: string;
    title?: string;
    detail?: string;
    source?: {
      parameter: string;
    };
  }[];
};

export type TModalDetail = {
  id: string | null;
  isModalOpen: boolean;
  onCancel: () => void;
};

export type TUseModalDetail = {
  id: string | null;
  isModalOpen: boolean;
  onCancel?: () => void;
};
