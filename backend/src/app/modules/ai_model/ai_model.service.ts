import ApiError from "../../../errors/api_error";
import { ITokenPayload } from "../../../interfaces/token";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { IAIModel } from "./ai_model.interface";
import { generateWithGeminiStories, generateAlternateEndingsWithGemini } from "./ai_model.utils";
import { REQUEST_LIMITS } from "../../../interfaces/ai_model_request_limit";
import { timeoutLimit } from "../../../utils/timeout_limit";

const AUTHENTICATED_GENERATION_TIMEOUT_MS = 60000;
const FREE_GENERATION_TIMEOUT_MS = 10000;

const aiModelGenerate = async (payload: IAIModel, token: ITokenPayload) => {
  const { email } = token;
  const { prompt, wordLength, numStories, language } = payload;

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const user = await User.findOne({ email: email });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");

  if (user.lastRequestDate && user.lastRequestDate < firstDayOfMonth) {
    await User.updateOne(
      { email: email, lastRequestDate: { $lt: firstDayOfMonth } },
      { $set: { requestsThisMonth: 0, lastRequestDate: currentDate } }
    );
  }

  const requestLimit = REQUEST_LIMITS[user.subscriptionType as keyof typeof REQUEST_LIMITS] || REQUEST_LIMITS.free;

  const updatedUser = await User.findOneAndUpdate(
    { email: email, requestsThisMonth: { $lt: requestLimit } },
    { $inc: { requestsThisMonth: 1 }, $set: { lastRequestDate: currentDate } },
    { new: true }
  );

  if (!updatedUser) throw new ApiError(httpStatus.CONFLICT, "Monthly request limit exceeded!");

  try {
    const result = await Promise.race([
      timeoutLimit(AUTHENTICATED_GENERATION_TIMEOUT_MS),
      generateWithGeminiStories(prompt, wordLength, numStories, language),
    ]);
    if (!result || (Array.isArray(result) && result.length === 0)) throw new Error("Generation failed.");
    return result;
  } catch (error) {
    await User.updateOne({ email: email, requestsThisMonth: { $gt: 0 } }, { $inc: { requestsThisMonth: -1 } });
    if (error instanceof ApiError) throw error;
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Generation failed!");
  }
};

const aiFreeModelGenerate = async (payload: IAIModel) => {
  try {
    const { prompt, language } = payload;
    const result = await Promise.race([
      timeoutLimit(FREE_GENERATION_TIMEOUT_MS),
      generateWithGeminiStories(prompt, 150, 1, language),
    ]);
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.GATEWAY_TIMEOUT, "Request timed out!");
  }
};

const aiModelAlternateEndings = async (payload: any, token: ITokenPayload) => {
  const { email } = token;
  const { title, content, tag, language } = payload;

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const user = await User.findOne({ email: email });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");

  if (user.lastRequestDate && user.lastRequestDate < firstDayOfMonth) {
    await User.updateOne(
      { email: email, lastRequestDate: { $lt: firstDayOfMonth } },
      { $set: { requestsThisMonth: 0, lastRequestDate: currentDate } }
    );
  }

  const requestLimit = REQUEST_LIMITS[user.subscriptionType as keyof typeof REQUEST_LIMITS] || REQUEST_LIMITS.free;
  const updatedUser = await User.findOneAndUpdate(
    { email: email, requestsThisMonth: { $lt: requestLimit } },
    { $inc: { requestsThisMonth: 1 }, $set: { lastRequestDate: currentDate } },
    { new: true }
  );

  if (!updatedUser) throw new ApiError(httpStatus.CONFLICT, "Monthly request limit exceeded!");

  try {
    const result = await Promise.race([
      timeoutLimit(AUTHENTICATED_GENERATION_TIMEOUT_MS),
      generateAlternateEndingsWithGemini(title, content, tag, language),
    ]);
    return result;
  } catch (error) {
    await User.updateOne({ email: email, requestsThisMonth: { $gt: 0 } }, { $inc: { requestsThisMonth: -1 } });
    if (error instanceof ApiError) throw error;
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Alternate ending generation failed!");
  }
};

const aiFreeModelAlternateEndings = async (payload: any) => {
  try {
    const { title, content, tag, language } = payload;
    const result = await Promise.race([
      timeoutLimit(FREE_GENERATION_TIMEOUT_MS),
      generateAlternateEndingsWithGemini(title, content, tag, language),
    ]);
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.GATEWAY_TIMEOUT, "Request timed out!");
  }
};

export const AiModelService = {
  aiModelGenerate,
  aiFreeModelGenerate,
  aiModelAlternateEndings,
  aiFreeModelAlternateEndings,
};
