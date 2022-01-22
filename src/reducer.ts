import { IdTokenResult, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export type action = {
  type: "SET_USER" | "ENTER_ROOM" | "SWITCH_THEME";
  user?: User;
  roomid?: string;
  theme?: "DARK" | "LIGHT";
};

export interface globalState {
  user: User;
  currentRoom?: string;
  currentTheme?: "DARK" | "LIGHT";
  userInfo?: {
    name: string;
    photoURL: string;
  };
}

const testuser: User = {
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
  metadata: undefined,
  refreshToken: "",
  tenantId: "",
  delete: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  getIdToken: function (forceRefresh?: boolean): Promise<string> {
    throw new Error("Function not implemented.");
  },
  getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
    throw new Error("Function not implemented.");
  },
  reload: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  toJSON: function (): object {
    throw new Error("Function not implemented.");
  },
  phoneNumber: "",
  providerId: "",
};

export const initialState: globalState = {
  user: null,
  currentTheme: "LIGHT",
};

export function reducer(state: globalState, action: action): globalState {
  switch (action.type) {
    case "SET_USER":
      console.log("Saving user to firebase");
      if (action.user) {
        const userRef = doc(db, "users", action.user.uid);
        setDoc(userRef, {
          name: action.user.displayName,
          photoURL: action.user.photoURL,
        });
      }
      return {
        ...state,
        user: action.user,
      };
    case "ENTER_ROOM":
      return {
        ...state,
        currentRoom: action.roomid,
      };
    case "SWITCH_THEME":
      return {
        ...state,
        currentTheme: action.theme,
      };
    default:
      return state;
  }
}
