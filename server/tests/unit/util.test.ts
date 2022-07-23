import {
  UserWithPass,
  MessageAttributes,
  UserIdOnly,
} from "./../../types/models.types";

import {
  userFieldsValidation,
  messageFieldsValidation,
} from "../../src/util/validation.util";

describe("Testing util functions", () => {
  describe("userFieldsValidation valid fields provided", () => {
    it("should return true if all user fields are valid without ID provided", () => {
      const user: UserWithPass = {
        firstName: "John",
        lastName: "Smith",
        nickname: "JohnSmith",
        password: "Qwerty123",
      };

      const result = userFieldsValidation(user); /*?*/
      expect(result).toBe(true);
    });
    it("should return true if only valid user ID provided", () => {
      const user: UserIdOnly = {
        ID: 1,
      };
      const result = userFieldsValidation(user, true);
      expect(result).toBe(true);
    });
    describe("userFieldsValidation invalid fields provided", () => {
      it("should return false if one of user fields is invalid", () => {
        const user: object = {
          firstName: "John",
          lastName: "Smith",
          nickname: "JohnSmith",
        };
        const result = userFieldsValidation(user as UserWithPass);
        expect(result).toBe(false);
      });
    });
  });
  describe("messageFieldsValidation valid fields provided", () => {
    it("should return true if all message fields are valid", () => {
      const message: MessageAttributes = {
        senderID: 1,
        receiverID: 2,
        message: "Test",
      };
      const result = messageFieldsValidation(message);
      expect(result).toBe(true);
    });
  });
  describe("messageFieldsValidation invalid fields provided", () => {
    it("should return false if one of message fields are invalid", () => {
      const message: object = {
        senderID: 1,
        message: "Test",
      };
      const result = messageFieldsValidation(message as MessageAttributes);
      expect(result).toBe(false);
    });
  });
});
