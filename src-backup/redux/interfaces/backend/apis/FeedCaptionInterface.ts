export interface Caption {
  uid: string;
  caption: string;
}

export interface ReqPayload {
  firebaseToken: string;
  modification: boolean;
  payload: Caption;
}
