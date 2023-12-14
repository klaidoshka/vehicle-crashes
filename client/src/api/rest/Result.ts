type Result<T = unknown> = {
    message: string | undefined;
    messages: string[] | undefined;
    success: boolean | undefined;
    value: T | undefined;
};

const resultOfError = <T = unknown>(
    value: any,
    error: string = "Error has occurred while processing your request."
): Result<T> => {
    const message = value.response?.data?.message;
    const messages = value.response?.data?.messages ?? [];

    return {
        message: message ?? (messages.length > 0 ? undefined : error),
        messages: messages,
        success: value.response?.data?.success,
        value: value.response?.data?.value
    };
};

const resultOfSuccess = <T = unknown>(value: T): Result<T> => {
    return {
        message: undefined,
        messages: [],
        success: true,
        value: value
    };
};

export { resultOfError, resultOfSuccess };
export default Result;
export type { Result };
