export type action =
  | { type: "SET_USER", user: user }
export interface user {
  uid: string;
  email: string;
  emailVerified?: boolean;
  displayName: string;
  isAnonymous?: boolean;
  photoURL: string;
  providerData?: [
    {
      providerId: string;
      uid: string;
      displayName: string;
      email: string;
      phoneNumber?: string;
      photoURL: string;
    }
  ];
  stsTokenManager?: {
    refreshToken?: string;
    accessToken?: string;
    expirationTime?: number;
  };
  createdAt?: "1632243506964";
  lastLoginAt?: "1632411946249";
  apiKey?: "AIzaSyBdUgnkmwT6SfdULoJeG9lQ5pQ7qVcWO1s";
  appName?: "[DEFAULT]";
}

export interface globalState {
  user: user;
}

const testuser: user = {
  uid: "JQL1RrMw0PfGyvnRh2XA8mc6KOq1",
  email: "dunglevan2001@gmail.com",
  emailVerified: true,
  displayName: "Dũng Lê",
  isAnonymous: false,
  photoURL:
    "https://lh3.googleusercontent.com/a/AATXAJyOQmYQjdAwa_nCIudXw2tgur7FYMw4j8-Tk8Qq=s96-c",
  providerData: [
    {
      providerId: "google.com",
      uid: "106952995745455599780",
      displayName: "Dũng Lê",
      email: "dunglevan2001@gmail.com",
      phoneNumber: null,
      photoURL:
        "https://lh3.googleusercontent.com/a/AATXAJyOQmYQjdAwa_nCIudXw2tgur7FYMw4j8-Tk8Qq=s96-c",
    },
  ],
  stsTokenManager: {
    refreshToken:
      "ACzBnCjY-gqD4u-kEV8QD_4L2ZU3I16o4Y7KgkZEyTFktK-72fKDiuE-MC4NJNVwalIHgkqEnlifFzD6zk01v2W3_xPir7pT1ynXvMtRlPiyNfPgy_Yt8G_IW9lNKW6NNC2CVHgNsGU1QqyhGCYqZhKt_FXm8RM-HSBogVfKCjufZ9IytX_-YjId7ALC9-GHA6QIHpGh9UL8zfVelONDMTLelTSFgQktSX2FYoiUm1jqLLxRPyyh3PNH1-ZQmGAsHuQhRjIJGTx6tQf5eEVqVn7qjnTP9Jh37aOKKJr0ab1dEDMAxYCXARkPtiY264fCCw7gCVZ-MiUL4QOn0o7eh0bdybJ3LlWVWtY5eMCv1vFREgNhk5tLdi28BoyC-yDui6Sb-rsmIThxOP8V4hLihcRexehGEadhVA",
    accessToken:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNTJiOGQ4NTk4N2U1OWRjYWM2MmJlNzg2YzcwZTAyMDcxN2I0MTEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRMWpbmcgTMOqIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnlPUW1ZUWpkQXdhX25DSXVkWHcydGd1cjdGWU13NGo4LVRrOFFxPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL21pY2hhdC0zYTNiNiIsImF1ZCI6Im1pY2hhdC0zYTNiNiIsImF1dGhfdGltZSI6MTYzMjQxMTk0NiwidXNlcl9pZCI6IkpRTDFSck13MFBmR3l2blJoMlhBOG1jNktPcTEiLCJzdWIiOiJKUUwxUnJNdzBQZkd5dm5SaDJYQThtYzZLT3ExIiwiaWF0IjoxNjMyNDExOTQ2LCJleHAiOjE2MzI0MTU1NDYsImVtYWlsIjoiZHVuZ2xldmFuMjAwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNjk1Mjk5NTc0NTQ1NTU5OTc4MCJdLCJlbWFpbCI6WyJkdW5nbGV2YW4yMDAxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.E18n_0Z5su3vR1AX6mIGBcs-gglY5KQkrSBxKoH-2DrR0EndmnF0c7Emk7FPa_-L1KEnf2-OhkstfV2bwZDJ80gC-JoN4EkOaeQQyALjWXIWyrFFL4ylOHUX4isnu8whns3jcMF11I42I6nU1HhahaX0R5CyXeT84GG5U4AP55FLjPsX6qNvRqAuSYO4KCiHDCyO-HWPovUOHybdoJJk9rgEc4DJtCnkT2V9TfdqMvCNZjuCkgyc4frTrKnNvyrMnVpDbSukDdGkUbzwq9KgsEiQ_I82Cfp7gUgHHZxalxO1FSMlWKSQX6VLNXViwgzTv-AJY5Edbi6JiiDeFuTJjg",
    expirationTime: 1632415546309,
  },
  createdAt: "1632243506964",
  lastLoginAt: "1632411946249",
  apiKey: "AIzaSyBdUgnkmwT6SfdULoJeG9lQ5pQ7qVcWO1s",
  appName: "[DEFAULT]",
};

export const initialState: globalState = {
  user: testuser,
};

export function reducer(state: globalState, action: action): globalState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
