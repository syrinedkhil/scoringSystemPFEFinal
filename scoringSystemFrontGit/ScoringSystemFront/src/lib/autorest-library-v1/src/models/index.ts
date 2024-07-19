import * as coreClient from "@azure/core-client";

export interface AddArticleRequest {
  articleTexte?: string;
  labels?: LabelResponse[];
}

export interface LabelResponse {
  labelId?: string;
  item?: string;
  score?: number;
  priority?: number;
  articleId?: string;
}

export interface ArticleResponse {
  articleId: string;
  articleTexte: string;
  labels: LabelResponse[];
  finalScore: number;
}

export interface GetArticleByIdResponse {
  articleId?: string;
}

export interface GetNewArticleScoreRequest {
  topicId?: string;
}

export interface NewArticleScoreResponse {
  topicId: string;
  source: string;
  author: string;
  url: string;
  title: string;
  description: string;
  content: string;
  companiesIds: string[];
  companiesScores: number[];
  highScore: number[];
  midScore: number[];
  lowScore: number[];
  result: number;
  articleSentiment?: string;
  sentimentScore?: number;
}

export interface AddCompanyRequest {
  name?: string;
}

export interface CompanyResponse {
  id: string;
  name: string;
}

export interface FeedbackRequest {
  topicId?: string;
  articleId?: string;
  articleUrl?: string;
  highScore?: number[];
  midScore?: number[];
  lowScore?: number[];
  finalScore?: number;
  rated?: boolean;
  relatedCompanies?: string[];
  articleSentiment?: string;
  reviewer?: string;
}

export interface FeedbackResponse {
  id: string;
  topicId: string;
  articleId: string;
  articleUrl?: string;
  highScore: number[];
  midScore: number[];
  lowScore: number[];
  finalScore: number;
  rated: boolean;
  relatedCompanies?: string[];
  articleSentiment: string;
  createdOn: string;
  reviewer: string;
}

export interface NewArticleResponse {
  source: string;
  author: string;
  url: string;
  title: string;
  description: string;
  content: string;
}

export interface AddLabelRequest {
  item?: string;
  score?: number;
  priority?: number;
  articleId?: string;
}

export interface GetLabelByArticleIdRequest {
  articleId?: string;
}

export interface UpdateLabelRequest {
  labelId?: string;
  item?: string;
  score?: number;
  priority?: number;
  articleId?: string;
}

export interface GetTopNewArticlesRequest {
  topicId?: string;
}

export interface AddNewArticleRequest {
  source?: string;
  author?: string;
  url?: string;
  title?: string;
  description?: string;
  content?: string;
}

export interface AddNewArticleResponse {
  id: string;
}

export interface AddNewLabelRequest {
  item?: string;
  score?: number;
  priority?: number;
  topicId?: string;
}

export interface NewLabelResponse {
  newLabelId?: string;
  item?: string;
  score?: number;
  priority?: number;
  topicId?: string;
}

export interface GetLabelByTopicIdRequest {
  topicId?: string;
}

export interface UpdateNewLabelRequest {
  newLabelId?: string;
  item?: string;
  score?: number;
  priority?: number;
  topicId?: string;
}

export interface CreateTopicRequest {
  topicName?: string;
  labels?: NewLabelResponse[];
}

export interface TopicResponse {
  topicId?: string;
  topicName?: string;
  labels?: NewLabelResponse[];
}

export interface UpdateTopicRequest {
  topicId?: string;
  topicName?: string;
  labels?: NewLabelResponse[];
}

/** Optional parameters. */
export interface SignInOptionalParams extends coreClient.OperationOptions {
  username?: string;
  password?: string;
}

/** Optional parameters. */
export interface AddArticleOptionalParams extends coreClient.OperationOptions {
  body?: AddArticleRequest;
}

/** Contains response data for the addArticle operation. */
export type AddArticleResponse = ArticleResponse;

/** Optional parameters. */
export interface GetArticleByIdOptionalParams
  extends coreClient.OperationOptions {
  body?: GetArticleByIdResponse;
}

/** Contains response data for the getArticleById operation. */
export type GetArticleByIdOperationResponse = ArticleResponse;

/** Optional parameters. */
export interface GetAllArticlesOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getAllArticles operation. */
export type GetAllArticlesResponse = ArticleResponse[];

/** Optional parameters. */
export interface DeleteArticleByIdOptionalParams
  extends coreClient.OperationOptions {
  id?: string;
}

/** Optional parameters. */
export interface ScoreArticlesOptionalParams
  extends coreClient.OperationOptions {
  body?: GetNewArticleScoreRequest;
}

/** Contains response data for the scoreArticles operation. */
export type ScoreArticlesResponse = NewArticleScoreResponse[];

