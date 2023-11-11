import type {Submission} from "@conform-to/dom";

export type SubmissionResult = {
    intent: Submission['intent'];
    payload: Submission['payload'] | null;
    error: Submission['error'];
};