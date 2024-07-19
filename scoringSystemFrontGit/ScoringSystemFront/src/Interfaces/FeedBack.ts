import Topic from "./Topic";
import * as autorest from "../Lib/autorest-library-v1/src";

interface FeedBack extends autorest.FeedbackResponse {
  topic?: Topic;
}
export default FeedBack;