/** Optional parameters. */
export interface AddCompaniesOptionalParams
  extends coreClient.OperationOptions {
  body?: AddCompanyRequest;
}

/** Contains response data for the addCompanies operation. */
export type AddCompaniesResponse = CompanyResponse;

/** Optional parameters. */
export interface GetAllCompaniesOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getAllCompanies operation. */
export type GetAllCompaniesResponse = CompanyResponse[];

/** Optional parameters. */
export interface DeleteCompanyOptionalParams
  extends coreClient.OperationOptions {
  id?: string;
}

/** Optional parameters. */
export interface AddFeedbackOptionalParams extends coreClient.OperationOptions {
  body?: FeedbackRequest;
}

/** Optional parameters. */
export interface GetFeedbackByIdOptionalParams
  extends coreClient.OperationOptions {
  id?: string;
}

/** Contains response data for the getFeedbackById operation. */
export type GetFeedbackByIdResponse = FeedbackResponse;

/** Optional parameters. */
export interface GetAllFeedbackOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getAllFeedback operation. */
export type GetAllFeedbackResponse = FeedbackResponse[];

/** Optional parameters. */
export interface GetAllFeedbackByCompanyNameOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getAllFeedbackByCompanyName operation. */
export type GetAllFeedbackByCompanyNameResponse = NewArticleResponse[];

/** Optional parameters. */
export interface DeleteFeedbackOptionalParams
  extends coreClient.OperationOptions {
  id?: string;
}

/** Optional parameters. */
export interface AddLabelOptionalParams extends coreClient.OperationOptions {
  body?: AddLabelRequest;
}

/** Contains response data for the addLabel operation. */
export type AddLabelResponse = LabelResponse;

/** Optional parameters. */
export interface GetLabelbyIdOptionalParams
  extends coreClient.OperationOptions {
  body?: GetLabelByArticleIdRequest;
}

/** Contains response data for the getLabelbyId operation. */
export type GetLabelbyIdResponse = LabelResponse[];

/** Optional parameters. */
export interface GetLabelsByArticlesOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getLabelsByArticles operation. */
export type GetLabelsByArticlesResponse = LabelResponse[][];

/** Optional parameters. */
export interface EditLabelOptionalParams extends coreClient.OperationOptions {
  body?: UpdateLabelRequest;
}

/** Contains response data for the editLabel operation. */
export type EditLabelResponse = LabelResponse;

/** Optional parameters. */
export interface GetTopArticlesOptionalParams
  extends coreClient.OperationOptions {
  body?: GetTopNewArticlesRequest;
}

/** Contains response data for the getTopArticles operation. */
export type GetTopArticlesResponse = NewArticleResponse[];

/** Optional parameters. */
export interface AddNewArticleOptionalParams
  extends coreClient.OperationOptions {
  body?: AddNewArticleRequest;
}

/** Contains response data for the addNewArticle operation. */
export type AddNewArticleOperationResponse = AddNewArticleResponse;

/** Optional parameters. */
export interface DeleteNewArticleOptionalParams
  extends coreClient.OperationOptions {
  id?: string;
}

/** Optional parameters. */
export interface AddNewLabelOptionalParams extends coreClient.OperationOptions {
  body?: AddNewLabelRequest;
}

/** Contains response data for the addNewLabel operation. */
export type AddNewLabelResponse = NewLabelResponse;

/** Optional parameters. */
export interface GetNewLabelByIdOptionalParams
  extends coreClient.OperationOptions {
  body?: GetLabelByTopicIdRequest;
}

/** Contains response data for the getNewLabelById operation. */
export type GetNewLabelByIdResponse = NewLabelResponse[];

/** Optional parameters. */
export interface EditNewLabelOptionalParams
  extends coreClient.OperationOptions {
  body?: UpdateNewLabelRequest;
}

/** Contains response data for the editNewLabel operation. */
export type EditNewLabelResponse = NewLabelResponse;

/** Optional parameters. */
export interface AddTopicOptionalParams extends coreClient.OperationOptions {
  body?: CreateTopicRequest;
}

/** Contains response data for the addTopic operation. */
export type AddTopicResponse = TopicResponse;

/** Optional parameters. */
export interface UpdateTopicOptionalParams extends coreClient.OperationOptions {
  body?: UpdateTopicRequest;
}

/** Optional parameters. */
export interface GetAllTopicsOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getAllTopics operation. */
export type GetAllTopicsResponse = TopicResponse[];

/** Optional parameters. */
export interface GetTopicByIdOptionalParams
  extends coreClient.OperationOptions {
  topicId?: string;
}

/** Contains response data for the getTopicById operation. */
export type GetTopicByIdResponse = TopicResponse;

/** Optional parameters. */
export interface DeleteTopicOptionalParams extends coreClient.OperationOptions {
  id?: string;
}

/** Optional parameters. */
export interface ScoringSystemOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
