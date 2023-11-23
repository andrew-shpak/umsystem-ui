import type {UserFullName} from "~/src/entities";

type FullName = UserFullName & {
    userFullName: string;
    created: string
};

export type {
    FullName
};