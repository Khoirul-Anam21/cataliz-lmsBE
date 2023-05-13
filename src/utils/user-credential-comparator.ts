import { ApiError } from "@point-hub/express-error-handler";

export default function compareCredentialWithUserId(id: string, paramId: string) {
    if (id !== paramId) throw new ApiError(401, { msg: 'You can not modify or access this account. Invalid id or wrong id'});
    return
}